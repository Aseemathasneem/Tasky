
const socketIO = require('socket.io');

let io;

const initializeSocket = (server) => {
  // Initialize Socket.io instance
  io = socketIO(server, {
    cors: {
      origin: "*", 
      methods: ["GET", "POST"],
    },
  });

  // Event handler for connection
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Example of real-time task updates
    socket.on('taskUpdated', (task) => {
      console.log(`Task updated: ${task._id}`);
      // Broadcast the update to all connected clients
      io.emit('taskUpdated', task);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

// Function to emit events globally from anywhere in the app
const emitTaskUpdate = (task) => {
  if (io) {
    io.emit('taskUpdated', task);
  }
};

module.exports = {
  initializeSocket,
  emitTaskUpdate,
};
