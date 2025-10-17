enum Color {
    RED,
    BLACK
}

class RBNode<T> {
    left: RBNode<T>;
    right: RBNode<T>;
    parent: RBNode<T>;
    color: Color;
    
    constructor(
        public value: T,
        private nullLeaf: RBNode<T>  // Sentinel reference
    ) {
        this.left = nullLeaf;
        this.right = nullLeaf;
        this.parent = nullLeaf;
        this.color = Color.RED;  // New nodes are always RED
    }
}

class RedBlackTree<T> {
    private nullLeaf: RBNode<T> = new RBNode<T>(null as any, null as any);
    root: RBNode<T> = this.nullLeaf;

    constructor(private comparator: (a: T, b: T) => number) {
        this.nullLeaf.color = Color.BLACK;
    }

    // Public methods
    insert(value: T): void {
        let node = new RBNode(value, this.nullLeaf);
        let parent = this.nullLeaf;
        let current = this.root;

        // BST insertion
        while (current !== this.nullLeaf) {
            parent = current;
            if (this.comparator(value, current.value) < 0) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        node.parent = parent;

        if (parent === this.nullLeaf) {
            this.root = node;
        } else if (this.comparator(value, parent.value) < 0) {
            parent.left = node;
        } else {
            parent.right = node;
        }

        // Fix RB Tree properties
        this.fixInsert(node);
    }

    find(value: T): RBNode<T> | null {
        let current = this.root;
        while (current !== this.nullLeaf) {
            const cmp = this.comparator(value, current.value);
            if (cmp === 0) return current;
            current = cmp < 0 ? current.left : current.right;
        }
        return null;
    }

    // Private helper methods
    private fixInsert(node: RBNode<T>): void {
        let current = node;
        while (current.parent.color === Color.RED) {
            const parent = current.parent;
            const grandParent = parent.parent;

            if (parent === grandParent.left) {
                const uncle = grandParent.right;
                
                // Case 1: Uncle is RED
                if (uncle.color === Color.RED) {
                    grandParent.color = Color.RED;
                    parent.color = Color.BLACK;
                    uncle.color = Color.BLACK;
                    current = grandParent;
                } else {
                    // Case 2: Current is right child (Left-Right Case)
                    if (current === parent.right) {
                        current = parent;
                        this.leftRotate(current);
                    }
                    
                    // Case 3: Current is left child (Left-Left Case)
                    parent.color = Color.BLACK;
                    grandParent.color = Color.RED;
                    this.rightRotate(grandParent);
                }
            } else {
                const uncle = grandParent.left;
                
                // Case 1: Uncle is RED
                if (uncle.color === Color.RED) {
                    grandParent.color = Color.RED;
                    parent.color = Color.BLACK;
                    uncle.color = Color.BLACK;
                    current = grandParent;
                } else {
                    // Case 2: Current is left child (Right-Left Case)
                    if (current === parent.left) {
                        current = parent;
                        this.rightRotate(current);
                    }
                    
                    // Case 3: Current is right child (Right-Right Case)
                    parent.color = Color.BLACK;
                    grandParent.color = Color.RED;
                    this.leftRotate(grandParent);
                }
            }
        }
        
        // Ensure root is black
        this.root.color = Color.BLACK;
    }

    private leftRotate(x: RBNode<T>): void {
        const y = x.right;
        x.right = y.left;
        
        if (y.left !== this.nullLeaf) {
            y.left.parent = x;
        }
        
        y.parent = x.parent;
        
        if (x.parent === this.nullLeaf) {
            this.root = y;
        } else if (x === x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }
        
        y.left = x;
        x.parent = y;
    }

    private rightRotate(y: RBNode<T>): void {
        const x = y.left;
        y.left = x.right;
        
        if (x.right !== this.nullLeaf) {
            x.right.parent = y;
        }
        
        x.parent = y.parent;
        
        if (y.parent === this.nullLeaf) {
            this.root = x;
        } else if (y === y.parent.right) {
            y.parent.right = x;
        } else {
            y.parent.left = x;
        }
        
        x.right = y;
        y.parent = x;
    }
}
// Create a Red-Black Tree for numbers
const rbTree = new RedBlackTree<number>((a, b) => a - b);

// Insert some values
rbTree.insert(10);
rbTree.insert(20);
rbTree.insert(5);
rbTree.insert(15);
rbTree.insert(25);

// Find a value
const node = rbTree.find(15);
console.log(node?.value); // 15
