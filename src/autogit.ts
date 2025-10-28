interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}
function sumTreeRecursive(node: TreeNode | null): number {
  if (node === null) {
    return 0;
  }
  
  return node.value + 
         sumTreeRecursive(node.left) + 
         sumTreeRecursive(node.right);
}
function sumTreeIterativeDFS(root: TreeNode | null): number {
  if (root === null) return 0;
  
  let sum = 0;
  const stack: TreeNode[] = [root];
  
  while (stack.length > 0) {
    const node = stack.pop()!;
    sum += node.value;
    
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  
  return sum;
}
function sumTreeIterativeBFS(root: TreeNode | null): number {
  if (root === null) return 0;
  
  let sum = 0;
  const queue: TreeNode[] = [root];
  
  while (queue.length > 0) {
    const node = queue.shift()!;
    sum += node.value;
    
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  
  return sum;
}
// TreeNode interface
interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

// Helper function to create a tree node
function createTreeNode(value: number, left: TreeNode | null = null, right: TreeNode | null = null): TreeNode {
  return { value, left, right };
}

// All sum functions from above...

// Test the implementation
function testTreeSum() {
  // Create a sample binary tree:
  //       1
  //      / \
  //     2   3
  //    / \   \
  //   4   5   6
  
  const root = createTreeNode(1,
    createTreeNode(2,
      createTreeNode(4),
      createTreeNode(5)
    ),
    createTreeNode(3,
      null,
      createTreeNode(6)
    )
  );

  console.log("Recursive sum:", sumTreeRecursive(root));        // 21
  console.log("Iterative DFS sum:", sumTreeIterativeDFS(root)); // 21
  console.log("Iterative BFS sum:", sumTreeIterativeBFS(root)); // 21
}

testTreeSum();
interface GenericTreeNode<T> {
  value: T;
  left: GenericTreeNode<T> | null;
  right: GenericTreeNode<T> | null;
}

function sumGenericTree<T extends number>(
  node: GenericTreeNode<T> | null
): number {
  if (node === null) {
    return 0;
  }
  
  return node.value + 
         sumGenericTree(node.left) + 
         sumGenericTree(node.right);
}
