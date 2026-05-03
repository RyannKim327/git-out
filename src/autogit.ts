// Node >=18 or any modern browser
// 👉 install types for node-fetch if you’re on older Node: npm i @types/node-fetch

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function fetchPost(id = 1): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (!res.ok) {
    // Throwing includes the HTTP status for downstream handling
    throw new Error(`Unexpected status ${res.status}`);
  }

  // Telling TS that the JSON shapes like our Post type
  const data = await res.json() as Post;
  return data;
}

(async () => {
  try {
    const post = await fetchPost(42);  // change the ID if you like
    console.log('🚀 Post fetched:');
    console.log(`Title: ${post.title}`);
    console.log(`Body: ${post.body.slice(0, 70)}…`);
  } catch (err) {
    console.error('❌ Fetch failed:', err);
  }
})();
