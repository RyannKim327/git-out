// --------------------------------------------------
// Types
// --------------------------------------------------
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

// --------------------------------------------------
// Helper: generic fetch wrapper with type inference
// --------------------------------------------------
async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  // Throw if status is not in the 200–299 range
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  // Let the compiler infer the returned shape
  return response.json() as Promise<T>;
}

// --------------------------------------------------
// Main logic
// --------------------------------------------------
async function main() {
  try {
    const users = await fetchJson<User[]>(
      'https://jsonplaceholder.typicode.com/users'
    );

    users.forEach((u) => console.log(`${u.name} (${u.email})`));
  } catch (err) {
    console.error('Fetching failed:', err);
  }
}

// --------------------------------------------------
// Kick it off
// --------------------------------------------------
main();
