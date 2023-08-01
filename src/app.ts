import express, { Express, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routers';
import { errorHandler } from './middlewares/errorHandler';
import { AppDataSource } from './config/typeorm';
import main from './scraping';

AppDataSource.initialize().then(() => {
  console.log('Db connected')
}).catch((error) => {
  console.log('Unable to connect to database ', error)
});
main();
const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
app.use(router);

/// catch 404 and forward to error handler
app.use((req, res, next: NextFunction) => {
  const err = new Error('Invalid API service');
  next(err);
});

app.use(errorHandler)

export default app;

