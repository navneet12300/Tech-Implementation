const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Setup Socket.IO with CORS - allow your frontend
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for testing
    methods: ["GET", "POST"]
  }
});

// Vote storage
let votes = { books: 0, reels: 0 };

// Basic health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    status: "ok", 
    votes,
    total: votes.books + votes.reels 
  });
});

// Socket.IO event handlers
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Send current votes when client requests
  socket.on("request_initial_data", () => {
    console.log("Sending initial data to:", socket.id);
    socket.emit("vote_update", votes);
  });

  // Handle incoming votes
  socket.on("cast_vote", (choice) => {
    console.log("Received vote:", choice, "from:", socket.id);
    if (votes.hasOwnProperty(choice)) {
      votes[choice]++;
      console.log("Current votes:", votes);
      
      // Broadcast update to all clients
      io.emit("vote_update", votes);
    } else {
      console.log("❌ Invalid vote choice:", choice);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});