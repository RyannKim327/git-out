class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}

function maxDepth(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }
    
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    
    return Math.max(leftDepth, rightDepth) + 1;
}
function maxDepthBFS(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }
    
    let depth = 0;
    const queue: TreeNode[] = [root];
    
    while (queue.length > 0) {
        depth++;
        const levelSize = queue.length;
        
        for (let i = 0; i < levelSize; i++) {
            const currentNode = queue.shift()!;
            
            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }
            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }
        }
    }
    
    return depth;
}
function maxDepthDFS(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }
    
    const stack: [TreeNode, number][] = [[root, 1]];
    let maxDepth = 0;
    
    while (stack.length > 0) {
        const [node, currentDepth] = stack.pop()!;
        
        maxDepth = Math.max(maxDepth, currentDepth);
        
        if (node.right !== null) {
            stack.push([node.right, currentDepth + 1]);
        }
        if (node.left !== null) {
            stack.push([node.left, currentDepth + 1]);
        }
    }
    
    return maxDepth;
}
// Example usage and testing
function createBinaryTree(): TreeNode {
    const root = new TreeNode(3);
    root.left = new TreeNode(9);
    root.right = new TreeNode(20);
    root.right.left = new TreeNode(15);
    root.right.right = new TreeNode(7);
    
    return root;
}

// Test the functions
const tree = createBinaryTree();

console.log("Max Depth (Recursive):", maxDepth(tree)); // Output: 3
console.log("Max Depth (BFS):", maxDepthBFS(tree));   // Output: 3
console.log("Max Depth (DFS):", maxDepthDFS(tree));   // Output: 3

// Test with empty tree
console.log("Empty tree depth:", maxDepth(null)); // Output: 0

// Test with single node tree
const singleNode = new TreeNode(1);
console.log("Single node depth:", maxDepth(singleNode)); // Output: 1
class BinaryTree<T> {
    root: TreeNode<T> | null;
    
    constructor() {
        this.root = null;
    }
    
    maxDepth(): number {
        return this.calculateDepth(this.root);
    }
    
    private calculateDepth(node: TreeNode<T> | null): number {
        if (node === null) {
            return 0;
        }
        
        const leftDepth = this.calculateDepth(node.left);
        const rightDepth = this.calculateDepth(node.right);
        
        return Math.max(leftDepth, rightDepth) + 1;
    }
}

class TreeNode<T> {
    val: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
    
    constructor(val: T, left: TreeNode<T> | null = null, right: TreeNode<T> | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Usage
const tree = new BinaryTree<number>();
tree.root = new TreeNode(1);
tree.root.left = new TreeNode(2);
tree.root.right = new TreeNode(3);
tree.root.left.left = new TreeNode(4);

console.log("Tree depth:", tree.maxDepth()); // Output: 3
