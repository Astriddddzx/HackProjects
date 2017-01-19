if (process.env.NODE_ENV === 'production') {
  // Use producton environment variables
  module.exports = {
    host: '',
    sessionSecret: process.env.sessionSecret
  }
} else {
  // Use dev settings
  module.exports = require('./development.json')
}
