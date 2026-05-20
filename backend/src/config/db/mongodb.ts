import mongoose = require("mongoose");
import logger = require('../../utils/logger')
import errors = require('../../utils/errors')
import config = require('../config')
const { DatabaseConnectionError } = errors


const connect = async () => {

  try {
    logger.message('Connecting to db ⌛')
    await mongoose.connect(config.DB_URI,{ dbName: config.DB_NAME})
    logger.message('Connected to db ☑️')
  } catch (error) {
    logger.error(DatabaseConnectionError.message + ' ❌')
    throw DatabaseConnectionError
  }
}

const disconnect = async () => {
  await mongoose.connection.close()
  logger.message('Connection to db close')
}

export = { connect, disconnect }