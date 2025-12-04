// A tiny, self-contained demo that hits a free test API and prints the result.
// Run with: npx ts-node randomFetch.ts

(async () => {
  try {
    // 1. Pick a random user id between 1 and 10
    const randomId = Math.floor(Math.random() * 10) + 1;

    // 2. Fire off the request
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${randomId}`);

    // 3. Guard against non-OK status codes
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

    // 4. Parse JSON and narrow the shape a bit
    const user: { id: number; name: string; email: string } = await res.json();

    // 5. Do something with the data
    console.log(`Random user #${user.id}: ${user.name} <${user.email}>`);
  } catch (err) {
    console.error('Something went wrong:', (err as Error).message);
  }
})();
