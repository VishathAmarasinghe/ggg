import { WebSocketServer } from 'ws';

let wss;

export const createWebSocketServer = (server) => {
  wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => {
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
