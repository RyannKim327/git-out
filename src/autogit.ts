// randomUser.ts
// A self-contained example that fetches a random user from https://randomuser.me
// and prints a tiny “business-card” to the console.

// 1. Install the only dependency:
//    npm install node-fetch
// 2. Run with ts-node (or compile with tsc):
//    npx ts-node randomUser.ts

import fetch from 'node-fetch';

// ------------------------------------------------------------------
// Types returned by the API (only the bits we care about)
// ------------------------------------------------------------------
interface RandomUserResponse {
  results: Array<{
    name: { first: string; last: string };
    email: string;
    phone: string;
    picture: { large: string };
    location: {
      city: string;
      country: string;
    };
  }>;
}

// ------------------------------------------------------------------
// Helper: fetch a single random user
// ------------------------------------------------------------------
async function getRandomUser(): Promise<RandomUserResponse['results'][0]> {
  const res = await fetch('https://randomuser.me/api/');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = (await res.json()) as RandomUserResponse;
  return data.results[0];
}

// ------------------------------------------------------------------
// Pretty printer
// ------------------------------------------------------------------
function printCard(user: RandomUserResponse['results'][0]): void {
  const { name, email, phone, picture, location } = user;
  const fullName = `${name.first} ${name.last}`;
  console.log('');
  console.log(`┌${'─'.repeat(38)}┐`);
  console.log(`│ ${fullName.padEnd(36)} │`);
  console.log(`│ ${email.padEnd(36)} │`);
  console.log(`│ ${phone.padEnd(36)} │`);
  console.log(`│ ${location.city}, ${location.country.padEnd(22)} │`);
  console.log(`└${'─'.repeat(38)}┘`);
  console.log(picture.large);
  console.log('');
}

// ------------------------------------------------------------------
// Main
// ------------------------------------------------------------------
(async () => {
  try {
    const user = await getRandomUser();
    printCard(user);
  } catch (err) {
    console.error('Could not fetch random user:', (err as Error).message);
  }
})();
