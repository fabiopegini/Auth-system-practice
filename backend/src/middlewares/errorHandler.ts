import type e = require("express")
import errors = require('../utils/errors')

const { errorCodes, errorMsg } = errors

const errorHandler: e.ErrorRequestHandler = (error, req, res, next) => {
  if(error.name === 'CastError') return res.status(400).json({ error: 'Invalid id' })
  
  
  // ValidationError
  // CastError
  // MongoServerError && error.message.includes('E11000 duplicate key error')
  if(error.errorCode === errorCodes.token) return res.status(error.statusCode).json({ error: errorMsg.token })
  // TokenExpiredError
  if(error.errorCode === errorCodes.notFound) return res.status(error.statusCode).json({ error: errorMsg.notFound })

  next(error)
}

export = errorHandler