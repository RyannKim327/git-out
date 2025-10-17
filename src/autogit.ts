// utils/http.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * Tiny wrapper around Axios that adds
 *  - baseURL
 *  - request/response interceptors for logging & tokens
 *  - typed return helpers
 */
class HttpClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({ baseURL });

    // ── Request interceptor ───────────────────────────────────────────────
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        console.log(`➡️ ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => Promise.reject(error)
    );

    // ── Response interceptor ────────────────────────────────────────────
    this.client.interceptors.response.use(
      (res) => {
        console.log(`✅ ${res.config.url} → ${res.status}`);
        return res;
      },
      (error) => {
        console.error(`❌ ${error.config?.url} → ${error.message}`);
        return Promise.reject(error);
      }
    );
  }

  /* Typed helpers ------------------------------------------------------ */
  get<T = unknown>(url: string, config?: AxiosRequestConfig) {
    return this.client.get<T>(url, config).then((r) => r.data);
  }

  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.client.post<T>(url, data, config).then((r) => r.data);
  }
}

/* ------------------------------------------------------------------ */
/* Random usage example                                               */
/* ------------------------------------------------------------------ */
interface Joke {
  id: string;
  joke: string;
}

const api = new HttpClient('https://icanhazdadjoke.com');

export async function randomJoke(): Promise<string> {
  try {
    const { joke } = await api.get<Joke>('/', {
      headers: { Accept: 'application/json' },
    });
    return joke;
  } catch {
    return 'No joke for you 😢';
  }
}

/* ------------------------------------------------------------------ */
/* Quick self-test (remove in real apps)                              */
/* ------------------------------------------------------------------ */
if (import.meta.vitest) {
  const { it, expect, vi } = import.meta.vitest;
  it('fetches a random dad joke', async () => {
    const joke = await randomJoke();
    expect(joke).toBeTruthy();
    expect(joke.length).toBeGreaterThan(5);
  });
}
