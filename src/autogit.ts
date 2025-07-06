class TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(value: number) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    root: TreeNode | null;

    constructor() {
        this.root = null;
    }

    insert(value: number): void {
        const newNode = new TreeNode(value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    private insertNode(node: TreeNode, newNode: TreeNode): void {
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

    search(value: number): boolean {
        return this.searchNode(this.root, value);
    }

    private searchNode(node: TreeNode | null, value: number): boolean {
        if (node === null) {
            return false;
        }
        if (value < node.value) {
            return this.searchNode(node.left, value);
        } else if (value > node.value) {
            return this.searchNode(node.right, value);
        } else {
            return true; // value is equal to node.value
        }
    }

    inOrderTraversal(callback: (value: number) => void): void {
        this.inOrder(this.root, callback);
    }

    private inOrder(node: TreeNode | null, callback: (value: number) => void): void {
        if (node !== null) {
            this.inOrder(node.left, callback);
            callback(node.value);
            this.inOrder(node.right, callback);
        }
    }
}

// Example usage:
const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);

console.log("In-order Traversal:");
bst.inOrderTraversal(value => console.log(value));

console.log("Search for 7:", bst.search(7)); // true
console.log("Search for 20:", bst.search(20)); // false
