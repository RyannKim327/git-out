// src/utils/insultFetcher.ts
import axios, { AxiosError } from 'axios';

interface InsultResponse {
  number: string;
  language: string;
  insult: string;
  created: string;
  shown: string;
  createdby: string;
  active: string;
  comment: string;
}

/**
 * Fetches a random (mild) insult from a free API.
 */
export async function getRandomInsult(): Promise<string> {
  try {
    const { data } = await axios.get<InsultResponse>(
      'https://evilinsult.com/generate_insult.php?lang=en&type=json'
    );
    return data.insult;
  } catch (err) {
    const message = (err as AxiosError)?.message ?? 'Unknown error';
    console.error('Could not retrieve insult:', message);
    return 'You are absolutely wonderful (fallback because the insult API failed).';
  }
}

/* ------------------------------------------------------------------ */
/* ------------------------------ DEMO ------------------------------ */
/* ------------------------------------------------------------------ */
if (require.main === module) {
  (async () => {
    const insult = await getRandomInsult();
    console.log(`Insult: ${insult}`);
  })();
}
