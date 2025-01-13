const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { createServer } = require('http');
const { Server } = require('socket.io');
const CallManager = require('./callManager');
const routes = require('./routes/index');
// Pass Socket.IO instance to routes



dotenv.config();
const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
      origin: "*", // Vite's default port
      methods: ["GET", "POST", "DELETE"],
      credentials: true,
      allowedHeaders: ['Content-Type'],
    }
  });

// Middleware
app.use(express.json());
app.set('socketio', io);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Initialize CallManager
const callManager = new CallManager();
if(callManager) console.log("true");
// Socket.io handling
require('./socket')(io, callManager);
console.log("inside src index")
// Routes
app.use('/api', routes(callManager));

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});