type NodeId = string | number;

/**
 * Returns the neighbours of a node.
 * The function can be async if you need to fetch data (e.g., from a server).
 */
type NeighbourFn<T> = (node: T) => Iterable<T> | Promise<Iterable<T>>;
/**
 * Breadth‑Limited Search
 *
 * @param start          The start node.
 * @param limit          Maximum depth (0 = only the start node).
 * @param getNeighbours  Function that returns the neighbours of a node.
 * @param onVisit        Optional callback invoked when a node is visited.
 * @returns              An array of nodes visited in BFS order (up to the limit).
 */
export async function breadthLimitedSearch<T>(
  start: T,
  limit: number,
  getNeighbours: NeighbourFn<T>,
  onVisit?: (node: T, depth: number) => void
): Promise<T[]> {
  if (limit < 0) throw new Error('limit must be >= 0');

  const visited = new Set<T>();
  const result: T[] = [];

  // Queue entries keep the node together with its depth.
  type QueueEntry = { node: T; depth: number };
  const queue: QueueEntry[] = [{ node: start, depth: 0 }];

  visited.add(start);

  while (queue.length > 0) {
    const { node, depth } = queue.shift()!; // safe: we checked length

    // ---- Process the node -------------------------------------------------
    result.push(node);
    if (onVisit) onVisit(node, depth);

    // ---- Stop expanding if we reached the limit ---------------------------
    if (depth >= limit) continue;

    // ---- Get neighbours (supports async neighbour providers) ------------
    const rawNeighbours = await getNeighbours(node);
    for (const neighbour of rawNeighbours) {
      if (!visited.has(neighbour)) {
        visited.add(neighbour);
        queue.push({ node: neighbour, depth: depth + 1 });
      }
    }
  }

  return result;
}
// ---- Example graph ---------------------------------------------------------
const graph = new Map<number, number[]>([
  [1, [2, 3]],
  [2, [4, 5]],
  [3, [6]],
  [4, []],
  [5, []],
  [6, []],
]);

// Wrap the map in a NeighbourFn
const neighbours: NeighbourFn<number> = (node) => graph.get(node) ?? [];

// ---- Run BLS ---------------------------------------------------------------
(async () => {
  const visited = await breadthLimitedSearch(1, 2, neighbours);
  console.log('Visited (limit=2):', visited);
  // Output: Visited (limit=2): [ 1, 2, 3, 4, 5, 6 ]
  // Nodes 4,5,6 are depth‑2; their children (none) are not explored.
})();
import fetch from 'node-fetch'; // npm i node-fetch@2 (or native fetch in Node 18+)

// Simple fetch‑links function (pretend each page returns a JSON array of URLs)
async function fetchLinks(url: string): Promise<string[]> {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Failed to fetch ${url}`);
  return (await resp.json()) as string[];
}

// Use the same BLS implementation, but with string URLs
(async () => {
  const startUrl = 'https://example.com/api/root';
  const maxDepth = 3;

  const visitedUrls = await breadthLimitedSearch(
    startUrl,
    maxDepth,
    fetchLinks,
    (url, depth) => console.log(`Visited ${url} at depth ${depth}`)
  );

  console.log('\nCrawl finished. Visited', visitedUrls.length, 'pages.');
})();
export async function breadthLimitedSearchUntil<T>(
  start: T,
  limit: number,
  getNeighbours: NeighbourFn<T>,
  predicate: (node: T, depth: number) => boolean
): Promise<T | undefined> {
  let found: T | undefined = undefined;

  await breadthLimitedSearch(
    start,
    limit,
    getNeighbours,
    (node, depth) => {
      if (predicate(node, depth)) {
        found = node;
        // Throw a special error to break out of the async loop.
        throw new FoundError();
      }
    }
  ).catch((e) => {
    if (!(e instanceof FoundError)) throw e; // re‑throw unexpected errors
  });

  return found;
}

class FoundError extends Error {}
const target = await breadthLimitedSearchUntil(
  1,
  4,
  neighbours,
  (node) => node === 5
);
console.log('Found node:', target); // → 5
// ---------------------------------------------------------------
// breadthLimitedSearch.ts
// ---------------------------------------------------------------
type NodeId = string | number;
type NeighbourFn<T> = (node: T) => Iterable<T> | Promise<Iterable<T>>;

/**
 * Breadth‑Limited Search implementation.
 */
export async function breadthLimitedSearch<T>(
  start: T,
  limit: number,
  getNeighbours: NeighbourFn<T>,
  onVisit?: (node: T, depth: number) => void
): Promise<T[]> {
  if (limit < 0) throw new Error('limit must be >= 0');

  const visited = new Set<T>();
  const result: T[] = [];

  type QueueEntry = { node: T; depth: number };
  const queue: QueueEntry[] = [{ node: start, depth: 0 }];
  visited.add(start);

  while (queue.length) {
    const { node, depth } = queue.shift()!;

    result.push(node);
    if (onVisit) onVisit(node, depth);

    if (depth >= limit) continue;

    const raw = await getNeighbours(node);
    for (const nb of raw) {
      if (!visited.has(nb)) {
        visited.add(nb);
        queue.push({ node: nb, depth: depth + 1 });
      }
    }
  }

  return result;
}

// ---------------------------------------------------------------
// demo.ts (example usage)
// ---------------------------------------------------------------
import { breadthLimitedSearch } from './breadthLimitedSearch';

// Simple static graph
const graph = new Map<number, number[]>([
  [1, [2, 3]],
  [2, [4, 5]],
  [3, [6]],
  [4, []],
  [5, []],
  [6, []],
]);

const neighbours: NeighbourFn<number> = (n) => graph.get(n) ?? [];

(async () => {
  console.log('--- BLS with limit = 1 ---');
  console.log(await breadthLimitedSearch(1, 1, neighbours));
  // → [1, 2, 3]

  console.log('--- BLS with limit = 2 ---');
  console.log(await breadthLimitedSearch(1, 2, neighbours));
  // → [1, 2, 3, 4, 5, 6]

  console.log('--- BLS with limit = 0 (only start) ---');
  console.log(await breadthLimitedSearch(1, 0, neighbours));
  // → [1]
})();
ts-node demo.ts
