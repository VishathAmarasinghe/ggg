import WebSocket, { WebSocketServer } from 'ws';

let wss;

export const createWebSocketServer = (server) => {
  wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log('Client connected');

    // Send a welcome message to the client
    ws.send(JSON.stringify({ message: 'Welcome to the WebSocket server' }));

    // Handle incoming messages
    ws.on('message', (message) => {
      console.log('Received message:', message);
    });

    // Implement keep-alive mechanism
    const interval = setInterval(() => {
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify({ message: 'keep-alive' }));
      }
    }, 30000); // Send a keep-alive message every 30 seconds

    ws.on('close', () => {
      clearInterval(interval);
      console.log('Client disconnected');
    });
  });
}

export const broadcastData = (data) => {
  if (wss) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }
}
