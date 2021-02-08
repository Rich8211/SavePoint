const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");
const http = require("http");
const socketio = require("socket.io")

require("dotenv").config();



const app = express();

const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 4000;


app.use(express.json());
app.use(cors());



app.use('/public', express.static('public'));

app.use("/users", require("./routes/usersNew"));
app.use("/events", require("./routes/eventsNew"));

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on("connection", (socket) => {
  
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});


server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});