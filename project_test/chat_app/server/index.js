import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()
const port = 4000
const http = createServer(app)
app.use(cors())

const socketIO = new Server(http, {
  cors: {
    orgin: ['https://localhost:3000']
  }
})

let users = []

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected`)
  // nghe và log data từ client tới server
  // gửi tin nhắn tới tất cả user trên server
  socket.on('message', (data) => {
    console.log('message', data)
    socketIO.emit('messResponse', data)
  })

  // nghe và log khi user join vào server
  socket.on('newUser', (data) => {
    users.push(data)
    console.log('users_join', users)

    // gửi danh sách users tới client
    socketIO.emit('newUserResponse', users)
  })

  // xử lý typing
  socket.on('typing', (data) => {
    socket.broadcast.emit('typingResponse', data)
  })

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected')
    // cập nhật list user khi user disconnect server
    users = users.filter((user) => user.socketID !== socket.id)
    console.log('user_disconnect', users)
    // gửi danh sách users tới client
    socketIO.emit('newUserResponse', users)
    socket.disconnect()
  })
})

app.get('/', (req, res) => {
  res.json({
    mess: 'Hello World Express'
  })
})

http.listen(port, () => {
  console.log(`server listening on ${port}`)
})
