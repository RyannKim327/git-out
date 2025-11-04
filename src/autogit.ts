class TreeNode {
    constructor(
        public value: number,
        public left: TreeNode | null = null,
        public right: TreeNode | null = null
    ) {}
}

function sumOfAllNodes(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }
    
    // Recursive approach: current node + left subtree + right subtree
    return root.value + sumOfAllNodes(root.left) + sumOfAllNodes(root.right);
}

// Example usage:
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

console.log(sumOfAllNodes(root)); // Output: 15 (1 + 2 + 3 + 4 + 5)
class BinaryTree {
    root: TreeNode | null;

    constructor() {
        this.root = null;
    }

    // Method to calculate sum recursively
    sum(): number {
        return this.calculateSum(this.root);
    }

    private calculateSum(node: TreeNode | null): number {
        if (node === null) {
            return 0;
        }
        return node.value + this.calculateSum(node.left) + this.calculateSum(node.right);
    }

    // Alternative iterative approach using BFS
    sumIterative(): number {
        if (this.root === null) return 0;
        
        let sum = 0;
        const queue: TreeNode[] = [this.root];
        
        while (queue.length > 0) {
            const currentNode = queue.shift()!;
            sum += currentNode.value;
            
            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
        }
        
        return sum;
    }

    // Alternative iterative approach using DFS (stack)
    sumIterativeDFS(): number {
        if (this.root === null) return 0;
        
        let sum = 0;
        const stack: TreeNode[] = [this.root];
        
        while (stack.length > 0) {
            const currentNode = stack.pop()!;
            sum += currentNode.value;
            
            if (currentNode.right) stack.push(currentNode.right);
            if (currentNode.left) stack.push(currentNode.left);
        }
        
        return sum;
    }
}

// Example usage:
const tree = new BinaryTree();
tree.root = new TreeNode(1);
tree.root.left = new TreeNode(2);
tree.root.right = new TreeNode(3);
tree.root.left.left = new TreeNode(4);
tree.root.left.right = new TreeNode(5);

console.log(tree.sum()); // Output: 15
console.log(tree.sumIterative()); // Output: 15
console.log(tree.sumIterativeDFS()); // Output: 15
class GenericTreeNode<T> {
    constructor(
        public value: T,
        public left: GenericTreeNode<T> | null = null,
        public right: GenericTreeNode<T> | null = null
    ) {}
}

function sumOfAllNodesGeneric<T extends number>(
    root: GenericTreeNode<T> | null
): number {
    if (root === null) {
        return 0;
    }
    
    return root.value + sumOfAllNodesGeneric(root.left) + sumOfAllNodesGeneric(root.right);
}

// Example usage:
const genericRoot = new GenericTreeNode(10);
genericRoot.left = new GenericTreeNode(20);
genericRoot.right = new GenericTreeNode(30);

console.log(sumOfAllNodesGeneric(genericRoot)); // Output: 60
function safeSumOfAllNodes(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }
    
    if (typeof root.value !== 'number') {
        throw new Error('Node value must be a number');
    }
    
    try {
        return root.value + safeSumOfAllNodes(root.left) + safeSumOfAllNodes(root.right);
    } catch (error) {
        console.error('Error calculating sum:', error);
        return 0;
    }
}
