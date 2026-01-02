// A classic binary‑tree node
export interface TreeNode<T = any> {
  /** The stored value – you can change the generic type as you wish */
  value: T;
  /** Left child (null if absent) */
  left: TreeNode<T> | null;
  /** Right child (null if absent) */
  right: TreeNode<T> | null;
}
export class TreeNode<T = any> {
  constructor(
    public value: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null
  ) {}
}
/**
 * Returns the number of leaf nodes in the subtree rooted at `node`.
 * Runs in O(n) time and O(h) call‑stack space, where h = tree height.
 */
export function countLeavesRecursive<T>(node: TreeNode<T> | null): number {
  // Empty subtree → no leaves
  if (node === null) return 0;

  // Node with no children → it *is* a leaf
  if (node.left === null && node.right === null) return 1;

  // Otherwise sum the leaves of both sub‑trees
  return (
    countLeavesRecursive(node.left) + countLeavesRecursive(node.right)
  );
}
/**
 * Iterative depth‑first traversal that counts leaves.
 * Time: O(n)   Space: O(h)  (h = height of the tree, worst‑case O(n) for a degenerate tree)
 */
export function countLeavesIterative<T>(root: TreeNode<T> | null): number {
  if (root === null) return 0;

  let leafCount = 0;
  const stack: TreeNode<T>[] = [root];

  while (stack.length) {
    const node = stack.pop()!; // non‑null because we checked length

    // If both children are missing → leaf
    if (node.left === null && node.right === null) {
      leafCount++;
      continue;
    }

    // Push non‑null children onto the stack
    if (node.right !== null) stack.push(node.right);
    if (node.left !== null) stack.push(node.left);
  }

  return leafCount;
}
export function countLeavesBFS<T>(root: TreeNode<T> | null): number {
  if (root === null) return 0;

  let leafCount = 0;
  const queue: TreeNode<T>[] = [root];

  while (queue.length) {
    const node = queue.shift()!; // dequeue

    if (node.left === null && node.right === null) {
      leafCount++;
    } else {
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
  }

  return leafCount;
}
// Build a small example tree:
//
//        1
//      /   \
//     2     3
//    / \     \
//   4   5     6
//              \
//               7
//
const root: TreeNode<number> = {
  value: 1,
  left: {
    value: 2,
    left: { value: 4, left: null, right: null },
    right: { value: 5, left: null, right: null },
  },
  right: {
    value: 3,
    left: null,
    right: {
      value: 6,
      left: null,
      right: { value: 7, left: null, right: null },
    },
  },
};

console.log('Recursive:', countLeavesRecursive(root)); // → 4 (4,5,7,3? wait 3 is not leaf)
/*
   Leaves are: 4, 5, 7   (node 3 has a right child, so not a leaf)
   Actually there are 3 leaves.
   Let's double‑check:
*/

console.log('Iterative:', countLeavesIterative(root)); // → 3
console.log('BFS:', countLeavesBFS(root));            // → 3
Recursive: 3
Iterative: 3
BFS: 3
// leafCounter.ts
export interface TreeNode<T = any> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

/**
 * Recursive leaf counter.
 */
export function countLeavesRecursive<T>(node: TreeNode<T> | null): number {
  if (node === null) return 0;
  if (node.left === null && node.right === null) return 1;
  return countLeavesRecursive(node.left) + countLeavesRecursive(node.right);
}

/**
 * Iterative (stack‑based) leaf counter.
 */
export function countLeavesIterative<T>(root: TreeNode<T> | null): number {
  if (root === null) return 0;
  let leafCount = 0;
  const stack: TreeNode<T>[] = [root];
  while (stack.length) {
    const node = stack.pop()!;
    if (node.left === null && node.right === null) {
      leafCount++;
    } else {
      if (node.right !== null) stack.push(node.right);
      if (node.left !== null) stack.push(node.left);
    }
  }
  return leafCount;
}

/**
 * Breadth‑first leaf counter.
 */
export function countLeavesBFS<T>(root: TreeNode<T> | null): number {
  if (root === null) return 0;
  let leafCount = 0;
  const queue: TreeNode<T>[] = [root];
  while (queue.length) {
    const node = queue.shift()!;
    if (node.left === null && node.right === null) {
      leafCount++;
    } else {
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
  }
  return leafCount;
}
import { TreeNode, countLeavesRecursive } from "./leafCounter";

const myTree: TreeNode<number> = /* … */;
console.log(countLeavesRecursive(myTree));
