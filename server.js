import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();
console.log("process.env.PORT", process.env.PORT);


const dev = process.env.NODE_ENV !== "production";
const hostname = "next-chat-app-5npg.onrender.com";
const port = process.env.PORT || 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();


app.prepare().then(() => {

  const httpServer = createServer(handler);

   const io = new Server(httpServer,{
    cors: {
      origin: ["*"],
    },
  });

  const connectedUsersMap = {};
  


  io.on("connection", (socket) => {
    console.log(`> Socket connected: ${socket.id}`);
    const {userId} = socket.handshake.query;
    connectedUsersMap[userId] = socket.id;
    io.emit("connectedUsers", Object.keys(connectedUsersMap));

    socket.on('newMessage', (data) => {
      const {receiver} = data;
      const receiverSocketId = connectedUsersMap[receiver._id];
      io.to(receiverSocketId).emit('newMessage', data);
     });

    socket.on("disconnect", () => {
      console.log(`> Socket disconnected: ${socket.id}`);
      delete connectedUsersMap[userId];
      io.emit("connectedUsers", Object.keys(connectedUsersMap));
    });
    
  });

 

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
