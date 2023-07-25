import { Test, TestingModule } from '@nestjs/testing';
import { Analytics } from './analytics.resolver';

describe('Analytics', () => {
  let provider: Analytics;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Analytics],
    }).compile();

    provider = module.get<Analytics>(Analytics);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
