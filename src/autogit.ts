// graph.ts
export type AdjacencyList = Record<string, string[]>;

/**
 * Breadth-first search.
 * @param graph   Adjacency-list representation of the graph.
 * @param start   Starting vertex.
 * @param goal    Predicate that returns true when the goal vertex is reached.
 * @returns       The shortest path (array of vertices) from start to the first vertex
 *                that satisfies the goal predicate, or null if no such vertex exists.
 */
export function bfs(
  graph: AdjacencyList,
  start: string,
  goal: (v: string) => boolean
): string[] | null {
  if (goal(start)) return [start];          // trivial case

  const queue: string[][] = [[start]];    // each queue item is a path
  const visited = new Set<string>([start]);

  while (queue.length) {
    const path = queue.shift()!;          // shortest path so far
    const tail = path[path.length - 1];

    for (const neighbor of graph[tail] ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        const newPath = [...path, neighbor];
        if (goal(neighbor)) return newPath; // first time we hit the goal
        queue.push(newPath);
      }
    }
  }
  return null; // goal unreachable
}

/* ------------------------------------------------------------------ */
/* -------------------------- usage example --------------------------- */
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe('BFS', () => {
    it('finds the shortest path', () => {
      const g: AdjacencyList = {
        A: ['B', 'C'],
        B: ['D'],
        C: ['E'],
        D: ['F'],
        E: ['F'],
        F: [],
      };

      const path = bfs(g, 'A', v => v === 'F');
      expect(path).toEqual(['A', 'B', 'D', 'F']);
    });

    it('returns null when unreachable', () => {
      const g: AdjacencyList = { A: ['B'], B: [] };
      expect(bfs(g, 'A', v => v === 'Z')).toBeNull();
    });
  });
}
npm i -D vitest
npx vitest graph.ts
