import { resolve } from 'path';
import app from './app';
import config from './config';

function start(): void {
  app.listen(config.port, () => {
    console.log(`Server listen on port ${config.port}`);
  });
}
start();
