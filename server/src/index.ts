/* eslint-disable no-console */
import app from './app';

const port:Number = app.get('port');

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}/api/v1`);
});
