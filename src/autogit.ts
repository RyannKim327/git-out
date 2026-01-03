// api-demo.ts
import fetch from 'node-fetch'; // npm i -D node-fetch @types/node

interface GitHubUser {
  login: string;
  name: string;
  public_repos: number;
  followers: number;
}

(async () => {
  try {
    const res = await fetch('https://api.github.com/users/octocat');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const user = (await res.json()) as GitHubUser;

    console.log(`User: ${user.login} (${user.name})`);
    console.log(`Repos: ${user.public_repos} | Followers: ${user.followers}`);
  } catch (err) {
    console.error('Fetch failed:', (err as Error).message);
  }
})();
