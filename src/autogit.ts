// bfs-traversal.ts

export function bfsVisitAll<V>(graph: Map<V, V[]>, start: V): V[] {
  const visited = new Set<V>();
  const queue: V[] = [];
  const order: V[] = [];

  visited.add(start);
  queue.push(start);
  let head = 0;

  while (head < queue.length) {
    const node = queue[head++];
    order.push(node);

    const neighbors = graph.get(node) ?? [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return order;
}
// bfs-shortest-path.ts

export function bfsShortestPath<V>(
  graph: Map<V, V[]>,
  start: V,
  goal: V
): V[] | null {
  if (start === goal) return [start];

  const visited = new Set<V>([start]);
  const queue: V[] = [start];
  const parent = new Map<V, V | null>();
  parent.set(start, null);

  let head = 0;
  while (head < queue.length) {
    const node = queue[head++];

    const neighbors = graph.get(node) ?? [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        parent.set(neighbor, node);

        if (neighbor === goal) {
          // Reconstruct path from goal back to start
          const path: V[] = [];
          let cur: V | null = neighbor;
          while (cur != null) {
            path.push(cur);
            cur = parent.get(cur) ?? null;
          }
          path.reverse();
          return path;
        }

        queue.push(neighbor);
      }
    }
  }

  return null; // no path found
}
// example.ts
import { bfsVisitAll } from "./bfs-traversal";
import { bfsShortestPath } from "./bfs-shortest-path";

type Node = number;

const g: Map<Node, Node[]> = new Map<Node, Node[]>([
  [1, [2, 3]],
  [2, [4]],
  [3, [4, 5]],
  [4, [6]],
  [5, []],
  [6, []],
]);

// BFS traversal starting from 1
const order = bfsVisitAll(g, 1);
console.log("BFS order:", order); // e.g., [1, 2, 3, 4, 5, 6]

// BFS shortest path from 1 to 6
const path = bfsShortestPath(g, 1, 6);
console.log("Shortest path from 1 to 6:", path); // e.g., [1, 2, 4, 6]
