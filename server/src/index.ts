/* eslint-disable no-console */
import app from './app';
import database from './database';

const port:Number = app.get('port');

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

database.sync({ force: true })
  .then(() => console.log('Database created successfully'))
  .catch(console.log);
