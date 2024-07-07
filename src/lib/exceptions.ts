export class InvalidSessionError extends Error {
  constructor(message = "Invalid session") {
    super(message);
    this.name = "InvalidSessionError";
  }
}

export class InvalidSourceError extends Error {
  constructor(message = "Invalid relay.") {
    super(message);
    this.name = "InvalidSource";
  }
}
