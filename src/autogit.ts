// ------------------------------------------------------------
// 1️⃣  Install the dependencies (once)
// ------------------------------------------------------------
// npm i axios
// npm i -D typescript ts-node @types/node

// ------------------------------------------------------------
// 2️⃣  tsconfig.json (minimal)
// ------------------------------------------------------------
/*
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist"
  }
}
*/

// ------------------------------------------------------------
// 3️⃣  src/githubApi.ts
// ------------------------------------------------------------
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';

// A tiny wrapper around the raw error so callers can inspect status & data
class ApiError extends Error {
  public readonly status: number | undefined;
  public readonly data: unknown;

  constructor(message: string, status?: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// Types that model the GitHub API response we care about
export interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
}

// The actual client
export class GitHubApi {
  private readonly client: AxiosInstance;

  constructor(token?: string) {
    const baseConfig: AxiosRequestConfig = {
      baseURL: 'https://api.github.com',
      timeout: 8_000,
      headers: {
        Accept: 'application/vnd.github.v3+json',
        // If you pass a personal access token we’ll use it for auth
        ...(token ? { Authorization: `token ${token}` } : {}),
      },
    };

    this.client = axios.create(baseConfig);
    this.setupInterceptors();
  }

  // --------------------------------------------------------
  // Interceptors – add a request ID header & log request time
  // --------------------------------------------------------
  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use((config) => {
      // Add a random request‑id header (useful for tracing)
      config.headers!['X-Request-Id'] = crypto.randomUUID();
      // Store start time for later logging
      (config as any).metadata = { startTime: Date.now() };
      return config;
    });

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        const meta = (response.config as any).metadata;
        const duration = Date.now() - meta.startTime;
        console.log(
          `✅ ${response.config.method?.toUpperCase()} ${response.config.url} – ${duration} ms`,
        );
        return response;
      },
      (error: AxiosError) => {
        // Log the failure and re‑wrap it as ApiError
        const { config, response } = error;
        const meta = (config as any).metadata;
        const duration = meta ? Date.now() - meta.startTime : 'N/A';
        console.error(
          `❌ ${config?.method?.toUpperCase()} ${config?.url} – ${duration} ms`,
          `Status: ${response?.status}`,
        );

        const apiError = new ApiError(
          error.message,
          response?.status,
          response?.data,
        );
        return Promise.reject(apiError);
      },
    );
  }

  // --------------------------------------------------------
  // Public method – fetch public repos for a given username
  // --------------------------------------------------------
  async listPublicRepos(username: string, perPage = 5): Promise<Repo[]> {
    const resp: AxiosResponse<Repo[]> = await this.client.get(
      `/users/${encodeURIComponent(username)}/repos`,
      {
        params: {
          per_page: perPage,
          sort: 'updated',
        },
      },
    );
    return resp.data;
  }
}

// ------------------------------------------------------------
// 4️⃣  src/cli.ts – tiny command‑line demo
// ------------------------------------------------------------
import { GitHubApi } from './githubApi';

// Grab the username from the command line (fallback to "octocat")
const username = process.argv[2] ?? 'octocat';

// Optional: read a token from env (helps avoid rate‑limits)
const token = process.env.GITHUB_TOKEN;

(async () => {
  const api = new GitHubApi(token);
  try {
    const repos = await api.listPublicRepos(username, 10);
    console.log(`\n🗂️  Public repos for ${username}:\n`);
    repos.forEach((repo) => {
      console.log(
        `- ${repo.name} (${repo.stargazers_count} ★) – ${repo.html_url}`,
      );
      if (repo.description) console.log(`  ${repo.description}`);
    });
  } catch (err) {
    if (err instanceof ApiError) {
      console.error(`\n❗ API error (${err.status}):`, err.data);
    } else {
      console.error('\n❗ Unexpected error:', err);
    }
    process.exit(1);
  }
})();
# 1️⃣  Install deps (if you haven’t already)
npm i axios
npm i -D typescript ts-node @types/node

# 2️⃣  Compile & run (or just use ts-node)
npx ts-node src/cli.ts <github‑username>
# Example:
npx ts-node src/cli.ts microsoft
export GITHUB_TOKEN=ghp_XXXXXXXXXXXXXXXXXXXXXXXXXXXX
