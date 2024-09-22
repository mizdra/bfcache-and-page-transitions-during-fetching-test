import { readFile } from 'fs/promises';
import http from 'http';
import { setTimeout } from 'timers/promises';

const server = http.createServer(async (req, res) => {
  // handle /api/slow-response
  if (req.url === '/api/slow-response') {
    await setTimeout(3000);
    res.end('The response of /api/slow-response');
    return;
  }
  // handle /1-fetch.html
  if (req.url === '/1-fetch.html') {
    const html = await readFile('./1-fetch.html', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }
  // handle /2-video.html
  if (req.url === '/2-video.html') {
    const html = await readFile('./2-video.html', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }
  // handle /flower.webm
  if (req.url === '/flower.webm') {
    const video = await readFile('./flower.webm');
    res.writeHead(200, { 'Content-Type': 'video/webm' });
    res.end(video);
    return;
  }
})
server.listen(3000);
