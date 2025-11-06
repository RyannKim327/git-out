interface BTreeNode<T> {
    keys: T[];
    children: BTreeNode<T>[];
    isLeaf: boolean;
}

interface BTreeConfig {
    order: number; // Maximum number of children
}
class BTree<T> {
    private root: BTreeNode<T>;
    private readonly order: number;
    private readonly compare: (a: T, b: T) => number;

    constructor(order: number, compareFn?: (a: T, b: T) => number) {
        this.order = order;
        this.compare = compareFn || ((a: T, b: T) => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        });
        this.root = this.createNode(true);
    }

    private createNode(isLeaf: boolean): BTreeNode<T> {
        return {
            keys: [],
            children: [],
            isLeaf
        };
    }

    // Insert a key into the B-tree
    insert(key: T): void {
        const root = this.root;
        
        if (root.keys.length === this.order - 1) {
            const newRoot = this.createNode(false);
            newRoot.children.push(this.root);
            this.root = newRoot;
            this.splitChild(newRoot, 0);
        }
        
        this.insertNonFull(this.root, key);
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
            // Find appropriate child to insert into
            while (i >= 0 && this.compare(key, node.keys[i]) < 0) {
                i--;
            }
            i++;
            
            if (node.children[i].keys.length === this.order - 1) {
                this.splitChild(node, i);
                if (this.compare(key, node.keys[i]) > 0) {
                    i++;
                }
            }
            
            this.insertNonFull(node.children[i], key);
        }
    }

    private splitChild(parent: BTreeNode<T>, index: number): void {
        const child = parent.children[index];
        const newChild = this.createNode(child.isLeaf);
        const medianIndex = Math.floor((this.order - 1) / 2);
        const medianKey = child.keys[medianIndex];
        
        // Split keys and children
        newChild.keys = child.keys.slice(medianIndex + 1);
        child.keys = child.keys.slice(0, medianIndex);
        
        if (!child.isLeaf) {
            newChild.children = child.children.slice(medianIndex + 1);
            child.children = child.children.slice(0, medianIndex + 1);
        }
        
        // Insert median key into parent
        parent.keys.splice(index, 0, medianKey);
        parent.children.splice(index + 1, 0, newChild);
    }

    // Search for a key in the B-tree
    search(key: T): boolean {
        return this.searchNode(this.root, key);
    }

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

    // In-order traversal
    traverse(): T[] {
        const result: T[] = [];
        this.inOrderTraversal(this.root, result);
        return result;
    }

    private inOrderTraversal(node: BTreeNode<T>, result: T[]): void {
        for (let i = 0; i < node.keys.length; i++) {
            if (!node.isLeaf) {
                this.inOrderTraversal(node.children[i], result);
            }
            result.push(node.keys[i]);
        }
        
        if (!node.isLeaf && node.children.length > node.keys.length) {
            this.inOrderTraversal(node.children[node.keys.length], result);
        }
    }

    // Get the height of the tree
    height(): number {
        return this.getHeight(this.root);
    }

    private getHeight(node: BTreeNode<T>): number {
        if (node.isLeaf) return 1;
        return 1 + this.getHeight(node.children[0]);
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

console.log("In-order traversal:", btree.traverse());
console.log("Search for 12:", btree.search(12)); // true
console.log("Search for 99:", btree.search(99)); // false
console.log("Tree height:", btree.height());

// Example with custom objects
interface Person {
    id: number;
    name: string;
}

const personBTree = new BTree<Person>(4, (a, b) => a.id - b.id);

personBTree.insert({ id: 1, name: "Alice" });
personBTree.insert({ id: 2, name: "Bob" });
personBTree.insert({ id: 3, name: "Charlie" });

console.log("Search for ID 2:", personBTree.search({ id: 2, name: "" })); // true
// Add these methods to the BTree class for completeness

// Delete a key (simplified version)
delete(key: T): boolean {
    // Implementation would involve complex logic for merging nodes
    // This is a placeholder for a more complete implementation
    console.warn("Delete operation not implemented");
    return false;
}

// Get minimum key
getMin(): T | null {
    return this.getMinNode(this.root);
}

private getMinNode(node: BTreeNode<T>): T | null {
    if (node.keys.length === 0) return null;
    if (node.isLeaf) return node.keys[0];
    return this.getMinNode(node.children[0]);
}

// Get maximum key
getMax(): T | null {
    return this.getMaxNode(this.root);
}

private getMaxNode(node: BTreeNode<T>): T | null {
    if (node.keys.length === 0) return null;
    if (node.isLeaf) return node.keys[node.keys.length - 1];
    return this.getMaxNode(node.children[node.children.length - 1]);
}
