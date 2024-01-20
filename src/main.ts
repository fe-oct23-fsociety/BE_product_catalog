'use strict';

import express, { Express } from 'express';
import cors from 'cors';

const PORT = 3001;

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  return app;
}

createServer().listen(PORT, () => {
  console.log(`Server is listening PORT ${PORT}`);
});
