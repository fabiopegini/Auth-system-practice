import app = require('./app')
import config = require('./config/config')
import db = require('./config/db/mongodb')
import logger = require('./utils/logger')


const startServer = async () => {
  await db.connect()

  const server = app.listen(config.PORT, () => {
    console.log(`Server runs on http://localhost:${config.PORT}`)
  })

  const closeServer = async () => {
    try {
      logger.message('Disconnecting from db ⌛')
      await db.disconnect()
      logger.message('Disconnected successfully ☑️')
    } catch {
      throw new Error('Error on disconnecting from db')
    }
    
    logger.message('Shutting down server ⌛')
    server.close(() => {
      logger.message('Server closed ☑️')
      process.exit(0)
    })
  }

  process.on('SIGINT', closeServer)
  process.on('SIGTERM', closeServer)
}

startServer()