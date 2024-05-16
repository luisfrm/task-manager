import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRouter from './routes/auth.routes.js';
import taskRouter from './routes/tasks.routes.js';
import cookieParser from 'cookie-parser';

const createApp = () => {
  const PORT = process.env.PORT || 4506;

  const app = express();
  app.disable('x-powered-by');
  app.use(json());
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));
  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use('/api', authRouter);
  app.use('/api', taskRouter);

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default createApp;