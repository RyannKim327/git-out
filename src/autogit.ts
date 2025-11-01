interface TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
}
function countLeafNodes(root: TreeNode | null): number {
    // Base case: if root is null, return 0
    if (root === null) {
        return 0;
    }
    
    // Base case: if node has no children, it's a leaf
    if (root.left === null && root.right === null) {
        return 1;
    }
    
    // Recursively count leaf nodes in left and right subtrees
    return countLeafNodes(root.left) + countLeafNodes(root.right);
}
function countLeafNodesIterative(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }
    
    let leafCount = 0;
    const stack: TreeNode[] = [root];
    
    while (stack.length > 0) {
        const current = stack.pop()!;
        
        // If it's a leaf node, increment count
        if (current.left === null && current.right === null) {
            leafCount++;
        }
        
        // Push right child first (to process left first in LIFO)
        if (current.right !== null) {
            stack.push(current.right);
        }
        
        // Push left child
        if (current.left !== null) {
            stack.push(current.left);
        }
    }
    
    return leafCount;
}
// Define TreeNode interface
interface TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
}

// Recursive solution
function countLeafNodes(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }
    
    if (root.left === null && root.right === null) {
        return 1;
    }
    
    return countLeafNodes(root.left) + countLeafNodes(root.right);
}

// Helper function to create a sample tree
function createSampleTree(): TreeNode {
    // Tree structure:
    //       1
    //      / \
    //     2   3
    //    / \   \
    //   4   5   6
    
    const node4: TreeNode = { val: 4, left: null, right: null };
    const node5: TreeNode = { val: 5, left: null, right: null };
    const node6: TreeNode = { val: 6, left: null, right: null };
    const node2: TreeNode = { val: 2, left: node4, right: node5 };
    const node3: TreeNode = { val: 3, left: null, right: node6 };
    const root: TreeNode = { val: 1, left: node2, right: node3 };
    
    return root;
}

// Test the function
const sampleTree = createSampleTree();
console.log(countLeafNodes(sampleTree)); // Output: 3 (nodes 4, 5, 6 are leaves)
interface TreeNode<T = number> {
    val: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
}

function countLeafNodes<T>(root: TreeNode<T> | null): number {
    if (root === null) {
        return 0;
    }
    
    if (root.left === null && root.right === null) {
        return 1;
    }
    
    return countLeafNodes(root.left) + countLeafNodes(root.right);
}
