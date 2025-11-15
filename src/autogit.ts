class BTreeNode<T> {
    keys: T[];
    children: BTreeNode<T>[];
    isLeaf: boolean;
    private degree: number;

    constructor(degree: number, isLeaf: boolean = false) {
        this.degree = degree;
        this.isLeaf = isLeaf;
        this.keys = [];
        this.children = [];
    }

    // Check if node is full
    isFull(): boolean {
        return this.keys.length === (2 * this.degree) - 1;
    }

    // Find the index where key should be inserted
    findKeyIndex(key: T): number {
        let i = 0;
        while (i < this.keys.length && this.keys[i] < key) {
            i++;
        }
        return i;
    }
}

class BTree<T> {
    private root: BTreeNode<T>;
    private degree: number;
    private compareFn?: (a: T, b: T) => number;

    constructor(degree: number, compareFn?: (a: T, b: T) => number) {
        if (degree < 2) {
            throw new Error("B-tree degree must be at least 2");
        }
        this.degree = degree;
        this.root = new BTreeNode<T>(degree, true);
        this.compareFn = compareFn;
    }

    private compare(a: T, b: T): number {
        if (this.compareFn) {
            return this.compareFn(a, b);
        }
        return a < b ? -1 : a > b ? 1 : 0;
    }

    // Main search method
    search(key: T): boolean {
        return this.searchInNode(this.root, key);
    }

    private searchInNode(node: BTreeNode<T>, key: T): boolean {
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

        return this.searchInNode(node.children[i], key);
    }

    // Main insert method
    insert(key: T): void {
        const root = this.root;
        
        if (root.isFull()) {
            // Root is full, need to split
            const newRoot = new BTreeNode<T>(this.degree);
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
            // Insert into leaf node
            while (i >= 0 && this.compare(key, node.keys[i]) < 0) {
                node.keys[i + 1] = node.keys[i];
                i--;
            }
            node.keys[i + 1] = key;
        } else {
            // Find which child to descend into
            while (i >= 0 && this.compare(key, node.keys[i]) < 0) {
                i--;
            }
            i++;

            if (node.children[i].isFull()) {
                this.splitChild(node, i);
                if (this.compare(key, node.keys[i]) > 0) {
                    i++;
                }
            }
            this.insertNonFull(node.children[i], key);
        }
    }

    private splitChild(parent: BTreeNode<T>, childIndex: number): void {
        const child = parent.children[childIndex];
        const newChild = new BTreeNode<T>(this.degree, child.isLeaf);
        
        const midIndex = Math.floor((this.degree * 2 - 1) / 2);
        const midKey = child.keys[midIndex];

        // Move keys after midIndex to new child
        newChild.keys = child.keys.slice(midIndex + 1);
        child.keys = child.keys.slice(0, midIndex);

        // Move children if not leaf
        if (!child.isLeaf) {
            newChild.children = child.children.slice(midIndex + 1);
            child.children = child.children.slice(0, midIndex + 1);
        }

        // Insert midKey into parent
        parent.keys.splice(childIndex, 0, midKey);
        parent.children.splice(childIndex + 1, 0, newChild);
    }

    // Delete method
    remove(key: T): boolean {
        if (!this.search(key)) {
            return false;
        }
        return this.removeFromNode(this.root, key);
    }

    private removeFromNode(node: BTreeNode<T>, key: T): boolean {
        const index = node.findKeyIndex(key);

        // Case 1: Key found in this node
        if (index < node.keys.length && this.compare(node.keys[index], key) === 0) {
            if (node.isLeaf) {
                // Simple remove from leaf
                node.keys.splice(index, 1);
                return true;
            } else {
                return this.removeFromInternalNode(node, index);
            }
        }

        // Case 2: Key not in this node and it's a leaf
        if (node.isLeaf) {
            return false;
        }

        // Case 3: Key might be in child
        return this.removeFromChild(node, index, key);
    }

    private removeFromInternalNode(node: BTreeNode<T>, index: number): boolean {
        const key = node.keys[index];

        // Case 3a: Left child has at least degree keys
        if (node.children[index].keys.length >= this.degree) {
            const predecessor = this.getPredecessor(node.children[index]);
            node.keys[index] = predecessor;
            return this.removeFromNode(node.children[index], predecessor);
        }

        // Case 3b: Right child has at least degree keys
        if (node.children[index + 1].keys.length >= this.degree) {
            const successor = this.getSuccessor(node.children[index + 1]);
            node.keys[index] = successor;
            return this.removeFromNode(node.children[index + 1], successor);
        }

        // Case 3c: Merge children
        this.mergeChildren(node, index);
        return this.removeFromNode(node.children[index], key);
    }

    private removeFromChild(node: BTreeNode<T>, index: number, key: T): boolean {
        const child = node.children[index];

        // If child has minimum keys, need to fix it first
        if (child.keys.length < this.degree) {
            this.fillChild(node, index);
        }

        // Determine which child to descend into after possible merge
        let newIndex = index;
        if (index > node.keys.length) {
            newIndex = node.keys.length;
        }

        return this.removeFromNode(node.children[newIndex], key);
    }

    private getPredecessor(node: BTreeNode<T>): T {
        if (node.isLeaf) {
            return node.keys[node.keys.length - 1];
        }
        return this.getPredecessor(node.children[node.children.length - 1]);
    }

    private getSuccessor(node: BTreeNode<T>): T {
        if (node.isLeaf) {
            return node.keys[0];
        }
        return this.getSuccessor(node.children[0]);
    }

    private mergeChildren(parent: BTreeNode<T>, index: number): void {
        const child = parent.children[index];
        const sibling = parent.children[index + 1];

        // Move key from parent to child
        child.keys.push(parent.keys[index]);

        // Move keys from sibling
        child.keys.push(...sibling.keys);

        // Move children if not leaf
        if (!child.isLeaf) {
            child.children.push(...sibling.children);
        }

        // Remove key and sibling from parent
        parent.keys.splice(index, 1);
        parent.children.splice(index + 1, 1);
    }

    private fillChild(parent: BTreeNode<T>, index: number): void {
        // Try to borrow from left sibling
        if (index !== 0 && parent.children[index - 1].keys.length >= this.degree) {
            this.borrowFromLeft(parent, index);
        }
        // Try to borrow from right sibling
        else if (index !== parent.keys.length && parent.children[index + 1].keys.length >= this.degree) {
            this.borrowFromRight(parent, index);
        }
        // Merge with sibling
        else {
            if (index !== parent.keys.length) {
                this.mergeChildren(parent, index);
            } else {
                this.mergeChildren(parent, index - 1);
            }
        }
    }

    private borrowFromLeft(parent: BTreeNode<T>, index: number): void {
        const child = parent.children[index];
        const leftSibling = parent.children[index - 1];

        // Move key from parent to child
        child.keys.unshift(parent.keys[index - 1]);

        // Move key from left sibling to parent
        if (!leftSibling.isLeaf) {
            child.children.unshift(leftSibling.children.pop()!);
        }

        parent.keys[index - 1] = leftSibling.keys.pop()!;
    }

    private borrowFromRight(parent: BTreeNode<T>, index: number): void {
        const child = parent.children[index];
        const rightSibling = parent.children[index + 1];

        // Move key from parent to child
        child.keys.push(parent.keys[index]);

        // Move key from right sibling to parent
        if (!rightSibling.isLeaf) {
            child.children.push(rightSibling.children.shift()!);
        }

        parent.keys[index] = rightSibling.keys.shift()!;
    }

    // Utility methods
    getHeight(): number {
        return this.calculateHeight(this.root);
    }

    private calculateHeight(node: BTreeNode<T>): number {
        if (node.isLeaf) {
            return 1;
        }
        return 1 + this.calculateHeight(node.children[0]);
    }

    // In-order traversal
    inOrderTraversal(): T[] {
        const result: T[] = [];
        this.traverseInOrder(this.root, result);
        return result;
    }

    private traverseInOrder(node: BTreeNode<T>, result: T[]): void {
        if (!node) return;

        for (let i = 0; i < node.keys.length; i++) {
            if (!node.isLeaf) {
                this.traverseInOrder(node.children[i], result);
            }
            result.push(node.keys[i]);
        }

        if (!node.isLeaf) {
            this.traverseInOrder(node.children[node.keys.length], result);
        }
    }

    // Print tree structure (for debugging)
    print(): void {
        this.printNode(this.root, 0);
    }

    private printNode(node: BTreeNode<T>, level: number): void {
        console.log(`${'  '.repeat(level)}Level ${level}: [${node.keys.join(', ')}] ${node.isLeaf ? '(leaf)' : ''}`);
        
        if (!node.isLeaf) {
            for (const child of node.children) {
                this.printNode(child, level + 1);
            }
        }
    }
}
// Example usage with numbers
const btree = new BTree<number>(3);

// Insert some values
btree.insert(10);
btree.insert(20);
btree.insert(5);
btree.insert(6);
btree.insert(12);
btree.insert(30);
btree.insert(7);
btree.insert(17);

console.log("In-order traversal:", btree.inOrderTraversal());
console.log("Height:", btree.getHeight());
console.log("Search for 10:", btree.search(10)); // true
console.log("Search for 99:", btree.search(99)); // false

// Remove a key
btree.remove(6);
console.log("After removing 6:", btree.inOrderTraversal());

// Print tree structure
btree.print();

// Example with custom comparator for strings
const stringBTree = new BTree<string>(2, (a, b) => a.localeCompare(b));
stringBTree.insert("apple");
stringBTree.insert("banana");
stringBTree.insert("cherry");
console.log("String B-tree:", stringBTree.inOrderTraversal());
