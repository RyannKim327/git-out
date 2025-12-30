/** A binary‑tree node that stores a numeric value. */
export class TreeNode {
  /** The value stored at this node */
  value: number;

  /** Left child (null if none) */
  left: TreeNode | null = null;

  /** Right child (null if none) */
  right: TreeNode | null = null;

  constructor(value: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}
/**
 * Returns the sum of all node values in the binary tree rooted at `root`.
 * Uses a simple post‑order recursion (left → right → node).
 *
 * @param root The root of the tree, or `null` for an empty tree.
 * @returns The total sum (0 for an empty tree).
 */
export function sumTreeRecursive(root: TreeNode | null): number {
  if (root === null) {
    return 0;
  }

  // Sum of left subtree + sum of right subtree + current node's value
  const leftSum = sumTreeRecursive(root.left);
  const rightSum = sumTreeRecursive(root.right);
  return leftSum + rightSum + root.value;
}
/**
 * Iterative version that uses a queue (BFS) to traverse the tree.
 *
 * @param root The root of the tree, or `null` for an empty tree.
 * @returns The total sum.
 */
export function sumTreeIterative(root: TreeNode | null): number {
  if (root === null) {
    return 0;
  }

  let total = 0;
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const node = queue.shift()!; // non‑null because we checked length
    total += node.value;

    if (node.left !== null) queue.push(node.left);
    if (node.right !== null) queue.push(node.right);
  }

  return total;
}
import { TreeNode, sumTreeRecursive, sumTreeIterative } from "./binaryTreeSum";

// Build the following tree:
//        5
//      /   \
//     3     8
//    / \   / \
//   1   4 7   9
const tree = new TreeNode(
  5,
  new TreeNode(
    3,
    new TreeNode(1),
    new TreeNode(4)
  ),
  new TreeNode(
    8,
    new TreeNode(7),
    new TreeNode(9)
  )
);

console.log("Recursive sum:", sumTreeRecursive(tree)); // → 37
console.log("Iterative sum:", sumTreeIterative(tree)); // → 37
Recursive sum: 37
Iterative sum: 37
// binaryTreeSum.ts ---------------------------------------------------------

export class TreeNode {
  value: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;

  constructor(value: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

/**
 * Recursive depth‑first sum.
 */
export function sumTreeRecursive(root: TreeNode | null): number {
  if (root === null) return 0;
  return sumTreeRecursive(root.left) + sumTreeRecursive(root.right) + root.value;
}

/**
 * Iterative breadth‑first sum.
 */
export function sumTreeIterative(root: TreeNode | null): number {
  if (root === null) return 0;

  let total = 0;
  const queue: TreeNode[] = [root];

  while (queue.length) {
    const node = queue.shift()!;
    total += node.value;
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return total;
}

// -------------------------------------------------------------------------

// Example usage (you can comment this out when importing the module elsewhere)
if (require.main === module) {
  const tree = new TreeNode(
    5,
    new TreeNode(3, new TreeNode(1), new TreeNode(4)),
    new TreeNode(8, new TreeNode(7), new TreeNode(9))
  );

  console.log("Recursive sum:", sumTreeRecursive(tree)); // 37
  console.log("Iterative sum:", sumTreeIterative(tree)); // 37
}
