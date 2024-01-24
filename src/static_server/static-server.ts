import http from 'http';
import fs from 'fs';
import url from 'url';

const PORT = process.env.PORT ?? 3000;

export function createImagesServer (port: number): http.Server {
  const server = http.createServer((req, res) => {
    if (req.url == null) {
      res.statusCode = 400;
      res.end('Bad request!');

      return;
    }

    const normalizedURL = new url.URL(req.url, `http:${req.headers.host}`);
    const formattedURL = normalizedURL.pathname.slice(1) ?? 'index.html';

    fs.readFile(`./public/${formattedURL}`, (err, data) => {
      if (err !== null) {
        res.statusCode = 404;
        res.end('404: File Not Found');
      } else {
        res.end(data);
      }
    });
  });

  server.listen(PORT, () => {
    console.log(`Images Static Server is running on ${PORT}`);
  });

  return server;
}
