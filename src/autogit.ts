// graph.ts
export type Vertex = string | number;
export type AdjList<T extends Vertex = Vertex> = Map<T, T[]>;

/**
 * Depth-first search (recursive version).
 * @param graph   Adjacency-list representation.
 * @param start   Vertex where traversal begins.
 * @param visitor Optional callback invoked on every visited vertex.
 * @returns       Set of vertices that were reachable from start.
 */
export function dfs<T extends Vertex>(
  graph: AdjList<T>,
  start: T,
  visitor?: (v: T) => void
): Set<T> {
  const visited = new Set<T>();
  const adj = (v: T) => graph.get(v) ?? [];

  function _visit(v: T): void {
    if (visited.has(v)) return;
    visited.add(v);
    visitor?.(v);
    for (const n of adj(v)) _visit(n);
  }

  _visit(start);
  return visited;
}

/**
 * Depth-first search (iterative version).
 * Same signature as dfs() but uses an explicit stack.
 */
export function dfsIterative<T extends Vertex>(
  graph: AdjList<T>,
  start: T,
  visitor?: (v: T) => void
): Set<T> {
  const visited = new Set<T>();
  const stack: T[] = [start];
  const adj = (v: T) => graph.get(v) ?? [];

  while (stack.length) {
    const v = stack.pop()!;
    if (visited.has(v)) continue;
    visited.add(v);
    visitor?.(v);
    // Push neighbours in reverse so that left-most is processed first
    stack.push(...adj(v).reverse());
  }
  return visited;
}
import { AdjList, dfs, dfsIterative } from './graph';

const g: AdjList<number> = new Map([
  [0, [1, 2]],
  [1, [3, 4]],
  [2, [5]],
  [3, []],
  [4, [5]],
  [5, []],
]);

// Traverse and print every reachable vertex from 0
dfs(g, 0, v => console.log('visited', v));

// Collect vertices in post-order (iterative)
const order: number[] = [];
dfsIterative(g, 0, v => order.push(v));
console.log(order); // → [3, 5, 4, 1, 2, 0]  (one possible order)
