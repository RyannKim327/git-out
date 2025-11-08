class TreeNode<T> {
    constructor(
        public value: T,
        public left: TreeNode<T> | null = null,
        public right: TreeNode<T> | null = null
    ) {}
}

class BinaryTree<T> {
    private root: TreeNode<T> | null = null;

    // Public method to insert a value
    public insert(value: T): void {
        this.root = this.insertNode(this.root, value);
    }

    // Private recursive helper method for insertion
    private insertNode(node: TreeNode<T> | null, value: T): TreeNode<T> {
        if (node === null) {
            return new TreeNode(value);
        }

        // Simple comparison - customize based on your needs
        if (value < node.value) {
            node.left = this.insertNode(node.left, value);
        } else {
            node.right = this.insertNode(node.right, value);
        }

        return node;
    }

    // Public method for in-order traversal
    public inOrderTraversal(): T[] {
        const result: T[] = [];
        this.inOrder(this.root, result);
        return result;
    }

    // Private recursive helper for in-order traversal
    private inOrder(node: TreeNode<T> | null, result: T[]): void {
        if (node !== null) {
            this.inOrder(node.left, result);
            result.push(node.value);
            this.inOrder(node.right, result);
        }
    }

    // Optional: Pre-order traversal
    public preOrderTraversal(): T[] {
        const result: T[] = [];
        this.preOrder(this.root, result);
        return result;
    }

    private preOrder(node: TreeNode<T> | null, result: T[]): void {
        if (node !== null) {
            result.push(node.value);
            this.preOrder(node.left, result);
            this.preOrder(node.right, result);
        }
    }

    // Optional: Post-order traversal
    public postOrderTraversal(): T[] {
        const result: T[] = [];
        this.postOrder(this.root, result);
        return result;
    }

    private postOrder(node: TreeNode<T> | null, result: T[]): void {
        if (node !== null) {
            this.postOrder(node.left, result);
            this.postOrder(node.right, result);
            result.push(node.value);
        }
    }
}
// Create a binary tree of numbers
const tree = new BinaryTree<number>();

// Insert values
tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);

// Perform traversals
console.log(tree.inOrderTraversal());   // [3, 5, 7, 10, 15]
console.log(tree.preOrderTraversal());  // [10, 5, 3, 7, 15]
console.log(tree.postOrderTraversal()); // [3, 7, 5, 15, 10]
// Add to BinaryTree class:

// Search for a value
public search(value: T): boolean {
    return this.searchNode(this.root, value);
}

private searchNode(node: TreeNode<T> | null, value: T): boolean {
    if (node === null) return false;
    if (value === node.value) return true;
    
    return value < node.value 
        ? this.searchNode(node.left, value)
        : this.searchNode(node.right, value);
}

// Get tree height/depth
public height(): number {
    return this.calculateHeight(this.root);
}

private calculateHeight(node: TreeNode<T> | null): number {
    if (node === null) return 0;
    return 1 + Math.max(
        this.calculateHeight(node.left),
        this.calculateHeight(node.right)
    );
}

// Breadth-first traversal (level order)
public levelOrderTraversal(): T[] {
    const result: T[] = [];
    const queue: (TreeNode<T> | null)[] = [this.root];
    
    while (queue.length > 0) {
        const node = queue.shift();
        if (node !== null) {
            result.push(node.value);
            queue.push(node.left);
            queue.push(node.right);
        }
    }
    
    return result;
}
