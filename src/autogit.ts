// ------------------------------
// generic BFS
// ------------------------------
type NodeKey = string | number;

interface GraphLike {
  getNeighbours(key: NodeKey): NodeKey[];
}

/**
 * Breadth-first search.
 * @param graph       anything that implements GraphLike
 * @param start       starting vertex key
 * @param onVisit     optional callback invoked when a node is *first* visited
 * @param onExit      optional callback invoked when a node is fully processed
 *                    (all its neighbours already visited)
 */
export function bfs(
  graph: GraphLike,
  start: NodeKey,
  onVisit?: (key: NodeKey) => void,
  onExit?: (key: NodeKey) => void
): {
  visited: Set<NodeKey>;
  distance: Map<NodeKey, number>;
  parent: Map<NodeKey, NodeKey | null>;
} {
  const visited = new Set<NodeKey>();
  const distance = new Map<Node<T>, number>();
  const parent = new Map<Node<T>, Node<T> | null>();

  const queue: NodeKey[] = [start];

  visited.add(start);
  distance.set(start, 0);
  parent.set(start, null);
  onVisit?.(start);

  while (queue.length) {
    const current = queue.shift()!;

    for (const neighbor of graph.getNeighbours(current)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        distance.set(neighbor, distance.get(current)! + 1);
        parent.set(neighbor, current);
        onVisit?.(neighbor);
        queue.push(neighbor);
      }
    }
    onExit?.(current);
  }
  return { visited, distance, parent };
}

// ------------------------------
// example: adjacency-list graph
// ------------------------------
class AdjacencyList implements GraphLike {
  private list = new Map<NodeKey, NodeKey[]>();

  addEdge(from: NodeKey, to: NodeKey): void {
    if (!this.list.has(from)) this.list.set(from, []);
    this.list.get(from)!.push(to);
  }

  getNeighbours(key: NodeKey): NodeKey[] {
    return this.list.get(key) ?? [];
  }
}

// ------------------------------
// quick sanity check
// ------------------------------
if (require.main === module) {
  const g = new AdjacencyList();
  g.addEdge('A', 'B');
  g.addEdge('A', 'C');
  g.addEdge('B', 'D');
  g.addEdge('C', 'E');
  g.addEdge('E', 'F');

  const { distance, parent } = bfs(g, 'A');
  console.log('distance', [...distance.entries()]); // A:0  B:1  C:1  D:2  E:2  F:3
  console.log('parent', [...parent.entries()]);
}
