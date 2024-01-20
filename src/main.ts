'use strict';

// try this one :)

const PORT = 3001;

import express from 'express';
import cors from 'cors';

function createServer () {
  const app = express();

  app.use(cors());
  app.use(express.json());
 
  return app;
}

createServer().listen(PORT, () => {
  console.log(`Server is listening PORT ${PORT}`);
})