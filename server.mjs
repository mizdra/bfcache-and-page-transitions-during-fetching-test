import { readFile } from 'fs/promises';
import http from 'http';
import { setTimeout } from 'timers/promises';

const server = http.createServer(async (req, res) => {
  // handle /api//slow-response
  if (req.url === '/api/slow-response') {
    await setTimeout(3000);
    res.end('The response of /api/slow-response');
    return;
  }
  // handle /1-basic.html
  if (req.url === '/1-basic.html') {
    const html = await readFile('./1-basic.html', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }
})
server.listen(3000);
