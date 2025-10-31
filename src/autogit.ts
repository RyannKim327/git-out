class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function countLeafNodes(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }
    
    // A leaf node has no left or right children
    if (root.left === null && root.right === null) {
        return 1;
    }
    
    // Recursively count leaves in left and right subtrees
    return countLeafNodes(root.left) + countLeafNodes(root.right);
}
function countLeafNodesIterative(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }
    
    const stack: TreeNode[] = [root];
    let leafCount = 0;
    
    while (stack.length > 0) {
        const currentNode = stack.pop()!;
        
        // Check if current node is a leaf
        if (currentNode.left === null && currentNode.right === null) {
            leafCount++;
            continue;
        }
        
        // Add children to stack
        if (currentNode.right !== null) {
            stack.push(currentNode.right);
        }
        if (currentNode.left !== null) {
            stack.push(currentNode.left);
        }
    }
    
    return leafCount;
}
function countLeafNodesBFS(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }
    
    const queue: TreeNode[] = [root];
    let leafCount = 0;
    
    while (queue.length > 0) {
        const currentNode = queue.shift()!;
        
        // Check if current node is a leaf
        if (currentNode.left === null && currentNode.right === null) {
            leafCount++;
        }
        
        // Add children to queue
        if (currentNode.left !== null) {
            queue.push(currentNode.left);
        }
        if (currentNode.right !== null) {
            queue.push(currentNode.right);
        }
    }
    
    return leafCount;
}
// Example usage:
function testLeafCount() {
    // Create a sample binary tree:
    //       1
    //      / \
    //     2   3
    //    / \
    //   4   5
    //      /
    //     6
    
    const leaf6 = new TreeNode(6);
    const node4 = new TreeNode(4);
    const node5 = new TreeNode(5, leaf6);
    const node2 = new TreeNode(2, node4, node5);
    const node3 = new TreeNode(3);
    const root = new TreeNode(1, node2, node3);
    
    console.log("Recursive count:", countLeafNodes(root)); // Output: 3
    console.log("Iterative count:", countLeafNodesIterative(root)); // Output: 3
    console.log("BFS count:", countLeafNodesBFS(root)); // Output: 3
}

testLeafCount();
