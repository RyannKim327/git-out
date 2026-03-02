// 1️⃣  Define the tree node.  You can use an interface, a class, or a type alias.
//      This shape is common in interview‑style code.
interface TreeNode {
  val: number;         // node’s payload
  left?: TreeNode | null;   // left child (optional)
  right?: TreeNode | null;  // right child (optional)
}

// 2️⃣  Recursive summation – easiest to read and to understand.
//      Depth‑first, natural for a tree.
function sumTreeRecursive(root: TreeNode | null): number {
  if (!root) return 0;                      // base case: empty subtree is 0
  const leftSum = sumTreeRecursive(root.left);
  const rightSum = sumTreeRecursive(root.right);
  return root.val + leftSum + rightSum;      // combine the results
}

// 3️⃣  Iterative version (DFS using a stack).  Handy if you expect a very deep tree
//      where recursion might hit the call‑stack limit.
function sumTreeIterative(root: TreeNode | null): number {
  if (!root) return 0;
  let total = 0;
  const stack: TreeNode[] = [root];

  while (stack.length) {
    const node = stack.pop()!;
    total += node.val;
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return total;
}

// 4️⃣  Sample tree for quick sanity check
//           5
//          / \
//         3   7
//        / \   \
//       2   4   8

const sampleRoot: TreeNode = {
  val: 5,
  left: { val: 3, left: { val: 2 }, right: { val: 4 } },
  right: { val: 7, right: { val: 8 } },
};

console.log(sumTreeRecursive(sampleRoot)); // → 33
console.log(sumTreeIterative(sampleRoot)); // → 33
