import type e = require("express")

const errorHandler: e.ErrorRequestHandler = (error, req, res, next) => {
  if(error.name === 'CastError') return res.status(400).json({ bad_request: 'Invalid id'})
  // Handle errors
  next(error)
}

export = errorHandler