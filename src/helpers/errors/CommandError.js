class CommandError extends Error {
  constructor(message = "Command Error", cause) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.cause = cause;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CommandError;
