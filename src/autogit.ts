class TreeNode {
    value: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;

    constructor(value: number) {
        this.value = value;
    }
}
class BinarySearchTree {
    root: TreeNode | null = null;

    // Insert a new value into the BST
    insert(value: number): void {
        const newNode = new TreeNode(value);
        if (this.root === null) {
            this.root = newNode;
            return;
        }
        this.insertNode(this.root, newNode);
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

    // Search for a value in the BST
    search(value: number): boolean {
        return this.searchNode(this.root, value);
    }

    private searchNode(node: TreeNode | null, value: number): boolean {
        if (node === null) {
            return false;
        }
        if (value === node.value) {
            return true;
        } else if (value < node.value) {
            return this.searchNode(node.left, value);
        } else {
            return this.searchNode(node.right, value);
        }
    }

    // In-order traversal of the BST
    inOrderTraversal(node: TreeNode | null): number[] {
        const result: number[] = [];
        if (node !== null) {
            result.push(...this.inOrderTraversal(node.left));
            result.push(node.value);
            result.push(...this.inOrderTraversal(node.right));
        }
        return result;
    }

    // Pre-order traversal of the BST
    preOrderTraversal(node: TreeNode | null): number[] {
        const result: number[] = [];
        if (node !== null) {
            result.push(node.value);
            result.push(...this.preOrderTraversal(node.left));
            result.push(...this.preOrderTraversal(node.right));
        }
        return result;
    }

    // Post-order traversal of the BST
    postOrderTraversal(node: TreeNode | null): number[] {
        const result: number[] = [];
        if (node !== null) {
            result.push(...this.postOrderTraversal(node.left));
            result.push(...this.postOrderTraversal(node.right));
            result.push(node.value);
        }
        return result;
    }
}
const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(2);
bst.insert(7);
bst.insert(12);
bst.insert(20);

console.log("In-order traversal:", bst.inOrderTraversal(bst.root)); // [2, 5, 7, 10, 12, 15, 20]
console.log("Pre-order traversal:", bst.preOrderTraversal(bst.root)); // [10, 5, 2, 7, 15, 12, 20]
console.log("Post-order traversal:", bst.postOrderTraversal(bst.root)); // [2, 7, 5, 12, 20, 15, 10]

console.log("Searching for 7:", bst.search(7)); // true
console.log("Searching for 100:", bst.search(100)); // false
