import express from 'express';
import Routing from './routes/index';

const app = express();
const port = 1245;
const host = '127.0.0.1';

Routing(app);

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});

export default app;
