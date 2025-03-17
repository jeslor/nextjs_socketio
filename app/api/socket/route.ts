import { NextResponse } from "next/server";
import { Server } from "socket.io";

let global:any = globalThis;
let io:any;

export async function GET(req:any) {
  if (!global.io) {
    console.log("Starting WebSocket Server...");

    io = new Server(3001, {
      cors: { origin: "*" }, // Allow frontend connections
    });

    io.on("connection", (socket:any) => {
      console.log("User connected:", socket.id);

      socket.on("newMessage", (message:any) => {
        console.log("New message received:", message);
        io.emit("newMessage", message); // Broadcast to all clients
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });

    global.io = io;
  }

  return NextResponse.json({ message: "WebSocket Server Running" });
}