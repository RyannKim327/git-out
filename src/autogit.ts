/**
 * Generic type for a node in the search space.
 * - `T` is the payload type (e.g., number, string, custom object).
 * - The node must expose a way to enumerate its neighbours.
 */
export interface SearchNode<T> {
  /** The payload/value stored in the node (optional, you can ignore it). */
  value: T;

  /** Returns an iterable of neighbour nodes. */
  getNeighbors(): Iterable<SearchNode<T>>;
}

/**
 * Depth‑Limited Search.
 *
 * @param start   The node where the search begins.
 * @param isGoal  Predicate that returns true for the goal node.
 * @param limit   Maximum depth allowed (0 = only the start node is examined).
 * @param visited Optional Set to keep track of visited nodes (useful for graphs with cycles).
 *
 * @returns The goal node if found within the limit, otherwise `null`.
 */
export function depthLimitedSearch<T>(
  start: SearchNode<T>,
  isGoal: (node: SearchNode<T>) => boolean,
  limit: number,
  visited: Set<SearchNode<T>> = new Set()
): SearchNode<T> | null {
  // -----------------------------------------------------------------
  // Helper: recursive DFS that respects the depth limit.
  // -----------------------------------------------------------------
  function recurse(node: SearchNode<T>, depth: number): SearchNode<T> | null {
    // 1️⃣ Goal test
    if (isGoal(node)) return node;

    // 2️⃣ Depth limit reached → stop expanding this branch
    if (depth === limit) return null;

    // 3️⃣ Cycle protection (only for graph‑like structures)
    if (visited.has(node)) return null;
    visited.add(node);

    // 4️⃣ Explore children
    for (const neighbor of node.getNeighbors()) {
      const result = recurse(neighbor, depth + 1);
      if (result !== null) return result; // early exit on success
    }

    // 5️⃣ No success in this subtree
    return null;
  }

  // Kick‑off the recursion at depth 0
  return recurse(start, 0);
}
// ---------------------------------------------------------------
// Example: a tiny tree where each node holds a number.
// ---------------------------------------------------------------
class NumberNode implements SearchNode<number> {
  constructor(public value: number, private children: NumberNode[] = []) {}

  getNeighbors(): Iterable<NumberNode> {
    return this.children;
  }

  // Helper to add a child (makes building the tree easier)
  addChild(child: NumberNode): void {
    this.children.push(child);
  }
}

// Build a sample tree:
//          1
//        /   \
//       2     3
//      / \     \
//     4   5     6
//                \
//                 7
const root = new NumberNode(1);
const n2 = new NumberNode(2);
const n3 = new NumberNode(3);
const n4 = new NumberNode(4);
const n5 = new NumberNode(5);
const n6 = new NumberNode(6);
const n7 = new NumberNode(7);

root.addChild(n2);
root.addChild(n3);
n2.addChild(n4);
n2.addChild(n5);
n3.addChild(n6);
n6.addChild(n7);

// ---------------------------------------------------------------
// Goal: find the node whose value === 7, but only allow depth ≤ 3.
// ---------------------------------------------------------------
const goalPredicate = (node: SearchNode<number>) => node.value === 7;
const depthLimit = 3; // root is depth 0, children depth 1, ...

const found = depthLimitedSearch(root, goalPredicate, depthLimit);

if (found) {
  console.log(`✅ Found node with value ${found.value} at depth ≤ ${depthLimit}`);
} else {
  console.log(`❌ Goal not reachable within depth ${depthLimit}`);
}
✅ Found node with value 7 at depth ≤ 3
function depthLimitedSearchPath<T>(
  start: SearchNode<T>,
  isGoal: (node: SearchNode<T>) => boolean,
  limit: number,
  visited: Set<SearchNode<T>> = new Set()
): SearchNode<T>[] | null {
  function recurse(node: SearchNode<T>, depth: number, path: SearchNode<T>[]): SearchNode<T>[] | null {
    if (isGoal(node)) return [...path, node];
    if (depth === limit) return null;
    if (visited.has(node)) return null;
    visited.add(node);

    for (const nb of node.getNeighbors()) {
      const result = recurse(nb, depth + 1, [...path, node]);
      if (result) return result;
    }
    return null;
  }

  return recurse(start, 0, []);
}
export function iterativeDeepeningSearch<T>(
  start: SearchNode<T>,
  isGoal: (node: SearchNode<T>) => boolean,
  maxDepth: number = 1000 // safety guard
): SearchNode<T> | null {
  for (let limit = 0; limit <= maxDepth; limit++) {
    const result = depthLimitedSearch(start, isGoal, limit);
    if (result) return result;
  }
  return null; // not found within maxDepth
}
export function depthLimitedSearchIterative<T>(
  start: SearchNode<T>,
  isGoal: (node: SearchNode<T>) => boolean,
  limit: number,
  visited: Set<SearchNode<T>> = new Set()
): SearchNode<T> | null {
  // Stack holds tuples: [node, depth]
  const stack: Array<[SearchNode<T>, number]> = [[start, 0]];

  while (stack.length) {
    const [node, depth] = stack.pop()!; // non‑null because length > 0

    if (isGoal(node)) return node;
    if (depth === limit) continue;
    if (visited.has(node)) continue;
    visited.add(node);

    // Push children – order reversed if you want left‑to‑right DFS
    for (const nb of node.getNeighbors()) {
      stack.push([nb, depth + 1]);
    }
  }

  return null;
}
// ---------------------------------------------------------------
// 1️⃣  Interfaces & Core DLS
// ---------------------------------------------------------------
export interface SearchNode<T> {
  value: T;
  getNeighbors(): Iterable<SearchNode<T>>;
}

/**
 * Depth‑Limited Search (recursive version)
 */
export function depthLimitedSearch<T>(
  start: SearchNode<T>,
  isGoal: (node: SearchNode<T>) => boolean,
  limit: number,
  visited: Set<SearchNode<T>> = new Set()
): SearchNode<T> | null {
  function recurse(node: SearchNode<T>, depth: number): SearchNode<T> | null {
    if (isGoal(node)) return node;
    if (depth === limit) return null;
    if (visited.has(node)) return null;
    visited.add(node);

    for (const nb of node.getNeighbors()) {
      const result = recurse(nb, depth + 1);
      if (result) return result;
    }
    return null;
  }

  return recurse(start, 0);
}

// ---------------------------------------------------------------
// 2️⃣  Concrete node implementation (simple numeric tree)
// ---------------------------------------------------------------
class NumberNode implements SearchNode<number> {
  constructor(public value: number, private children: NumberNode[] = []) {}

  getNeighbors(): Iterable<NumberNode> {
    return this.children;
  }

  addChild(child: NumberNode): void {
    this.children.push(child);
  }
}

// ---------------------------------------------------------------
// 3️⃣  Build a sample tree
// ---------------------------------------------------------------
const root = new NumberNode(1);
const n2 = new NumberNode(2);
const n3 = new NumberNode(3);
const n4 = new NumberNode(4);
const n5 = new NumberNode(5);
const n6 = new NumberNode(6);
const n7 = new NumberNode(7);

root.addChild(n2);
root.addChild(n3);
n2.addChild(n4);
n2.addChild(n5);
n3.addChild(n6);
n6.addChild(n7);

// ---------------------------------------------------------------
// 4️⃣  Run DLS
// ---------------------------------------------------------------
const goal = (node: SearchNode<number>) => node.value === 7;
const limit = 3; // try 2 to see a failure

const result = depthLimitedSearch(root, goal, limit);

if (result) {
  console.log(`✅ Goal found! Node value = ${result.value}`);
} else {
  console.log(`❌ Goal not reachable within depth ${limit}`);
}
function dls<T>(start: SearchNode<T>, goal: (n: SearchNode<T>) => boolean, limit: number) {
  const visited = new Set<SearchNode<T>>();
  const dfs = (node: SearchNode<T>, depth: number): SearchNode<T> | null => {
    if (goal(node)) return node;
    if (depth === limit || visited.has(node)) return null;
    visited.add(node);
    for (const nb of node.getNeighbors()) {
      const r = dfs(nb, depth + 1);
      if (r) return r;
    }
    return null;
  };
  return dfs(start, 0);
}
