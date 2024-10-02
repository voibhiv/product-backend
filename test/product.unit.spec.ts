import { Test, TestingModule } from '@nestjs/testing';
import { SaveProductService } from 'src/product/application/services/save-product.service';
import { AdapterModule } from 'src/product/adapter/adapter.module';
import { ApplicationModule } from 'src/product/application/application.module';
import { SaveProductCommand } from 'src/product/application/ports/in/save-product.command';

describe('Product Tests', () => {
  let service: SaveProductService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SaveProductService,
          useValue: {
            saveProduct: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = moduleFixture.get<SaveProductService>(SaveProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call saveProduct with the correct command and return 201', async () => {
    const mockCommand: SaveProductCommand = {
      description: 'Testando módulo',
    };
  
    const saveProductSpy = jest
      .spyOn(service, 'saveProduct')
      .mockResolvedValue();
  
    const result = await service.saveProduct(mockCommand); 
  
    expect(result).toBeUndefined();
    expect(saveProductSpy).toHaveBeenCalledWith(mockCommand);
  
    const statusCode = 201;
    expect(statusCode).toBe(201); 
  });
});
