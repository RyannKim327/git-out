interface BTreeNode<T> {
    keys: T[];
    children: BTreeNode<T>[];
    isLeaf: boolean;
}

interface BTreeConfig {
    order: number;  // Minimum degree (t)
}
class BTree<T> {
    private root: BTreeNode<T> | null;
    private readonly order: number;
    private readonly compare: (a: T, b: T) => number;

    constructor(order: number, compareFn?: (a: T, b: T) => number) {
        this.order = order;
        this.root = null;
        this.compare = compareFn || ((a: T, b: T) => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        });
    }

    // Public methods
    public insert(key: T): void {
        if (this.root === null) {
            this.root = {
                keys: [key],
                children: [],
                isLeaf: true
            };
            return;
        }

        if (this.root.keys.length === 2 * this.order - 1) {
            const newRoot = this.splitRoot();
            this.insertNonFull(newRoot, key);
            this.root = newRoot;
        } else {
            this.insertNonFull(this.root, key);
        }
    }

    public search(key: T): boolean {
        return this.searchNode(this.root, key);
    }

    public traverse(): T[] {
        const result: T[] = [];
        this.inOrderTraversal(this.root, result);
        return result;
    }

    // Private helper methods
    private searchNode(node: BTreeNode<T> | null, key: T): boolean {
        if (!node) return false;

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

    private insertNonFull(node: BTreeNode<T>, key: T): void {
        let i = node.keys.length - 1;

        if (node.isLeaf) {
            // Find position to insert in leaf node
            while (i >= 0 && this.compare(key, node.keys[i]) < 0) {
                i--;
            }
            node.keys.splice(i + 1, 0, key);
        } else {
            // Find appropriate child to descend into
            while (i >= 0 && this.compare(key, node.keys[i]) < 0) {
                i--;
            }
            i++;

            if (node.children[i].keys.length === 2 * this.order - 1) {
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
        const newChild: BTreeNode<T> = {
            keys: [],
            children: [],
            isLeaf: child.isLeaf
        };

        // Move keys and children to new node
        const medianIndex = Math.floor((2 * this.order - 1) / 2);
        const medianKey = child.keys[medianIndex];
        
        newChild.keys = child.keys.slice(medianIndex + 1);
        child.keys = child.keys.slice(0, medianIndex);

        if (!child.isLeaf) {
            newChild.children = child.children.slice(medianIndex + 1);
            child.children = child.children.slice(0, medianIndex + 1);
        }

        // Insert median key into parent
        parent.keys.splice(childIndex, 0, medianKey);
        parent.children.splice(childIndex + 1, 0, newChild);
    }

    private splitRoot(): BTreeNode<T> {
        const oldRoot = this.root!;
        const newRoot: BTreeNode<T> = {
            keys: [],
            children: [oldRoot],
            isLeaf: false
        };

        this.splitChild(newRoot, 0);
        return newRoot;
    }

    private inOrderTraversal(node: BTreeNode<T> | null, result: T[]): void {
        if (!node) return;

        for (let i = 0; i < node.keys.length; i++) {
            if (!node.isLeaf) {
                this.inOrderTraversal(node.children[i], result);
            }
            result.push(node.keys[i]);
        }

        if (!node.isLeaf) {
            this.inOrderTraversal(node.children[node.keys.length], result);
        }
    }
}
// Example usage with numbers
const btree = new BTree<number>(3); // Order 3 B-tree

// Insert keys
btree.insert(10);
btree.insert(20);
btree.insert(5);
btree.insert(6);
btree.insert(12);
btree.insert(30);
btree.insert(7);
btree.insert(17);

// Search for keys
console.log("Contains 6:", btree.search(6)); // true
console.log("Contains 15:", btree.search(15)); // false

// Traverse (in-order)
console.log("In-order traversal:", btree.traverse());

// Custom comparator example
const stringBTree = new BTree<string>(2, (a, b) => a.localeCompare(b));
stringBTree.insert("apple");
stringBTree.insert("banana");
stringBTree.insert("cherry");
console.log("String traversal:", stringBTree.traverse());
// Add to your BTree class
public delete(key: T): void {
    // Implementation of B-tree deletion (more complex)
    // Requires handling of key redistribution and node merging
}

public getHeight(): number {
    return this.calculateHeight(this.root);
}

private calculateHeight(node: BTreeNode<T> | null): number {
    if (!node) return 0;
    if (node.isLeaf) return 1;
    return 1 + this.calculateHeight(node.children[0]);
}
