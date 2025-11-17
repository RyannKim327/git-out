// Node definition
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

// Binary Search Tree (BST) example
class BinaryTree<T> {
    root: TreeNode<T> | null = null;

    insert(value: T): void {
        const newNode = new TreeNode(value);

        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while (true) {
            if (value < (current.value as unknown as number)) {
                if (current.left === null) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            }
        }
    }

    // Simple inorder traversal
    inOrderTraversal(node: TreeNode<T> | null = this.root): void {
        if (!node) return;
        this.inOrderTraversal(node.left);
        console.log(node.value);
        this.inOrderTraversal(node.right);
    }

    search(value: T): TreeNode<T> | null {
        let current = this.root;
        while (current) {
            if (value === current.value) return current;
            current = value < (current.value as unknown as number) 
                ? current.left 
                : current.right;
        }
        return null;
    }
}

// Example usage
const tree = new BinaryTree<number>();
tree.insert(5);
tree.insert(3);
tree.insert(7);
tree.insert(4);

tree.inOrderTraversal(); // 3, 4, 5, 7
console.log(tree.search(7)); // TreeNode with value 7
