interface TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
}

function diameterOfBinaryTree(root: TreeNode | null): number {
    let diameter = 0;
    
    function depth(node: TreeNode | null): number {
        if (!node) return 0;
        
        const leftDepth = depth(node.left);
        const rightDepth = depth(node.right);
        
        // Update diameter - path through current node
        diameter = Math.max(diameter, leftDepth + rightDepth);
        
        // Return depth of current node
        return Math.max(leftDepth, rightDepth) + 1;
    }
    
    depth(root);
    return diameter;
}
class BinaryTreeNode {
    constructor(
        public value: number,
        public left: BinaryTreeNode | null = null,
        public right: BinaryTreeNode | null = null
    ) {}
}

class BinaryTree {
    private diameter: number = 0;
    
    findDiameter(root: BinaryTreeNode | null): number {
        this.diameter = 0;
        this.calculateDepth(root);
        return this.diameter;
    }
    
    private calculateDepth(node: BinaryTreeNode | null): number {
        if (!node) return 0;
        
        const leftDepth = this.calculateDepth(node.left);
        const rightDepth = this.calculateDepth(node.right);
        
        // Update diameter
        this.diameter = Math.max(this.diameter, leftDepth + rightDepth);
        
        return Math.max(leftDepth, rightDepth) + 1;
    }
}
function diameterOfBinaryTreeIterative(root: TreeNode | null): number {
    if (!root) return 0;
    
    let diameter = 0;
    const stack: TreeNode[] = [];
    const depthMap = new Map<TreeNode, number>();
    let node: TreeNode | null = root;
    let lastVisited: TreeNode | null = null;
    
    while (node || stack.length > 0) {
        // Go to the leftmost node
        while (node) {
            stack.push(node);
            node = node.left;
        }
        
        const peekNode = stack[stack.length - 1];
        
        // If right child exists and hasn't been visited
        if (peekNode.right && peekNode.right !== lastVisited) {
            node = peekNode.right;
        } else {
            // Process the node
            stack.pop();
            lastVisited = peekNode;
            
            const leftDepth = depthMap.get(peekNode.left) || 0;
            const rightDepth = depthMap.get(peekNode.right) || 0;
            
            // Update diameter
            diameter = Math.max(diameter, leftDepth + rightDepth);
            
            // Store depth of current node
            depthMap.set(peekNode, Math.max(leftDepth, rightDepth) + 1);
        }
    }
    
    return diameter;
}
// Create a sample tree
function createSampleTree(): TreeNode {
    // Tree structure:
    //       1
    //      / \
    //     2   3
    //    / \
    //   4   5
    //  /
    // 6
    
    return {
        val: 1,
        left: {
            val: 2,
            left: {
                val: 4,
                left: { val: 6, left: null, right: null },
                right: null
            },
            right: { val: 5, left: null, right: null }
        },
        right: { val: 3, left: null, right: null }
    };
}

// Test the function
const tree = createSampleTree();
console.log("Diameter:", diameterOfBinaryTree(tree)); // Output: 4

// Explanation: Longest path is from node 6 to node 3 or node 6 to node 5
// Path: 6 -> 4 -> 2 -> 5 (length 4) or 6 -> 4 -> 2 -> 1 -> 3 (length 4)
