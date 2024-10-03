export class SaveProductShopCommand {
  constructor(
    readonly idShop: number,
    readonly shopPrice: number,
    readonly idProduct?: number,
    readonly description?: string
  ) {}
}
