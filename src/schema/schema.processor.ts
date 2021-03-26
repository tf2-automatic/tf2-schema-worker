import { Processor, Process, OnQueueFailed } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';
import { Config } from '../common/config/configuration';
import { SchemaService } from './schema.service';

@Processor('schema')
export class SchemaConsumer {
  constructor(
    private readonly schemaService: SchemaService,
    private readonly configService: ConfigService<Config>,
  ) {}

  @Process()
  async getSchema(
    job: Job<{
      start: number;
    }>,
  ) {
    console.log('Getting schema from ' + job.data.start);

    // Get items from TF2 schema API
    const body = await this.schemaService.getSchemaItems(job.data.start);
    const result = body.result;

    if (result.status != 1) {
      throw new Error(result.note);
    }

    // Send items to service

    const chunkSize = this.configService.get<number>('chunkSize');
    for (let i = 0, j = result.items.length; i < j; i += chunkSize) {
      const arrayChunk = result.items.slice(i, i + chunkSize);
      await this.schemaService.saveSchemaItems(arrayChunk);
    }

    const next = result.next;
    // Check if there are more items in the schema
    if (next) {
      // There are more items, create new job
      await this.schemaService.enqueueSchema(next);
    }

    return {
      itemCount: result.items.length,
    };
  }

  @OnQueueFailed()
  onQueueFailed(job: Job, err: Error) {
    console.log('Job with id ' + job.id + ' failed: ' + err.message);
    console.error(err);
  }
}
