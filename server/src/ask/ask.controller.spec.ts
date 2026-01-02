import { Test, TestingModule } from '@nestjs/testing';
import { AskController } from './ask.controller';

describe('AskController', () => {
  let controller: AskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AskController],
    }).compile();

    controller = module.get<AskController>(AskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
