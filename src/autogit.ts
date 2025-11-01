// Directed graph represented as an adjacency list.
type AdjList<T> = Map<T, Set<T>>;

/**
 * Kahn’s algorithm (BFS) for topological sorting.
 * @returns Nodes in topologically-sorted order.
 * @throws If the graph contains a cycle.
 */
export function topologicalSort<T>(edges: [T, T][]): T[] {
  const graph: AdjList<T> = new Map();
  const inDegree: Map<T, number> = new Map();

  // ---------- 1. Build graph and in-degree counts ----------
  for (const [u, v] of edges) {
    if (!graph.has(u)) graph.set(u, new Set());
    if (!graph.has(v)) graph.set(v, new Set());

    if (!graph.get(u)!.has(v)) {          // avoid duplicate edges
      graph.get(u)!.add(v);
      inDegree.set(v, (inDegree.get(v) || 0) + 1);
    }
    inDegree.set(u, inDegree.get(u) || 0); // ensure every node exists
  }

  // ---------- 2. Seed queue with zero in-degree nodes ----------
  const queue: T[] = [];
  for (const [node, deg] of inDegree.entries()) {
    if (deg === 0) queue.push(node);
  }

  // ---------- 3. Process queue ----------
  const sorted: T[] = [];
  while (queue.length) {
    const u = queue.shift()!;
    sorted.push(u);

    for (const v of graph.get(u)!) {
      inDegree.set(v, inDegree.get(v)! - 1);
      if (inDegree.get(v) === 0) queue.push(v);
    }
  }

  // ---------- 4. Cycle detection ----------
  if (sorted.length !== inDegree.size) {
    throw new Error('Graph contains at least one cycle');
  }

  return sorted;
}

/* ----------------- Usage example ----------------- */
if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;

  test('topological sort', () => {
    const edges: [string, string][] = [
      ['A', 'B'],
      ['A', 'C'],
      ['B', 'D'],
      ['C', 'D'],
      ['D', 'E'],
    ];
    expect(topologicalSort(edges)).toEqual(['A', 'B', 'C', 'D', 'E']);
  });

  test('cycle detection', () => {
    const edges: [string, string][] = [
      ['A', 'B'],
      ['B', 'C'],
      ['C', 'A'],
    ];
    expect(() => topologicalSort(edges)).toThrow(/cycle/i);
  });
}
npm i -D typescript tsx vitest
npx tsc --module nodenext --target es2022 index.ts
npx vitest run
