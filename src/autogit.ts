// A node can carry any payload (`T`) and point to its neighbours.
export interface GraphNode<T> {
  value: T;
  neighbours: GraphNode<T>[];
}
/**
 * Recursively performs depth‑limited search.
 *
 * @param node        The node you are currently visiting.
 * @param goalTest    Returns true if the current node satisfies the goal.
 * @param limit       Number of edges left before the search terminates.
 * @param visited     A set of IDs or reference values that keeps track of visited nodes.
 *                    This protects against cycles that would otherwise cause infinite recursion.
 * @returns The first node that satisfies `goalTest`, or `null`.
 */
export function depthLimitedSearchRec<T>(
  node: GraphNode<T>,
  goalTest: (node: GraphNode<T>) => boolean,
  limit: number,
  visited: Set<GraphNode<T>> = new Set()
): GraphNode<T> | null {
  if (goalTest(node)) return node;
  if (limit === 0) return null;          // reached the depth boundary

  visited.add(node);

  for (const neighbour of node.neighbours) {
    if (!visited.has(neighbour)) {
      const result = depthLimitedSearchRec(neighbour, goalTest, limit - 1, visited);
      if (result !== null) return result;
    }
  }

  return null;   // nothing found within this branch
}
interface StackItem<T> {
  node: GraphNode<T>;
  depthLeft: number;
}

/**
 * Iterative depth‑limited search.
 */
export function depthLimitedSearchIter<T>(
  start: GraphNode<T>,
  goalTest: (node: GraphNode<T>) => boolean,
  limit: number
): GraphNode<T> | null {
  const stack: StackItem<T>[] = [{ node: start, depthLeft: limit }];
  const visited: Set<GraphNode<T>> = new Set();

  while (stack.length) {
    const { node, depthLeft } = stack.pop()!;

    if (visited.has(node)) continue;
    visited.add(node);

    if (goalTest(node)) return node;
    if (depthLeft === 0) continue;           // depth boundary reached

    // push neighbours onto the stack – LIFO order means the first neighbour
    // will be processed last, mirroring the recursive DFS behaviour.
    for (const neighbour of node.neighbours) {
      if (!visited.has(neighbour)) {
        stack.push({ node: neighbour, depthLeft: depthLeft - 1 });
      }
    }
  }

  return null;  // no goal reached within depth limit
}
// --- build a simple graph
const a: GraphNode<string> = { value: "A", neighbours: [] };
const b: GraphNode<string> = { value: "B", neighbours: [] };
const c: GraphNode<string> = { value: "C", neighbours: [] };
const d: GraphNode<string> = { value: "D", neighbours: [] };

a.neighbours.push(b, c);   // A -> B, C
b.neighbours.push(d);      // B -> D
c.neighbours.push(d);      // C -> D

// --- goal: find node with value “D”
const isGoal = (node: GraphNode<string>) => node.value === "D";

// Recursive
const resultRec = depthLimitedSearchRec(a, isGoal, 3);
console.log("Recursive result:", resultRec?.value ?? "none");

// Iterative
const resultIter = depthLimitedSearchIter(a, isGoal, 3);
console.log("Iterative result:", resultIter?.value ?? "none");
Recursive result: D
Iterative result: D
