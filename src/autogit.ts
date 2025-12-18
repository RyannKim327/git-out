// ---------------------------------------------
// Topological sort (Kahn’s BFS algorithm)
// ---------------------------------------------
type Graph = Map<string, string[]>;   // adjacency list

/**
 * Returns a topologically-sorted array of vertex names.
 * If the graph has a directed cycle, returns `null`.
 * Runs in O(V + E) time and O(V) space.
 */
export function topologicalSort(graph: Graph): string[] | null {
  const inDegree = new Map<string, number>();
  const queue: string[] = [];
  const sorted: string[] = [];

  // 1. Initialise in-degree of every vertex to 0
  for (const u of graph.keys()) inDegree.set(u, 0);

  // 2. Fill in-degrees
  for (const [u, neighbours] of graph) {
    for (const v of neighbours) {
      inDegree.set(v, (inDegree.get(v) ?? 0) + 1);
    }
  }

  // 3. Enqueue vertices with zero in-degree
  for (const [u, deg] of inDegree) {
    if (deg === 0) queue.push(u);
  }

  // 4. BFS
  while (queue.length) {
    const u = queue.shift()!;
    sorted.push(u);

    for (const v of graph.get(u) ?? []) {
      inDegree.set(v, inDegree.get(v)! - 1);
      if (inDegree.get(v) === 0) queue.push(v);
    }
  }

  // 5. Cycle detection
  return sorted.length === inDegree.size ? sorted : null;
}

// ---------------------------------------------
// Quick sanity check
// ---------------------------------------------
if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;

  test('topologicalSort', () => {
    const g: Graph = new Map([
      ['A', ['B', 'C']],
      ['B', ['D']],
      ['C', ['D']],
      ['D', ['E']],
      ['E', []],
    ]);
    expect(topologicalSort(g)).toEqual(['A', 'B', 'C', 'D', 'E']);

    const cycle: Graph = new Map([
      ['A', ['B']],
      ['B', ['C']],
      ['C', ['A']], // cycle
    ]);
    expect(topologicalSort(cycle)).toBeNull();
  });
}
import { topologicalSort } from './topologicalSort';

const graph: Graph = new Map([
  ['underwear', ['pants', 'shoes']],
  ['pants',     ['belt',  'shoes']],
  ['belt',      ['jacket']],
  ['shirt',     ['belt',  'tie']],
  ['tie',       ['jacket']],
  ['jacket',    []],
  ['socks',     ['shoes']],
  ['shoes',     []],
]);

const order = topologicalSort(graph);
if (order) console.log('Dressing order:', order.join(' → '));
else console.error('Cycle detected – no valid order exists.');
npx tsx yourFile.ts
