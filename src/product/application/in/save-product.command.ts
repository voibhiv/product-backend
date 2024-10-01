export class SaveMovieCommand {
  constructor(
    readonly description: string,
    readonly cost: number,
    readonly image: string,
  ) {}
}
