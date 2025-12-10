interface RBNode<T> {
    value: T;
    color: 'RED' | 'BLACK';
    left: RBNode<T> | null;
    right: RBNode<T> | null;
    parent: RBNode<T> | null;
}

interface RBTree<T> {
    root: RBNode<T> | null;
    size: number;
    insert(value: T): void;
    delete(value: T): boolean;
    search(value: T): RBNode<T> | null;
    inOrderTraversal(): T[];
    min(): T | null;
    max(): T | null;
}
class RedBlackNode<T> implements RBNode<T> {
    value: T;
    color: 'RED' | 'BLACK';
    left: RBNode<T> | null;
    right: RBNode<T> | null;
    parent: RBNode<T> | null;

    constructor(
        value: T,
        color: 'RED' | 'BLACK' = 'RED',
        left: RBNode<T> | null = null,
        right: RBNode<T> | null = null,
        parent: RBNode<T> | null = null
    ) {
        this.value = value;
        this.color = color;
        this.left = left;
        this.right = right;
        this.parent = parent;
    }
}
class RedBlackTree<T> implements RBTree<T> {
    root: RBNode<T> | null = null;
    size: number = 0;
    private comparator: (a: T, b: T) => number;

    constructor(comparator?: (a: T, b: T) => number) {
        this.comparator = comparator || ((a: T, b: T) => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        });
    }

    // Insertion
    insert(value: T): void {
        const newNode = new RedBlackNode(value);
        
        if (this.root === null) {
            this.root = newNode;
            this.root.color = 'BLACK';
            this.size++;
            return;
        }

        let current = this.root;
        let parent: RBNode<T> | null = null;

        while (current !== null) {
            parent = current;
            const cmp = this.comparator(value, current.value);
            
            if (cmp < 0) {
                current = current.left;
            } else if (cmp > 0) {
                current = current.right;
            } else {
                // Value already exists
                return;
            }
        }

        if (parent) {
            const cmp = this.comparator(value, parent.value);
            if (cmp < 0) {
                parent.left = newNode;
            } else {
                parent.right = newNode;
            }
            newNode.parent = parent;
        }

        this.fixInsertion(newNode);
        this.size++;
    }

    // Fix insertion violations
    private fixInsertion(node: RBNode<T>): void {
        let current = node;
        
        while (current.parent?.color === 'RED') {
            const parent = current.parent!;
            const grandparent = parent.parent!;

            if (parent === grandparent.left) {
                const uncle = grandparent.right;

                if (uncle?.color === 'RED') {
                    // Case 1: Uncle is red
                    parent.color = 'BLACK';
                    uncle.color = 'BLACK';
                    grandparent.color = 'RED';
                    current = grandparent;
                } else {
                    // Case 2: Uncle is black
                    if (current === parent.right) {
                        // Left-right case
                        current = parent;
                        this.leftRotate(current);
                    }
                    // Case 3: Left-left case
                    parent.color = 'BLACK';
                    grandparent.color = 'RED';
                    this.rightRotate(grandparent);
                }
            } else {
                // Mirror cases for right subtree
                const uncle = grandparent.left;

                if (uncle?.color === 'RED') {
                    parent.color = 'BLACK';
                    uncle.color = 'BLACK';
                    grandparent.color = 'RED';
                    current = grandparent;
                } else {
                    if (current === parent.left) {
                        current = parent;
                        this.rightRotate(current);
                    }
                    parent.color = 'BLACK';
                    grandparent.color = 'RED';
                    this.leftRotate(grandparent);
                }
            }
        }

        this.root!.color = 'BLACK';
    }

    // Rotation operations
    private leftRotate(node: RBNode<T>): void {
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

    private rightRotate(node: RBNode<T>): void {
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

    // Search
    search(value: T): RBNode<T> | null {
        return this.searchNode(this.root, value);
    }

    private searchNode(node: RBNode<T> | null, value: T): RBNode<T> | null {
        if (node === null) return null;

        const cmp = this.comparator(value, node.value);
        
        if (cmp === 0) return node;
        if (cmp < 0) return this.searchNode(node.left, value);
        return this.searchNode(node.right, value);
    }

    // Deletion (simplified - full implementation would be more complex)
    delete(value: T): boolean {
        const node = this.search(value);
        if (!node) return false;

        // Simplified deletion - full implementation would handle all cases
        // including fixing violations after deletion
        return this.deleteNode(node);
    }

    private deleteNode(node: RBNode<T>): boolean {
        // Complex deletion logic would go here
        // This is a placeholder implementation
        console.warn('Full deletion implementation not provided - would require complex fixup logic');
        return false;
    }

    // Traversal
    inOrderTraversal(): T[] {
        const result: T[] = [];
        this.inOrder(this.root, result);
        return result;
    }

    private inOrder(node: RBNode<T> | null, result: T[]): void {
        if (node === null) return;
        this.inOrder(node.left, result);
        result.push(node.value);
        this.inOrder(node.right, result);
    }

    // Min/Max
    min(): T | null {
        if (this.root === null) return null;
        return this.findMin(this.root).value;
    }

    max(): T | null {
        if (this.root === null) return null;
        return this.findMax(this.root).value;
    }

    private findMin(node: RBNode<T>): RBNode<T> {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    private findMax(node: RBNode<T>): RBNode<T> {
        while (node.right !== null) {
            node = node.right;
        }
        return node;
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

    // Validation (for testing)
    isValid(): boolean {
        return this.validateTree(this.root);
    }

    private validateTree(node: RBNode<T> | null): boolean {
        if (node === null) return true;
        
        // Check BST property
        if (node.left && this.comparator(node.left.value, node.value) >= 0) {
            return false;
        }
        if (node.right && this.comparator(node.right.value, node.value) <= 0) {
            return false;
        }

        // Check red-black properties
        if (node.color === 'RED') {
            if (node.left?.color === 'RED' || node.right?.color === 'RED') {
                return false;
            }
        }

        return this.validateTree(node.left) && this.validateTree(node.right);
    }
}
// Example usage
const rbTree = new RedBlackTree<number>();

// Insert values
rbTree.insert(10);
rbTree.insert(20);
rbTree.insert(5);
rbTree.insert(15);
rbTree.insert(25);
rbTree.insert(3);
rbTree.insert(7);

console.log('In-order traversal:', rbTree.inOrderTraversal());
console.log('Size:', rbTree.size);
console.log('Height:', rbTree.getHeight());
console.log('Min:', rbTree.min());
console.log('Max:', rbTree.max());
console.log('Search 15:', rbTree.search(15)?.value);
console.log('Tree is valid:', rbTree.isValid());

// Custom comparator example
const stringTree = new RedBlackTree<string>((a, b) => a.localeCompare(b));
stringTree.insert('zebra');
stringTree.insert('apple');
stringTree.insert('banana');
console.log('String tree:', stringTree.inOrderTraversal());
