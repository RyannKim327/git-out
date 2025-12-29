/**
 * A binary tree node.
 * The generic `T` lets you store any payload (number, string, object, …).
 */
export class TreeNode<T = any> {
  /** Value stored at this node (optional – you can omit it if you only need structure). */
  public value: T;

  /** Left child – `null` means “no child”. */
  public left: TreeNode<T> | null = null;

  /** Right child – `null` means “no child”. */
  public right: TreeNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}
export interface ITreeNode<T = any> {
  value: T;
  left: ITreeNode<T> | null;
  right: ITreeNode<T> | null;
}
/**
 * Returns the number of leaf nodes in the binary tree rooted at `root`.
 *
 * @param root - The root of the tree (or `null` for an empty tree).
 * @returns Number of leaf nodes (0 for an empty tree).
 */
export function countLeavesRecursive<T>(root: TreeNode<T> | null): number {
  // Base case: empty subtree → 0 leaves
  if (root === null) return 0;

  // If both children are null, this node itself is a leaf.
  if (root.left === null && root.right === null) return 1;

  // Otherwise, sum the leaves of the left and right sub‑trees.
  return (
    countLeavesRecursive(root.left) + countLeavesRecursive(root.right)
  );
}
export function countLeavesIterativeDFS<T>(root: TreeNode<T> | null): number {
  if (root === null) return 0;

  const stack: TreeNode<T>[] = [root];
  let leafCount = 0;

  while (stack.length) {
    const node = stack.pop()!; // non‑null because we checked length

    // Leaf detection
    if (node.left === null && node.right === null) {
      leafCount++;
      continue;
    }

    // Push children (if they exist) – order does not matter for counting.
    if (node.right) stack.push(node.right);
    if (node.left)  stack.push(node.left);
  }

  return leafCount;
}
export function countLeavesIterativeBFS<T>(root: TreeNode<T> | null): number {
  if (root === null) return 0;

  const queue: TreeNode<T>[] = [root];
  let leafCount = 0;

  while (queue.length) {
    const node = queue.shift()!; // dequeue

    if (node.left === null && node.right === null) {
      leafCount++;
    } else {
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return leafCount;
}
// Build a sample tree:
//          1
//        /   \
//       2     3
//      / \     \
//     4   5     6
//                \
//                 7
//
// Leaves: 4,5,7  → 3 leaves

function buildSampleTree(): TreeNode<number> {
  const n1 = new TreeNode(1);
  const n2 = new TreeNode(2);
  const n3 = new TreeNode(3);
  const n4 = new TreeNode(4);
  const n5 = new TreeNode(5);
  const n6 = new TreeNode(6);
  const n7 = new TreeNode(7);

  n1.left = n2;
  n1.right = n3;

  n2.left = n4;
  n2.right = n5;

  n3.right = n6;
  n6.right = n7;

  return n1;
}

// ---- Run all three implementations ----
const root = buildSampleTree();

console.log('Recursive:', countLeavesRecursive(root));   // → 3
console.log('Iterative DFS:', countLeavesIterativeDFS(root)); // → 3
console.log('Iterative BFS:', countLeavesIterativeBFS(root)); // → 3

// Edge cases
console.log('Empty tree →', countLeavesRecursive(null)); // 0
console.log('Single node →', countLeavesRecursive(new TreeNode(42))); // 1
export class ImmutableTreeNode<T> {
  public readonly value: T;
  public readonly left: ImmutableTreeNode<T> | null;
  public readonly right: ImmutableTreeNode<T> | null;

  constructor(
    value: T,
    left: ImmutableTreeNode<T> | null = null,
    right: ImmutableTreeNode<T> | null = null
  ) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}
export function countLeavesIf<T>(
  root: TreeNode<T> | null,
  predicate: (value: T) => boolean = () => true
): number {
  if (root === null) return 0;
  if (root.left === null && root.right === null) {
    return predicate(root.value) ? 1 : 0;
  }
  return countLeavesIf(root.left, predicate) + countLeavesIf(root.right, predicate);
}
const evenLeaves = countLeavesIf(root, v => v % 2 === 0);
const leafCount = (root: TreeNode<any> | null): number =>
  root ? (root.left || root.right ? leafCount(root.left) + leafCount(root.right) : 1) : 0;
