/**
 * Simple binary‑tree node.
 * - `value` can be any type you need (number, string, object …)
 * - `left` and `right` are either another TreeNode or `null`
 */
export interface TreeNode<T = any> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}
/**
 * Returns the number of leaf nodes in the binary tree rooted at `root`.
 *
 * A leaf is a node whose both children are `null`.
 *
 * @param root - The root of the tree (or `null` for an empty tree)
 * @returns Number of leaf nodes
 */
export function countLeavesRecursive<T>(root: TreeNode<T> | null): number {
  // Empty tree → no leaves
  if (root === null) return 0;

  // Leaf node (both children missing)
  if (root.left === null && root.right === null) return 1;

  // Otherwise sum the leaves of the sub‑trees
  return (
    countLeavesRecursive(root.left) + countLeavesRecursive(root.right)
  );
}
/**
 * Iterative breadth‑first (queue) version.
 *
 * @param root - The root of the tree (or `null` for an empty tree)
 * @returns Number of leaf nodes
 */
export function countLeavesIterative<T>(root: TreeNode<T> | null): number {
  if (root === null) return 0;

  const queue: (TreeNode<T> | null)[] = [root];
  let leafCount = 0;

  while (queue.length > 0) {
    const node = queue.shift()!; // non‑null because we never push null

    // If both children are null → leaf
    if (node.left === null && node.right === null) {
      leafCount++;
    } else {
      // Enqueue existing children
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
  }

  return leafCount;
}
import { TreeNode, countLeavesRecursive, countLeavesIterative } from "./yourModule";

// Helper to build a node (makes the demo a bit cleaner)
function node<T>(value: T, left: TreeNode<T> | null = null, right: TreeNode<T> | null = null): TreeNode<T> {
  return { value, left, right };
}

/*
        1
      /   \
     2     3
    / \     \
   4   5     6
        \
         7
Leaves: 4, 7, 6  → 3 leaves
*/

const tree: TreeNode<number> = node(
  1,
  node(
    2,
    node(4),
    node(
      5,
      null,
      node(7)
    )
  ),
  node(
    3,
    null,
    node(6)
  )
);

console.log("Recursive leaf count:", countLeavesRecursive(tree)); // → 3
console.log("Iterative leaf count:", countLeavesIterative(tree)); // → 3
// Recursive (most concise)
function countLeavesRecursive<T>(root: TreeNode<T> | null): number {
  if (!root) return 0;
  if (!root.left && !root.right) return 1;
  return countLeavesRecursive(root.left) + countLeavesRecursive(root.right);
}

// Iterative (stack‑safe)
function countLeavesIterative<T>(root: TreeNode<T> | null): number {
  if (!root) return 0;
  const q: TreeNode<T>[] = [root];
  let cnt = 0;
  while (q.length) {
    const n = q.shift()!;
    if (!n.left && !n.right) cnt++;
    else {
      if (n.left) q.push(n.left);
      if (n.right) q.push(n.right);
    }
  }
  return cnt;
}
