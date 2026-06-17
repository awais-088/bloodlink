const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const dotenv = require("dotenv");

const http = require("http");

const { Server } = require("socket.io");

dotenv.config();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// SOCKET CONNECTION

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("sendRequest", (data) => {
    io.emit("newRequest", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

app.use(cors());

app.use(express.json());

// ROUTES

const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes");

const requestRoutes = require("./routes/requestRoutes");

app.use("/api/auth", authRoutes);

app.use("/api/request", requestRoutes);
app.use("/api/donor", donorRoutes);

// DATABASE

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    server.listen(process.env.PORT || 5000, () => {
      console.log("Server Running on Port 5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
