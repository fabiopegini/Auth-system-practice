import type e = require("express")
import {type Application} from "express"
import express = require('express')
import errorHandler = require('./middlewares/errorHandler')
import usersRouter = require('./routes/users')
import requestLogger = require("./middlewares/requestLogger")


const app: Application = express()

app.use(express.json())
app.use(requestLogger)

app.get('/', (req: e.Request, res: e.Response) => {
  res.send({ welcome: 'Hi there!' })
})

app.use('/users', usersRouter)

app.use(errorHandler)

export = app
