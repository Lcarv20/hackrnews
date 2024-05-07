export class InvalidSessionError extends Error {
  constructor(message = "Invalid session") {
    super(message);
    this.name = "InvalidSessionError";
  }
}
