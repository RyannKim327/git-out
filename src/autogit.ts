// DFS on a graph (adjacency list)
type AdjacencyList = Record<string, string[]>;

/**
 * Depth-first search (iterative) on a directed graph.
 * @param graph   Adjacency list
 * @param start   Node to start from
 * @param visit   Callback invoked once per vertex (node)
 */
export function dfsGraph(
  graph: AdjacencyList,
  start: string,
  visit: (node: string) => void
): void {
  const visited = new Set<string>();
  const stack: string[] = [start];

  while (stack.length) {
    const node = stack.pop()!;
    if (visited.has(node)) continue;

    visited.add(node);
    visit(node);

    // Push neighbours in reverse order so that left-most is popped first
    const neighbours = graph[node] ?? [];
    for (let i = neighbours.length - 1; i >= 0; --i) {
      const n = neighbours[i];
      if (!visited.has(n)) stack.push(n);
    }
  }
}

/* ---------- Usage example ---------- */
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe("dfsGraph", () => {
    it("visits in correct order", () => {
      const graph: AdjacencyList = {
        A: ["B", "C"],
        B: ["D", "E"],
        C: ["F"],
        E: ["F"],
        D: [],
        F: [],
      };
      const order: string[] = [];
      dfsGraph(graph, "A", (n) => order.push(n));
      expect(order).toEqual(["A", "B", "D", "E", "F", "C"]);
    });
  });
}
// DFS on a binary tree (pre-order)
export interface TreeNode<T = number> {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
}

/**
 * Depth-first search (pre-order) on a binary tree.
 * @param root   Root node
 * @param visit  Callback invoked once per node
 */
export function dfsTreePreOrder<T>(
  root: TreeNode<T> | undefined,
  visit: (node: TreeNode<T>) => void
): void {
  if (!root) return;
  const stack: TreeNode<T>[] = [root];

  while (stack.length) {
    const node = stack.pop()!;
    visit(node);
    // Right child pushed first so left is processed first
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
}

/* ---------- Usage example ---------- */
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe("dfsTreePreOrder", () => {
    it("traverses pre-order", () => {
      const tree: TreeNode = {
        value: 1,
        left: { value: 2, left: { value: 4 }, right: { value: 5 } },
        right: { value: 3, left: { value: 6 } },
      };
      const out: number[] = [];
      dfsTreePreOrder(tree, (n) => out.push(n.value));
      expect(out).toEqual([1, 2, 4, 5, 3, 6]);
    });
  });
}
export function dfsGraphRecursive(
  graph: AdjacencyList,
  start: string,
  visit: (node: string) => void,
  visited = new Set<string>()
): void {
  if (visited.has(start)) return;
  visited.add(start);
  visit(start);
  for (const n of graph[start] ?? []) {
    dfsGraphRecursive(graph, n, visit, visited);
  }
}
npm i -D vitest
npx vitest run
