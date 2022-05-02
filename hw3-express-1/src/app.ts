import express from 'express';
import { engine } from 'express-handlebars';

import { errorHandler } from './middlewares/error-handler.middleware';
import apiRoute from './routes';
import viewRoute from './routes/view.route'
import config from './config';

const app = express();

app.engine('hbs', engine(config.handlebars));
app.set('view engine', 'hbs');
app.set('views', 'views/');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public/'));

app.use('/api', apiRoute.createRouter());
app.use('/', viewRoute.createRouter());

app.use(errorHandler);

export default app;
