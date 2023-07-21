import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routers';
import { errorHandler } from './middlewares/errorHandler';
import sequelize from './config/sequelize';

const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
app.use(router);
sequelize.sync();
/// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Invalid API service');
  next(err);
});

app.use(errorHandler)

export default app;

