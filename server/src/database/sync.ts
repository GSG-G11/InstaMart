import database from './index';

const { NODE_ENV } = process.env;

const sync = () => database.sync({ force: true })
  .then(() => console.log('Database created successfully'))
  .catch(console.log);

if (NODE_ENV === 'dev') sync();

export default sync;
