interface TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
}

function maxDepth(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }
    
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    
    return Math.max(leftDepth, rightDepth) + 1;
}
class TreeNode<T> {
    constructor(
        public value: T,
        public left: TreeNode<T> | null = null,
        public right: TreeNode<T> | null = null
    ) {}
}

class BinaryTree<T> {
    constructor(public root: TreeNode<T> | null = null) {}

    // Recursive approach
    maxDepthRecursive(node: TreeNode<T> | null = this.root): number {
        if (node === null) {
            return 0;
        }
        
        const leftDepth = this.maxDepthRecursive(node.left);
        const rightDepth = this.maxDepthRecursive(node.right);
        
        return Math.max(leftDepth, rightDepth) + 1;
    }

    // Iterative BFS approach
    maxDepthBFS(): number {
        if (this.root === null) {
            return 0;
        }
        
        let depth = 0;
        const queue: TreeNode<T>[] = [this.root];
        
        while (queue.length > 0) {
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
            
            depth++;
        }
        
        return depth;
    }

    // Iterative DFS approach
    maxDepthDFS(): number {
        if (this.root === null) {
            return 0;
        }
        
        let maxDepth = 0;
        const stack: { node: TreeNode<T>; depth: number }[] = [{ node: this.root, depth: 1 }];
        
        while (stack.length > 0) {
            const { node, depth } = stack.pop()!;
            maxDepth = Math.max(maxDepth, depth);
            
            if (node.right !== null) {
                stack.push({ node: node.right, depth: depth + 1 });
            }
            if (node.left !== null) {
                stack.push({ node: node.left, depth: depth + 1 });
            }
        }
        
        return maxDepth;
    }
}
type Tree<T> = {
    value: T;
    left: Tree<T> | null;
    right: Tree<T> | null;
} | null;

const maxDepthFunctional = <T>(tree: Tree<T>): number => {
    if (tree === null) return 0;
    
    return 1 + Math.max(
        maxDepthFunctional(tree.left),
        maxDepthFunctional(tree.right)
    );
};

// One-liner version
const maxDepthOneLiner = <T>(tree: Tree<T>): number => 
    tree === null ? 0 : 1 + Math.max(
        maxDepthOneLiner(tree.left), 
        maxDepthOneLiner(tree.right)
    );
// Create a sample tree
const tree = new BinaryTree<number>();
tree.root = new TreeNode(1);
tree.root.left = new TreeNode(2);
tree.root.right = new TreeNode(3);
tree.root.left.left = new TreeNode(4);
tree.root.left.right = new TreeNode(5);
tree.root.right.right = new TreeNode(6);
tree.root.left.left.left = new TreeNode(7);

// Test all methods
console.log("Recursive depth:", tree.maxDepthRecursive());     // Output: 4
console.log("BFS depth:", tree.maxDepthBFS());               // Output: 4
console.log("DFS depth:", tree.maxDepthDFS());               // Output: 4

// Using functional approach
const functionalTree: Tree<number> = {
    value: 1,
    left: {
        value: 2,
        left: { value: 4, left: { value: 7, left: null, right: null }, right: null },
        right: { value: 5, left: null, right: null }
    },
    right: {
        value: 3,
        left: null,
        right: { value: 6, left: null, right: null }
    }
};

console.log("Functional depth:", maxDepthFunctional(functionalTree)); // Output: 4
