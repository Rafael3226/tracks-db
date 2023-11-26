export class PersistenceException extends Error {
  originalError?: Error | unknown;
  constructor(message: string, originalError?: Error | unknown) {
    super(message);
    this.name = this.constructor.name;
    this.originalError = originalError;
  }
}
