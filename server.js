const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const eventRoutes = require("./routes/eventRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

connectDB();

app.use(express.json());

const broadcastLog = (log) => {
  io.emit("new_log", log);
};

app.locals.broadcastLog = broadcastLog;

app.use("/logs", eventRoutes);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use(express.static("public"));

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));