import { createServer } from 'node:http';
const hostname = '127.0.0.1';
const port = 3000;
const server = createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  if (url === '/' && method === 'GET') {
    res.write('<div class="test">MAIN PAGE</div>');
  }
  if (url === '/contacts' && method === 'GET') {
    res.write('<div class="test">CONTACTS PAGE</div>');
  }
  if (url === '/' && method === 'POST') {
    res.write('<div class="test">PAGE POST</div>');
  }
  res.end();
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

