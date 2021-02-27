import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../common/config/configuration';
import { validation } from '../common/config/validation';
import { SchemaService } from './schema.service';

describe('SchemaService', () => {
  let service: SchemaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        ConfigModule.forRoot({
          ignoreEnvFile: process.env.NODE_ENV === 'production',
          envFilePath: process.env.NODE_ENV === 'test' ? '.test.env' : '.env',
          load: [configuration],
          validationSchema: validation,
        }),
      ],
      providers: [SchemaService],
    }).compile();

    service = module.get<SchemaService>(SchemaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
