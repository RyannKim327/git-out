// simple node definition – feel free to extend it later (value, etc.)
class TreeNode {
  public left: TreeNode | null = null;
  public right: TreeNode | null = null;

  constructor(public readonly val?: any) {}
}
interface TreeNode {
  val?: any;
  left?: TreeNode | null;
  right?: TreeNode | null;
}
function countLeavesRecursive(node: TreeNode | null): number {
  if (node === null) return 0;          // empty subtree → no leaf

  // If this node has no children → it's a leaf.
  if (node.left === null && node.right === null) {
    return 1;
  }

  // Otherwise sum the children’s counts
  return countLeavesRecursive(node.left) + countLeavesRecursive(node.right);
}
function countLeavesIterative(root: TreeNode | null): number {
  if (root === null) return 0;

  let leafCount = 0;
  const stack: Array<TreeNode> = [root];

  while (stack.length) {
    const node = stack.pop() as TreeNode; // `as` because array never empty

    // Check for leaf
    if (node.left === null && node.right === null) {
      leafCount++;
    } else {
      // push children if they exist
      if (node.right !== null) stack.push(node.right);
      if (node.left !== null) stack.push(node.left);
    }
  }

  return leafCount;
}
// ---------------------------------------------------------------------
// 1. Node definition
class TreeNode {
  public left: TreeNode | null = null;
  public right: TreeNode | null = null;

  constructor(public readonly val: any) {}
}

// ---------------------------------------------------------------------
// 2. Recursive counter
function countLeavesRecursive(node: TreeNode | null): number {
  if (node === null) return 0;
  if (!node.left && !node.right) return 1;
  return countLeavesRecursive(node.left) + countLeavesRecursive(node.right);
}

// 3. Iterative counter
function countLeavesIterative(root: TreeNode | null): number {
  if (!root) return 0;
  let leaves = 0;
  const stack: TreeNode[] = [root];
  while (stack.length) {
    const node = stack.pop()!;
    if (!node.left && !node.right) leaves++;
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return leaves;
}

// ---------------------------------------------------------------------
// 4. Demo

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4); // leaf
root.left.right = new TreeNode(5); // leaf
root.right.left = new TreeNode(6); // leaf

console.log('Recursive leaves:', countLeavesRecursive(root)); // 3
console.log('Iterative leaves:', countLeavesIterative(root)); // 3
