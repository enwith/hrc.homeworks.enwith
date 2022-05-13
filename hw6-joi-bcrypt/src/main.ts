import mongoose from 'mongoose';

import app from './app';
import config from './config';

async function start(): Promise<void> {
  await mongoose.connect(config.mongodbUrl);

  app.listen(config.port, () => {
    console.log(`Server listen on port ${config.port}`);
  });
}
start();
