// axios-typescript-demo.ts
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

type User = {
  id: number;
  name: string;
  email: string;
  active?: boolean;
};

const api: AxiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 4000,
  headers: { 'Content-Type': 'application/json' },
});

// Simple request/response logging
api.interceptors.request.use(req => {
  console.debug('Request:', (req.method ?? 'GET').toUpperCase(), req.url);
  return req;
});

api.interceptors.response.use(
  res => {
    console.debug('Response:', res.status, res.config.url);
    return res;
  },
  (err: AxiosError) => {
    console.error('Request failed:', err.message);
    return Promise.reject(err);
  }
);

async function fetchUsers(): Promise<User[]> {
  const res: AxiosResponse<User[]> = await api.get<User[]>('/users');
  return res.data;
}

async function createUser(name: string, email: string): Promise<User> {
  const payload = { name, email };
  const res: AxiosResponse<User> = await api.post<User>('/users', payload);
  return res.data;
}

async function updateUser(id: number, patch: Partial<User>): Promise<User> {
  const res: AxiosResponse<User> = await api.patch<User>(`/users/${id}`, patch);
  return res.data;
}

async function runDemo() {
  try {
    const users = await fetchUsers();
    console.log('Fetched users:', users.length);

    const created = await createUser('Jane Doe', 'jane@example.com');
    console.log('Created user:', created);

    const updated = await updateUser(created.id, { active: true } as Partial<User>);
    console.log('Updated user:', updated);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error('Axios error:', e.message);
    } else {
      console.error('Unknown error:', e);
    }
  }
}

runDemo();
