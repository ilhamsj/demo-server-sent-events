import http from 'http';

// Function to send events to the client
function sendEvent(res, event, data) {
  res.write(`event: ${event}\n`);
  res.write(`data: ${JSON.stringify(data)}\n\n`);
}

// Create HTTP server
const server = http.createServer((req, res) => {
  // Header to indicate that SSE events are being sent
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  // Send an event every 5 seconds
  const interval = setInterval(() => {
    sendEvent(res, 'message', { message: 'Hello from the server' });
  }, 1000);

  sendEvent(res, 'end', { message: 'End from the server' });

  // Handle client connection close
  req.on('close', () => {
    clearInterval(interval);
    console.info('Client disconnected');
  });
});

const port = 3030;
server.listen(port, () => {
  console.info(`SSE server started on http://localhost:${port}`);
});
