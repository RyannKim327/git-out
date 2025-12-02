interface TreeNode<T> {
    value: T;
    left?: TreeNode<T>;
    right?: TreeNode<T>;
}

function countLeaves<T>(node?: TreeNode<T>): number {
    if (!node) return 0;
    
    // If both children are null, it's a leaf node
    if (!node.left && !node.right) {
        return 1;
    }
    
    // Recursively count leaves in left and right subtrees
    return countLeaves(node.left) + countLeaves(node.right);
}

// Example usage:
const tree: TreeNode<number> = {
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
};

console.log(countLeaves(tree)); // Output: 4
function countLeavesBFS<T>(root?: TreeNode<T>): number {
    if (!root) return 0;
    
    let count = 0;
    const queue: TreeNode<T>[] = [root];
    
    while (queue.length > 0) {
        const node = queue.shift()!;
        
        if (!node.left && !node.right) {
            count++;
        }
        
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
    
    return count;
}
function countLeavesDFS<T>(root?: TreeNode<T>): number {
    if (!root) return 0;
    
    let count = 0;
    const stack: TreeNode<T>[] = [root];
    
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
class BinaryTree<T> {
    root?: TreeNode<T>;

    constructor(value?: T) {
        if (value) {
            this.root = { value };
        }
    }

    countLeaves(): number {
        return this._countLeaves(this.root);
    }

    private _countLeaves(node?: TreeNode<T>): number {
        if (!node) return 0;
        
        if (!node.left && !node.right) {
            return 1;
        }
        
        return this._countLeaves(node.left) + this._countLeaves(node.right);
    }

    // Optional: Add methods to build your tree
    insert(value: T): void {
        // Implementation depends on your tree structure
    }
}

// Usage example:
const tree = new BinaryTree<number>(1);
tree.root = {
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
};

console.log(tree.countLeaves()); // Output: 4
