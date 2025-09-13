import { StatusCodes } from "http-status-codes";

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.status = StatusCodes.NOT_FOUND;
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.status = StatusCodes.BAD_REQUEST;
  }
}

export class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = "ConfligtError";
    this.status = StatusCodes.CONFLICT;
  }
}
