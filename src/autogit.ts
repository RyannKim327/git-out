interface TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
}
function sumNodesRecursive(node: TreeNode | null): number {
    if (node === null) {
        return 0; // Base case: empty subtree
    }
    // Sum = current node's value + left subtree sum + right subtree sum
    return node.value + sumNodesRecursive(node.left) + sumNodesRecursive(node.right);
}
function sumNodesBFS(root: TreeNode | null): number {
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
function sumNodesDFS(root: TreeNode | null): number {
    if (root === null) return 0;
    
    let sum = 0;
    const stack: TreeNode[] = [root];
    
    while (stack.length > 0) {
        const node = stack.pop()!;
        sum += node.value;
        if (node.right) stack.push(node.right); // Push right first (stack order)
        if (node.left) stack.push(node.left);
    }
    return sum;
}
// Create a sample binary tree:
//       10
//      /  \
//     5   15
//    / \    \
//   3   7    18
const tree: TreeNode = {
    value: 10,
    left: {
        value: 5,
        left: { value: 3, left: null, right: null },
        right: { value: 7, left: null, right: null }
    },
    right: {
        value: 15,
        left: null,
        right: { value: 18, left: null, right: null }
    }
};

console.log(sumNodesRecursive(tree)); // Output: 10+5+15+3+7+18 = 58
console.log(sumNodesBFS(tree));      // Output: 58
console.log(sumNodesDFS(tree));      // Output: 58
