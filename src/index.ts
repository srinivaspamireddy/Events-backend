import http from 'http';
import app from './app';
import 'dotenv/config';

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});

