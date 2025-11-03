// randomUser.ts
import axios from 'axios';

interface GitHubUser {
  login: string;
  id: number;
}

(async () => {
  try {
    // GitHub’s API exposes a convenient “/user” endpoint that returns a random user when no ID is specified
    const { data } = await axios.get<GitHubUser>('https://api.github.com/user');
    console.log(`Random GitHub user: ${data.login}`);
  } catch (err) {
    console.error('Failed to fetch random user:', (err as Error).message);
  }
})();
