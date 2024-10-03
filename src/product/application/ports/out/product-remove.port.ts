export abstract class ProductRemovePort {
  abstract execute(id: number): Promise<boolean>;
  abstract validateProductExistence(id: number): Promise<boolean>;
}
