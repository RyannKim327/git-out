// A tiny utility that fetches a random fact about cats
// and prints it to the console.

type CatFact = {
  fact: string;
  length: number;
};

async function getRandomCatFact(): Promise<CatFact | null> {
  try {
    const res = await fetch("https://catfact.ninja/fact");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: CatFact = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch cat fact:", err);
    return null;
  }
}

// Immediately-invoked function expression (IIFE) so the file runs standalone
(async () => {
  const fact = await getRandomCatFact();
  if (fact) {
    console.log(`🐱  Random cat fact: ${fact.fact}`);
  }
})();
