const { default: axios } = require('axios');

const sseUrl = 'http://localhost:3030';

async function startCustomSSE() {
  try {
    const response = await axios.get(sseUrl, { responseType: 'stream' });
    const stream = response.data;

    stream.on('data', (chunk) => {
      const result = chunk.toString();
      console.info(result);
    });

    stream.on('end', () => {
      console.info('Custom SSE end');
    });

    stream.on('error', (error) => {
      console.error('Custom SSE error:', error);
    });

    stream.on('close', async () => {
      console.info('Custom SSE close');
      await startCustomSSE();
    });
  } catch (error) {
    console.error('Custom SSE error catch:', error);
  }
}

startCustomSSE();
