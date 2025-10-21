interface TreeNode<T> {
    value: T;
    left?: TreeNode<T>;
    right?: TreeNode<T>;
}

function countLeafNodesRecursive<T>(node?: TreeNode<T>): number {
    if (!node) {
        return 0;
    }
    
    if (!node.left && !node.right) {
        return 1; // Leaf node found
    }
    
    return countLeafNodesRecursive(node.left) + countLeafNodesRecursive(node.right);
}
function countLeafNodesIterative<T>(root?: TreeNode<T>): number {
    if (!root) return 0;
    
    let count = 0;
    const queue: TreeNode<T>[] = [root];
    
    while (queue.length > 0) {
        const currentNode = queue.shift()!;
        
        if (!currentNode.left && !currentNode.right) {
            count++;
            continue;
        }
        
        if (currentNode.left) {
            queue.push(currentNode.left);
        }
        
        if (currentNode.right) {
            queue.push(currentNode.right);
        }
    }
    
    return count;
}
interface TreeNode<T> {
    value: T;
    left?: TreeNode<T>;
    right?: TreeNode<T>;
}

class BinaryTree<T> {
    constructor(public root?: TreeNode<T>) {}

    countLeaves(): number {
        return this.countLeavesRecursive(this.root);
    }

    private countLeavesRecursive(node?: TreeNode<T>): number {
        if (!node) return 0;
        
        if (!node.left && !node.right) {
            return 1;
        }
        
        return this.countLeavesRecursive(node.left) + 
               this.countLeavesRecursive(node.right);
    }
}

// Example usage
const tree: BinaryTree<number> = new BinaryTree({
    value: 1,
    left: {
        value: 2,
        left: { value: 4 },
        right: { value: 5 }
    },
    right: {
        value: 3,
        left: { value: 6 },
        right: { value: 7 }
    }
});

console.log("Number of leaf nodes:", tree.countLeaves()); // Output: 4
class BinaryTreeNode<T> {
    constructor(
        public value: T,
        public left?: BinaryTreeNode<T>,
        public right?: BinaryTreeNode<T>
    ) {}
}

function countLeafNodes<T>(root?: BinaryTreeNode<T>): number {
    if (!root) return 0;
    
    let count = 0;
    const stack: BinaryTreeNode<T>[] = [root];
    
    while (stack.length > 0) {
        const node = stack.pop()!;
        
        if (!node.left && !node.right) {
            count++;
        } else {
            if (node.right) stack.push(node.right);
            if (node.left) stack.push(node.left);
        }
    }
    
    return count;
}
