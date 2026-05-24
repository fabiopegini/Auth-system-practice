import type e = require("express")
import { type Application } from "express"
import express = require('express')
import usersRouter = require('./routes/users')
import requestLogger = require("./middlewares/requestLogger")
import errorHandler = require('./middlewares/errorHandler')
import extractUser from "./middlewares/auth_token"


const app: Application = express()

app.use(express.json())
app.use(requestLogger)
app.use(extractUser)

app.get('/', (req: e.Request, res: e.Response) => {
  res.send({ welcome: 'Hi there!' })
})

app.use('/users', usersRouter)

app.use(errorHandler)

export = app
