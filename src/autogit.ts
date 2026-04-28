// ---- Graph representation -------------------------------------------------
type Node = string | number;               // you can pick whatever type you prefer
type AdjacencyList = Record<Node, Node[]>; // node -> list of neighbour nodes

class Graph {
  private readonly adj: AdjacencyList = {};

  // Add (or extend) adjacency list for a node
  addEdge(u: Node, v: Node, undirected = true) {
    if (!this.adj[u]) this.adj[u] = [];
    this.adj[u].push(v);

    if (undirected) {
      if (!this.adj[v]) this.adj[v] = [];
      this.adj[v].push(u);
    }
  }

  // Optional: get all nodes in the graph
  nodes(): Node[] {
    return Object.keys(this.adj).map(k => parseNode(k));
  }

  // Expose raw list for BFS
  get neighbours() {
    return this.adj;
  }
}

// Helper to preserve numeric keys when using an object as map
function parseNode(val: string): Node {
  return isNaN(Number(val)) ? val : Number(val);
}

// ---- BFS implementation ---------------------------------------------------
/**
 * Performs a breadth‑first search starting from `source`.
 * @param graph      The graph to search.
 * @param source     The node where we begin the search.
 * @param target     (Optional) If provided, the search stops when this node is reached.
 * @returns          If no target: a map of node → distance from source.
 *                   If target: the distance to that node, or -1 if unreachable.
 */
function bfs(
  graph: Graph,
  source: Node,
  target?: Node
): Record<Node, number> | number {
  const distances: Record<Node, number> = {};
  const queue: Node[] = [source];
  const visited = new Set<Node>();

  visited.add(source);
  distances[source] = 0;

  while (queue.length) {
    const u = queue.shift() as Node;
    const currDist = distances[u] as number;

    // Stop early if we’re looking for a particular target
    if (target !== undefined && u === target) {
      return currDist;
    }

    for (const v of graph.neighbours[u] || []) {
      if (!visited.has(v)) {
        visited.add(v);
        distances[v] = currDist + 1;
        queue.push(v);
      }
    }
  }

  // No path found to `target`
  if (target !== undefined) return -1;

  return distances;
}

// ---- Example usage --------------------------------------------------------
const g = new Graph();
g.addEdge('A', 'B');
g.addEdge('A', 'C');
g.addEdge('B', 'D');
g.addEdge('C', 'D');
g.addEdge('C', 'E');
g.addEdge('E', 'F');

// Full distance map from A
console.log('Distances from A:', bfs(g, 'A'));

// Shortest path length from A to F
console.log('Distance A → F:', bfs(g, 'A', 'F'));
