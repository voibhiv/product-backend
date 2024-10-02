import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isDecimalPrecision', async: false })
class IsDecimalPrecisionConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (typeof value !== 'number') {
      return false;
    }

    const [integerPart, decimalPart] = value.toString().split('.');

    return (
      (!integerPart || integerPart.length <= 13) &&
      (!decimalPart || decimalPart.length <= 3)
    );
  }

  defaultMessage(args: ValidationArguments) {
    return 'shopPrice deve ter no máximo 13 dígitos inteiros e no máximo 3 casas decimais.';
  }
}

export class SaveProductShopRequest {
  @Type(() => Number)
  @IsInt()
  idShop: number;

  @Type(() => Number)
  @IsNumber()
  @Validate(IsDecimalPrecisionConstraint)
  shopPrice: number;
}
