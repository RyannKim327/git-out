// A tiny utility that fetches a random fact about cats and barks it out
(async () => {
  const CAT_FACT_API = 'https://catfact.ninja/fact';

  type CatFact = { fact: string; length: number };

  const fetchRandomCatFact = async (): Promise<CatFact> => {
    const res = await fetch(CAT_FACT_API);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  };

  try {
    const { fact } = await fetchRandomCatFact();
    console.log(`🐱  Random cat fact: ${fact}`);
  } catch (err) {
    console.error('Something went wrong:', (err as Error).message);
  }
})();
