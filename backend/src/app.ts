import type e = require("express")

import express = require('express')
import errorHandler = require('./middlewares/errorHandler')
import usersRouter = require('./routes/users')
import {type Application} from "express"

const app: Application = express()

app.use(express.json())

app.get('/', (req: e.Request, res: e.Response) => {
  res.send({ welcome: 'Hi there!' })
})

app.use('/users', usersRouter)

app.use(errorHandler)

export = app
