enum Color {
    RED = 'RED',
    BLACK = 'BLACK'
}

class RBNode<T> {
    value: T;
    color: Color;
    left: RBNode<T> | null;
    right: RBNode<T> | null;
    parent: RBNode<T> | null;

    constructor(value: T, color: Color = Color.RED) {
        this.value = value;
        this.color = color;
        this.left = null;
        this.right = null;
        this.parent = null;
    }

    isRed(): boolean {
        return this.color === Color.RED;
    }

    isBlack(): boolean {
        return this.color === Color.BLACK;
    }
}

class RedBlackTree<T> {
    private root: RBNode<T> | null;
    private comparator: (a: T, b: T) => number;

    constructor(comparator?: (a: T, b: T) => number) {
        this.root = null;
        this.comparator = comparator || ((a: T, b: T) => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        });
    }

    // Public methods
    insert(value: T): void {
        const newNode = new RBNode(value);
        this.root = this.insertNode(this.root, newNode);
        this.fixViolation(newNode);
    }

    search(value: T): boolean {
        return this.searchNode(this.root, value);
    }

    // In-order traversal
    inorder(): T[] {
        const result: T[] = [];
        this.inorderTraversal(this.root, result);
        return result;
    }

    // Private methods
    private insertNode(root: RBNode<T> | null, node: RBNode<T>): RBNode<T> {
        if (root === null) return node;

        if (this.comparator(node.value, root.value) < 0) {
            root.left = this.insertNode(root.left, node);
            root.left.parent = root;
        } else {
            root.right = this.insertNode(root.right, node);
            root.right.parent = root;
        }

        return root;
    }

    private searchNode(node: RBNode<T> | null, value: T): boolean {
        if (node === null) return false;

        const comp = this.comparator(value, node.value);
        if (comp === 0) return true;
        if (comp < 0) return this.searchNode(node.left, value);
        return this.searchNode(node.right, value);
    }

    private fixViolation(node: RBNode<T>): void {
        let parent: RBNode<T> | null = null;
        let grandParent: RBNode<T> | null = null;

        while (node !== this.root && node.isRed() && node.parent?.isRed()) {
            parent = node.parent;
            grandParent = parent.parent;

            if (!grandParent) break;

            if (parent === grandParent.left) {
                const uncle = grandParent.right;

                if (uncle?.isRed()) {
                    // Case 1: Uncle is red
                    grandParent.color = Color.RED;
                    parent.color = Color.BLACK;
                    uncle.color = Color.BLACK;
                    node = grandParent;
                } else {
                    // Case 2: Uncle is black
                    if (node === parent.right) {
                        this.rotateLeft(parent);
                        node = parent;
                        parent = node.parent;
                    }

                    // Case 3: Node is left child
                    this.rotateRight(grandParent);
                    this.swapColors(parent!, grandParent);
                    node = parent!;
                }
            } else {
                const uncle = grandParent.left;

                if (uncle?.isRed()) {
                    // Case 1: Uncle is red
                    grandParent.color = Color.RED;
                    parent.color = Color.BLACK;
                    uncle.color = Color.BLACK;
                    node = grandParent;
                } else {
                    // Case 2: Uncle is black
                    if (node === parent.left) {
                        this.rotateRight(parent);
                        node = parent;
                        parent = node.parent;
                    }

                    // Case 3: Node is right child
                    this.rotateLeft(grandParent);
                    this.swapColors(parent!, grandParent);
                    node = parent!;
                }
            }
        }

        // Ensure root is always black
        if (this.root) this.root.color = Color.BLACK;
    }

    private rotateLeft(node: RBNode<T>): void {
        const rightChild = node.right;
        if (!rightChild) return;

        node.right = rightChild.left;
        if (rightChild.left) rightChild.left.parent = node;

        rightChild.parent = node.parent;
        
        if (!node.parent) {
            this.root = rightChild;
        } else if (node === node.parent.left) {
            node.parent.left = rightChild;
        } else {
            node.parent.right = rightChild;
        }

        rightChild.left = node;
        node.parent = rightChild;
    }

    private rotateRight(node: RBNode<T>): void {
        const leftChild = node.left;
        if (!leftChild) return;

        node.left = leftChild.right;
        if (leftChild.right) leftChild.right.parent = node;

        leftChild.parent = node.parent;
        
        if (!node.parent) {
            this.root = leftChild;
        } else if (node === node.parent.left) {
            node.parent.left = leftChild;
        } else {
            node.parent.right = leftChild;
        }

        leftChild.right = node;
        node.parent = leftChild;
    }

    private swapColors(node1: RBNode<T>, node2: RBNode<T>): void {
        const temp = node1.color;
        node12.color = node2.color;
        node2.color = temp;
    }

    private inorderTraversal(node: RBNode<T> | null, result: T[]): void {
        if (node) {
            this.inorderTraversal(node.left, result);
            result.push(node.value);
            this.inorderTraversal(node.right, result);
        }
    }

    // Utility methods
    getHeight(): number {
        return this.calculateHeight(this.root);
    }

    private calculateHeight(node: RBNode<T> | null): number {
        if (node === null) return 0;
        return 1 + Math.max(
            this.calculateHeight(node.left),
            this.calculateHeight(node.right)
        );
    }
}
// Create a red-black tree for numbers
const tree = new RedBlackTree<number>();

// Insert values
tree.insert(10);
tree.insert(20);
tree.insert(5);
tree.insert(15);
tree.insert(25);

// Search for values
console.log(tree.search(15)); // true
console.log(tree.search(30)); // false

// Get sorted values (in-order traversal)
console.log(tree.inorder()); // [5, 10, 15, 20, 25]

// Get tree height
console.log(tree.getHeight()); // 3
