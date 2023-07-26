import express, { Express, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routers';
import { errorHandler } from './middlewares/errorHandler';
import { AppDataSource } from './config/typeorm';
import passport = require('passport');
import session = require('express-session');

AppDataSource.initialize().then(() => {
  console.log('Db connected')
}).catch((error) => {
  console.log('Unable to connect to database ', error)
});

const app: Express = express();
app.use(cors());
app.use(bodyParser.json());

// Google Auth and Facebook Auth
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRETEVENTS'
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(router);


/// catch 404 and forward to error handler
app.use((req, res, next:NextFunction) => {
  const err = new Error('Invalid API service');
  next(err);
});

app.use(errorHandler)

export default app;

