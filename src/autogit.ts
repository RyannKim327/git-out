type Weight = number;

interface Edge<V> {
  to: V;
  weight: Weight;
}

type Graph<V> = Map<V, Edge<V>[]>;
/**
 * Returns a map with the shortest distance from `start` to every reachable vertex.
 * If you also need the paths, see the optional `prev` Map further below.
 */
function dijkstra<V>(
  graph: Graph<V>,
  start: V
): Map<V, Weight>;

/**
 * Reconstruct the shortest path from start to goal.
 * Returns both the total weight and the vertex sequence.
 */
function shortestPath<V>(
  graph: Graph<V>,
  start: V,
  goal: V
): { distance: Weight; path: V[] } | null;
type Weight = number;

interface Edge<V> {
  to: V;
  weight: Weight;
}

type Graph<V> = Map<V, Edge<V>[]>;

/**
 * Generic binary heap (min-heap) keyed by numeric priority.
 * Could be replaced by a 3rd-party package, but we keep zero deps.
 */
class MinHeap<T> {
  private data: { key: T; priority: Weight }[] = [];

  get length(): number { return this.data.length; }

  push(key: T, priority: Weight): void {
    this.data.push({ key, priority });
    this.bubbleUp(this.data.length - 1);
  }

  pop(): { key: T; priority: Weight } | undefined {
    if (this.data.length === 0) return undefined;
    const top = this.data[0];
    const bottom = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = bottom;
      this.bubbleDown(0);
    }
    return top;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parent = (index - 1) >> 1;
      if (this.data[parent].priority <= this.data[index].priority) break;
      [this.data[parent], this.data[index]] = [this.data[index], this.data[parent]];
      index = parent;
    }
  }

  private bubbleDown(index: number): void {
    const n = this.data.length;
    while (true) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;
      if (left < n && this.data[left].priority < this.data[smallest].priority) smallest = left;
      if (right < n && this.data[right].priority < this.data[smallest].priority) smallest = right;
      if (smallest === index) break;
      [this.data[index], this.data[smallest]] = [this.data[smallest], this.data[index]];
      index = smallest;
    }
  }
}

/**
 * Core Dijkstra: returns shortest distance to every reachable vertex.
 * Optionally populate `prev` Map to reconstruct paths.
 */
export function dijkstra<V>(
  graph: Graph<V>,
  start: V,
  prev?: Map<V, V | undefined>
): Map<V, Weight> {
  const dist = new Map<V, Weight>();
  const heap = new MinHeap<V>();

  // Initialise
  dist.set(start, 0);
  heap.push(start, 0);
  if (prev) prev.set(start, undefined);

  while (heap.length > 0) {
    const { key: u } = heap.pop()!;
    const du = dist.get(u)!;

    for (const { to: v, weight } of graph.get(u) ?? []) {
      const alt = du + weight;
      if (alt < (dist.get(v) ?? Infinity)) {
        dist.set(v, alt);
        heap.push(v, alt);
        if (prev) prev.set(v, u);
      }
    }
  }
  return dist;
}

/**
 * Convenience wrapper that returns both distance and vertex sequence.
 */
export function shortestPath<V>(
  graph: Graph<V>,
  start: V,
  goal: V
): { distance: Weight; path: V[] } | null {
  const prev = new Map<V, V | undefined>();
  const dist = dijkstra(graph, start, prev);

  if (dist.get(goal) === undefined) return null;

  // Reconstruct path
  const path: V[] = [];
  let cur: V | undefined = goal;
  while (cur !== undefined) {
    path.unshift(cur);
    cur = prev.get(cur);
  }
  return { distance: dist.get(goal)!, path };
}
import { Graph, shortestPath } from './dijkstra';

const g: Graph<string> = new Map([
  ['A', [{ to: 'B', weight: 4 }, { to: 'C', weight: 2 }]],
  ['B', [{ to: 'C', weight: 1 }, { to: 'D', weight: 5 }]],
  ['C', [{ to: 'D', weight: 8 }, { to: 'E', weight: 10 }]],
  ['D', [{ to: 'E', weight: 2 }]],
  ['E', []],
]);

const result = shortestPath(g, 'A', 'E');
if (result) {
  console.log(`Distance: ${result.distance}`); // -> 11
  console.log(`Path: ${result.path.join(' -> ')}`); // A -> C -> B -> D -> E
} else {
  console.log('No path');
}
