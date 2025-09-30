import { useState, useEffect } from "react";
import { io } from "socket.io-client";

function App() {
  const [votes, setVotes] = useState({ books: 0, reels: 0 });
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Connect to backend server
    const socket = io("http://localhost:5000");

    // Connection event handlers
    socket.on("connect", () => {
      console.log("✅ Connected to server");
      setConnected(true);
      // Request initial data after connection
      socket.emit("request_initial_data");
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from server");
      setConnected(false);
    });

    // Listen for vote updates from server
    socket.on("vote_update", (updatedVotes) => {
      console.log("📊 Received vote update:", updatedVotes);
      setVotes(updatedVotes);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Send vote to server
  const handleVote = (choice) => {
    console.log("🗳️ Voting for:", choice);
    const socket = io("http://localhost:5000");
    socket.emit("cast_vote", choice);
  };

  const total = votes.books + votes.reels;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">Live Voting Demo</h1>
          <p className="text-gray-400 text-lg mb-4">Socket.IO real-time updates</p>
          
          {/* Connection status */}
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${connected ? 'bg-green-600' : 'bg-red-600'}`}>
            {connected ? '🟢 Connected' : '🔴 Disconnected'}
          </span>
        </div>

        {/* Vote buttons */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <button
            onClick={() => handleVote("books")}
            className="px-6 py-8 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-lg transition-all hover:scale-105"
          >
            <div className="text-4xl mb-2">📚</div>
            Books
          </button>
          <button
            onClick={() => handleVote("reels")}
            className="px-6 py-8 bg-pink-600 hover:bg-pink-700 rounded-xl font-semibold text-lg transition-all hover:scale-105"
          >
            <div className="text-4xl mb-2">🎥</div>
            Reels
          </button>
        </div>

        {/* Results */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Results</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg">📚 Books</span>
              <span className="text-2xl font-mono font-bold text-blue-400">{votes.books}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg">🎥 Reels</span>
              <span className="text-2xl font-mono font-bold text-pink-400">{votes.reels}</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t-2 border-gray-700">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-mono font-bold">{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;