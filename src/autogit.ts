enum Color {
    RED,
    BLACK
}

class RBNode<T> {
    value: T;
    left: RBNode<T> | null;
    right: RBNode<T> | null;
    parent: RBNode<T> | null;
    color: Color;

    constructor(value: T) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
        this.color = Color.RED; // New nodes are always red
    }

    isRed(): boolean {
        return this.color === Color.RED;
    }
}

class RedBlackTree<T> {
    private root: RBNode<T> | null;

    constructor() {
        this.root = null;
    }

    public insert(value: T): void {
        const node = new RBNode(value);
        let current: RBNode<T> | null = null;
        let temp = this.root;

        // Standard BST insertion
        while (temp !== null) {
            current = temp;
            if (node.value < temp.value) {
                temp = temp.left;
            } else {
                temp = temp.right;
            }
        }

        node.parent = current;
        if (current === null) {
            this.root = node; // Tree was empty
        } else if (node.value < current.value) {
            current.left = node;
        } else {
            current.right = node;
        }

        // Fix Red-Black Tree violations
        if (node.parent === null) {
            node.color = Color.BLACK; // Root must be black
            return;
        }

        if (node.parent.parent === null) {
            return; // Parent is root, no further action needed
        }

        this.fixInsert(node);
    }

    private fixInsert(node: RBNode<T>): void {
        let parent = node.parent!;
        while (parent.isRed()) {
            const grandparent = parent.parent!;
            if (parent === grandparent.left) {
                const uncle = grandparent.right;
                if (uncle?.isRed()) { // Case 1: Uncle is red
                    parent.color = Color.BLACK;
                    uncle.color = Color.BLACK;
                    grandparent.color = Color.RED;
                    node = grandparent;
                    parent = node.parent!;
                } else { // Case 2/3: Uncle is black
                    if (node === parent.right) { // Case 2 (Left-Right)
                        this.leftRotate(parent);
                        node = parent;
                        parent = node.parent!;
                    } // Convert to case 3
                    // Case 3 (Left-Left)
                    parent.color = Color.BLACK;
                    grandparent.color = Color.RED;
                    this.rightRotate(grandparent);
                }
            } else { // Mirror cases
                const uncle = grandparent.left;
                if (uncle?.isRed()) {
                    parent.color = Color.BLACK;
                    uncle.color = Color.BLACK;
                    grandparent.color = Color.RED;
                    node = grandparent;
                    parent = node.parent!;
                } else {
                    if (node === parent.left) { // Right-Left case
                        this.rightRotate(parent);
                        node = parent;
                        parent = node.parent!;
                    } // Convert to Right-Right case
                    parent.color = Color.BLACK;
                    grandparent.color = Color.RED;
                    this.leftRotate(grandparent);
                }
            }
            if (!node.parent) break; // Reached root
        }
        this.root!.color = Color.BLACK; // Ensure root remains black
    }

    private leftRotate(node: RBNode<T>): void {
        const rightChild = node.right!;
        node.right = rightChild.left;

        if (rightChild.left) {
            rightChild.left.parent = node;
        }

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

    private rightRotate(node: RBNode<T>): void {
        const leftChild = node.left!;
        node.left = leftChild.right;

        if (leftChild.right) {
            leftChild.right.parent = node;
        }

        leftChild.parent = node.parent;

        if (!node.parent) {
            this.root = leftChild;
        } else if (node === node.parent.right) {
            node.parent.right = leftChild;
        } else {
            node.parent.left = leftChild;
        }

        leftChild.right = node;
        node.parent = leftChild;
    }

    // Helper methods
    public inorder(): T[] {
        const result: T[] = [];
        this.inorderTraversal(this.root, result);
        return result;
    }

    private inorderTraversal(node: RBNode<T> | null, result: T[]): void {
        if (node) {
            this.inorderTraversal(node.left, result);
            result.push(node.value);
            this.inorderTraversal(node.right, result);
        }
    }

    public search(value: T): RBNode<T> | null {
        return this.searchNode(this.root, value);
    }

    private searchNode(node: RBNode<T> | null, value: T): RBNode<T> | null {
        if (!node) return null;
        if (value === node.value) return node;
        if (value < node.value) return this.searchNode(node.left, value);
        return this.searchNode(node.right, value);
    }
}

// Example usage:
const rbt = new RedBlackTree<number>();
rbt.insert(7);
rbt.insert(3);
rbt.insert(18);
rbt.insert(10);
rbt.insert(22);
rbt.insert(8);
rbt.insert(11);
rbt.insert(26);

console.log(rbt.inorder()); // [3, 7, 8, 10, 11, 18, 22, 26]
// Verify root is black
console.assert(rbt.root?.color === Color.BLACK, "Root must be black");

// Verify no two consecutive red nodes exist
function verifyRedBlackProperties<T>(node: RBNode<T> | null): number {
    if (!node) return 1; // Null nodes count as black

    const leftBlackHeight = verifyRedBlackProperties(node.left);
    const rightBlackHeight = verifyRedBlackProperties(node.right);

    // Check for equal black heights
    console.assert(leftBlackHeight === rightBlackHeight, "Black height mismatch");

    // Check for consecutive red nodes
    if (node.isRed()) {
        console.assert(
            (!node.left || node.left.color === Color.BLACK) && 
            (!node.right || node.right.color === Color.BLACK),
            "Red node with red child"
        );
    }

    // Return black height of this subtree
    return (node.color === Color.BLACK ? 1 : 0) + leftBlackHeight;
}

verifyRedBlackProperties(rbt.root);
