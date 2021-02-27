import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { Queue } from 'bull';
import { getQueueToken } from '@nestjs/bull';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let schemaQueue: Queue;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    schemaQueue = app.get<Queue>(getQueueToken('schema'));

    await schemaQueue.empty();
  });

  afterAll(() => {
    return app.close();
  });

  it('should start properly', async () => {
    const counts = await schemaQueue.getJobCounts();

    expect(counts.active).toBe(0);
    expect(counts.delayed).toBe(0);
    expect(counts.waiting).toBe(0);
  });
});
