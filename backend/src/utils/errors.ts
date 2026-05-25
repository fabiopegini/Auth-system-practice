const errorCodes = {
  db: 'DB_CONNECTION_FAILURE',
  notFound: 'RESOURCE_NOT_FOUND',
  token: 'INVALID_TOKEN'
}

const errorMsg = {
  db: 'Could not connect to database',
  notFound: 'Could not found the resource',
  token: 'Invalid token'
}

class CustomError extends Error {
  public readonly statusCode: number
  public readonly errorCode: string

  constructor(statusCode: number, errorCode: string , message: string) {
    super(message)
    this.statusCode = statusCode
    this.errorCode = errorCode
   
    Error.captureStackTrace(this, CustomError)
  }
}

const InvalidTokenError = new CustomError(401, errorCodes.token, errorMsg.token)
const DatabaseConnectionError = new CustomError(500, errorCodes.db, errorMsg.db)
const NotFoundError = new CustomError(404, errorCodes.notFound, errorMsg.notFound)

export = { DatabaseConnectionError, NotFoundError ,InvalidTokenError, errorCodes, errorMsg }
