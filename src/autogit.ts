// graph.ts
export type Vertex = string;
export type AdjacencyList = Record<Vertex, Vertex[]>;

/**
 * Breadth-first search.
 * @param graph   Adjacency-list representation of the graph.
 * @param start   Starting vertex.
 * @param target  Optional target vertex. If provided, the search stops as soon as it is found.
 * @returns       An object with:
 *                  - visited: Set of all vertices reachable from `start`
 *                  - path:    Shortest path from `start` to `target` (undefined if not found)
 */
export function bfs(
  graph: AdjacencyList,
  start: Vertex,
  target?: Vertex
): { visited: Set<Vertex>; path: Vertex[] | undefined } {
  const visited = new Set<Vertex>();
  const queue: Vertex[] = [start];
  const prev = new Map<Vertex, Vertex | null>(); // for path reconstruction

  visited.add(start);
  prev.set(start, null);

  while (queue.length) {
    const curr = queue.shift()!;

    if (target !== undefined && curr === target) {
      return { visited, path: reconstructPath(prev, start, target) };
    }

    for (const neighbor of graph[curr] ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        prev.set(neighbor, curr);
        queue.push(neighbor);
      }
    }
  }

  return { visited, path: undefined };
}

function reconstructPath(
  prev: Map<Vertex, Vertex | null>,
  start: Vertex,
  target: Vertex
): Vertex[] {
  const path: Vertex[] = [];
  let curr: Vertex | null = target;
  while (curr !== null) {
    path.unshift(curr);
    curr = prev.get(curr)!;
  }
  return path[0] === start ? path : [];
}
import { bfs } from './graph';

const g: AdjacencyList = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: [],
  E: ['F'],
  F: [],
};

const { visited, path } = bfs(g, 'A', 'F');
console.log('Visited:', [...visited]); // A B C D E F
console.log('Shortest path A→F:', path); // ["A", "C", "F"]
