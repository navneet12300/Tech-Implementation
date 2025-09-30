# Real-Time App with Socket.IO (Day 1 of 18 Days of Tech)

This project demonstrates a **simple real-time application** using **Socket.IO** with:

- **React.js** on the client
- **Express.js** on the server
- Real-time updates (voting example: Books vs Reels)

> **Note:** This is **not a giant or production-ready project**. It was created purely to **explore Socket.IO and understand how real-time updates work**.  

> The goal is to experiment with concepts like **persistent connections, event-based messaging, and real-time broadcasting** without worrying about full-scale architecture, authentication, or advanced features. Think of it as a **learning playground** for Socket.IO.

It serves as a **practical example of Socket.IO implementation**, showing how connections, events, and updates work in real time.


## Project Structure

Socket.io/
│
├─ Server
│ ├─ index.js 
│ └─ package.json
│
├─ my-app/ # React frontend
│ ├─ src/
│ │ ├─ App.jsx # Socket connection and event handling
│ │ └─ main.jsx
│ └─ package.json
│
└─ README.md

## How It Works

### **1. Server Setup**

- Express server runs on `http://localhost:5000`
- Socket.IO instance attached:

```js
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);
  
  // Custom events
  socket.on("send_update", () => {
    io.emit("Vote Update", votes);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});
```

2. Client Setup

Connect to server:

```js
const socket = io("http://localhost:5000");
```

Listen for server events:

```js
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);
  
  // Custom events
  socket.on("send_update", () => {
    io.emit("Vote Update", votes);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});
```

Emit custom events to the server:

```js
socket.emit("send_update");
```

3. Event Flow

- Client connects → triggers connection event on server

- Client emits send_update → server receives via socket.on

- Server broadcasts update → io.emit("Vote Update")

- All connected clients receive update instantly → UI updates

Key Points:

- Each client gets a unique socket.id

- io.emit sends data to all clients

- Persistent connection eliminates the need for polling

- Real-time updates appear instantly across all connected clients

4. Real-Time Concepts Demonstrated

- Bi-directional communication: server ↔ client

- Event-based messaging: .emit() and .on() for custom events

- Automatic updates: UI changes as soon as server emits events

- Persistent connections: one connection handles multiple messages without reconnection

## Installation

Clone the repo:

```bash
git clone <your-repo-URL>
```

Install dependencies for server:

```bash
cd Server
npm install
```

Install dependencies for client:

```bash
cd ../my-app
npm install
```

Run server:

```bash
cd ../Server
node index.js
```

Run React app:

```bash
cd ../my-app
npm start
```

Open multiple tabs to see real-time updates in action.

## Features
- Real-time updates using Socket.IO
- Bi-directional communication between client and server
- Event-based messaging system
- Persistent connections for multiple messages

## Usage/Examples

To see the application in action, follow these steps:
1. Ensure the server is running.
2. Open your browser and navigate to `http://localhost:3000`.
3. Open multiple tabs to see real-time voting updates.

Example of emitting an update:
```js
socket.emit('send_update');
```

## Tech Stack

Node.js + Express.js (Backend)

React.js (Frontend)

Socket.IO (Real-time communication)

## Author: Navneet Mahajan
