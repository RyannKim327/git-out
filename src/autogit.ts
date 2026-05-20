type Node = number | string;           // whatever your IDs look like
type Graph = Record<Node, Node[]>;     // adjacency list

/**
 * Breadth‑first search that collects the visit order.
 */
export function bfsVisitOrder(
  graph: Graph,
  start: Node
): Node[] {
  const queue: Node[] = [start];
  const visited: Set<Node> = new Set([start]);
  const order: Node[] = [];

  while (queue.length) {
    const cur = queue.shift()!;
    order.push(cur);

    for (const neighbor of graph[cur] ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}

/**
 * Breadth‑first search that stops at a goal node
 * and returns the *shortest path* (for unweighted graphs).
 */
export function bfsShortestPath(
  graph: Graph,
  start: Node,
  goal: Node
): Node[] | null {
  if (start === goal) return [start];

  const queue: Node[] = [start];
  const visited: Set<Node> = new Set([start]);
  const parent: Record<Node, Node | null> = {};
  parent[start] = null;

  while (queue.length) {
    const cur = queue.shift()!;

    for (const neighbor of graph[cur] ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        parent[neighbor] = cur;
        if (neighbor === goal) {
          // build the path from goal back to start
          const path: Node[] = [goal];
          let p: Node | null = cur;
          while (p !== null) {
            path.push(p);
            p = parent[p];
          }
          return path.reverse();
        }
        queue.push(neighbor);
      }
    }
  }

  return null; // goal not reachable
}
const graph: Graph = {
  1: [2, 3],
  2: [4],
  3: [4, 5],
  4: [],
  5: [6],
  6: [],
};

console.log(bfsVisitOrder(graph, 1));
// → [1, 2, 3, 4, 5, 6]

console.log(bfsShortestPath(graph, 1, 6));
// → [1, 3, 5, 6]
type NodeId = string | number;

// Generic graph implemented as Map<id, array of ids>
export type GenericGraph<T> = Map<T, T[]>;

export function genericBfsVisitOrder<T>(
  graph: GenericGraph<T>,
  start: T
): T[] {
  const queue: T[] = [start];
  const visited: Set<T> = new Set([start]);
  const order: T[] = [];

  while (queue.length) {
    const cur = queue.shift()!;
    order.push(cur);
    for (const neighbour of graph.get(cur) ?? []) {
      if (!visited.has(neighbour)) {
        visited.add(neighbour);
        queue.push(neighbour);
      }
    }
  }
  return order;
}
const g: GenericGraph<string> = new Map([
  ["A", ["B", "C"]],
  ["B", ["D"]],
  ["C", ["D", "E"]],
  ["D", []],
  ["E", ["F"]],
  ["F", []],
]);

console.log(genericBfsVisitOrder(g, "A"));
// → ["
