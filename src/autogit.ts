// random.ts – a tiny demo that hits a free, open endpoint
// Run: npx ts-node random.ts

(async () => {
  try {
    // 1. Grab a random fact about cats
    const res = await fetch('https://catfact.ninja/fact');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { fact } = (await res.json()) as { fact: string };

    // 2. Log it with a timestamp
    console.log(`[${new Date().toISOString()}] Random cat fact: ${fact}`);
  } catch (err) {
    console.error('Fetch blew up:', err);
  }
})();
