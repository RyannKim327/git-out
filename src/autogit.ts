class TreeNode<T> {
    constructor(
        public value: T,
        public left: TreeNode<T> | null = null,
        public right: TreeNode<T> | null = null
    ) {}
}

function countLeafNodes<T>(root: TreeNode<T> | null): number {
    if (!root) return 0;
    
    // If both left and right are null, it's a leaf node
    if (!root.left && !root.right) return 1;
    
    // Recursively count leaves in left and right subtrees
    return countLeafNodes(root.left) + countLeafNodes(root.right);
}
function countLeafNodesIterative<T>(root: TreeNode<T> | null): number {
    if (!root) return 0;
    
    let count = 0;
    const queue: TreeNode<T>[] = [root];
    
    while (queue.length > 0) {
        const currentNode = queue.shift()!;
        
        if (!currentNode.left && !currentNode.right) {
            count++;
        }
        
        if (currentNode.left) queue.push(currentNode.left);
        if (currentNode.right) queue.push(currentNode.right);
    }
    
    return count;
}
function countLeafNodesDFS<T>(root: TreeNode<T> | null): number {
    if (!root) return 0;
    
    let count = 0;
    const stack: TreeNode<T>[] = [root];
    
    while (stack.length > 0) {
        const currentNode = stack.pop()!;
        
        if (!currentNode.left && !currentNode.right) {
            count++;
        }
        
        if (currentNode.right) stack.push(currentNode.right);
        if (currentNode.left) stack.push(currentNode.left);
    }
    
    return count;
}
class BinaryTree<T> {
    constructor(public root: TreeNode<T> | null = null) {}
    
    countLeaves(): number {
        return countLeafNodes(this.root);
    }
    
    countLeavesIterative(): number {
        return countLeafNodesIterative(this.root);
    }
}

// Example usage
const tree = new BinaryTree<number>();
tree.root = new TreeNode(1);
tree.root.left = new TreeNode(2);
tree.root.right = new TreeNode(3);
tree.root.left.left = new TreeNode(4);
tree.root.left.right = new TreeNode(5);
tree.root.right.left = new TreeNode(6);

console.log("Recursive count:", tree.countLeaves()); // Output: 3
console.log("Iterative count:", tree.countLeavesIterative()); // Output: 3
interface IBinaryTreeNode<T> {
    value: T;
    left: IBinaryTreeNode<T> | null;
    right: IBinaryTreeNode<T> | null;
}

function countLeafNodesGeneric<T>(root: IBinaryTreeNode<T> | null): number {
    if (!root) return 0;
    
    const stack: IBinaryTreeNode<T>[] = [root];
    let count = 0;
    
    while (stack.length > 0) {
        const node = stack.pop()!;
        
        if (!node.left && !node.right) {
            count++;
        }
        
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
    
    return count;
}
