/* eslint-disable no-console */
import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import app from './app';

const port: Number = app.get('port');
const httpServer = new HttpServer(app);

httpServer.listen(port, () => {
  console.log(`server is running on http://localhost:${port}/api/v1`);
});

const socketServer = new Server(httpServer, { cors: { origin: '*' } });
app.set('socketio', socketServer);
