// random-user-fetch.ts
// Fetches a random user from https://randomuser.me and prints a friendly greeting

(async () => {
  interface RandomUserResponse {
    results: Array<{
      name: { first: string; last: string };
      location: { country: string };
    }>;
  }

  try {
    const res = await fetch('https://randomuser.me/api/');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: RandomUserResponse = await res.json();
    const user = data.results[0];
    console.log(
      `Hello, ${user.name.first} ${user.name.last} from ${user.location.country}!`
    );
  } catch (err) {
    console.error('Failed to fetch random user:', (err as Error).message);
  }
})();
