// Enum for node colors
enum Color {
    RED = 'RED',
    BLACK = 'BLACK'
}

// Node interface
interface RBNode<T> {
    key: T;
    value?: any;
    color: Color;
    left: RBNode<T> | null;
    right: RBNode<T> | null;
    parent: RBNode<T> | null;
}

// Red-Black Tree class
class RedBlackTree<T> {
    private root: RBNode<T> | null = null;

    // Helper to create a new node
    private createNode(key: T, value?: any): RBNode<T> {
        return {
            key,
            value,
            color: Color.RED,
            left: null,
            right: null,
            parent: null
        };
    }

    // Check if a node is red
    private isRed(node: RBNode<T> | null): boolean {
        return node !== null && node.color === Color.RED;
    }

    // Set color of a node
    private setColor(node: RBNode<T> | null, color: Color): void {
        if (node !== null) {
            node.color = color;
        }
    }

    // Get uncle of a node
    private getUncle(node: RBNode<T> | null): RBNode<T> | null {
        if (node === null || node.parent === null) return null;
        return this.getSibling(node.parent);
    }

    // Get sibling of a node
    private getSibling(node: RBNode<T> | null): RBNode<T> | null {
        if (node === null || node.parent === null) return null;
        return node === node.parent.left ? node.parent.right : node.parent.left;
    }

    // Left rotation
    private rotateLeft(x: RBNode<T>): RBNode<T> {
        const y = x.right!;
        x.right = y.left;
        
        if (y.left !== null) {
            y.left.parent = x;
        }
        
        y.parent = x.parent;
        
        if (x.parent === null) {
            this.root = y;
        } else if (x === x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }
        
        y.left = x;
        x.parent = y;
        
        return y;
    }

    // Right rotation
    private rotateRight(y: RBNode<T>): RBNode<T> {
        const x = y.left!;
        y.left = x.right;
        
        if (x.right !== null) {
            x.right.parent = y;
        }
        
        x.parent = y.parent;
        
        if (y.parent === null) {
            this.root = x;
        } else if (y === y.parent.right) {
            y.parent.right = x;
        } else {
            y.parent.left = x;
        }
        
        x.right = y;
        y.parent = x;
        
        return x;
    }

    // Fix red-black properties after insertion
    private fixInsert(node: RBNode<T>): void {
        // If node is root, make it black
        if (node.parent === null) {
            this.setColor(node, Color.BLACK);
            return;
        }

        let parent = node.parent;
        let grandparent = parent.parent;

        // If parent is black, no violations
        if (parent.color === Color.BLACK) {
            return;
        }

        // Parent is red, check grandparent
        if (grandparent === null) {
            return;
        }

        const uncle = this.getUncle(parent);
        const uncleIsRed = this.isRed(uncle);

        // Case 1: Uncle is red
        if (uncleIsRed) {
            this.setColor(parent, Color.BLACK);
            this.setColor(uncle, Color.BLACK);
            this.setColor(grandparent, Color.RED);
            this.fixInsert(grandparent);
        } else {
            // Case 2 & 3: Uncle is black or null
            if (node === parent.right && parent === grandparent.left) {
                // Line of sight: rotate parent left
                this.rotateLeft(parent);
                node = parent;
                parent = node.parent!;
            } else if (node === parent.left && parent === grandparent.right) {
                // Line of sight: rotate parent right
                this.rotateRight(parent);
                node = parent;
                parent = node.parent!;
            }

            // Case 3 & 4: Recolor and rotate
            this.setColor(parent, Color.BLACK);
            this.setColor(grandparent, Color.RED);

            if (node === parent.left && parent === grandparent.left) {
                // Left-left case
                this.rotateRight(grandparent);
            } else {
                // Right-right case
                this.rotateLeft(grandparent);
            }
        }
    }

    // Find the minimum node in a subtree
    private minimum(node: RBNode<T>): RBNode<T> {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    // Transplant nodes (replace one subtree with another)
    private transplant(u: RBNode<T>, v: RBNode<T> | null): void {
        if (u.parent === null) {
            this.root = v;
        } else if (u === u.parent.left) {
            u.parent.left = v;
        } else {
            u.parent.right = v;
        }
        
        if (v !== null) {
            v.parent = u.parent;
        }
    }

    // Fix red-black properties after deletion
    private fixDelete(x: RBNode<T>): void {
        while (x !== this.root && !this.isRed(x)) {
            if (x === x.parent!.left) {
                let sibling = x.parent!.right;
                
                if (this.isRed(sibling)) {
                    // Case 1: Sibling is red
                    this.setColor(sibling, Color.BLACK);
                    this.setColor(x.parent!, Color.RED);
                    this.rotateLeft(x.parent!);
                    sibling = x.parent!.right;
                }

                if (!this.isRed(sibling!.left) && !this.isRed(sibling!.right)) {
                    // Case 2: Sibling is black with two black children
                    this.setColor(sibling, Color.RED);
                    x = x.parent!;
                } else {
                    if (!this.isRed(sibling!.right)) {
                        // Case 3: Sibling has red left child
                        this.setColor(sibling!.left, Color.BLACK);
                        this.setColor(sibling, Color.RED);
                        this.rotateRight(sibling!);
                        sibling = x.parent!.right;
                    }
                    
                    // Case 4: Sibling has red right child
                    this.setColor(sibling, x.parent!.color);
                    this.setColor(x.parent!, Color.BLACK);
                    this.setColor(sibling.right, Color.BLACK);
                    this.rotateLeft(x.parent!);
                    x = this.root!;
                }
            } else {
                let sibling = x.parent!.left;
                
                if (this.isRed(sibling)) {
                    // Case 1: Sibling is red
                    this.setColor(sibling, Color.BLACK);
                    this.setColor(x.parent!, Color.RED);
                    this.rotateRight(x.parent!);
                    sibling = x.parent!.left;
                }

                if (!this.isRed(sibling!.right) && !this.isRed(sibling!.left)) {
                    // Case 2: Sibling is black with two black children
                    this.setColor(sibling, Color.RED);
                    x = x.parent!;
                } else {
                    if (!this.isRed(sibling!.left)) {
                        // Case 3: Sibling has red right child
                        this.setColor(sibling!.right, Color.BLACK);
                        this.setColor(sibling, Color.RED);
                        this.rotateLeft(sibling!);
                        sibling = x.parent!.left;
                    }
                    
                    // Case 4: Sibling has red left child
                    this.setColor(sibling, x.parent!.color);
                    this.setColor(x.parent!, Color.BLACK);
                    this.setColor(sibling.left, Color.BLACK);
                    this.rotateRight(x.parent!);
                    x = this.root!;
                }
            }
        }
        
        this.setColor(x, Color.BLACK);
    }

    // Insert a key-value pair
    insert(key: T, value?: any): void {
        const node = this.createNode(key, value);
        
        // Standard BST insert
        let parent: RBNode<T> | null = null;
        let current = this.root;
        
        while (current !== null) {
            parent = current;
            if (key < current.key) {
                current = current.left;
            } else if (key > current.key) {
                current = current.right;
            } else {
                // Update existing node
                current.value = value;
                return;
            }
        }
        
        node.parent = parent;
        
        if (parent === null) {
            this.root = node;
        } else if (key < parent.key) {
            parent.left = node;
        } else {
            parent.right = node;
        }
        
        // Fix red-black properties
        this.fixInsert(node);
    }

    // Delete a key
    delete(key: T): boolean {
        let node = this.root;
        let deleted = false;
        
        while (node !== null && node.key !== key) {
            if (key < node.key) {
                node = node.left;
            } else {
                node = node.right;
            }
        }
        
        if (node === null) {
            return false;
        }
        
        // Found the node to delete
        const originalColor = node.color;
        let replacement: RBNode<T> | null;
        
        if (node.left === null) {
            replacement = node.right;
            this.transplant(node, node.right);
        } else if (node.right === null) {
            replacement = node.left;
            this.transplant(node, node.left);
        } else {
            // Node has two children
            const successor = this.minimum(node.right!);
            replacement = successor.right;
            
            if (successor.parent === node) {
                if (replacement !== null) {
                    replacement.parent = successor;
                }
            } else {
                this.transplant(successor, successor.right);
                successor.right = node.right;
                if (successor.right !== null) {
                    successor.right.parent = successor;
                }
            }
            
            this.transplant(node, successor);
            successor.left = node.left;
            if (successor.left !== null) {
                successor.left.parent = successor;
            }
            successor.color = node.color;
            replacement = successor;
        }
        
        if (originalColor === Color.BLACK && replacement !== null) {
            this.fixDelete(replacement);
        }
        
        deleted = true;
        return deleted;
    }

    // Find a key
    find(key: T): any | null {
        let current = this.root;
        while (current !== null) {
            if (key === current.key) {
                return current.value;
            } else if (key < current.key) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return null;
    }

    // Check if tree contains a key
    contains(key: T): boolean {
        return this.find(key) !== null;
    }

    // Get the minimum key
    getMin(): T | null {
        if (this.root === null) return null;
        let current = this.root;
        while (current.left !== null) {
            current = current.left;
        }
        return current.key;
    }

    // Get the maximum key
    getMax(): T | null {
        if (this.root === null) return null;
        let current = this.root;
        while (current.right !== null) {
            current = current.right;
        }
        return current.key;
    }

    // Get tree size
    getSize(): number {
        return this.sizeHelper(this.root);
    }

    private sizeHelper(node: RBNode<T> | null): number {
        if (node === null) return 0;
        return 1 + this.sizeHelper(node.left) + this.sizeHelper(node.right);
    }

    // In-order traversal (returns sorted keys)
    getAllKeys(): T[] {
        const result: T[] = [];
        this.inOrderHelper(this.root, result);
        return result;
    }

    private inOrderHelper(node: RBNode<T> | null, result: T[]): void {
        if (node !== null) {
            this.inOrderHelper(node.left, result);
            result.push(node.key);
            this.inOrderHelper(node.right, result);
        }
    }

    // Check if tree is empty
    isEmpty(): boolean {
        return this.root === null;
    }

    // Clear the tree
    clear(): void {
        this.root = null;
    }

    // Get height of the tree
    getHeight(): number {
        return this.heightHelper(this.root);
    }

    private heightHelper(node: RBNode<T> | null): number {
        if (node === null) return 0;
        return 1 + Math.max(
            this.heightHelper(node.left),
            this.heightHelper(node.right)
        );
    }

    // Verify red-black properties (for debugging)
    verify(): boolean {
        if (this.root === null) return true;
        
        // Root should be black
        if (this.root.color !== Color.BLACK) return false;
        
        // Check black height
        const blackHeight = this.getBlackHeight(this.root);
        return this.verifyHelper(this.root, 0, blackHeight);
    }

    private verifyHelper(node: RBNode<T> | null, blackCount: number, expectedBlackHeight: number): boolean {
        if (node === null) {
            return blackCount === expectedBlackHeight;
        }
        
        // No two consecutive red nodes
        if (this.isRed(node) && (this.isRed(node.left) || this.isRed(node.right))) {
            return false;
        }
        
        const newBlackCount = blackCount + (node.color === Color.BLACK ? 1 : 0);
        return this.verifyHelper(node.left, newBlackCount, expectedBlackHeight) &&
               this.verifyHelper(node.right, newBlackCount, expectedBlackHeight);
    }

    private getBlackHeight(node: RBNode<T> | null): number {
        if (node === null) return 0;
        return (node.color === Color.BLACK ? 1 : 0) + this.getBlackHeight(node.left);
    }
}

// Usage example
if (require.main === module) {
    // Example usage
    const tree = new RedBlackTree<number>();
    
    // Insert some values
    [10, 20, 30, 5, 15, 25].forEach(key => {
        tree.insert(key);
    });
    
    console.log('Tree size:', tree.getSize()); // 6
    console.log('Contains 15:', tree.contains(15)); // true
    console.log('Sorted keys:', tree.getAllKeys()); // [5, 10, 15, 20, 25, 30]
    
    // Test find
    console.log('Find 20:', tree.find(20)); // undefined (no value stored)
    
    // Store values
    tree.insert(20, 'twenty');
    console.log('Find 20 with value:', tree.find(20)); // 'twenty'
    
    // Test deletion
    tree.delete(10);
    console.log('After deleting 10, size:', tree.getSize()); // 5
    console.log('Sorted keys after deletion:', tree.getAllKeys()); // [5, 15, 20, 25, 30]
    
    console.log('Tree verification:', tree.verify()); // true
}

// Export for module usage
export { RedBlackTree, Color };
export type { RBNode };
// Create a tree for strings
const stringTree = new RedBlackTree<string>();

// Insert key-value pairs
stringTree.insert('banana', 'fruit');
stringTree.insert('apple', 'fruit');
stringTree.insert('carrot', 'vegetable');

// Search
console.log(stringTree.find('banana')); // 'fruit'
console.log(stringTree.contains('orange')); // false

// Get sorted keys
console.log(stringTree.getAllKeys()); // ['apple', 'banana', 'carrot']

// Delete
stringTree.delete('apple');
console.log(stringTree.getSize()); // 2
