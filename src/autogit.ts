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

    insert(value: number) {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    private insertNode(node: Node, newNode: Node) {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else if (newNode.value > node.value) {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    search(value: number): Node | null {
        return this.searchNode(this.root, value);
    }

    private searchNode(node: Node | null, value: number): Node | null {
        if (node === null || node.value === value) {
            return node;
        }
        if (value < node.value) {
            return this.searchNode(node.left, value);
        } else {
            return this.searchNode(node.right, value);
        }
    }

    inorderTraversal(node: Node | null): number[] {
        const result: number[] = [];
        if (node !== null) {
            result.push(...this.inorderTraversal(node.left));
            result.push(node.value);
            result.push(...this.inorderTraversal(node.right));
        }
        return result;
    }

    preorderTraversal(node: Node | null): number[] {
        const result: number[] = [];
        if (node !== null) {
            result.push(node.value);
            result.push(...this.preorderTraversal(node.left));
            result.push(...this.preorderTraversal(node.right));
        }
        return result;
    }

    postorderTraversal(node: Node | null): number[] {
        const result: number[] = [];
        if (node !== null) {
            result.push(...this.postorderTraversal(node.left));
            result.push(...this.postorderTraversal(node.right));
            result.push(node.value);
        }
        return result;
    }
}
const tree = new BinaryTree();
tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);

console.log('Inorder Traversal:', tree.inorderTraversal(tree.root)); // [3, 5, 7, 10, 15]
console.log('Preorder Traversal:', tree.preorderTraversal(tree.root)); // [10, 5, 3, 7, 15]
console.log('Postorder Traversal:', tree.postorderTraversal(tree.root)); // [3, 7, 5, 15, 10]

const foundNode = tree.search(7);
console.log(foundNode ? `Found: ${foundNode.value}` : 'Not found'); // Found: 7
