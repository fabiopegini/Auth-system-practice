import { RequestHandler } from 'express'
import logger = require('../utils/logger')

const requestLogger: RequestHandler = (req, res, next) => {
  const protectedBody = {...req.body}

  if(protectedBody.email) protectedBody.email = '[PROTECTED]'
  if(protectedBody.password) protectedBody.password = '[PROTECTED]'

  logger.message('LOGGER')
  logger.message(`Method: ${req.method}`)
  logger.message(`Path: ${req.path}`)
  logger.message(`Body: ${JSON.stringify(protectedBody, null, 1)}`)
  logger.message('---')
  next()
}

export = requestLogger