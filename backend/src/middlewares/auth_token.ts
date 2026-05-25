import { RequestHandler } from "express";
import { PayloadType } from "../types/jwt";
import config = require("../config/config");
import errors = require("../utils/errors")
const jwt = require('jsonwebtoken')

const { InvalidTokenError } = errors

const extractUser: RequestHandler = (req, res, next) => {
  const token = req.cookies.authorization

  if(!token) return next(InvalidTokenError)

  const payloadUser: PayloadType = jwt.verify(token, config.JWT_SECRET)
  req.user = payloadUser

  next()
}

export = extractUser