export class SaveProductCommand {
  constructor(
    readonly description: string,
    readonly cost?: number,
    readonly image?: string,
  ) {}
}
