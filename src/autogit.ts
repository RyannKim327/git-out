// Node definition – adjust `value` type as needed
export interface TreeNode<T = number> {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
}

// Recursive sum – the classic “do it in one pass”
export function sumRecursive<T extends number>(root: TreeNode<T> | undefined): T {
  if (!root) return 0 as T;                 // base case
  return (root.value as any) +                      // value of this node
         sumRecursive(root.left) +                     // left subtree
         sumRecursive(root.right);                     // right subtree
}
export function sumIterative<T extends number>(root: TreeNode<T> | undefined): T {
  if (!root) return 0 as T;

  let sum = 0 as T;
  const stack: TreeNode<T>[] = [root];

  while (stack.length) {
    const node = stack.pop()!;
    sum += node.value as any;
    if (node.right) stack.push(node.right);
    if (node.left)  stack.push(node.left);
  }

  return sum;
}
const tree: TreeNode = {
  value: 1,
  left: { value: 2, left: { value: 4 }, right: { value: 5 } },
  right: { value: 3 }
};

console.log(sumRecursive(tree));   // 15
console.log(sumIterative(tree));   // 15
