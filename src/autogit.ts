class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    
    constructor(val: number) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function countLeafNodes(root: TreeNode | null): number {
    if (!root) {
        return 0;
    }
    
    // If it's a leaf node (both children are null)
    if (!root.left && !root.right) {
        return 1;
    }
    
    // Recursively count leaf nodes in left and right subtrees
    return countLeafNodes(root.left) + countLeafNodes(root.right);
}
function countLeafNodesIterative(root: TreeNode | null): number {
    if (!root) return 0;
    
    let count = 0;
    const queue: TreeNode[] = [root];
    
    while (queue.length > 0) {
        const node = queue.shift()!;
        
        // Check if it's a leaf node
        if (!node.left && !node.right) {
            count++;
        }
        
        // Add children to queue
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
    
    return count;
}
function countLeafNodesDFS(root: TreeNode | null): number {
    if (!root) return 0;
    
    let count = 0;
    const stack: TreeNode[] = [root];
    
    while (stack.length > 0) {
        const node = stack.pop()!;
        
        // Check if it's a leaf node
        if (!node.left && !node.right) {
            count++;
        }
        
        // Push children to stack (right first, then left for pre-order)
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
    
    return count;
}
// Tree structure:
//       1
//      / \
//     2   3
//    / \
//   4   5

// Create the tree
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

// Test the functions
console.log("Recursive count:", countLeafNodes(root)); // Output: 3
console.log("Iterative BFS count:", countLeafNodesIterative(root)); // Output: 3
console.log("Iterative DFS count:", countLeafNodesDFS(root)); // Output: 3

// Edge cases
console.log("Empty tree:", countLeafNodes(null)); // Output: 0

// Single node tree
const singleNode = new TreeNode(1);
console.log("Single node:", countLeafNodes(singleNode)); // Output: 1
class BinaryTreeNode<T> {
    data: T;
    left: BinaryTreeNode<T> | null;
    right: BinaryTreeNode<T> | null;
    
    constructor(data: T) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

function countLeafNodesGeneric<T>(root: BinaryTreeNode<T> | null): number {
    if (!root) {
        return 0;
    }
    
    if (!root.left && !root.right) {
        return 1;
    }
    
    return countLeafNodesGeneric(root.left) + countLeafNodesGeneric(root.right);
}
