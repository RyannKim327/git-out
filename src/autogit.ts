// random-axios-example.ts
import axios, { AxiosResponse } from "axios";

interface PostSummary {
  id: number;
  title: string;
}

async function fetchPostSummaries(
  limit: number = 5,
  page: number = 1
): Promise<PostSummary[]> {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const params = { _limit: limit, _page: page };

  // Axios can be typed at the request level:
  const response: AxiosResponse<PostSummary[]> = await axios.get(url, { params });

  // We trust the API returns the expected shape, but we still slice the fields we care about.
  return response.data.map(({ id, title }) => ({ id, title }));
}

async function main() {
  try {
    const summaries = await fetchPostSummaries();
    console.log("Fetched post summaries:", summaries);
  } catch (err) {
    // @ts-ignore – quick error log for demonstration
    console.error("Something went wrong:", err?.message ?? err);
  }
}

main();
