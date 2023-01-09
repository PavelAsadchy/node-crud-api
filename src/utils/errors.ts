export class CLIENT_ERROR extends Error {
  constructor(message: any) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NOT_FOUND_ERROR extends CLIENT_ERROR {
  status: number;
  constructor(message: string) {
    super(`Bad Request. ${message}`);
    this.status = 404;
  }
}