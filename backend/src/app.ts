import type e = require("express")
import { type Application } from "express"
import express = require('express')
import usersRouter = require('./routes/users')
import requestLogger = require("./middlewares/requestLogger")
import errorHandler = require('./middlewares/errorHandler')
import cookieParser = require("cookie-parser")


const app: Application = express()

app.use(express.json())
app.use(cookieParser())
app.use(requestLogger)

app.get('/', (req: e.Request, res: e.Response) => {
  res.send({ welcome: 'Hi there!' })
})

app.use('/users', usersRouter)

app.use(errorHandler)

export = app
