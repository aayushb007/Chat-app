// server.test.js

const { Server } = require("socket.io");
const Client = require("socket.io-client");
const http = require('http');
const express = require('express');

describe('Socket.IO server', () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const app = express();
    const server = http.createServer(app);
    io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    // On socket connection
    io.on('connection', (socket) => {
      serverSocket = socket;
      console.log('a user connected');
      
      // On socket message event
      socket.on('message', (msg) => {
        console.log('message : ' + msg);
        io.emit('message', msg);
      });

      // On socket disconnection
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });

    server.listen(() => {
      const port = server.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test('should communicate', (done) => {
    //
    clientSocket.once('message', (msg) => {
      expect(msg).toBe('hello');
      done();
    });
    serverSocket.emit('message', 'hello');
  });

  test('should communicate back and forth', (done) => {
    // Testing Communication  back and forth
    clientSocket.once('message', (msg) => {
      expect(msg).toBe('hello server');
      done();
    });

    clientSocket.emit('message', 'hello server');
  });

  test('should handle disconnection', (done) => {
    //Testing Disconnection
    clientSocket.once('disconnect', () => {
      console.log('Client disconnected');
      done();
    });
    clientSocket.close();
  });
});
