import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function start(): Promise<void> {
  await mongoose.connect('mongodb://127.0.0.1:27017/hrc-hw4');

  app.listen(config.port, () => {
    console.log(`Server listen on port ${config.port}`);
  });
}
start();
