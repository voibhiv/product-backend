import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from 'src/product/application/services/product.service';
import { SaveProductCommand } from 'src/product/application/ports/in/save-product.command';
import { ProductCostException } from 'src/core/exceptions/product/product-cost.exception';
import { HttpStatus } from '@nestjs/common';
import { SaveProductRequest } from 'src/product/adapter/in/requests/save-product.request';
import { validate } from 'class-validator';
import { ProductDescriptionException } from 'src/core/exceptions/product/product-description.exception';

describe('Product Tests', () => {
  let service: ProductService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductService,
          useValue: {
            saveProduct: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = moduleFixture.get<ProductService>(ProductService);
  });

  describe('Create Product Service', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should call saveProduct with the correct command and return 201', async () => {
      const mockCommand: SaveProductCommand = {
        description: 'Testando módulo',
        cost: 12345622012.123,
        shops: [
          {
            idShop: 3,
            shopPrice: 200.31,
          },
          {
            idShop: 4,
            shopPrice: 120.0,
          },
        ],
      };

      const mockProductResponse = {
        description: 'Testando módulo',
        cost: 12345622012.123,
        image: null,
        shops: [
          {
            idShop: 3,
            shopPrice: 200.31,
            description: 'Mocked Desc',
          },
          {
            idShop: 4,
            shopPrice: 120.0,
            description: 'Mocked Desc',
          },
        ],
      };

      const saveProductSpy = jest
        .spyOn(service, 'saveProduct')
        .mockResolvedValue(mockProductResponse);

      const result = await service.saveProduct(mockCommand);

      expect(result).toEqual(mockProductResponse);
      expect(saveProductSpy).toHaveBeenCalledWith(mockCommand);

      const statusCode = HttpStatus.CREATED;
      expect(statusCode).toBe(HttpStatus.CREATED);
    });

    it('should throw an error when cost data is not valid', async () => {
      const mockCommand: SaveProductCommand = {
        description: 'Testando módulo',
        cost: 12345622789012.123,
        shops: [
          {
            idShop: 3,
            shopPrice: 200.31,
          },
          {
            idShop: 4,
            shopPrice: 120.0,
          },
        ],
      };

      const saveProductSpy = jest
        .spyOn(service, 'saveProduct')
        .mockRejectedValue(new ProductCostException());

      const result = service.saveProduct(mockCommand);

      await expect(result).rejects.toThrow(ProductCostException);
      expect(saveProductSpy).toHaveBeenCalledWith(mockCommand);
    });

    it('should throw an error when description already exist in the database', async () => {
      const mockCommand: SaveProductCommand = {
        description: 'Testando módulo',
        cost: 12345622789012.123,
        shops: [
          {
            idShop: 3,
            shopPrice: 200.31,
          },
          {
            idShop: 4,
            shopPrice: 120.0,
          },
        ],
      };

      const saveProductSpy = jest
        .spyOn(service, 'saveProduct')
        .mockRejectedValue(new ProductDescriptionException());

      const result = service.saveProduct(mockCommand);

      await expect(result).rejects.toThrow(ProductDescriptionException);
      expect(saveProductSpy).toHaveBeenCalledWith(mockCommand);
    });
  });

  describe('Class Validator Exceptions', () => {
    it('should return validations errors when data is not valid', async () => {
      const request = new SaveProductRequest();
      request.description = '';
      request.cost = undefined;
      request.shops = [];

      const errors = await validate(request);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints.isNotEmpty).toBeDefined();
      expect(errors[1].constraints.arrayNotEmpty).toBeDefined();
    });

    it('should accept request if validations request is valid', async () => {
      const request = new SaveProductRequest();
      request.description = 'Product Test';
      request.cost = 50.35;
      request.shops = [{ idShop: 1, shopPrice: 50.0 }];

      const errors = await validate(request);
      expect(errors.length).toBe(0);
    });
  });
});
