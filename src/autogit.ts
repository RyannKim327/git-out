// graph.ts
export type AdjacencyList = Record<string, string[]>;

/**
 * Breadth-first search.
 * @param graph   Adjacency-list representation.
 * @param start   Starting vertex.
 * @param goal    Predicate that returns true when the goal vertex is reached.
 * @returns       The shortest path from start to the first vertex that satisfies
 *                the predicate, or null if no such vertex exists.
 */
export function bfs(
  graph: AdjacencyList,
  start: string,
  goal: (v: string) => boolean
): string[] | null {
  const queue: string[][] = [[start]];   // queue of paths
  const seen = new Set<string>([start]); // visited set

  while (queue.length) {
    const path = queue.shift()!;       // current path
    const vertex = path[path.length - 1];

    if (goal(vertex)) return path;     // found goal

    for (const neighbor of graph[vertex] ?? []) {
      if (!seen.has(neighbor)) {
        seen.add(neighbor);
        queue.push([...path, neighbor]);
      }
    }
  }
  return null; // no path found
}

/* ---------- Usage example ---------- */
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe("BFS", () => {
    it("finds shortest path", () => {
      const g: AdjacencyList = {
        A: ["B", "C"],
        B: ["D"],
        C: ["D", "E"],
        D: ["F"],
        E: ["F"],
        F: [],
      };

      const path = bfs(g, "A", v => v === "F");
      expect(path).toEqual(["A", "C", "E", "F"]);
    });

    it("returns null when unreachable", () => {
      const g: AdjacencyList = { A: ["B"], B: [] };
      expect(bfs(g, "A", v => v === "Z")).toBeNull();
    });
  });
}
