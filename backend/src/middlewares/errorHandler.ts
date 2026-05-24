import type e = require("express")

const errorHandler: e.ErrorRequestHandler = (error, req, res, next) => {
  if(error.name === 'CastError') return res.status(400).json({ bad_request: 'Invalid id'})
  
  // 404
  // ValidationError
  // CastError
  // MongoServerError && error.message.includes('E11000 duplicate key error')
  // JsonWebTokenError -> Invalid token
  // TokenExpiredError


  next(error)
}

export = errorHandler