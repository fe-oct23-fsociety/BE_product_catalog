import http from 'http';
import fs from 'fs';
import path from 'path';
const PORT = process.env.IMAGES_PORT ?? 3002;

export function createImagesServer (port: number): http.Server {
  const server = http.createServer((req, res) => {
    if (req.url == null) {
      res.statusCode = 400;
      res.end('Bad request!');

      return;
    }
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    let pathname = parsedUrl.pathname;
    pathname = pathname === '/' ? '/index.html' : pathname;
    const safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '');
    const fullPath = path.join(__dirname, 'public', safePath);

    const ext = path.extname(fullPath);
    let contentType = 'text/html';
    switch (ext) {
      case '.js':
        contentType = 'text/javascript';
        break;
      case '.css':
        contentType = 'text/css';
        break;
      case '.json':
        contentType = 'application/json';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg':
        contentType = 'image/jpg';
        break;
    }

    fs.readFile(fullPath, (err, data) => {
      if (err !== null) {
        res.statusCode = 404;
        res.end('404: File Not Found');
      } else {
        res.setHeader('Content-Type', contentType);
        res.end(data);
      }
    });
  });

  server.listen(PORT, () => {
    console.log(`Images Static Server is running on http://localhost:${port}`);
  });

  return server;
}
