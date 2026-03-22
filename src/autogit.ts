// 1️⃣  Graph node type (you can replace this with a more complex type)
type Node = string | number;

// 2️⃣  Adjacency list: each node maps to an array of its neighbors
type Graph = Map<Node, Node[]>;

/**
 * Breadth‑first search: returns the order nodes were visited.
 * @param graph The adjacency list.
 * @param start The node to start from.
 */
export function bfsTraversal(graph: Graph, start: Node): Node[] {
  const queue: Node[] = [start];
  const visited = new Set<Node>([start]);
  const order: Node[] = [];

  while (queue.length) {
    const current = queue.shift()!;
    order.push(current);

    const neighbors = graph.get(current) ?? [];
    for (const nb of neighbors) {
      if (!visited.has(nb)) {
        visited.add(nb);
        queue.push(nb);
      }
    }
  }

  return order;
}

/**
 * BFS that stops when it finds a target node.
 * Returns the path from start to target (inclusive).
 * @param graph The adjacency list.
 * @param start The node to start from.
 * @param target The node we’re looking for.
 */
export function bfsPath(graph: Graph, start: Node, target: Node): Node[] | null {
  if (start === target) return [start];

  const queue: Node[] = [start];
  const visited = new Set<Node>([start]);
  const parent = new Map<Node, Node>();

  while (queue.length) {
    const current = queue.shift()!;
    for (const nb of graph.get(current) ?? []) {
      if (!visited.has(nb)) {
        visited.add(nb);
        parent.set(nb, current);
        if (nb === target) {
          // Reconstruct path from target back to start
          const path: Node[] = [target];
          let p = nb;
          while (p !== start) {
            p = parent.get(p)!;
            path.unshift(p);
          }
          return path;
        }
        queue.push(nb);
      }
    }
  }

  return null; // target not reachable
}
const g: Graph = new Map([
  ['A', ['B', 'C']],
  ['B', ['D']],
  ['C', ['E']],
  ['D', ['F']],
  ['E', []],
  ['F', []]
]);

console.log(bfsTraversal(g, 'A')); // ["A","B","C","D","E","F"]
console.log(bfsPath(g, 'A', 'F')); // ["A","B","D","F"]
