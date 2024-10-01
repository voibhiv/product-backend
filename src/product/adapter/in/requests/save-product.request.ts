import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { SaveProductCommand } from 'src/product/application/ports/in/save-product.command';

export class SaveProductRequest {
  @IsNotEmpty()
  readonly description: string;

  @IsOptional()
  @IsNumber()
  readonly cost: number;

  @IsOptional()
  @IsString()
  readonly image: string;

  toCommand(): SaveProductCommand {
    return new SaveProductCommand(this.description, this.cost, this.image);
  }
}
