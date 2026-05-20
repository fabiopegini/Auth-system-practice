import type e = require("express")

const errorHandler: e.ErrorRequestHandler = (error, req, res, next) => {

  // Handle errors
  next(error)
}

export = errorHandler