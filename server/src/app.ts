import express, { Application } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import router from './routes';

const app:Application = express();
app.disable('etag');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

app.use(express.static(join(__dirname, '..', 'public')));

app.use(router);

app.set('port', process.env.PORT || 3000);

export default app;
