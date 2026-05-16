type Node = string | number;

interface Edge {
  to: Node;
  weight: number;
}

type Graph = Map<Node, Edge[]>;         // adjacency list
function buildGraph(edges: Array<[Node, Node, number]>): Graph {
  const graph: Graph = new Map();
  for (const [u, v, w] of edges) {
    if (!graph.has(u)) graph.set(u, []);
    graph.get(u)!.push({ to: v, weight: w });

    // For an undirected graph, repeat the reverse edge:
    // if (!graph.has(v)) graph.set(v, []);
    // graph.get(v)!.push({ to: u, weight: w });
  }
  return graph;
}
class MinHeap<T> {
  private data: { key: number; value: T }[] = [];

  insert(key: number, value: T) {
    this.data.push({ key, value });
    this.bubbleUp(this.data.length - 1);
  }

  extractMin(): { key: number; value: T } | undefined {
    if (!this.data.length) return undefined;
    const min = this.data[0];
    const end = this.data.pop()!;
    if (this.data.length) {
      this.data[0] = end;
      this.bubbleDown(0);
    }
    return min;
  }

  private bubbleUp(idx: number) {
    const element = this.data[idx];
    while (idx > 0) {
      const parentIdx = (idx - 1) >> 1;
      const parent = this.data[parentIdx];
      if (element.key >= parent.key) break;
      this.data[idx] = parent;
      this.data[parentIdx] = element;
      idx = parentIdx;
    }
  }

  private bubbleDown(idx: number) {
    const length = this.data.length;
    const element = this.data[idx];
    while (true) {
      let leftIdx = idx * 2 + 1;
      let rightIdx = idx * 2 + 2;
      let swapIdx: number | null = null;

      if (leftIdx < length) {
        const left = this.data[leftIdx];
        if (left.key < element.key) swapIdx = leftIdx;
      }
      if (rightIdx < length) {
        const right = this.data[rightIdx];
        if (
          (swapIdx === null && right.key < element.key) ||
          (swapIdx !== null && right.key < this.data[swapIdx].key)
        )
          swapIdx = rightIdx;
      }

      if (swapIdx === null) break;
      this.data[idx] = this.data[swapIdx];
      this.data[swapIdx] = element;
      idx = swapIdx;
    }
  }

  get size() { return this.data.length; }
}
/**
 * Computes shortest-path distances from `source` to all reachable nodes.
 *
 * @param graph  Adjacency list of the graph
 * @param source The starting vertex
 * @returns Map from each vertex to its shortest distance from the source
 */
function dijkstra(graph: Graph, source: Node): Map<Node, number> {
  const dist = new Map<Node, number>();
  const heap = new MinHeap<Node>();

  // initialise: distance to source is 0, all others are +∞
  for (const node of graph.keys()) {
    const initial = node === source ? 0 : Infinity;
    dist.set(node, initial);
    heap.insert(initial, node);
  }

  while (heap.size > 0) {
    const { key: d, value: u } = heap.extractMin()!;
    // Skip entries that are stale because a shorter path was already processed
    if (d > dist.get(u)!) continue;

    for (const edge of graph.get(u)!) {
      const alt = d + edge.weight;
      if (alt < dist.get(edge.to)!) {
        dist.set(edge.to, alt);
        heap.insert(alt, edge.to);
      }
    }
  }

  return dist;
}
const edges: Array<[Node, Node, number]> = [
  ['A', 'B', 5],
  ['A', 'C', 2],
  ['B', 'C', 1],
  ['B', 'D', 2],
  ['C', 'D', 3],
  ['C', 'E', 1],
  ['D', 'E', 2],
  ['D', 'F', 1],
  ['E', 'F', 4]
];

const graph = buildGraph(edges);

const distances = dijkstra(graph, 'A');

for (const node of graph.keys()) {
  console.log(`Distance from A to ${node}: ${distances.get(node)}`);
}
Distance from A to A: 0
Distance from A to B: 4
Distance from A to C: 2
Distance from A to D: 5

