class TreeNode<T> {
    value: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree<T> {
    root: TreeNode<T> | null;

    constructor() {
        this.root = null;
    }

    // Insert a value into the tree
    insert(value: T): void {
        const newNode = new TreeNode(value);
        
        if (this.root === null) {
            this.root = newNode;
            return;
        }

        this.insertNode(this.root, newNode);
    }

    private insertNode(node: TreeNode<T>, newNode: TreeNode<T>): void {
        // Simple insertion logic - you can customize this based on your needs
        // This example uses a basic level-order insertion approach
        const queue: TreeNode<T>[] = [node];
        
        while (queue.length > 0) {
            const current = queue.shift()!;
            
            if (current.left === null) {
                current.left = newNode;
                return;
            } else {
                queue.push(current.left);
            }
            
            if (current.right === null) {
                current.right = newNode;
                return;
            } else {
                queue.push(current.right);
            }
        }
    }

    // In-order traversal (Left, Root, Right)
    inOrderTraversal(node: TreeNode<T> | null = this.root): T[] {
        const result: T[] = [];
        
        function traverse(current: TreeNode<T> | null): void {
            if (current === null) return;
            
            traverse(current.left);
            result.push(current.value);
            traverse(current.right);
        }
        
        traverse(node);
        return result;
    }

    // Pre-order traversal (Root, Left, Right)
    preOrderTraversal(node: TreeNode<T> | null = this.root): T[] {
        const result: T[] = [];
        
        function traverse(current: TreeNode<T> | null): void {
            if (current === null) return;
            
            result.push(current.value);
            traverse(current.left);
            traverse(current.right);
        }
        
        traverse(node);
        return result;
    }

    // Post-order traversal (Left, Right, Root)
    postOrderTraversal(node: TreeNode<T> | null = this.root): T[] {
        const result: T[] = [];
        
        function traverse(current: TreeNode<T> | null): void {
            if (current === null) return;
            
            traverse(current.left);
            traverse(current.right);
            result.push(current.value);
        }
        
        traverse(node);
        return result;
    }

    // Level-order traversal (Breadth-first)
    levelOrderTraversal(): T[] {
        const result: T[] = [];
        const queue: TreeNode<T>[] = [];
        
        if (this.root) {
            queue.push(this.root);
        }
        
        while (queue.length > 0) {
            const current = queue.shift()!;
            result.push(current.value);
            
            if (current.left) {
                queue.push(current.left);
            }
            
            if (current.right) {
                queue.push(current.right);
            }
        }
        
        return result;
    }

    // Search for a value
    search(value: T): boolean {
        return this.searchNode(this.root, value);
    }

    private searchNode(node: TreeNode<T> | null, value: T): boolean {
        if (node === null) return false;
        
        if (node.value === value) return true;
        
        return this.searchNode(node.left, value) || 
               this.searchNode(node.right, value);
    }

    // Get the height of the tree
    getHeight(node: TreeNode<T> | null = this.root): number {
        if (node === null) return 0;
        
        const leftHeight = this.getHeight(node.left);
        const rightHeight = this.getHeight(node.right);
        
        return Math.max(leftHeight, rightHeight) + 1;
    }

    // Count the number of nodes
    countNodes(node: TreeNode<T> | null = this.root): number {
        if (node === null) return 0;
        
        return 1 + this.countNodes(node.left) + this.countNodes(node.right);
    }

    // Check if the tree is empty
    isEmpty(): boolean {
        return this.root === null;
    }

    // Clear the tree
    clear(): void {
        this.root = null;
    }
}
// Create a binary tree
const tree = new BinaryTree<number>();

// Insert values
tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);
tree.insert(12);
tree.insert(18);

// Traversal examples
console.log("In-order:", tree.inOrderTraversal());    // [3, 5, 7, 10, 12, 15, 18]
console.log("Pre-order:", tree.preOrderTraversal());  // [10, 5, 3, 7, 15, 12, 18]
console.log("Post-order:", tree.postOrderTraversal()); // [3, 7, 5, 12, 18, 15, 10]
console.log("Level-order:", tree.levelOrderTraversal()); // [10, 5, 15, 3, 7, 12, 18]

// Other operations
console.log("Height:", tree.getHeight());            // 3
console.log("Node count:", tree.countNodes());       // 7
console.log("Search 7:", tree.search(7));           // true
console.log("Search 20:", tree.search(20));          // false
class BinarySearchTree<T> extends BinaryTree<T> {
    constructor(private compare: (a: T, b: T) => number = (a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }) {
        super();
    }

    // Override insert for BST logic
    insert(value: T): void {
        const newNode = new TreeNode(value);
        
        if (this.root === null) {
            this.root = newNode;
            return;
        }

        this.insertBST(this.root, newNode);
    }

    private insertBST(node: TreeNode<T>, newNode: TreeNode<T>): void {
        if (this.compare(newNode.value, node.value) < 0) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertBST(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertBST(node.right, newNode);
            }
        }
    }

    // Find minimum value
    findMin(node: TreeNode<T> | null = this.root): T | null {
        if (node === null) return null;
        
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current.value;
    }

    // Find maximum value
    findMax(node: TreeNode<T> | null = this.root): T | null {
        if (node === null) return null;
        
        let current = node;
        while (current.right !== null) {
            current = current.right;
        }
        return current.value;
    }
}

// BST Usage
const bst = new BinarySearchTree<number>();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);

console.log("BST In-order:", bst.inOrderTraversal()); // [3, 5, 7, 10, 15]
console.log("Min:", bst.findMin());                  // 3
console.log("Max:", bst.findMax());                  // 15
