import {
  FindOptionsRelationByString,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { GenericFilter } from './generic-filter';
import { SortOrder } from './sort.enum';

export class PaginateService {
  protected createOrderQuery(filter: GenericFilter) {
    const order: any = {};

    if (filter.orderBy) {
      order[filter.orderBy] = filter.sortOrder;
      return order;
    }

    order.id = SortOrder.ASC;
    return order;
  }

  protected paginate<T>(
    repository: Repository<T>,
    filter: GenericFilter,
    where: FindOptionsWhere<T>,
    relations: FindOptionsRelationByString | FindOptionsRelations<T> = [],
  ) {
    const page = filter.page > 0 ? filter.page : 1;
    const skip = (page - 1) * filter.pageSize;

    return repository.findAndCount({
      order: this.createOrderQuery(filter),
      skip: skip,
      take: filter.pageSize,
      where: where,
      relations: relations,
    });
  }
}
