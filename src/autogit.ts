// fetch-example.ts
/**
 * A small utility that fetches JSON from a public API
 * and logs a nicely formatted result.
 *
 * It demonstrates:
 *   • TypeScript generics for response typing
 *   • Async/await syntax
 *   • Basic error handling
 *   • Runtime type guard for JSON validation
 */

type PlainObject = Record<string, unknown>;

// A small runtime check to ensure the response is
// an object (the common case when fetching JSON).
function isObject(value: unknown): value is PlainObject {
  return typeof value === 'object' && value !== null;
}

/**
 * Generic fetch function that returns data of type T.
 * @param url          The URL to fetch from
 * @param init         Optional RequestInit parameters
 */
async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // Very light runtime validation – just make sure we got an object
  if (!isObject(data)) {
    throw new Error('Response is not a JSON object');
  }

  return data as T; // confidence that T matches the real shape
}

/**
 * Example usage: fetch a user from the JSONPlaceholder API.
 * The API returns a shape that we can describe as a type.
 */
interface JsonPlaceholderUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; lng: string };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

async function main() {
  const userId = 1;
  const url = `https://jsonplaceholder.typicode.com/users/${userId}`;

  try {
    const user = await fetchJson<JsonPlaceholderUser>(url);
    console.log(`Name: ${user.name}`);
    console.log(`Company: ${user.company.name}`);
    console.log(`Address: ${user.address.street}, ${user.address.city}`);
  } catch (err) {
    console.error('Something went wrong:', err);
  }
}

// Kick it off
main();
