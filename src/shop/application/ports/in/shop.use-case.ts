import { Shop } from "src/shop/domain/shop";

export abstract class ShopUseCase {
  abstract list(): Promise<Shop[]>;
}
