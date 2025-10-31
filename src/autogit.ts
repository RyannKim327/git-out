interface TreeNode {
    val: number;
    left?: TreeNode | null;
    right?: TreeNode | null;
}
function sumOfNodes(root: TreeNode | null): number {
    // Base case: if root is null, return 0
    if (!root) {
        return 0;
    }
    
    // Recursively sum left and right subtrees, then add current node value
    return root.val + sumOfNodes(root.left) + sumOfNodes(root.right);
}
// Define the TreeNode interface
interface TreeNode {
    val: number;
    left?: TreeNode | null;
    right?: TreeNode | null;
}

// Function to create a sample tree
function createSampleTree(): TreeNode {
    // Tree structure:
    //      1
    //     / \
    //    2   3
    //   / \   \
    //  4   5   6
    const node4: TreeNode = { val: 4 };
    const node5: TreeNode = { val: 5 };
    const node6: TreeNode = { val: 6 };
    const node2: TreeNode = { val: 2, left: node4, right: node5 };
    const node3: TreeNode = { val: 3, right: node6 };
    const root: TreeNode = { val: 1, left: node2, right: node3 };
    
    return root;
}

// Sum function
function sumOfNodes(root: TreeNode | null): number {
    if (!root) {
        return 0;
    }
    
    return root.val + sumOfNodes(root.left) + sumOfNodes(root.right);
}

// Usage
const sampleTree = createSampleTree();
const totalSum = sumOfNodes(sampleTree);
console.log(`Sum of all nodes: ${totalSum}`); // Output: 21 (1+2+3+4+5+6)
function sumOfNodesIterative(root: TreeNode | null): number {
    if (!root) {
        return 0;
    }
    
    const stack: TreeNode[] = [root];
    let sum = 0;
    
    while (stack.length > 0) {
        const current = stack.pop()!;
        sum += current.val;
        
        if (current.right) {
            stack.push(current.right);
        }
        if (current.left) {
            stack.push(current.left);
        }
    }
    
    return sum;
}
class BinaryTreeSumCalculator {
    static sumOfNodes(root: TreeNode | null): number {
        if (!root) {
            return 0;
        }
        
        return this.sumOfNodes(root.left) + root.val + this.sumOfNodes(root.right);
    }
    
    // Helper method to validate tree structure (optional)
    static isValidTree(root: TreeNode | null): boolean {
        if (!root) return true;
        
        // Check if both children are null or properly structured
        return this.isValidTree(root.left) && this.isValidTree(root.right);
    }
}

// Usage with validation
const sampleTree = createSampleTree();
if (BinaryTreeSumCalculator.isValidTree(sampleTree)) {
    const sum = BinaryTreeSumCalculator.sumOfNodes(sampleTree);
    console.log(`Sum of all nodes: ${sum}`);
} else {
    console.log('Invalid tree structure');
}
