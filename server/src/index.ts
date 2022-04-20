import app from './app';

const port:Number = app.get('port');

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server is running on http://localhost:${port}`);
});
