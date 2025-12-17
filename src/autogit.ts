interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

class GitHubAPI {
  private baseURL: string = 'https://api.github.com';
  
  async fetchUser(username: string): Promise<GitHubUser> {
    try {
      const response = await fetch(`${this.baseURL}/users/${username}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const userData: GitHubUser = await response.json();
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }
  
  async fetchUserRepos(username: string): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseURL}/users/${username}/repos?sort=updated&per_page=5`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching repos:', error);
      throw error;
    }
  }
}

// Usage example
async function main() {
  const github = new GitHubAPI();
  
  try {
    // Fetch user data
    const user = await github.fetchUser('defunkt');
    console.log('User Data:', {
      username: user.login,
      name: user.name,
      followers: user.followers,
      publicRepos: user.public_repos,
      profile: user.html_url
    });
    
    // Fetch user's recent repos
    const repos = await github.fetchUserRepos('defunkt');
    console.log('\nRecent Repositories:');
    repos.forEach((repo: any, index: number) => {
      console.log(`${index + 1}. ${repo.name} - ${repo.description || 'No description'}`);
    });
    
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

// Run the example
main().catch(console.error);

// Alternative: Using fetch with custom headers and error handling
const fetchWithTimeout = async (url: string, timeout: number = 5000): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'TypeScript-Fetch-Example/1.0',
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};

// Example using the timeout wrapper
async function fetchRandomUser() {
  try {
    const response = await fetchWithTimeout('https://api.github.com/users/octocat');
    const data = await response.json();
    console.log('Random user:', data);
  } catch (error) {
    console.error('Timeout or other error:', error);
  }
}
