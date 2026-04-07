/* exampleApi.ts
 *
 * Demonstrates a tiny, typed fetch of a JSON Placeholder user
 * using Axios – the most common promise‑based HTTP library.
 *
 * Prereqs:
 *   npm install axios
 *   (optionally) npm i -D ts-node @types/node @types/axios
 */

import axios from 'axios';

/**
 * Represent a user from JSON Placeholder.
 */
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

/**
 * GET /users/:id – returns a single user.
 * @param id - numeric user id (1‑10 for the public API)
 * @returns a Promise that resolves to a User.
 */
async function getUser(id: number): Promise<User> {
  const url = `https://jsonplaceholder.typicode.com/users/${id}`;

  // Axios automatically parses JSON so we get a typed response:
  const { data } = await axios.get<User>(url);

  return data;
}

/**
 * Main entry point: fetch and pretty‑print a user.
 */
async function main() {
  try {
    const user = await getUser(3); // pick any id 1‑10
    console.log('User fetched 👇');
    console.dir(user, { depth: null, colors: true });
  } catch (err) {
    console.error('Error fetching user:', err);
  }
}

// Invoke main if this script is run directly
if (require.main === module) {
  main();
}
# install deps
npm install axios
# run via ts-node
npx ts-node exampleApi.ts

# or compile to JS first
npx tsc exampleApi.ts
node exampleApi.js
