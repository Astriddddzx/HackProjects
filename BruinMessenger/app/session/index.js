const session = require('express-session')
const config = require('../config')

  module.exports = session({
    secret: config.sessionSecret,
    resave: false,
    // creates session cookie even if session has no data
    saveUninitialized: true
  })
