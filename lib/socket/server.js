import { Server } from "socket.io";

let io;

export default function initSocket(server) {
  if (!io) {
    io = new Server(server, {
      cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      socket.on("message", (data) => {
        console.log("Message received:", data);
        io.emit("message", data); // Broadcast to all clients
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  }
  return io;
}
