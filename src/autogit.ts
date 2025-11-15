export interface Graph<T> {
  key(node: T): string;          // unique id for a node
  neighbors(node: T): Iterable<T>;
}
/**
 * Bidirectional Breadth-First Search
 * ------------------------------------
 * Returns the shortest path (array of nodes) from start to goal.
 * Works on any object type T as long as you supply a Graph<T>.
 */
export function biBFS<T>(
  graph: Graph<T>,
  start: T,
  goal: T
): T[] | null {
  if (graph.key(start) === graph.key(goal)) return [start];

  // ---- front 0 (start -> goal) ----
  const queue0: T[] = [start];
  const parent0 = new Map<string, T>();        // key -> predecessor
  parent0.set(graph.key(start), null as any);

  // ---- front 1 (goal -> start) ----
  const queue1: T[] = [goal];
  const parent1 = new Map<string, T>();
  parent1.set(graph.key(goal), null as any);

  // ---- visited sets ----
  const visited0 = new Set<string>([graph.key(start)]);
  const visited1 = new Set<string>([graph.key(goal)]);

  // ---- alternately expand fronts ----
  let expand0 = true;                          // toggle direction
  while (queue0.length && queue1.length) {
    const currentExpand0 = expand0;
    expand0 = !expand0;

    const [currentQueue, currentVisited, otherVisited, currentParent] =
      currentExpand0
        ? [queue0, visited0, visited1, parent0]
        : [queue1, visited1, visited0, parent1];

    const levelSize = currentQueue.length;
    for (let i = 0; i < levelSize; i++) {
      const node = currentQueue.shift()!;

      for (const neighbor of graph.neighbors(node)) {
        const k = graph.key(neighbor);

        if (currentVisited.has(k)) continue;
        currentVisited.add(k);
        currentParent.set(k, node);
        currentQueue.push(neighbor);

        // ----- collision? -----
        if (otherVisited.has(k)) {
          return reconstructPath(
            graph,
            parent0,
            parent1,
            currentExpand0 ? neighbor : start,
            currentExpand0 ? goal : neighbor
          );
        }
      }
    }
  }

  return null; // no path
}

/* -------------------------------------------------------------- */
/* helpers                                                        */
/* -------------------------------------------------------------- */
function reconstructPath<T>(
  graph: Graph<T>,
  parent0: Map<string, T>,
  parent1: Map<string, T>,
  touch0: T,
  touch1: T
): T[] {
  const key0 = graph.key(touch0);
  const key1 = graph.key(touch1);

  // path from start to meeting point
  const left: T[] = [];
  let n: T | null = touch0;
  while (n !== null) {
    left.push(n);
    n = parent0.get(graph.key(n))!;
  }
  left.reverse();

  // path from meeting point to goal
  const right: T[] = [];
  n = touch1;
  while (n !== null) {
    right.push(n);
    n = parent1.get(graph.key(n))!;
  }

  // stitch together (touch0 and touch1 are the same node)
  return left.concat(right.slice(1));
}
// ---------- a tiny un-directed graph ----------
const edges: Record<string, string[]> = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E", "G"],
  G: ["F"],
};

const graph: Graph<string> = {
  key: (n) => n,
  neighbors: (n) => edges[n] || [],
};

const path = biBFS(graph, "A", "G");
console.log(path); // -> [ 'A', 'C', 'F', 'G' ]
