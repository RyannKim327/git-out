/**
 * Simple binary‑tree node.
 * - `value` can be any type you need (number, string, object …)
 * - `left` and `right` are either another TreeNode or `null`.
 */
export interface TreeNode<T = any> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}
/**
 * Returns the number of leaf nodes in the subtree rooted at `node`.
 * A leaf is a node whose both children are `null`.
 *
 * Time   : O(n) – each node is visited once.
 * Space  : O(h) – recursion stack, where h = tree height (worst‑case O(n)).
 */
export function countLeavesRecursive<T>(node: TreeNode<T> | null): number {
  // Base case: empty subtree → no leaves
  if (node === null) return 0;

  // If both children are null, this node itself is a leaf
  if (node.left === null && node.right === null) return 1;

  // Otherwise sum the leaves of the left and right sub‑trees
  return (
    countLeavesRecursive(node.left) + countLeavesRecursive(node.right)
  );
}
/**
 * Iterative version using a stack.
 *
 * Time   : O(n)
 * Space  : O(h) – stack holds at most the nodes on a root‑to‑leaf path.
 */
export function countLeavesIterative<T>(root: TreeNode<T> | null): number {
  if (root === null) return 0;

  const stack: TreeNode<T>[] = [root];
  let leafCount = 0;

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
// Helper to build a node quickly
function node<T>(value: T, left: TreeNode<T> | null = null, right: TreeNode<T> | null = null): TreeNode<T> {
  return { value, left, right };
}

/* Build the following tree:
          1
        /   \
       2     3
      / \     \
     4   5     6
                \
                 7
Leaf nodes: 4, 5, 7  → 3 leaves
*/
const tree: TreeNode<number> = node(
  1,
  node(
    2,
    node(4),
    node(5)
  ),
  node(
    3,
    null,
    node(
      6,
      null,
      node(7)
    )
  )
);

console.log('Recursive leaf count:', countLeavesRecursive(tree)); // 3
console.log('Iterative leaf count:', countLeavesIterative(tree)); // 3

// Edge cases
console.log('Empty tree →', countLeavesRecursive(null)); // 0
console.log('Single node →', countLeavesIterative(node(42))); // 1
const leafCount = (root: TreeNode<any> | null): number =>
  root === null ? 0 :
  (root.left === null && root.right === null) ? 1 :
  leafCount(root.left) + leafCount(root.right);
