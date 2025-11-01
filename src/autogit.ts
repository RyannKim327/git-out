class BTreeNode {
    keys: number[];
    children: BTreeNode[];
    leaf: boolean;

    constructor(leaf: boolean) {
        this.keys = [];
        this.children = [];
        this.leaf = leaf;
    }
}

class BTree {
    private root: BTreeNode;
    private readonly t: number; // Minimum degree

    constructor(t: number) {
        if (t < 2) throw new Error("Minimum degree must be at least 2");
        this.t = t;
        this.root = new BTreeNode(true);
    }

    // Search for a key in the tree
    search(key: number): boolean {
        return this.searchNode(this.root, key) !== null;
    }

    private searchNode(node: BTreeNode, key: number): { node: BTreeNode; index: number } | null {
        let i = 0;
        while (i < node.keys.length && key > node.keys[i]) {
            i++;
        }

        if (i < node.keys.length && key === node.keys[i]) {
            return { node, index: i }; // Key found
        }

        if (node.leaf) {
            return null; // Key not found
        }

        // Search in the appropriate child
        return this.searchNode(node.children[i], key);
    }

    // Insert a new key
    insert(key: number): void {
        const root = this.root;

        if (root.keys.length === 2 * this.t - 1) {
            // Root is full, need to split
            const newRoot = new BTreeNode(false);
            newRoot.children.push(root);
            this.root = newRoot;
            this.splitChild(newRoot, 0);
            this.insertNonFull(newRoot, key);
        } else {
            this.insertNonFull(root, key);
        }
    }

    private insertNonFull(node: BTreeNode, key: number): void {
        let i = node.keys.length - 1;

        if (node.leaf) {
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

            if (node.children[i].keys.length === 2 * this.t - 1) {
                // Child is full, split it first
                this.splitChild(node, i);
                if (key > node.keys[i]) {
                    i++;
                }
            }

            this.insertNonFull(node.children[i], key);
        }
    }

    private splitChild(parent: BTreeNode, index: number): void {
        const child = parent.children[index];
        const newChild = new BTreeNode(child.leaf);
        
        // Move keys and children to new node
        const midIndex = this.t - 1;
        newChild.keys = child.keys.splice(midIndex + 1);
        if (!child.leaf) {
            newChild.children = child.children.splice(midIndex + 1);
        }

        // Insert middle key to parent
        parent.keys.splice(index, 0, child.keys[midIndex]);
        child.keys.pop(); // Remove the middle key from child

        // Link new child to parent
        parent.children.splice(index + 1, 0, newChild);
    }

    // In-order traversal (for verification)
    traverse(): number[] {
        const result: number[] = [];
        this.traverseNode(this.root, result);
        return result;
    }

    private traverseNode(node: BTreeNode, result: number[]): void {
        let i;
        for (i = 0; i < node.keys.length; i++) {
            if (!node.leaf) {
                this.traverseNode(node.children[i], result);
            }
            result.push(node.keys[i]);
        }
        if (!node.leaf) {
            this.traverseNode(node.children[i], result);
        }
    }
}
const bTree = new BTree(2); // Create B-tree with minimum degree 2

// Insert keys
bTree.insert(10);
bTree.insert(20);
bTree.insert(5);
bTree.insert(15);
bTree.insert(30);
bTree.insert(25);

console.log(bTree.search(15)); // true
console.log(bTree.search(99)); // false

console.log('In-order traversal:', bTree.traverse());
// Output: [5, 10, 15, 20, 25, 30]
