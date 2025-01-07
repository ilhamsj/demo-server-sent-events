const http = require('http');

function sendEvent(res, event, data) {
  res.write(`event: ${event}\n`);
  res.write(`data: ${JSON.stringify(data)}\n\n`);
}

const server = http.createServer((req, res) => {

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  const interval = setInterval(() => {
    sendEvent(res, 'message', { message: 'Hello from the server' });
  }, 1000);

  req.on('close', () => {
    clearInterval(interval);
    console.info('Client disconnected');
  });
});

server.listen(3030, () => {
  console.info('SSE server started on http://localhost:3030');
});
