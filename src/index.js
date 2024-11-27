import 'dotenv/config';
import createApp from './app.js';
import { connectDB } from './models/db.js';

connectDB().then(() => {
  createApp();
}).catch((error) => {
  console.log('Error connecting to DB: ', error);
});