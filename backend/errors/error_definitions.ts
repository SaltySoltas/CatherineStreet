// Throwable errors for different HTTP responses
// Makes error handling more concise in controllers

class GeneralError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    } if (this instanceof NotFound) {
      return 404;
    }
    return 500;
  }
}

class BadRequest extends GeneralError { }
class NotFound extends GeneralError { }

export {
  GeneralError,
  BadRequest,
  NotFound
};