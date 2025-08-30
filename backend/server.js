import app from "./app.js";
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config();

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// socket.io setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // frontend ka url
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("✅ Socket connected:", socket.id);

  socket.on("joinAsDoctor", (doctorId) => {
    socket.join(`doctor-${doctorId}`);
    console.log(`👨‍⚕️ Doctor ${doctorId} joined room doctor-${doctorId}`);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

export const notifyDoctor = (doctorId, data) => {
  io.to(`doctor-${doctorId}`).emit("newAppointment", data);
};
