import express, { Application } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import dotenv from 'dotenv';
import router from './routes';
import { serveRoot } from './controllers';

dotenv.config();

const app:Application = express();
app.disable('etag');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(compression());

app.use('/api/v1/', router);

const { NODE_ENV } = process.env;
if (NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '..', '..', 'client', 'build')));
  app.get('*', serveRoot);
}

app.set('port', process.env.PORT || 3001);

export default app;
