// 1️⃣  Node definition
interface TreeNode<T = unknown> {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
}

// 2️⃣  Recursive leaf counter
function countLeaves<T>(node?: TreeNode<T>): number {
  // Base case: empty sub‑tree
  if (!node) return 0;

  // A leaf has no children
  const isLeaf = !node.left && !node.right;
  if (isLeaf) return 1;

  // Recurse on the two sub‑trees
  return countLeaves(node.left) + countLeaves(node.right);
}

// 3️⃣  Example usage
const tree: TreeNode<number> = {
  value: 1,
  left: { value: 2, right: { value: 4 } },
  right: { value: 3, left: { value: 5 } }
};

console.log(countLeaves(tree)); // → 3
function countLeavesIterative<T>(root: TreeNode<T>): number {
  if (!root) return 0;

  let stack: TreeNode<T>[] = [root];
  let leafCount = 0;

  while (stack.length) {
    const node = stack.pop()!; // guaranteed defined
    if (!node.left && !node.right) {
      leafCount++;
    } else {
      if (node.right) stack.push(node.right);
      if (node.left)  stack.push(node.left);
    }
  }
  return leafCount;
}
