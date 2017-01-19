
// Create an IO Server instance

let ioServer = app => {
  app.locals.chatrooms = []
  // bind express app to http server
  const server = require('http').Server(app)
  // bind server to socket.io
  const io = require('socket.io')(server)
  // socket.io middleware to get session data
  io.use((socket, next) => {
    // middleware invocation (req, res , next)
    // response object is empty since we aren't writing anything back
    require('./session')(socket.request, {}, next)
  })
  require('./socket')(io, app)
  return server
}

module.exports = {
  router: require('./routes')(),
  session: require('./session'),
  ioServer
}
