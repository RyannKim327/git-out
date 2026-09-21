// -----------------------------------------------------------------------------
//  Types
// -----------------------------------------------------------------------------
type Node = string | number;          // any hashable key – string or number
type Weight = number;

interface Edge {
  target: Node;
  weight: Weight;
}

interface Graph {
  // adjacency list: nodeId -> array of outgoing edges
  [node: string]: Edge[];
}

// -----------------------------------------------------------------------------
//  Priority Queue (min‑heap)
// -----------------------------------------------------------------------------
class MinHeap<T> {
  private heap: Array<{ key: number; value: T }> = [];

  // Insert a new element with its priority key
  push(key: number, value: T) {
    this.heap.push({ key, value });
    this.bubbleUp(this.heap.length - 1);
  }

  // Extract element with smallest key
  pop(): T | undefined {
    if (!this.heap.length) return undefined;
    const min = this.heap[0].value;
    const end = this.heap.pop()!;
    if (this.heap.length) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    return min;
  }

  get size() {
    return this.heap.length;
  }

  private bubbleUp(idx: number) {
    const element = this.heap[idx];
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.heap[parentIdx];
      if (element.key >= parent.key) break;
      this.heap[idx] = parent;
      idx = parentIdx;
    }
    this.heap[idx] = element;
  }

  private sinkDown(idx: number) {
    const length = this.heap.length;
    const element = this.heap[idx];

    while (true) {
      const leftIdx = 2 * idx + 1;
      const rightIdx = 2 * idx + 2;
      let swapIdx: number | null = null;

      if (leftIdx < length) {
        if (this.heap[leftIdx].key < element.key) {
          swapIdx = leftIdx;
        }
      }

      if (rightIdx < length) {
        const rightKey = this.heap[rightIdx].key;
        if (
          (swapIdx === null && rightKey < element.key) ||
          (swapIdx !== null && rightKey < this.heap[leftIdx].key)
        ) {
          swapIdx = rightIdx;
        }
      }

      if (swapIdx === null) break;

      this.heap[idx] = this.heap[swapIdx];
      idx = swapIdx;
    }
    this.heap[idx] = element;
  }
}

// -----------------------------------------------------------------------------
//  Dijkstra
// -----------------------------------------------------------------------------
function dijkstra(
  graph: Graph,
  start: Node,
  target?: Node
): { distances: Map<Node, number>; prev: Map<Node, Node | null> } {
  const distances = new Map<Node, number>();
  const prev = new Map<Node, Node | null>();

  // init
  for (const node in graph) {
    distances.set(node, Number.MAX_SAFE_INTEGER);
    prev.set(node, null);
  }
  distances.set(start, 0);

  const heap = new MinHeap<Node>();
  heap.push(0, start);

  while (heap.size) {
    const u = heap.pop()!;
    const distU = distances.get(u)!;

    // If a target was supplied and we reached it, we can stop early
    if (target !== undefined && u === target) break;

    const edges = graph[u as string] ?? [];
    for (const edge of edges) {
      const alt = distU + edge.weight;
      if (alt < (distances.get(edge.target) ?? Number.MAX_SAFE_INTEGER)) {
        distances.set(edge.target, alt);
        prev.set(edge.target, u);
        heap.push(alt, edge.target);
      }
    }
  }

  return { distances, prev };
}

// -----------------------------------------------------------------------------
//  Helper: recover path from prev map
// -----------------------------------------------------------------------------
function recoverPath(
  prev: Map<Node, Node | null>,
  start: Node,
  end: Node
): Node[] {
  const path: Node[] = [];
  let cur: Node | undefined = end;

  while (cur !== undefined && cur !== null) {
    path.unshift(cur);
    cur = prev.get(cur) ?? null;
  }

  if (path[0] !== start) return []; // no path found
  return path;
}

// -----------------------------------------------------------------------------
//  Example
// -----------------------------------------------------------------------------
const graph: Graph = {
  A: [
    { target: "B", weight: 2 },
    { target: "C", weight: 5 },
  ],
  B: [
    { target: "C", weight: 1 },
    { target: "D", weight: 4 },
  ],
  C: [
    { target: "D", weight: 1 },
  ],
  D: [],
};

const { distances, prev } = dijkstra(graph, "A");
console.log(distances);               // Map(…)
console.log(recoverPath(prev, "A", "D"));  // [ 'A', 'B', 'C', 'D' ]
