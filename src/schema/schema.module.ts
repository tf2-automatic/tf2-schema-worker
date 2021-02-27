import { BullModule } from '@nestjs/bull';
import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SchemaConsumer } from './schema.processor';
import { SchemaService } from './schema.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    BullModule.registerQueue({
      name: 'schema',
    }),
  ],
  providers: [SchemaService, SchemaConsumer],
})
export class ScheamaModule {}
