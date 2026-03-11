// `T` can be any comparable type – string, number, object with an id, etc.
export function bfs<T>(
  start: T,
  graph: Map<T, T[]>,          // adjacency list
  onVisit?: (node: T) => void // optional per‑node work
): T[] {
  const queue: T[] = [start];
  const visited = new Set<T>();
  const order: T[] = [];

  visited.add(start);

  while (queue.length) {
    const node = queue.shift()!;   // node is guaranteed non‑null inside loop

    // Optional callback that lets you do something with the node as you visit it
    if (onVisit) onVisit(node);

    order.push(node);

    for (const neighbor of graph.get(node) ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return order;
}
// Example graph (adjacency list)
const g = new Map<string, string[]>([
  ['A', ['B', 'C']],
  ['B', ['D', 'E']],
  ['C', ['F']],
  ['D', []],
  ['E', ['F']],
  ['F', []]
]);

const order = bfs('A', g);          // ["A", "B", "C", "D", "E", "F"]

console.log('BFS order:', order);
export function bfsFind<T>(
  start: T,
  graph: Map<T, T[]>,
  goal: T
): T[] | null {
  const queue: T[] = [start];
  const visited = new Set<T>();
  visited.add(start);

  while (queue.length) {
    const node = queue.shift()!;

    if (node === goal) {
      // Re‑construct the path if you need it – here we just return the node that found it.
      return [node];
    }

    for (const neighbor of graph.get(node) ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return null; // goal not reachable
}
// Small graph with a cycle
const g2 = new Map<number, number[]>([
  [1, [2, 3]],
  [2, [3]],
  [3, [1, 4]],
  [4, []]
]);

console.log(bfs(1, g2)); // [1, 2, 3, 4]
