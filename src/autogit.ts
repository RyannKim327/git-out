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
class BinarySearchTree {
    root: Node | null;

    constructor() {
        this.root = null;
    }

    // Insert a new value into the BST
    insert(value: number): void {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

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

    // Search for a value in the BST
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
            return true; // value is found
        }
    }

    // In-order traversal of the BST
    inOrderTraversal(callback: (value: number) => void): void {
        this.inOrder(this.root, callback);
    }

    private inOrder(node: Node | null, callback: (value: number) => void): void {
        if (node !== null) {
            this.inOrder(node.left, callback);
            callback(node.value);
            this.inOrder(node.right, callback);
        }
    }
}
const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);
bst.insert(12);
bst.insert(18);

// Search for a value
console.log(bst.search(7));  // true
console.log(bst.search(20)); // false

// In-order traversal
bst.inOrderTraversal(value => {
    console.log(value); // Outputs: 3, 5, 7, 10, 12, 15, 18
});
