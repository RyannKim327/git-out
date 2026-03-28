// ------------------------------------------------------------------
// 1️⃣ Define the tree node (you can adapt it to your existing type)
export interface TreeNode {
  val: number;
  left?: TreeNode | null;
  right?: TreeNode | null;
}

// ------------------------------------------------------------------
// 2️⃣ Recursive – the most idiomatic way in TypeScript

export function sumRecursive(root: TreeNode | null): number {
  if (!root) return 0;                     // base case
  return root.val + sumRecursive(root.left) + sumRecursive(root.right);
}

// ------------------------------------------------------------------
// 3️⃣ Iterative – using a stack (no recursion, useful for very deep trees)

export function sumIterative(root: TreeNode | null): number {
  if (!root) return 0;

  let stack: Array<TreeNode> = [root];
  let total = 0;

  while (stack.length) {
    const node = stack.pop()!;
    total += node.val;

    if (node.right) stack.push(node.right);
    if (node.left)  stack.push(node.left);
  }
  return total;
}

// ------------------------------------------------------------------
// 4️⃣ Quick sanity‑check

// Build a tiny sample tree:
//
//          5
//        /   \
//       3     8
//      / \     \
//     1   4     10
//
const sampleRoot: TreeNode = {
  val: 5,
  left: { val: 3, left: { val: 1 }, right: { val: 4 } },
  right: { val: 8, right: { val: 10 } },
};

console.log('Recursive sum:', sumRecursive(sampleRoot));   // → 31
console.log('Iterative sum:', sumIterative(sampleRoot));   // → 31
