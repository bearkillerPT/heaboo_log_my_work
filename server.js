const express = require('express');
const { Server } = require('ws');
const path = require('path')
const PORT = process.env.PORT || 8080;
const APPINDEX = './web-build/index.html';
const server = express()
  .use(express.static('./web-build'))
  .get('/', (req, res) => res.sendFile(APPINDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);