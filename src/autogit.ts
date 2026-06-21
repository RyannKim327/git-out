// ---------- types ----------------------------------------------
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// ---------- helper ----------------------------------------------
async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Network error: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

// ---------- usage ----------------------------------------------
(async () => {
  try {
    const post = await getJson<Post>('https://jsonplaceholder.typicode.com/posts/1');
    console.log('Fetched post:', post);
    // do something with post… (e.g., update UI)
  } catch (err) {
    console.error('Failed to fetch post:', err);
  }
})();
