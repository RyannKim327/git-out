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
    if (root === null) {
        return 0;
    }
    
    // If both children are null, it's a leaf node
    if (root.left === null && root.right === null) {
        return 1;
    }
    
    // Recursively count leaves in left and right subtrees
    return countLeafNodes(root.left) + countLeafNodes(root.right);
}
function countLeafNodesIterative(root: TreeNode | null): number {
    if (root === null) return 0;
    
    let count = 0;
    const queue: TreeNode[] = [root];
    
    while (queue.length > 0) {
        const currentNode = queue.shift()!;
        
        if (currentNode.left === null && currentNode.right === null) {
            count++;
        }
        
        if (currentNode.left !== null) {
            queue.push(currentNode.left);
        }
        
        if (currentNode.right !== null) {
            queue.push(currentNode.right);
        }
    }
    
    return count;
}
function countLeafNodesDFS(root: TreeNode | null): number {
    if (root === null) return 0;
    
    let count = 0;
    const stack: TreeNode[] = [root];
    
    while (stack.length > 0) {
        const currentNode = stack.pop()!;
        
        if (currentNode.left === null && currentNode.right === null) {
            count++;
        }
        
        if (currentNode.right !== null) {
            stack.push(currentNode.right);
        }
        
        if (currentNode.left !== null) {
            stack.push(currentNode.left);
        }
    }
    
    return count;
}
// Create a sample binary tree
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.right = new TreeNode(6);

console.log("Recursive count:", countLeafNodes(root)); // Output: 3
console.log("Iterative count:", countLeafNodesIterative(root)); // Output: 3
console.log("DFS count:", countLeafNodesDFS(root)); // Output: 3
     1
    / \
   2   3
  / \   \
 4   5   6
