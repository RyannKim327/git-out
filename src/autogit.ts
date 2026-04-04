class Queue<T> {
  private items: T[] = [];
  private start = 0;          // index of the front

  push(item: T) {
    this.items.push(item);
  }

  pop(): T | undefined {
    if (this.isEmpty()) return undefined;
    const item = this.items[this.start++];
    // optional cleanup to keep array short
    if (this.start > 100 && this.start * 2 > this.items.length) {
      this.items = this.items.slice(this.start);
      this.start = 0;
    }
    return item;
  }

  isEmpty() {
    return this.start >= this.items.length;
  }
}
type Node = string | number | symbol;  // whatever shape you need

/**
 * Breadth-First Search
 *
 * @param graph   adjacency list mapping each node to its neighbours
 * @param start   node from which to begin traversal
 * @param cb      optional callback executed for every visited node
 * @returns       an array of nodes in the order they were visited
 */
function bfs<Node>(
  graph: Map<Node, Node[]>, 
  start: Node,
  cb?: (node: Node) => void
): Node[] {
  const visited = new Set<Node>();
  const queue = new Queue<Node>();
  const order: Node[] = [];

  queue.push(start);
  visited.add(start);

  while (!queue.isEmpty()) {
    const current = queue.pop()!;
    order.push(current);

    // run user code if supplied
    cb?.(current);

    const neighbours = graph.get(current) ?? [];
    for (const neighbour of neighbours) {
      if (!visited.has(neighbour)) {
        visited.add(neighbour);
        queue.push(neighbour);
      }
    }
  }

  return order;
}
const graph = new Map<number, number[]>([
  [1, [2, 3]],
  [2, [4, 5]],
  [3, [6]],
  [4, []],
  [5, []],
  [6, []]
]);

console.log(bfs(graph, 1)); // [1, 2, 3, 4, 5, 6]
function bfsStop<T>(
  graph: Map<T, T[]>,
  start: T,
  onVisit: (node: T) => boolean // true → stop
) {
  const visited = new Set<T>();
  const queue = new Queue<T>();

  queue.push(start);
  visited.add(start);

  while (!queue.isEmpty()) {
    const cur = queue.pop()!;
    if (onVisit(cur)) return cur;   // finished

    for (const nxt of graph.get(cur) ?? []) {
      if (!visited.has(nxt)) {
        visited.add(nxt);
        queue.push(nxt);
      }
    }
  }
  return undefined;
}
