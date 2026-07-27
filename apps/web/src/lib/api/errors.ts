export class ApiRequestError extends Error {
  readonly unauthorized: boolean

  constructor(message: string, options?: { unauthorized?: boolean }) {
    super(message)
    this.name = 'ApiRequestError'
    this.unauthorized = options?.unauthorized ?? false
  }
}

export function isApiRequestError(error: unknown): error is ApiRequestError {
  return error instanceof ApiRequestError
}

export function isUnauthorizedError(error: unknown) {
  return isApiRequestError(error) && error.unauthorized
}
