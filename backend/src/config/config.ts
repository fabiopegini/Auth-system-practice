interface Config {
  port: string | number
}

const config: Config = {
  port: process.env.PORT || 3000
}

module.exports = config