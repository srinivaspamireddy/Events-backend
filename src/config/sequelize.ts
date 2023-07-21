import { Sequelize } from 'sequelize';
import 'dotenv/config';

if (process.env.DB_NAME === undefined) {
  throw new Error('Dbname cannot be undefined')
}
if (process.env.DB_USERNAME === undefined) {
  throw new Error('username cannot be undefined')
}
if (process.env.DB_PASSWORD === undefined) {
  throw new Error('password cannot be undefined')
}
if (process.env.DB_HOST === undefined) {
  throw new Error('db host cannot be undefined')
}
if (process.env.DB_POOL_MAX === undefined) {
  throw new Error('pool max cannot be undefined')
}
if (process.env.DB_POOL_MIN === undefined) {
  throw new Error('pool min Not be undefined')
}
if (process.env.DB_POOL_ACQUIRE === undefined) {
  throw new Error('Dbname Not be undefined')
}
if (process.env.DB_POOL_IDLE === undefined) {
  throw new Error('pool idle Not be undefined')
}
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  // operatorsAliases: {
  //   $gt: Op.gt
  // }
  pool: {
    max: parseInt(process.env.DB_POOL_MAX) || 5,
    min: parseInt(process.env.DB_POOL_MIN) || 0,
    acquire: parseInt(process.env.DB_POOL_ACQUIRE) || 30000,
    idle: parseInt(process.env.DB_POOL_IDLE) || 10000
  }
});

sequelize.authenticate()
  .then(() => {
    console.log("Connection established!!!");
  })
  .catch(() => {
    console.log("Unable to connect");
  });

export default sequelize;