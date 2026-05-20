interface Config {
  PORT: string | number
  DB_URI: string
  DB_NAME: string
}

require('dotenv').config()


const config: Config = {
  PORT: process.env.PORT || 3000,
  DB_URI: process.env.MONGODB_URI || '',
  DB_NAME: process.env.MONGODB_NAME || ''
}

export = config