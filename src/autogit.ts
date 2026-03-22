/*  Depth‑first search (BFS) that stops after exploring a given number of levels.
 *
 *  - `Node`   – a generic representation of a graph vertex.
 *  - `getNeighbors` – a callback that returns the adjacent nodes.
 *  - `goal` – a predicate that tells whether the node is satisfactory.
 *  - `maxDepth` – how many edges away from the start we’ll consider.
 *
 *  The function yields an array of nodes in the order they were visited
 *  (first‑in, first‑out).  The result can be empty when the goal isn’t
 *  found before the depth limit.
 */

type Node = {
  id: string | number;
  // … other properties
};

export function breadthLimitedSearch(
  start: Node,
  maxDepth: number,
  goal: (n: Node) => boolean,
  getNeighbors: (n: Node) => Node[]
): Node[] {
  if (maxDepth < 0) return [];

  const frontier: Array<{ node: Node; depth: number }> = [{ node: start, depth: 0 }];
  const visited = new Set<Node>();
  const result: Node[] = [];

  while (frontier.length) {
    const { node, depth } = frontier.shift()!; // safe pop because we always pop a value
    if (visited.has(node)) continue;
    visited.add(node);

    result.push(node);
    if (goal(node)) break;

    // If we haven’t hit the depth ceiling, enqueue the next layer
    if (depth < maxDepth) {
      const neighbours = getNeighbors(node);
      for (const neighbour of neighbours) {
        if (!visited.has(neighbour)) {
          frontier.push({ node: neighbour, depth: depth + 1 });
        }
      }
    }
  }
  return result;
}
