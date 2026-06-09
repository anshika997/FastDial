// node and express core imports
const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const { v1: uuidv1 } = require("uuid");
// third party packages
const cors = require("cors");
const helmet = require("helmet");

// local imports
const AppError = require("./utils/appError");
const userRouter = require("./router/userrouter");
const adminRouter = require("./router/adminRouter");
const vendorRouter = require("./router/vendorRouter");
const globalRouter = require("./router/handlerRouter");
const classAdminRouter = require("./router/classAdminRouter");
const classuserRouter = require("./router/classUsersRouter");
const globalErrorHandler = require("./controllers/errorController");

// Initialize the app
const app = express();

// setup necessary middlewares
app.use(cors());
//app.use(helmet());
app.use(express.json());
//app.use(express.static(process.cwd() + "/Frontend/build/"));

const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });
app.use(express.static(process.cwd() + "/GIASCHOOL/dist/"));

// routers

//GIA-FORMS
app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/vendors", vendorRouter);
app.use("/api/v1/global", globalRouter);

//GIA-SCHOOLS
app.use("/api/v1/classadmin", classAdminRouter);
app.use("/api/v1/classuser", classuserRouter);

const connectedRooms = new Map();
app.post("/api/rooms", (req, res) => {
  const roomId = uuidv1();
  connectedRooms.set(roomId, { participants: new Map(), created: Date.now() });

  console.log(`Room created: ${roomId}`);
  res.json({ roomId });
});
// app.get('/api/rooms/:roomId/participants', authenticateToken, (req, res) => {
app.get("/api/rooms/:roomId/participants", (req, res) => {
  const { roomId } = req.params;
  const room = connectedRooms.get(roomId);

  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }

  const participants = Array.from(room.participants.values()).map((p) => ({
    id: p.id,
    role: p.role,
  }));

  res.json({ participants });
});
app.get("/api/rooms/:roomId/messages", (req, res) => {
  const { roomId } = req.params;
  const room = connectedRooms.get(roomId);

  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }

  res.json({ messages: room.messages });
});
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join-room", ({ roomId, role }) => {
    try {
      let room = connectedRooms.get(roomId);

      if (!room && role === "host") {
        room = { participants: new Map(), created: Date.now() };
        connectedRooms.set(roomId, room);
        console.log(`Room created: ${roomId}`);
      } else if (!room) {
        throw new Error("Room not found");
      }

      // Add participant to room
      room.participants.set(socket.id, {
        id: socket.id,
        role,
        socket,
        isSharingScreen: false,
      });

      socket.join(roomId);

      // Notify others in the room
      socket.to(roomId).emit("user-joined", {
        userId: socket.id,
        role,
      });

      // Send current participants to the new user
      const participants = Array.from(room.participants.entries())
        .filter(([id]) => id !== socket.id)
        .map(([id, data]) => ({
          userId: id,
          role: data.role,
          isSharingScreen: data.isSharingScreen,
        }));

      socket.emit("room-joined", {
        roomId,
        participants,
      });

      console.log(`User ${socket.id} joined room ${roomId}`);
    } catch (error) {
      console.error(`Join room error: ${error.message}`);
      socket.emit("error", { message: error.message });
    }
  });

  socket.on("start-screen-share", ({ roomId }) => {
    const room = connectedRooms.get(roomId);
    if (!room) {
      return socket.emit("error", { message: "Room not found" });
    }

    const participant = room.participants.get(socket.id);
    if (!participant) {
      return socket.emit("error", { message: "User not in room" });
    }

    participant.isSharingScreen = true;
    io.to(roomId).emit("screen-share-started", { userId: socket.id });

    console.log(`User ${socket.id} started screen sharing in room ${roomId}`);
  });

  socket.on("stop-screen-share", ({ roomId }) => {
    const room = connectedRooms.get(roomId);
    if (!room) {
      return socket.emit("error", { message: "Room not found" });
    }

    const participant = room.participants.get(socket.id);
    if (!participant) {
      return socket.emit("error", { message: "User not in room" });
    }

    participant.isSharingScreen = false;
    io.to(roomId).emit("screen-share-stopped", { userId: socket.id });

    console.log(`User ${socket.id} stopped screen sharing in room ${roomId}`);
  });

  socket.on("signal", ({ to, signal }) => {
    try {
      io.to(to).emit("signal", {
        from: socket.id,
        signal,
      });
    } catch (error) {
      console.error(`Signal relay error: ${error.message}`);
      socket.emit("error", { message: "Failed to relay signal" });
    }
  });
  socket.on("send-message", ({ roomId, message }) => {
    const room = connectedRooms.get(roomId);
    if (!room) {
      return socket.emit("error", { message: "Room not found" });
    }

    const chatMessage = { userId: socket.id, message, timestamp: Date.now() };
    room.messages.push(chatMessage);

    io.to(roomId).emit("new-message", chatMessage);
  });

  socket.on("disconnecting", () => {
    try {
      for (const roomId of socket.connectedRooms) {
        if (roomId !== socket.id) {
          const room = connectedRooms.get(roomId);
          if (room) {
            room.participants.delete(socket.id);

            // Notify others in the room
            socket.to(roomId).emit("user-left", {
              userId: socket.id,
            });

            // Clean up empty connectedRooms
            if (room.participants.size === 0) {
              connectedRooms.delete(roomId);
              console.log(`Room ${roomId} deleted - no participants`);
            }
          }
        }
      }
    } catch (error) {
      console.error(`Disconnection error: ${error.message}`);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});


// health check route
app.get("/health", (req, res) => {
  res.send("API server up");
});

//Socket
app.use((req, res, next) => {
  req.io = io;
  next();
});
// app.set("socketio", io);

// handling not found route
// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// global error handler
app.use(globalErrorHandler);

/*
Extras

error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
*/

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

module.exports = httpServer;
