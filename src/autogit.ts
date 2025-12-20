// random-api.ts
import fetch from 'node-fetch';

// Pick a random GitHub user from this tiny pool
const USERS = ['octocat', 'torvalds', 'gaearon', 'sindresorhus', 'yyx990803'];

(async () => {
  const name = USERS[Math.floor(Math.random() * USERS.length)];
  const res  = await fetch(`https://api.github.com/users/${name}`);
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const user = (await res.json()) as { login: string; public_repos: number; followers: number };
  console.log(`🎲  @${user.login}  –  ${user.public_repos} repos  –  ${user.followers} followers`);
})();
