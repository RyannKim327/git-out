        1
      /   \
     2     3
    / \     \
   4   5     6
// tree-node.ts
export class TreeNode<T = any> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(value: T, left?: TreeNode<T> | null, right?: TreeNode<T> | null) {
    this.value = value;
    if (left) this.left = left;
    if (right) this.right = right;
  }
}
// max-depth-recursive.ts
import { TreeNode } from "./tree-node";

/**
 * Returns the maximum depth of a binary tree.
 * Time   : O(n) – each node visited once
 * Space  : O(h) – call‑stack depth, where h = tree height (worst‑case O(n))
 */
export function maxDepthRecursive<T>(root: TreeNode<T> | null): number {
  if (!root) return 0;                     // empty subtree
  const leftDepth = maxDepthRecursive(root.left);
  const rightDepth = maxDepthRecursive(root.right);
  return Math.max(leftDepth, rightDepth) + 1;
}
// max-depth-iterative.ts
import { TreeNode } from "./tree-node";

/**
 * Returns the maximum depth of a binary tree using an explicit queue.
 * Time   : O(n)
 * Space  : O(w) – width of the tree (max number of nodes at any level)
 */
export function maxDepthIterative<T>(root: TreeNode<T> | null): number {
  if (!root) return 0;

  const queue: TreeNode<T>[] = [root];
  let depth = 0;

  while (queue.length > 0) {
    const levelSize = queue.length; // nodes at current depth
    depth++;                        // we are about to process a new level

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!; // non‑null because levelSize > 0
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return depth;
}
// index.ts
import { TreeNode } from "./tree-node";
import { maxDepthRecursive } from "./max-depth-recursive";
import { maxDepthIterative } from "./max-depth-iterative";

function buildSampleTree(): TreeNode<number> {
  // Construct the tree shown in the diagram above:
  //        1
  //      /   \
  //     2     3
  //    / \     \
  //   4   5     6
  const n4 = new TreeNode(4);
  const n5 = new TreeNode(5);
  const n6 = new TreeNode(6);
  const n2 = new TreeNode(2, n4, n5);
  const n3 = new TreeNode(3, null, n6);
  const n1 = new TreeNode(1, n2, n3);
  return n1;
}

const root = buildSampleTree();

console.log("Recursive depth:", maxDepthRecursive(root)); // → 3
console.log("Iterative depth:", maxDepthIterative(root)); // → 3

// Edge cases
console.log("Empty tree depth:", maxDepthRecursive(null)); // 0
console.log("Single node depth:", maxDepthIterative(new TreeNode(42))); // 1
npm i -D typescript ts-node @types/node
npx ts-node index.ts
Recursive depth: 3
Iterative depth: 3
Empty tree depth: 0
Single node depth: 1
export class TreeNode<T = any> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
  constructor(value: T, left?: TreeNode<T> | null, right?: TreeNode<T> | null) {
    this.value = value;
    if (left) this.left = left;
    if (right) this.right = right;
  }
}

export function maxDepthRecursive<T>(root: TreeNode<T> | null): number {
  if (!root) return 0;
  return Math.max(maxDepthRecursive(root.left), maxDepthRecursive(root.right)) + 1;
}

export function maxDepthIterative<T>(root: TreeNode<T> | null): number {
  if (!root) return 0;
  const q: TreeNode<T>[] = [root];
  let depth = 0;
  while (q.length) {
    const level = q.length;
    depth++;
    for (let i = 0; i < level; i++) {
      const n = q.shift()!;
      if (n.left) q.push(n.left);
      if (n.right) q.push(n.right);
    }
  }
  return depth;
}
