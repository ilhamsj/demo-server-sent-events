const {EventSource} = require('eventsource')

const sseUrl = 'http://localhost:3030';

const eventSource = new EventSource(sseUrl);

eventSource.onmessage = (event) => {
    const result = JSON.parse(event.data);
    console.info(result);
};

eventSource.addEventListener('custom-event', (event) => {
    console.info('Custom event received:', event.data);
});

eventSource.onerror = (err) => {
    console.error('SSE connection error:', err);
};
