export class SaveProductShopCommand {
  constructor(
    readonly idShop: number,
    readonly shopPrice: number,
  ) {}
}
