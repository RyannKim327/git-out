class BTreeNode<T> {
    keys: T[];
    children: BTreeNode<T>[];
    isLeaf: boolean;

    constructor(isLeaf: boolean = true) {
        this.keys = [];
        this.children = [];
        this.isLeaf = isLeaf;
    }
}

class BTree<T> {
    private root: BTreeNode<T>;
    private degree: number; // Minimum degree (defines the range for number of keys)

    constructor(degree: number = 2) {
        this.root = new BTreeNode<T>(true);
        this.degree = degree;
    }

    // Search for a key in the tree
    search(key: T): boolean {
        return this.searchNode(this.root, key);
    }

    private searchNode(node: BTreeNode<T>, key: T): boolean {
        let i = 0;
        
        // Find the first key >= key
        while (i < node.keys.length && key > node.keys[i]) {
            i++;
        }

        // Found the key
        if (i < node.keys.length && key === node.keys[i]) {
            return true;
        }

        // If leaf node, key doesn't exist
        if (node.isLeaf) {
            return false;
        }

        // Search in appropriate child
        return this.searchNode(node.children[i], key);
    }

    // Insert a key into the tree
    insert(key: T): void {
        const root = this.root;

        // If root is full, split it
        if (root.keys.length === 2 * this.degree - 1) {
            const newRoot = new BTreeNode<T>(false);
            newRoot.children.push(root);
            this.splitChild(newRoot, 0);
            this.root = newRoot;
            this.insertNonFull(this.root, key);
        } else {
            this.insertNonFull(root, key);
        }
    }

    private insertNonFull(node: BTreeNode<T>, key: T): void {
        let i = node.keys.length - 1;

        if (node.isLeaf) {
            // Insert key into leaf node
            while (i >= 0 && key < node.keys[i]) {
                i--;
            }
            node.keys.splice(i + 1, 0, key);
        } else {
            // Find child to insert into
            while (i >= 0 && key < node.keys[i]) {
                i--;
            }
            i++;

            // If child is full, split it
            if (node.children[i].keys.length === 2 * this.degree - 1) {
                this.splitChild(node, i);
                if (key > node.keys[i]) {
                    i++;
                }
            }
            this.insertNonFull(node.children[i], key);
        }
    }

    private splitChild(parent: BTreeNode<T>, childIndex: number): void {
        const child = parent.children[childIndex];
        const newChild = new BTreeNode<T>(child.isLeaf);
        
        const midIndex = this.degree - 1;
        const midKey = child.keys[midIndex];

        // Move keys from child to newChild
        newChild.keys = child.keys.splice(midIndex + 1);
        
        // Move children if not leaf
        if (!child.isLeaf) {
            newChild.children = child.children.splice(this.degree);
        }

        // Insert midKey into parent
        parent.keys.splice(childIndex, 0, midKey);
        parent.children.splice(childIndex + 1, 0, newChild);
    }

    // Delete a key from the tree
    delete(key: T): boolean {
        if (!this.search(key)) {
            return false;
        }

        this.deleteFromNode(this.root, key);

        // If root becomes empty and has children, make first child the new root
        if (this.root.keys.length === 0 && !this.root.isLeaf) {
            this.root = this.root.children[0];
        }

        return true;
    }

    private deleteFromNode(node: BTreeNode<T>, key: T): void {
        const index = this.findKeyIndex(node, key);

        // Key is present in this node
        if (index < node.keys.length && node.keys[index] === key) {
            if (node.isLeaf) {
                this.deleteFromLeaf(node, index);
            } else {
                this.deleteFromNonLeaf(node, index);
            }
        } else {
            // Key is in subtree
            if (node.isLeaf) {
                return; // Key not found
            }

            const child = node.children[index];
            if (child.keys.length < this.degree) {
                this.fillChild(node, index);
            }

            // Determine which child to recurse into
            const newIndex = (index > node.keys.length) ? index - 1 : index;
            this.deleteFromNode(node.children[newIndex], key);
        }
    }

    private findKeyIndex(node: BTreeNode<T>, key: T): number {
        let index = 0;
        while (index < node.keys.length && key > node.keys[index]) {
            index++;
        }
        return index;
    }

    private deleteFromLeaf(node: BTreeNode<T>, index: number): void {
        node.keys.splice(index, 1);
    }

    private deleteFromNonLeaf(node: BTreeNode<T>, index: number): void {
        const key = node.keys[index];

        // Case 2a: Left child has at least degree keys
        if (node.children[index].keys.length >= this.degree) {
            const predecessor = this.getPredecessor(node, index);
            node.keys[index] = predecessor;
            this.deleteFromNode(node.children[index], predecessor);
        }
        // Case 2b: Right child has at least degree keys
        else if (node.children[index + 1].keys.length >= this.degree) {
            const successor = this.getSuccessor(node, index);
            node.keys[index] = successor;
            this.deleteFromNode(node.children[index + 1], successor);
        }
        // Case 2c: Merge children
        else {
            this.mergeChildren(node, index);
            this.deleteFromNode(node.children[index], key);
        }
    }

    private getPredecessor(node: BTreeNode<T>, index: number): T {
        let current = node.children[index];
        while (!current.isLeaf) {
            current = current.children[current.keys.length];
        }
        return current.keys[current.keys.length - 1];
    }

    private getSuccessor(node: BTreeNode<T>, index: number): T {
        let current = node.children[index + 1];
        while (!current.isLeaf) {
            current = current.children[0];
        }
        return current.keys[0];
    }

    private fillChild(parent: BTreeNode<T>, childIndex: number): void {
        // Try to borrow from left sibling
        if (childIndex !== 0 && parent.children[childIndex - 1].keys.length >= this.degree) {
            this.borrowFromLeft(parent, childIndex);
        }
        // Try to borrow from right sibling
        else if (childIndex !== parent.keys.length && parent.children[childIndex + 1].keys.length >= this.degree) {
            this.borrowFromRight(parent, childIndex);
        }
        // Merge with sibling
        else {
            if (childIndex !== parent.keys.length) {
                this.mergeChildren(parent, childIndex);
            } else {
                this.mergeChildren(parent, childIndex - 1);
            }
        }
    }

    private borrowFromLeft(parent: BTreeNode<T>, childIndex: number): void {
        const child = parent.children[childIndex];
        const leftSibling = parent.children[childIndex - 1];

        // Move key from parent to child
        child.keys.unshift(parent.keys[childIndex - 1]);
        
        // Move key from left sibling to parent
        parent.keys[childIndex - 1] = leftSibling.keys.pop()!;

        // Move child pointer if not leaf
        if (!child.isLeaf) {
            child.children.unshift(leftSibling.children.pop()!);
        }
    }

    private borrowFromRight(parent: BTreeNode<T>, childIndex: number): void {
        const child = parent.children[childIndex];
        const rightSibling = parent.children[childIndex + 1];

        // Move key from parent to child
        child.keys.push(parent.keys[childIndex]);
        
        // Move key from right sibling to parent
        parent.keys[childIndex] = rightSibling.keys.shift()!;

        // Move child pointer if not leaf
        if (!child.isLeaf) {
            child.children.push(rightSibling.children.shift()!);
        }
    }

    private mergeChildren(parent: BTreeNode<T>, childIndex: number): void {
        const child = parent.children[childIndex];
        const rightSibling = parent.children[childIndex + 1];

        // Move key from parent to child
        child.keys.push(parent.keys[childIndex]);

        // Move keys from right sibling
        child.keys.push(...rightSibling.keys);

        // Move children from right sibling if not leaf
        if (!child.isLeaf) {
            child.children.push(...rightSibling.children);
        }

        // Remove key from parent and right sibling from children
        parent.keys.splice(childIndex, 1);
        parent.children.splice(childIndex + 1, 1);
    }

    // Traversal methods
    inOrderTraversal(callback: (key: T) => void): void {
        this.inOrderTraverseNode(this.root, callback);
    }

    private inOrderTraverseNode(node: BTreeNode<T>, callback: (key: T) => void): void {
        if (node.isLeaf) {
            node.keys.forEach(key => callback(key));
        } else {
            for (let i = 0; i < node.keys.length; i++) {
                this.inOrderTraverseNode(node.children[i], callback);
                callback(node.keys[i]);
            }
            this.inOrderTraverseNode(node.children[node.keys.length], callback);
        }
    }

    // Utility method to get tree height
    getHeight(): number {
        return this.getNodeHeight(this.root);
    }

    private getNodeHeight(node: BTreeNode<T>): number {
        if (node.isLeaf) {
            return 1;
        }
        return 1 + this.getNodeHeight(node.children[0]);
    }

    // Print the tree structure
    print(): void {
        this.printNode(this.root, 0);
    }

    private printNode(node: BTreeNode<T>, level: number): void {
        console.log(`${'  '.repeat(level)}Level ${level}: [${node.keys.join(', ')}]${node.isLeaf ? ' (leaf)' : ''}`);
        if (!node.isLeaf) {
            node.children.forEach(child => this.printNode(child, level + 1));
        }
    }
}
// Example usage with numbers
const btree = new BTree<number>(3); // Degree 3 B-tree

// Insert keys
const keys = [10, 20, 5, 6, 12, 30, 7, 17];
keys.forEach(key => btree.insert(key));

console.log("B-Tree structure:");
btree.print();

console.log("\nIn-order traversal:");
btree.inOrderTraversal(key => console.log(key));

console.log(`\nSearch for 12: ${btree.search(12)}`);
console.log(`Search for 99: ${btree.search(99)}`);

console.log(`\nTree height: ${btree.getHeight()}`);

// Delete a key
console.log(`\nDeleting 12: ${btree.delete(12)}`);
console.log("Tree after deletion:");
btree.print();
class BTreeGeneric<T> {
    private root: BTreeNode<T>;
    private degree: number;
    private compare: (a: T, b: T) => number;

    constructor(degree: number = 2, compare?: (a: T, b: T) => number) {
        this.root = new BTreeNode<T>(true);
        this.degree = degree;
        this.compare = compare || this.defaultCompare;
    }

    private defaultCompare(a: T, b: T): number {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }

    // Methods similar to above, but using this.compare instead of direct comparisons
    private searchNode(node: BTreeNode<T>, key: T): boolean {
        let i = 0;
        
        while (i < node.keys.length && this.compare(key, node.keys[i]) > 0) {
            i++;
        }

        if (i < node.keys.length && this.compare(key, node.keys[i]) === 0) {
            return true;
        }

        if (node.isLeaf) {
            return false;
        }

        return this.searchNode(node.children[i], key);
    }

    // ... rest of the methods adapted to use this.compare
}
