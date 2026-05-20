const errorCodes = {
  db: 'DB_CONNECTION_FAILURE',
  notFound: 'RESOURCE_NOT_FOUND'
}

const errorMsg = {
  db: 'Could not connect to database',
  notFound: 'Could not found the resource'
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

const DatabaseConnectionError = new CustomError(500, errorCodes.db, errorMsg.db)
const NotFoundError = new CustomError(404, errorCodes.notFound, errorMsg.notFound)

export = { CustomError, DatabaseConnectionError, NotFoundError }
