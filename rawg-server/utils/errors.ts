export class ConflictError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.status = 409; // Conflict
  }
}

export class UnauthorizedError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.status = 401; // Unauthorized
  }
}
