// ───────────────────── Graph Types ───────────────────────────────────────
type NodeId = string | number;          // anything that can be compared with ===
interface AdjList {
  // nodeId -> array of neighbor nodeIds
  [key: string]: NodeId[];
}

// ───────────────────── BFS Implementation ────────────────────────────────
function bfs(
  graph: AdjList,
  start: NodeId,
  visit: (node: NodeId) => void = () => {}
): NodeId[] {
  const visited = new Set<NodeId>();
  const queue: NodeId[] = [];
  const order: NodeId[] = [];      // keep track of the order in which nodes are seen

  visited.add(start);
  queue.push(start);

  while (queue.length > 0) {
    const current = queue.shift()!; // safe: queue is guaranteed non‑empty inside loop

    visit(current);        // optional callback that may do whatever you want
    order.push(current);

    for (const neigh of graph[current] ?? []) {
      if (!visited.has(neigh)) {
        visited.add(neigh);
        queue.push(neigh);
      }
    }
  }

  return order;           // return traversal order if you need it
}

// ───────────────────── Example Usage ──────────────────────────────────────
const exampleGraph: AdjList = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A', 'F'],
  D: ['B'],
  E: ['B', 'F'],
  F: ['C', 'E'],
};

const traversal = bfs(exampleGraph, 'A');
console.log('BFS order:', traversal);
// → BFS order: [ 'A', 'B', 'C', 'D', 'E', 'F' ]

// If you only care about distances from the start node:
function bfsDistances(graph: AdjList, start: NodeId): Map<NodeId, number> {
  const distances = new Map<NodeId, number>();
  const visited = new Set<NodeId>();
  const queue: NodeId[] = [];

  visited.add(start);
  distances.set(start, 0);
  queue.push(start);

  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const neigh of graph[current] ?? []) {
      if (!visited.has(neigh)) {
        visited.add(neigh);
        distances.set(neigh, distances.get(current)! + 1);
        queue.push(neigh);
      }
    }
  }

  return distances;
}

const dists = bfsDistances(exampleGraph, 'A');
console.log('Distances from A:', Object.fromEntries(dists.entries()));
// → Distances from A: { A: 0, B: 1, C: 1, D: 2, E: 2, F: 2 }
