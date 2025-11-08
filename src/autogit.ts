class BTreeNode<T> {
    keys: T[] = [];
    children: BTreeNode<T>[] = [];
    leaf: boolean = true;

    constructor(
        readonly t: number,
        leaf?: boolean
    ) {
        if (leaf !== undefined) this.leaf = leaf;
    }

    get isFull(): boolean {
        return this.keys.length === 2 * this.t - 1;
    }
}

class BTree<T> {
    private root: BTreeNode<T> | null = null;

    constructor(
        private readonly t: number,
        private readonly compare: (a: T, b: T) => number
    ) {
        if (t < 2) throw new Error("Minimum degree must be at least 2");
    }

    insert(key: T): void {
        if (this.root === null) {
            this.root = new BTreeNode<T>(this.t, true);
            this.root.keys.push(key);
            return;
        }

        if (this.root.isFull) {
            const newRoot = new BTreeNode<T>(this.t, false);
            newRoot.children.push(this.root);
            this.splitChild(newRoot, 0);
            this.root = newRoot;
        }

        this.insertNonFull(this.root, key);
    }

    search(key: T): BTreeNode<T> | null {
        return this.searchNode(this.root, key);
    }

    private splitChild(parent: BTreeNode<T>, index: number): void {
        const t = this.t;
        const fullChild = parent.children[index];
        const newChild = new BTreeNode<T>(t, fullChild.leaf);

        // Move keys to new child
        newChild.keys = fullChild.keys.splice(t, t - 1);

        // Move children if not leaf
        if (!fullChild.leaf) {
            newChild.children = fullChild.children.splice(t, t);
        }

        // Add new child to parent
        parent.children.splice(index + 1, 0, newChild);
        parent.keys.splice(index, 0, fullChild.keys[t - 1]);

        // Remove the promoted key from full child
        fullChild.keys.pop();
    }

    private insertNonFull(node: BTreeNode<T>, key: T): void {
        let i = node.keys.length - 1;

        if (node.leaf) {
            // Find insertion position and insert
            while (i >= 0 && this.compare(key, node.keys[i]) < 0) {
                i--;
            }
            node.keys.splice(i + 1, 0, key);
        } else {
            // Find appropriate child
            while (i >= 0 && this.compare(key, node.keys[i]) < 0) {
                i--;
            }
            i++;

            // Check if child is full
            if (node.children[i].isFull) {
                this.splitChild(node, i);
                if (this.compare(key, node.keys[i]) > 0) {
                    i++;
                }
            }

            this.insertNonFull(node.children[i], key);
        }
    }

    private searchNode(node: BTreeNode<T> | null, key: T): BTreeNode<T> | null {
        if (!node) return null;

        let i = 0;
        // Find first key >= target
        while (i < node.keys.length && this.compare(key, node.keys[i]) > 0) {
            i++;
        }

        // Found exact match
        if (i < node.keys.length && this.compare(key, node.keys[i]) === 0) {
            return node;
        }

        // Recurse or return null for leaf node
        return node.leaf ? null : this.searchNode(node.children[i], key);
    }

    // Utility method for printing the tree (for debugging)
    print(): string {
        return this.printNode(this.root, 0);
    }

    private printNode(node: BTreeNode<T> | null, level: number): string {
        if (!node) return "";
        let result = "";
        
        for (let i = 0; i < node.keys.length; i++) {
            if (!node.leaf) {
                result += this.printNode(node.children[i], level + 1);
            }
            result += `${" ".repeat(level * 4)}${node.keys[i]}\n`;
        }

        if (!node.leaf) {
            result += this.printNode(node.children[node.keys.length], level + 1);
        }

        return result;
    }
}
// Create B-tree with minimum degree 3
const btree = new BTree<number>(3, (a, b) => a - b);

// Insert some values
btree.insert(10);
btree.insert(20);
btree.insert(5);
btree.insert(6);
btree.insert(12);
btree.insert(30);
btree.insert(7);
btree.insert(17);

// Search for values
console.log(btree.search(6)); // Returns node containing 6
console.log(btree.search(99)); // Returns null

// Print the tree structure
console.log(btree.print());
