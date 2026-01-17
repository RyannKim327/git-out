/**
 * `AdjacencyList` is a mapping from a node key to the keys of its neighbors.
 * It works for directed or undirected graphs – just decide how you add edges.
 */
export type AdjacencyList<K extends string | number> = Record<
  K,
  K[] // List of outgoing neighbor keys
>;
const graph: AdjacencyList<string> = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A', 'D'],
  D: ['B', 'C', 'E'],
  E: ['D'],
};
class Queue<T> {
  private data: T[] = [];
  private head = 0;
  private tail = 0;

  enqueue(item: T) {
    this.data[this.tail++] = item;
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    const item = this.data[this.head];
    // Optional: free memory if the queue shrinks a lot
    if (this.head % 64 === 0) this.data = this.data.slice(this.head);
    this.head++;
    return item;
  }

  isEmpty() {
    return this.head >= this.tail;
  }
}
/**
 * Breadth‑first search on an adjacency list.
 *
 * @param graph      the graph (adjacency list)
 * @param start      the node to start from
 * @param target     optional: stop when this node is reached
 * @returns          { distance: Map<node, number>, parent: Map<node, node | null>, found?: node }
 */
export function bfs<K extends string | number>(
  graph: AdjacencyList<K>,
  start: K,
  target?: K,
) {
  const distance = new Map<K, number>();
  const parent = new Map<K, K | null>();

  const queue = new Queue<K>();
  queue.enqueue(start);
  distance.set(start, 0);
  parent.set(start, null);

  while (!queue.isEmpty()) {
    const current = queue.dequeue()!;
    const curDist = distance.get(current)!;

    // Optional early‑exit
    if (target !== undefined && current === target) {
      return { distance, parent, found: current };
    }

    for (const neighbor of graph[current] ?? []) {
      if (!distance.has(neighbor)) {                // not visited
        distance.set(neighbor, curDist + 1);
        parent.set(neighbor, current);
        queue.enqueue(neighbor);
      }
    }
  }

  return { distance, parent, found: target }; // target not found
}
const result = bfs(graph, 'A', 'E');
console.log('Distance map:', result.distance);
console.log('Parent map:', result.parent);
console.log('Target found?', result.found !== undefined);
Distance map: Map(5) { 'A' => 0, 'B' => 1, 'C' => 1, 'D' => 2, 'E' => 3 }
Parent map: Map(5) { 'A' => null, 'B' => 'A', 'C' => 'A', 'D' => 'B', 'E' => 'D' }
Target found? true
