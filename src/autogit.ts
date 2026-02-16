/* ------------------------------------------------------------------
   Node definitions (customise to your data shape)
------------------------------------------------------------------- */
export interface Node {
  id: string | number;
  /* Any other properties you need – e.g. parent, distance, etc. */
}

export interface Graph {
  /** Returns the neighbours of a given node ID. */
  neighbours(id: Node["id"]): Node[];

  /** Optional: expands a node – useful if nodes need lazy loading. */
  expand?(node: Node): void;
}

/* ------------------------------------------------------------------
   Breadth‑Limited Search
------------------------------------------------------------------- */
type GoalPredicate<T> = (node: T) => boolean;

export function breadthLimitedSearch<T extends Node>(
  graph: Graph,
  root: T,
  goal: GoalPredicate<T>,
  maxDepth: number
): T | null {
  // A queue that holds tuples: [node, depth]
  const frontier: Array<[T, number]> = [[root, 0]];
  const visited = new Set<T["id"]>();

  visited.add(root.id);

  while (frontier.length !== 0) {
    const [current, depth] = frontier.shift()!; // pop front

    // Goal hit
    if (goal(current)) return current;

    // If we reached the depth ceiling, skip expansion
    if (depth === maxDepth) continue;

    // Expand or otherwise load neighbours if you need lazy loading
    if (graph.expand) graph.expand(current);

    const neighbors = graph.neighbours(current.id);
    for (const child of neighbors) {
      if (!visited.has(child.id)) {
        visited.add(child.id);
        frontier.push([child, depth + 1]);
      }
    }
  }

  // No solution within the depth limit
  return null;
}
// Simple graph representation
class MyGraph implements Graph {
  nodes: Record<string, Node> = {};

  constructor(nodeList: Node[]) {
    nodeList.forEach(node => (this.nodes[node.id] = node));
  }

  neighbours(id: string | number) {
    // Example: assume every node has a "children" array of ids
    const node = this.nodes[id];
    return (node as any).children?.map((cId: string | number) => this.nodes[cId]) ?? [];
  }
}

// Example nodes
const nodes: Node[] = [
  { id: 1, ...( { children: [2, 3] } as any ) },
  { id: 2, ...( { children: [4] } as any ) },
  { id: 3 },
  { id: 4 }
];

const graph = new MyGraph(nodes);

const root = graph.nodes[1];
const goal = (n: Node) => n.id === 4;
const depthLimit = 2;

const solution = breadthLimitedSearch(graph, root, goal, depthLimit);
console.log(solution); // Node with id 4 (found at depth 2)
