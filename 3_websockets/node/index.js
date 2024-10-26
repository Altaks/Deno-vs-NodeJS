import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    if (data.toString() === "ping") {
      ws.send("pong");
    }
  });

  ws.send('hello')
});