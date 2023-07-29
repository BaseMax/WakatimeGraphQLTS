import { Test, TestingModule } from '@nestjs/testing';
import { EditorResolver } from './editor.resolver';

describe('EditorResolver', () => {
  let resolver: EditorResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EditorResolver],
    }).compile();

    resolver = module.get<EditorResolver>(EditorResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
