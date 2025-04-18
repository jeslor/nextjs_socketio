import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const hostname =
  process.env.NODE_ENV !== "production"
    ? "localhost"
    : "next-chat-app-5npg.onrender.com";
const port = dev ? 3000 : process.env.PORT;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    cors: {
      origin: [
        "http://localhost:3000",
        "https://next-chat-app-5npg.onrender.com",
      ],
      methods: ["GET", "POST"],
    },
  });

  const connectedUsersMap = {};

  io.on("connection", (socket) => {
    const { userId } = socket.handshake.query;
    connectedUsersMap[userId] = socket.id;
    io.emit("connectedUsers", Object.keys(connectedUsersMap));

    socket.on("newMessage", (data) => {
      "kept-alive";

      const { receiver } = data;
      const receiverSocketId = connectedUsersMap[receiver._id];
      io.to(receiverSocketId).emit("newMessage", data);
    });

    socket.on("disconnect", () => {
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
