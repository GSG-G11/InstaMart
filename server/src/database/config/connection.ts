import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const {
  NODE_ENV, DEV_DB_URL, TEST_DB_URL, DATABASE_URL,
} = process.env;
let connectionString:string | undefined = '';
let ssl:boolean | object = false;

switch (NODE_ENV) {
  case 'dev':
    connectionString = DEV_DB_URL;
    break;
  case 'test':
    connectionString = TEST_DB_URL;
    break;
  default:
    connectionString = DATABASE_URL;
    ssl = {
      rejectUnauthorized: false,
    };
}

if (!connectionString) throw new Error('no db url, check .env file for valid keys');

const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  dialectOptions: { ssl },
  logging: false,
  define: {
    timestamps: false,
  },
});

export default sequelize;
