interface Node<T = any> {
  value: T;
  neighbors: Node<T>[];
  // optional metadata for the search
  depth?: number;
}
function depthLimitedSearch<T>(
  root: Node<T>,
  isGoal: (node: Node<T>) => boolean,
  maxDepth: number
): Node<T> | null {
  function dfs(node: Node<T>, depth: number): Node<T> | null {
    if (depth > maxDepth) return null;          // over the ceiling
    if (isGoal(node)) return node;             // goal found

    for (const neigh of node.neighbors) {
      const result = dfs(neigh, depth + 1);
      if (result) return result;               // propagate up
    }
    return null;                               // no goal along this path
  }

  return dfs(root, 0);
}
function depthLimitedIterative<T>(
  root: Node<T>,
  isGoal: (node: Node<T>) => boolean,
  maxDepth: number
): Node<T> | null {
  const stack: Array<{ node: Node<T>; depth: number }> = [{ node: root, depth: 0 }];

  while (stack.length) {
    const { node, depth } = stack.pop()!;

    if (depth > maxDepth) continue;          // skip over‑depth nodes
    if (isGoal(node)) return node;           // hit the target

    // Push neighbors in reverse order if you want the left‑most first
    for (let i = node.neighbors.length - 1; i >= 0; i--) {
      stack.push({ node: node.neighbors[i], depth: depth + 1 });
    }
  }

  return null; // exhausted without finding goal
}
// Build a tiny graph
const leaf = { value: 'leaf', neighbors: [] };
const mid   = { value: 'mid',   neighbors: [leaf] };
const root  = { value: 'root',  neighbors: [mid] };

const found = depthLimitedSearch(root, node => node.value === 'leaf', 3);
console.log(found?.value); // → "leaf"
function breadthLimitedSearch<T>(
  root: Node<T>,
  isGoal: (node: Node<T>) => boolean,
  maxDepth: number
): Node<T> | null {
  const queue: Array<{ node: Node<T>; depth: number }> = [{ node: root, depth: 0 }];

  while (queue.length) {
    const { node, depth } = queue.shift()!;

    if (depth > maxDepth) continue;
    if (isGoal(node)) return node;

    for (const neigh of node.neighbors) {
      queue.push({ node: neigh, depth: depth + 1 });
    }
  }

  return null;
}
