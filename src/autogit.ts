/**
 * Topological sort (Kahn’s algorithm)
 * ------------------------------------
 * @param graph  Adjacency list: vertex → list of vertices it points to
 * @returns      Sorted vertices (empty array if the graph has a cycle)
 */
export function topologicalSort(graph: Map<string, string[]>): string[] {
  const inDegree = new Map<string, number>();
  const queue: string[] = [];
  const result: string[] = [];

  // 1. Initialise in-degree of every vertex to 0
  for (const [v, neighbours] of graph) {
    if (!inDegree.has(v)) inDegree.set(v, 0);
    for (const n of neighbours) {
      inDegree.set(n, (inDegree.get(n) ?? 0) + 1);
    }
  }

  // 2. Enqueue vertices with zero in-degree
  for (const [v, deg] of inDegree) {
    if (deg === 0) queue.push(v);
  }

  // 3. Process queue
  while (queue.length) {
    const v = queue.shift()!;
    result.push(v);

    for (const n of graph.get(v) ?? []) {
      inDegree.set(n, inDegree.get(n)! - 1);
      if (inDegree.get(n) === 0) queue.push(n);
    }
  }

  // 4. Cycle detection
  return result.length === inDegree.size ? result : [];
}

/* ------------------ Usage example ------------------ */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it('sorts a DAG', () => {
    const g = new Map<string, string[]>([
      ['A', ['B', 'C']],
      ['B', ['D']],
      ['C', ['D']],
      ['D', ['E']],
      ['E', []],
    ]);
    expect(topologicalSort(g)).toEqual(['A', 'B', 'C', 'D', 'E']);
  });

  it('detects a cycle', () => {
    const g = new Map<string, string[]>([
      ['A', ['B']],
      ['B', ['C']],
      ['C', ['A']], // cycle
    ]);
    expect(topologicalSort(g)).toEqual([]);
  });
}
