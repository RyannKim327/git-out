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

    // Insert a value into the binary tree
    insert(value: T): void {
        const newNode = new TreeNode(value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    private insertNode(node: TreeNode<T>, newNode: TreeNode<T>): void {
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

    // Search for a value in the binary tree
    search(value: T): boolean {
        return this.searchNode(this.root, value);
    }

    private searchNode(node: TreeNode<T> | null, value: T): boolean {
        if (node === null) {
            return false;
        }
        if (value === node.value) {
            return true;
        }
        return value < node.value
            ? this.searchNode(node.left, value)
            : this.searchNode(node.right, value);
    }

    // In-order traversal
    inOrderTraversal(node: TreeNode<T> | null, visit: (value: T) => void): void {
        if (node !== null) {
            this.inOrderTraversal(node.left, visit);
            visit(node.value);
            this.inOrderTraversal(node.right, visit);
        }
    }

    // Pre-order traversal
    preOrderTraversal(node: TreeNode<T> | null, visit: (value: T) => void): void {
        if (node !== null) {
            visit(node.value);
            this.preOrderTraversal(node.left, visit);
            this.preOrderTraversal(node.right, visit);
        }
    }

    // Post-order traversal
    postOrderTraversal(node: TreeNode<T> | null, visit: (value: T) => void): void {
        if (node !== null) {
            this.postOrderTraversal(node.left, visit);
            this.postOrderTraversal(node.right, visit);
            visit(node.value);
        }
    }
}
const tree = new BinaryTree<number>();

// Insert values
tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);
tree.insert(12);
tree.insert(18);

// Search for a value
console.log(tree.search(7));  // true
console.log(tree.search(20)); // false

// In-order traversal
console.log("In-order traversal:");
tree.inOrderTraversal(tree.root, (value) => console.log(value));

// Pre-order traversal
console.log("Pre-order traversal:");
tree.preOrderTraversal(tree.root, (value) => console.log(value));

// Post-order traversal
console.log("Post-order traversal:");
tree.postOrderTraversal(tree.root, (value) => console.log(value));
