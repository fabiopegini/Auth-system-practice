import { Request, RequestHandler } from "express";
import { PayloadType } from "../types/jwt";
import responses = require("../controllers/utils");
import config = require("../config/config");
const jwt = require('jsonwebtoken')

const { ResJSON } = responses

const extractToken = (request: Request) => {
  const authorization = request.get('authorization')

  if(authorization && authorization.startsWith('Bearer ')) return authorization.replace('Bearer ', '')

  return null
}

const extractUser: RequestHandler = (req, res, next) => {
  const token = extractToken(req)

  if(!token) return res.status(401).json(new ResJSON([], false, 'Invalid token'))

  const payloadUser: PayloadType = jwt.verify(token, config.JWT_SECRET)
  req.user = payloadUser

  next()
}

export = extractUser