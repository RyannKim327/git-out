// src/githubUsers.ts
import fetch, { Response } from "node-fetch";

interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

async function fetchGithubUsers(
  page: number = 1,
  perPage: number = 10
): Promise<GithubUser[]> {
  const url = `https://api.github.com/users?since=${(page - 1) * perPage}`;

  const resp: Response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "TypeScript-CLI",
    },
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`GitHub API error ${resp.status}: ${errText}`);
  }

  const json = await resp.json();

  // Type assertion – we know the API returns an array of GitHubUser objects
  return json as GithubUser[];
}

async function main() {
  try {
    const users = await fetchGithubUsers(1, 5);
    console.log("Top GitHub users:");
    users.forEach((u) => console.log(`- ${u.login} (${u.html_url})`));
  } catch (err) {
    console.error("Something went wrong:", err);
  }
}

main().catch((e) => console.error(e));

