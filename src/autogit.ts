// A tiny, self-contained demo that hits a free test endpoint
// and prints either the resulting JSON or an error message.

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts?_limit=3';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data: unknown = await response.json();

    // Narrow the type a bit for demonstration
    if (Array.isArray(data)) {
      console.log('Fetched posts:', data.map((p: any) => p.title));
    } else {
      console.log('Unexpected payload:', data);
    }
  } catch (err) {
    console.error('Fetch failed:', (err as Error).message);
  }
})();
