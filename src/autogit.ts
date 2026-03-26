// ------------------------------------------------------------
//  Fetch‑and‑hydrate example in TypeScript
// ------------------------------------------------------------

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

async function fetchUserWithPosts(userId: number): Promise<{ user: User; posts: Post[] }> {
  // Base endpoint
  const base = 'https://jsonplaceholder.typicode.com';

  // Helper that throws on non‑2xx
  const safeFetch = async <T>(url: string): Promise<T> => {
    const resp = await fetch(url);

    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`Failed to fetch ${url} – ${resp.status}: ${text}`);
    }

    // Guard against empty body
    const data = await resp.json();
    return data as T;
  };

  // Pull user
  const user = await safeFetch<User>(`${base}/users/${userId}`);

  // Pull that user’s posts in parallel
  const posts = await safeFetch<Post[]>(`${base}/posts?userId=${userId}`);

  return { user, posts };
}


// Demo call – tweak the ID at will
fetchUserWithPosts(1)
  .then(({ user, posts }) => {
    console.log('User:', user);
    console.log(`Found ${posts.length} posts:`);
    posts.slice(0, 3).forEach((p) => console.log(` • ${p.title}`));
  })
  .catch((err) => console.error('Oops!', err.message));
