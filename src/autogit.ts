// Basic node description
export interface Node {
  id: string;           // unique identifier
  // optional coordinates – handy for the heuristic
  x?: number;
  y?: number;
  // all directly reachable neighbours
  neighbors: string[];  // ids of neighbour nodes
}

export interface Edge {
  from: string;      // node id
  to: string;        // node id
  cost: number;      // weight of the edge
}
class PriorityQueue<T> {
  private items: { key: number; value: T }[] = [];

  // swap helpers
  private swap(i: number, j: number) {
    [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
  }

  // bubble‑up to maintain heap invariant
  private bubbleUp(idx: number) {
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (this.items[parent].key <= this.items[idx].key) break;
      this.swap(parent, idx);
      idx = parent;
    }
  }

  // bubble‑down to maintain heap invariant
  private bubbleDown(idx: number) {
    const last = this.items.length - 1;
    while (true) {
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;
      let smallest = idx;

      if (left <= last && this.items[left].key < this.items[smallest].key)
        smallest = left;
      if (right <= last && this.items[right].key < this.items[smallest].key)
        smallest = right;

      if (smallest === idx) break;
      this.swap(idx, smallest);
      idx = smallest;
    }
  }

  // push a new value with a priority
  push(value: T, key: number) {
    this.items.push({ value, key });
    this.bubbleUp(this.items.length - 1);
  }

  // pop the value with the smallest priority
  pop(): T | undefined {
    if (!this.items.length) return undefined;
    const root = this.items[0].value;
    const last = this.items.pop()!;
    if (this.items.length) {
      this.items[0] = last;
      this.bubbleDown(0);
    }
    return root;
  }

  get size(): number {
    return this.items.length;
  }
}
/**
 * Generic A* implementation.
 * @param nodes   Map of node id → Node
 * @param edges   Map of node id → array of out‑going edges
 * @param start   id of the start node
 * @param goal    id of the goal node
 * @param heuristic (node) ⇒ estimated distance to goal
 * @returns array of node ids that form the cheapest path, or empty array if none
 */
export function aStar(
  nodes: Map<string, Node>,
  edges: Map<string, Edge[]>,
  start: string,
  goal: string,
  heuristic: (nodeId: string) => number
): string[] {
  // G‑costs: current best known cost to each node
  const g: Map<string, number> = new Map();
  g.set(start, 0);

  // Came‑from map to rebuild the path
  const cameFrom: Map<string, string> = new Map();

  // Open set – priority queue keyed by F = G + H
  const open = new PriorityQueue<string>();
  open.push(start, heuristic(start));

  // Closed set: processed nodes
  const closed = new Set<string>();

  while (open.size > 0) {
    const current = open.pop()!;

    // Goal found – reconstruct the path
    if (current === goal) {
      const path: string[] =
