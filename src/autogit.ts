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
class BinarySearchTree<T> {
    root: TreeNode<T> | null;

    constructor() {
        this.root = null;
    }

    insert(value: T): void {
        const newNode = new TreeNode(value);
        
        if (!this.root) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while (true) {
            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            }
        }
    }

    find(value: T): boolean {
        let current = this.root;

        while (current) {
            if (value === current.value) return true;
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }

    inOrderTraversal(node: TreeNode<T> | null, callback: (value: T) => void): void {
        if (!node) return;
        this.inOrderTraversal(node.left, callback);
        callback(node.value);
        this.inOrderTraversal(node.right, callback);
    }
}
const bst = new BinarySearchTree<number>();

bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);

console.log(bst.find(15)); // true
console.log(bst.find(8));  // false

bst.inOrderTraversal(bst.root, value => console.log(value));
// Output: 3, 5, 10, 15
