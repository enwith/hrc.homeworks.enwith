import express from 'express';

import { URL_MOUNT } from './constants';
import { errorHandler } from './middlewares';
import appRoute from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(URL_MOUNT, appRoute.createRouter());

app.use(errorHandler);

export default app;
