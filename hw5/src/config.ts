import { config } from 'dotenv';

config();
export default {
  port: process.env.PORT || 3000,
  mongodbUrl: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/hrc-hw4',
};
