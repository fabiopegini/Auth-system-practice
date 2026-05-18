const app = require('./app')
const config = require('./config/config')

app.listen(config.port, () => {
  console.log(`Server runs on http://localhost:${config.port}`)
})