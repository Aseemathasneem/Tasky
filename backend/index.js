const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const http = require('http');
const { initializeSocket } = require('./socket'); 

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);

// Initialize Socket.io
initializeSocket(server); // Call your socket.io initialization function here

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => { 
  console.log(`Server running on port ${PORT}`);
});
