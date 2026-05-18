import type e = require("express")

import express = require('express')

const errorHandler = require('./middlewares/errorHandler')

const app = express()

app.use(express.json())

app.get('/', (req: e.Request, res: e.Response) => {
  res.send({ welcome: 'Hi there!' })
})

app.use(errorHandler)

module.exports = app
