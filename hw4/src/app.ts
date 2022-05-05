import express from 'express';

import { errorHandler } from './middlewares';
import route from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', route.createRouter());

app.use(errorHandler);

export default app;
