export class InflowOutflow {
  constructor(
    public description: string,
    public amount: number,
    public type: string,
    public id?: string
  ) {}
}
