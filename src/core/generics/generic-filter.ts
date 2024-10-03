import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { SortOrder } from './sort.enum';

function transformToNumber(options: { default: number; min: number }) {
  return ({ value }: { value: any }) => {
    const parsedValue = Number(value);
    if (isNaN(parsedValue) || parsedValue < options.min) {
      return options.default;
    }
    return parsedValue;
  };
}

export class GenericFilter {
  @Transform(transformToNumber({ default: 1, min: 1 }))
  @IsNumber({}, { message: " 'page' deve ser um número " })
  public page: number;

  @Transform(transformToNumber({ default: 10, min: 1 }))
  @IsNumber({}, { message: " 'pageSize' deve ser um número " })
  public pageSize: number;

  @IsOptional()
  public orderBy?: string;

  @IsEnum(SortOrder)
  @IsOptional()
  public sortOrder?: SortOrder = SortOrder.DESC;
}
