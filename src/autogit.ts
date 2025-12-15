// random-user.ts
// A tiny CLI that fetches a random user from https://randomuser.me
// Usage: npx ts-node random-user.ts

import fetch from 'node-fetch';

interface RandomUserResponse {
  results: Array<{
    name: { first: string; last: string };
    email: string;
    picture: { large: string };
    location: {
      country: string;
      city: string;
      coordinates: { latitude: string; longitude: string };
    };
  }>;
}

async function getRandomUser(): Promise<void> {
  try {
    const res = await fetch('https://randomuser.me/api/');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as RandomUserResponse;

    const [user] = data.results;
    console.log(`👤  ${user.name.first} ${user.name.last}`);
    console.log(`📧  ${user.email}`);
    console.log(`🌍  ${user.location.city}, ${user.location.country}`);
    console.log(`📍  ${user.location.coordinates.latitude},${user.location.coordinates.longitude}`);
    console.log(`🖼  ${user.picture.large}`);
  } catch (err) {
    console.error('Could not fetch random user:', (err as Error).message);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  getRandomUser();
}

export { getRandomUser };
