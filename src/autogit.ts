/**
 * Classic binary‑tree node.
 *   - `val`   : payload (any type you need)
 *   - `left`  : left child or null
 *   - `right` : right child or null
 */
export interface TreeNode<T = any> {
  val: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}
/**
 * Counts leaf nodes recursively.
 *
 * A leaf is a node whose both children are null.
 *
 * @param root - root of the binary tree (or null for an empty tree)
 * @returns number of leaf nodes
 */
export function countLeavesRecursive<T>(root: TreeNode<T> | null): number {
  // Base case: empty subtree → no leaves
  if (root === null) return 0;

  // If both children are null, this node itself is a leaf
  if (root.left === null && root.right === null) return 1;

  // Otherwise, sum leaves from left and right sub‑trees
  return (
    countLeavesRecursive(root.left) + countLeavesRecursive(root.right)
  );
}
/**
 * Counts leaf nodes iteratively using an explicit stack.
 *
 * @param root - root of the binary tree (or null for an empty tree)
 * @returns number of leaf nodes
 */
export function countLeavesIterative<T>(root: TreeNode<T> | null): number {
  if (root === null) return 0;

  let leafCount = 0;
  const stack: TreeNode<T>[] = [root];

  while (stack.length) {
    const node = stack.pop()!; // non‑null because we checked length

    // If both children are null → leaf
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
// Helper to build a simple tree for demo purposes
function makeNode<T>(val: T, left: TreeNode<T> | null = null, right: TreeNode<T> | null = null): TreeNode<T> {
  return { val, left, right };
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

const tree: TreeNode<number> = makeNode(
  1,
  makeNode(
    2,
    makeNode(4),
    makeNode(
      5,
      null,
      makeNode(7)
    )
  ),
  makeNode(
    3,
    null,
    makeNode(6)
  )
);

console.log('Recursive leaf count:', countLeavesRecursive(tree)); // → 3
console.log('Iterative leaf count:', countLeavesIterative(tree)); // → 3

// Edge cases
console.log('Empty tree →', countLeavesRecursive(null)); // 0
console.log('Single node →', countLeavesIterative(makeNode(42))); // 1
export interface TreeNode<T = any> {
  val: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

export function countLeavesRecursive<T>(root: TreeNode<T> | null): number {
  if (root === null) return 0;
  if (root.left === null && root.right === null) return 1;
  return countLeavesRecursive(root.left) + countLeavesRecursive(root.right);
}

export function countLeavesIterative<T>(root: TreeNode<T> | null): number {
  if (root === null) return 0;
  let leafCount = 0;
  const stack: TreeNode<T>[] = [root];
  while (stack.length) {
    const node = stack.pop()!;
    if (node.left === null && node.right === null) {
      leafCount++;
    } else {
      if (node.right) stack.push(node.right);
      if (node.left)  stack.push(node.left);
    }
  }
  return leafCount;
}
