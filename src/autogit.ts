class Node {
    value: number;
    left: Node | null;
    right: Node | null;
    
    constructor(value: number) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    root: Node | null;

    constructor() {
        this.root = null;
    }

    // Insert a new value into the tree
    insert(value: number): void {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    // Helper method to recursively insert a node
    private insertNode(node: Node, newNode: Node): void {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    // In-order traversal (left, root, right)
    inOrderTraversal(callback: (value: number) => void): void {
        this.inOrder(this.root, callback);
    }

    private inOrder(node: Node | null, callback: (value: number) => void): void {
        if (node) {
            this.inOrder(node.left, callback);
            callback(node.value);
            this.inOrder(node.right, callback);
        }
    }

    // Pre-order traversal (root, left, right)
    preOrderTraversal(callback: (value: number) => void): void {
        this.preOrder(this.root, callback);
    }

    private preOrder(node: Node | null, callback: (value: number) => void): void {
        if (node) {
            callback(node.value);
            this.preOrder(node.left, callback);
            this.preOrder(node.right, callback);
        }
    }

    // Post-order traversal (left, right, root)
    postOrderTraversal(callback: (value: number) => void): void {
        this.postOrder(this.root, callback);
    }

    private postOrder(node: Node | null, callback: (value: number) => void): void {
        if (node) {
            this.postOrder(node.left, callback);
            this.postOrder(node.right, callback);
            callback(node.value);
        }
    }

    // Search for a value in the tree
    search(value: number): boolean {
        return this.searchNode(this.root, value);
    }

    private searchNode(node: Node | null, value: number): boolean {
        if (node === null) {
            return false;
        }
        if (value < node.value) {
            return this.searchNode(node.left, value);
        } else if (value > node.value) {
            return this.searchNode(node.right, value);
        } else {
            return true; // value found
        }
    }
}

// Example Usage:
const tree = new BinaryTree();
tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);

// In-order traversal
tree.inOrderTraversal(value => {
    console.log(value); // 3, 5, 7, 10, 15
});

// Searching for a value
console.log(tree.search(7)); // true
console.log(tree.search(20)); // false
