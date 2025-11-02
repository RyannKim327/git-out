// A*.ts
export interface Node<T = any> {
  id: string;          // must be unique
  x: number;           // for heuristic only (can be 0-D)
  y: number;
  data?: T;             // optional payload
}

export interface Edge {
  from: string;
  to: string;
  cost: number;
}

export interface Graph {
  nodes: Map<string, Node>;
  outbound: Map<string, Edge[]>; // adjacency list
}

/** Euclidean distance (change to Manhattan, Chebyshev, etc. if needed) */
function heuristic(a: Node, b: Node): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

/** Reconstruct path from goal to start by following .parent */
function rebuildPath(cameFrom: Map<string, string | null>, goal: string): string[] {
  const path: string[] = [];
  let curr: string | null = goal;
  while (curr !== null) {
    path.unshift(curr);
    curr = cameFrom.get(curr)!;
  }
  return path;
}

export interface AStarResult {
  path: string[];      // empty if no route
  cost: number;        // Infinity if no route
  explored: number;      // number of nodes popped from open
}

/**
 * A* search on a generic graph.
 * Returns the shortest path (array of node ids) and its total cost.
 */
export function aStar(graph: Graph, startId: string, goalId: string): AStarResult {
  const start = graph.nodes.get(startId);
  const goal = graph.nodes.get(goalId);
  if (!start || !goal) return { path: [], cost: Infinity, explored: 0 };

  // Min-heap keyed by fScore
  interface Entry { id: string; f: number }
  const openHeap: Entry[] = [];
  const indexOf = (id: string) => openHeap.findIndex(e => e.id === id);

  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();
  const cameFrom = new Map<string, string | null>();

  gScore.set(startId, 0);
  fScore.set(startId, heuristic(start, goal));
  openHeap.push({ id: startId, f: fScore.get(startId)! });

  let explored = 0;

  while (openHeap.length) {
    // pop smallest f
    openHeap.sort((a, b) => a.f - b.f);
    const current = openHeap.shift()!.id;
    explored++;

    if (current === goalId) {
      return {
        path: rebuildPath(cameFrom, goalId),
        cost: gScore.get(goalId)!,
        explored,
      };
    }

    const edges = graph.outbound.get(current) ?? [];
    for (const edge of edges) {
      const neighbor = edge.to;
      const tentativeG = gScore.get(current)! + edge.cost;

      if (tentativeG < (gScore.get(neighbor) ?? Infinity)) {
        cameFrom.set(neighbor, current);
        gScore.set(neighbor, tentativeG);
        const h = heuristic(graph.nodes.get(neighbor)!, goal);
        const f = tentativeG + h;
        fScore.set(neighbor, f);

        const idx = indexOf(neighbor);
        if (idx === -1) {
          openHeap.push({ id: neighbor, f });
        } else {
          openHeap[idx].f = f; // update key
        }
      }
    }
  }

  return { path: [], cost: Infinity, explored };
}
import { Graph, Node, Edge, aStar } from './A*';

function buildGridGraph(width: number, height: number, barriers: Set<string>): Graph {
  const nodes = new Map<string, Node>();
  const outbound = new Map<string, Edge[]>();

  const key = (x: number, y: number) => `${x},${y}`;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const id = key(x, y);
      if (barriers.has(id)) continue;
      nodes.set(id, { id, x, y });
      outbound.set(id, []);
    }
  }

  for (const [id, node] of nodes) {
    for (const [dx, dy] of dirs) {
      const nx = node.x + dx, ny = node.y + dy;
      const nid = key(nx, ny);
      if (nodes.has(nid)) {
        outbound.get(id)!.push({ from: id, to: nid, cost: 1 });
      }
    }
  }
  return { nodes, outbound };
}

const barriers = new Set(['2,2', '2,3', '3,2']);
const graph = buildGridGraph(5, 5, barriers);
const result = aStar(graph, '0,0', '4,4');
console.log('path:', result.path, 'cost:', result.cost);
