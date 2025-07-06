class BTreeNode {
    keys: number[]; // Array of keys in the node
    children: BTreeNode[]; // Array of child nodes
    isLeaf: boolean; // Indicates if the node is a leaf
    t: number; // Minimum degree (defines the range for number of keys)

    constructor(t: number, isLeaf: boolean) {
        this.t = t; // Minimum degree
        this.isLeaf = isLeaf; // If true, this node is a leaf node
        this.keys = []; // Initialize keys array
        this.children = []; // Initialize children array
    }
}
class BTree {
    root: BTreeNode | null; // Root node of the B-tree
    t: number; // Minimum degree

    constructor(t: number) {
        this.root = null; // Initialize root as null
        this.t = t; // Set minimum degree
    }

    // Public method to insert a new key
    insert(key: number) {
        if (this.root === null) {
            // If the tree is empty, create a new root
            this.root = new BTreeNode(this.t, true);
            this.root.keys.push(key);
        } else {
            // If the root is full, then the tree grows in height
            if (this.root.keys.length === 2 * this.t - 1) {
                const newRoot = new BTreeNode(this.t, false);
                newRoot.children.push(this.root);
                this.splitChild(newRoot, 0);
                this.root = newRoot;
            }
            this.insertNonFull(this.root, key);
        }
    }

    // Method to split the full child of a node
    splitChild(parent: BTreeNode, index: number) {
        const fullChild = parent.children[index];
        const newChild = new BTreeNode(fullChild.t, fullChild.isLeaf);
        
        // Move the last t-1 keys from fullChild to newChild
        for (let i = 0; i < this.t - 1; i++) {
            newChild.keys.push(fullChild.keys.pop()!);
        }

        // If fullChild is not a leaf, move the last t children
        if (!fullChild.isLeaf) {
            for (let i = 0; i < this.t; i++) {
                newChild.children.push(fullChild.children.pop()!);
            }
        }

        // Insert newChild into the parent
        parent.children.splice(index + 1, 0, newChild);
        parent.keys.splice(index, 0, fullChild.keys.pop()!);
    }

    // Insert key into a non-full node
    insertNonFull(node: BTreeNode, key: number) {
        let i = node.keys.length - 1;

        if (node.isLeaf) {
            // If the node is a leaf, just insert the key
            while (i >= 0 && key < node.keys[i]) {
                i--;
            }
            node.keys.splice(i + 1, 0, key); // Insert the key at the correct position
        } else {
            // If the node is not a leaf, find the child to insert into
            while (i >= 0 && key < node.keys[i]) {
                i--;
            }
            i++; // Move to the right child

            // Check if the found child is full
            if (node.children[i].keys.length === 2 * this.t - 1) {
                this.splitChild(node, i);
                // After splitting, determine which of the two children to recurse into
                if (key > node.keys[i]) {
                    i++;
                }
            }
            this.insertNonFull(node.children[i], key); // Recur for the child
        }
    }

    // Method to search for a key
    search(key: number): BTreeNode | null {
        return this.searchInNode(this.root, key);
    }

    // Search for a key in a given node
    private searchInNode(node: BTreeNode | null, key: number): BTreeNode | null {
        if (node === null) return null;

        let i = 0;
        while (i < node.keys.length && key > node.keys[i]) {
            i++;
        }

        if (i < node.keys.length && node.keys[i] === key) {
            return node; // Key found
        }

        if (node.isLeaf) {
            return null; // Key not found in a leaf node
        } else {
            return this.searchInNode(node.children[i], key); // Recur for the child
        }
    }
}
const bTree = new BTree(3); // Create a B-tree with a minimum degree of 3

// Insert keys into the B-tree
bTree.insert(10);
bTree.insert(20);
bTree.insert(5);
bTree.insert(6);
bTree.insert(12);
bTree.insert(30);
bTree.insert(7);
bTree.insert(17);

// Search for a key
const searchKey = 12;
const foundNode = bTree.search(searchKey);
if (foundNode) {
    console.log(`Key ${searchKey} found in the B-tree.`);
} else {
    console.log(`Key ${searchKey} not found in the B-tree.`);
}
