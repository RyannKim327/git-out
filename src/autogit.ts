class BTreeNode<T> {
    keys: T[];
    children: BTreeNode<T>[];
    isLeaf: boolean;
    private compare: (a: T, b: T) => number;

    constructor(isLeaf: boolean, compareFunction: (a: T, b: T) => number) {
        this.keys = [];
        this.children = [];
        this.isLeaf = isLeaf;
        this.compare = compareFunction;
    }

    // Find the index where the key should be inserted
    findKeyIndex(key: T): number {
        let i = 0;
        while (i < this.keys.length && this.compare(key, this.keys[i]) > 0) {
            i++;
        }
        return i;
    }

    // Insert key into a non-full node
    insertNonFull(key: T): void {
        let i = this.keys.length - 1;

        if (this.isLeaf) {
            // Insert into leaf node
            this.keys.push(key as any); // Temporary placeholder
            while (i >= 0 && this.compare(key, this.keys[i]) < 0) {
                this.keys[i + 1] = this.keys[i];
                i--;
            }
            this.keys[i + 1] = key;
        } else {
            // Find child to insert into
            let idx = this.findKeyIndex(key);
            
            if (this.children[idx].keys.length === 2 * this.children[idx].keys.capacity - 1) {
                this.splitChild(idx);
                if (this.compare(key, this.keys[idx]) > 0) {
                    idx++;
                }
            }
            this.children[idx].insertNonFull(key);
        }
    }

    // Split full child node
    splitChild(childIndex: number): void {
        const t = this.children[childIndex].keys.capacity;
        const child = this.children[childIndex];
        const newNode = new BTreeNode<T>(child.isLeaf, this.compare);
        
        // Move keys and children to new node
        newNode.keys = child.keys.splice(t, t - 1);
        if (!child.isLeaf) {
            newNode.children = child.children.splice(t, t);
        }
        
        // Insert median key into this node
        const medianKey = child.keys.pop()!;
        this.keys.splice(childIndex, 0, medianKey);
        
        // Link new node to this node
        this.children.splice(childIndex + 1, 0, newNode);
    }

    // Search for a key in the subtree
    search(key: T): BTreeNode<T> | null {
        const idx = this.findKeyIndex(key);
        
        if (idx < this.keys.length && this.compare(this.keys[idx], key) === 0) {
            return this;
        }
        
        if (this.isLeaf) {
            return null;
        }
        
        return this.children[idx].search(key);
    }
}

class BTree<T> {
    private root: BTreeNode<T>;
    private readonly minDegree: number;
    private readonly compare: (a: T, b: T) => number;

    constructor(minDegree: number, compareFunction?: (a: T, b: T) => number) {
        this.minDegree = minDegree;
        this.compare = compareFunction || ((a: T, b: T) => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        });
        this.root = new BTreeNode<T>(true, this.compare);
        Object.defineProperty(this.root.keys, 'capacity', { value: 2 * minDegree - 1 });
    }

    insert(key: T): void {
        const root = this.root;
        
        if (root.keys.length === root.keys.capacity) {
            const newRoot = new BTreeNode<T>(false, this.compare);
            Object.defineProperty(newRoot.keys, 'capacity', { value: this.root.keys.capacity });
            newRoot.children.push(root);
            this.root = newRoot;
            newRoot.splitChild(0);
            newRoot.insertNonFull(key);
        } else {
            root.insertNonFull(key);
        }
    }

    search(key: T): boolean {
        return this.root.search(key) !== null;
    }

    // In-order traversal of the tree
    traverse(): T[] {
        const result: T[] = [];
        this.inOrderTraversal(this.root, result);
        return result;
    }

    private inOrderTraversal(node: BTreeNode<T>, result: T[]): void {
        let i;
        for (i = 0; i < node.keys.length; i++) {
            if (!node.isLeaf) {
                this.inOrderTraversal(node.children[i], result);
            }
            result.push(node.keys[i]);
        }
        if (!node.isLeaf) {
            this.inOrderTraversal(node.children[i], result);
        }
    }
}
// Number comparison function
const numberCompare = (a: number, b: number) => a - b;

// Create B-tree with minimum degree 2
const bTree = new BTree<number>(2, numberCompare);

// Insert keys
bTree.insert(10);
bTree.insert(20);
bTree.insert(5);
bTree.insert(15);
bTree.insert(30);
bTree.insert(25);
bTree.insert(35);

console.log(bTree.traverse()); // [5, 10, 15, 20, 25, 30, 35]
console.log(bTree.search(15)); // true
console.log(bTree.search(40)); // false
