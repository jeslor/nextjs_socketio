import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer,{
    cors: {
      origin: ["http://localhost:3000"],
    },
  });

  const connectedUsersMap = {}; //save{userId:socketId}

  io.on("connection", (socket) => {
    console.log(`> Socket connected: ${socket.id}`);
    const userId = socket.handshake.query.userId;
    console.log(`> User connected: ${userId}`);
    connectedUsersMap[userId] = socket.id;
    console.log(connectedUsersMap);
    
    io.emit("connectedUsers", Object.keys(connectedUsersMap));
    users[userId] = socket.id;
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