const crypto = require('crypto')

// Middleware that checks if user is authenticated
let isAuthenticated = (req, res, next) => {
  console.log(req.session)
  if (req.session.isAuthenticated) {
    next()
  } else {
    res.redirect('/')
  }
}

// Find a chatroom by a given name
let findRoomByName = (allrooms, room) => {
  let findRoom = allrooms.findIndex((element, index, array) => element.room === room)
  return findRoom > -1
}

// Generate a unique roomID
let randomHex = () => crypto.randomBytes(24).toString('hex')

// Find a chatroom with a given ID
let findRoomById = (allrooms, roomID) => {
  return allrooms.find((element, index, array) => element.roomID === roomID)
}

// add a user to a chatroom
let addUserToRoom = (allrooms, data, socket) => {
  // Get the room object
  let getRoom = findRoomById(allrooms, data.roomID)
  if (getRoom !== undefined) {
    // Get the active user's ID (ObjectID)
    let userID = socket.request.session.user.profileId
    console.log("USER ID", userID)
    // Check to see if this user already exists in the chatroom
    let checkUser = getRoom.users.findIndex((element, index, array) => element.userID === userID)

    // If the user is already in the room, remove him first
    if (checkUser > -1) {
      getRoom.users.splice(checkUser, 1)
    }

    // Push the user into the room's users array
    getRoom.users.push({
      socketID: socket.id,
      userID,
      user: data.user,
      userPic: data.userPic
    })

    // Join the room channel
    socket.join(data.roomID)

    // Return updated room object
    return getRoom
  }
}

let removeUserFromRoom = (allrooms, socket) => {
  for (let room of allrooms) {
    // Find the user
    let findUser = room.users.findIndex((element, index, array) => element.socketID === socket.id)

    if (findUser > -1) {
      socket.leave(room.roomID)
      room.users.splice(findUser, 1)
      return room
    }
  }
}


module.exports = {
  isAuthenticated,
  findRoomByName,
  findRoomById,
  addUserToRoom,
  removeUserFromRoom,
  randomHex
}
