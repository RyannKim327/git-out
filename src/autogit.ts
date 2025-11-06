// random.ts – fetches a random “useless fact” every 3 seconds
// Run: npx ts-node random.ts

type UselessFact = {
  id: string;
  text: string;
  source: string;
  source_url: string;
};

const ENDPOINT = 'https://uselessfacts.jsph.pl/api/v2/facts/random';

async function fetchRandomFact(): Promise<UselessFact | null> {
  try {
    const res = await fetch(ENDPOINT, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as UselessFact;
  } catch (err) {
    console.error('Failed to fetch fact:', (err as Error).message);
    return null;
  }
}

function main(): void {
  setInterval(async () => {
    const fact = await fetchRandomFact();
    if (fact) console.log(`💡 ${fact.text}`);
  }, 3_000);
}

main();
