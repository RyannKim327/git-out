// ---------------------------------------------
// Topological Sort (Kahn’s Algorithm)
// ---------------------------------------------

export type Graph = Record<string, string[]>;   // adjacency list:  vertex → [neighbours]

/**
 * Returns a topologically-sorted array of vertices, or `null` if the graph
 * contains a cycle and therefore no valid ordering exists.
 */
export function topologicalSort(graph: Graph): string[] | null {
  const indegree: Record<string, number> = Object.create(null);
  const vertices = Object.keys(graph);

  // 1. Initialise indegree of every vertex to 0
  for (const v of vertices) indegree[v] = 0;

  // 2. Fill indegree by scanning edges
  for (const v of vertices) {
    for (const n of graph[v]) {
      indegree[n] = (indegree[n] ?? 0) + 1;
    }
  }

  // 3. Seed the queue with vertices that have zero incoming edges
  const queue: string[] = [];
  for (const v of vertices) {
    if (indegree[v] === 0) queue.push(v);
  }

  const order: string[] = [];

  // 4. Process queue
  while (queue.length) {
    const u = queue.shift()!;
    order.push(u);

    for (const v of graph[u]) {
      indegree[v]--;
      if (indegree[v] === 0) queue.push(v);
    }
  }

  // 5. Cycle detection
  return order.length === vertices.length ? order : null;
}

// ---------------------------------------------
// Quick sanity check
// ---------------------------------------------
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe('topologicalSort', () => {
    it('sorts a DAG', () => {
      const g: Graph = {
        A: ['C'],
        B: ['C', 'D'],
        C: ['E'],
        D: ['F'],
        E: ['F'],
        F: [],
      };
      const order = topologicalSort(g)!;
      expect(order).toHaveLength(6);
      // A few spot checks
      expect(order.indexOf('A')).toBeLessThan(order.indexOf('C'));
      expect(order.indexOf('B')).toBeLessThan(order.indexOf('D'));
      expect(order.indexOf('E')).toBeLessThan(order.indexOf('F'));
    });

    it('detects cycles', () => {
      const g: Graph = {
        A: ['B'],
        B: ['C'],
        C: ['A'],
      };
      expect(topologicalSort(g)).toBeNull();
    });
  });
}
import { topologicalSort } from './topologicalSort';

const graph = {
  shirt: ['tie'],
  tie: ['jacket'],
  jacket: [],
  watch: [],
};

const order = topologicalSort(graph);
console.log(order);   // [ 'shirt', 'watch', 'tie', 'jacket' ]  (one valid ordering)
