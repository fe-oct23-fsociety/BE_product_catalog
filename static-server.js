import http from 'http';
import fs from 'fs';
import url from 'url';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

  const fileName = req.url.slice(1) || 'index.html';
  console.log(fileName)
  fs.readFile(`./public/${fileName}`, (err, data) => {
    if (!err) {
      res.end(data)
    }

    res.statusCode = 404;
    res.end()
  })
})

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})