export class InvalidSessionError extends Error {
  constructor(message = "Invalid session.") {
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

export class InvalidProfileError extends Error {
  constructor(message = "There was an error retrieving your profile.") {
    super(message);
    this.name = "InvalidSource";
  }
}
