enum Color {
    RED = "RED",
    BLACK = "BLACK",
}

class Node<T> {
    value: T;
    color: Color;
    left: Node<T> | null;
    right: Node<T> | null;
    parent: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.color = Color.RED; // New nodes are always red
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}
class RedBlackTree<T> {
    private root: Node<T> | null = null;

    // Insertion method
    insert(value: T) {
        const newNode = new Node(value);
        this.root = this.insertNode(this.root, newNode);
        this.fixViolations(newNode);
    }

    private insertNode(root: Node<T> | null, node: Node<T>): Node<T> {
        if (root === null) {
            return node;
        }

        if (node.value < root.value) {
            root.left = this.insertNode(root.left, node);
            root.left!.parent = root;
        } else {
            root.right = this.insertNode(root.right, node);
            root.right!.parent = root;
        }

        return root;
    }

    private fixViolations(node: Node<T>) {
        let current: Node<T> | null = node;

        while (current !== this.root && current.parent!.color === Color.RED) {
            const parent = current.parent!;
            const grandparent = parent.parent;

            if (parent === grandparent?.left) {
                const uncle = grandparent.right;
                if (uncle?.color === Color.RED) {
                    parent.color = Color.BLACK;
                    uncle.color = Color.BLACK;
                    grandparent.color = Color.RED;
                    current = grandparent;
                } else {
                    if (current === parent.right) {
                        this.rotateLeft(parent);
                        current = parent;
                        parent = current.parent!;
                    }
                    this.rotateRight(grandparent);
                    [parent.color, grandparent.color] = [grandparent.color, parent.color];
                    current = parent;
                }
            } else {
                const uncle = grandparent?.left;
                if (uncle?.color === Color.RED) {
                    parent.color = Color.BLACK;
                    uncle.color = Color.BLACK;
                    grandparent.color = Color.RED;
                    current = grandparent;
                } else {
                    if (current === parent.left) {
                        this.rotateRight(parent);
                        current = parent;
                        parent = current.parent!;
                    }
                    this.rotateLeft(grandparent);
                    [parent.color, grandparent.color] = [grandparent.color, parent.color];
                    current = parent;
                }
            }
        }

        this.root!.color = Color.BLACK;
    }

    private rotateLeft(node: Node<T>) {
        const rightChild = node.right!;
        node.right = rightChild.left;

        if (rightChild.left !== null) {
            rightChild.left.parent = node;
        }

        rightChild.parent = node.parent;

        if (node.parent === null) {
            this.root = rightChild;
        } else if (node === node.parent.left) {
            node.parent.left = rightChild;
        } else {
            node.parent.right = rightChild;
        }

        rightChild.left = node;
        node.parent = rightChild;
    }

    private rotateRight(node: Node<T>) {
        const leftChild = node.left!;
        node.left = leftChild.right;

        if (leftChild.right !== null) {
            leftChild.right.parent = node;
        }

        leftChild.parent = node.parent;

        if (node.parent === null) {
            this.root = leftChild;
        } else if (node === node.parent.right) {
            node.parent.right = leftChild;
        } else {
            node.parent.left = leftChild;
        }

        leftChild.right = node;
        node.parent = leftChild;
    }

    // In-order traversal for debugging
    inorderTraversal(node: Node<T> | null = this.root): void {
        if (node !== null) {
            this.inorderTraversal(node.left);
            console.log(node.value, node.color);
            this.inorderTraversal(node.right);
        }
    }
}
const rbt = new RedBlackTree<number>();

rbt.insert(10);
rbt.insert(20);
rbt.insert(30);
rbt.insert(15);

console.log("In-order Traversal of Red-Black Tree:");
rbt.inorderTraversal(); // Print the tree
