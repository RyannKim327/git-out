// ---------------------------------------------
// 1.  Types
// ---------------------------------------------
type AdjacencyList = Record<string, string[]>;

interface BFSResult {
  /** Order in which vertices were first visited */
  visitedOrder: string[];
  /** parent[v] === u means u was v’s predecessor on a shortest path from start */
  parent: Record<string, string | null>;
  /** Distance from start (number of edges) */
  distance: Record<string, number>;
}

// ---------------------------------------------
// 2.  Core BFS
// ---------------------------------------------
function bfs(
  graph: AdjacencyList,
  start: string,
  goal?: string
): BFSResult {
  const visitedOrder: string[] = [];
  const parent: Record<string, string | null> = {};
  const distance: Record<string, number> = {};
  const queue: string[] = [];

  // Initialise
  for (const v of Object.keys(graph)) {
    parent[v] = null;
    distance[v] = Infinity;
  }
  distance[start] = 0;
  queue.push(start);

  // Search
  while (queue.length) {
    const u = queue.shift()!;          // dequeue
    visitedOrder.push(u);

    if (u === goal) break;             // early exit if we only care about one target

    for (const v of graph[u] || []) {
      if (distance[v] === Infinity) {  // not yet discovered
        distance[v] = distance[u] + 1;
        parent[v] = u;
        queue.push(v);                   // enqueue
      }
    }
  }
  return { visitedOrder, parent, distance };
}

// ---------------------------------------------
// 3.  Helper: reconstruct shortest path
// ---------------------------------------------
function shortestPath(parent: Record<string, string | null>, start: string, goal: string): string[] {
  if (parent[goal] === undefined) throw new Error(`Vertex "${goal}" not found in parent map`);
  const path: string[] = [];
  let curr: string | null = goal;
  while (curr !== null) {
    path.unshift(curr);
    curr = parent[curr];
  }
  if (path[0] !== start) return [];      // no path exists
  return path;
}

// ---------------------------------------------
// 4.  Demo
// ---------------------------------------------
const g: AdjacencyList = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: [],
  E: ['F'],
  F: [],
};

const res = bfs(g, 'A');
console.log('Visit order:', res.visitedOrder);
console.log('Parent map :', res.parent);
console.log('Distance   :', res.distance);
console.log('Shortest A→F:', shortestPath(res.parent, 'A', 'F')); // ["A","C","F"]
function edgeListToAdjacency(edges: [string, string][]): AdjacencyList {
  const adj: AdjacencyList = {};
  for (const [u, v] of edges) {
    (adj[u] ||= []).push(v);
    (adj[v] ||= []).push(u);   // remove this line for directed graphs
  }
  return adj;
}

const edges: [string, string][] = [['A','B'],['A','C'],['B','D'],['B','E'],['C','F']];
const g2 = edgeListToAdjacency(edges);
console.log(bfs(g2, 'A'));
