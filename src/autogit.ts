class BTreeNode<T> {
    keys: T[];
    children: BTreeNode<T>[] | null;
    isLeaf: boolean;

    constructor(isLeaf: boolean = true) {
        this.keys = [];
        this.children = isLeaf ? null : [];
        this.isLeaf = isLeaf;
    }
}

class BTree<T> {
    private root: BTreeNode<T>;
    private readonly degree: number; // Minimum degree (defines the range for number of keys)
    private readonly compareFn: (a: T, b: T) => number;

    constructor(degree: number = 3, compareFn?: (a: T, b: T) => number) {
        this.degree = degree;
        this.root = new BTreeNode<T>(true);
        this.compareFn = compareFn || ((a: T, b: T) => a < b ? -1 : a > b ? 1 : 0);
    }

    // Search for a key in the B-tree
    search(key: T): boolean {
        return this.searchNode(this.root, key);
    }

    private searchNode(node: BTreeNode<T>, key: T): boolean {
        let i = 0;
        while (i < node.keys.length && this.compareFn(key, node.keys[i]) > 0) {
            i++;
        }

        if (i < node.keys.length && this.compareFn(key, node.keys[i]) === 0) {
            return true;
        }

        if (node.isLeaf) {
            return false;
        }

        return this.searchNode(node.children![i], key);
    }

    // Insert a key into the B-tree
    insert(key: T): void {
        const root = this.root;
        
        if (root.keys.length === (2 * this.degree) - 1) {
            const newRoot = new BTreeNode<T>(false);
            newRoot.children = [this.root];
            this.root = newRoot;
            this.splitChild(newRoot, 0);
        }
        
        this.insertNonFull(this.root, key);
    }

    private insertNonFull(node: BTreeNode<T>, key: T): void {
        let i = node.keys.length - 1;
        
        if (node.isLeaf) {
            // Find position to insert in leaf node
            while (i >= 0 && this.compareFn(key, node.keys[i]) < 0) {
                i--;
            }
            node.keys.splice(i + 1, 0, key);
        } else {
            // Find appropriate child to insert into
            while (i >= 0 && this.compareFn(key, node.keys[i]) < 0) {
                i--;
            }
            i++;
            
            if (node.children![i].keys.length === (2 * this.degree) - 1) {
                this.splitChild(node, i);
                if (this.compareFn(key, node.keys[i]) > 0) {
                    i++;
                }
            }
            
            this.insertNonFull(node.children![i], key);
        }
    }

    private splitChild(parent: BTreeNode<T>, index: number): void {
        const child = parent.children![index];
        const newChild = new BTreeNode<T>(child.isLeaf);
        
        // Set up new child node
        if (!child.isLeaf) {
            newChild.children = child.children!.slice(this.degree);
            child.children = child.children!.slice(0, this.degree);
        }
        
        // Move keys
        const medianKey = child.keys[this.degree - 1];
        newChild.keys = child.keys.slice(this.degree);
        child.keys = child.keys.slice(0, this.degree - 1);
        
        // Insert median key into parent
        parent.keys.splice(index, 0, medianKey);
        parent.children!.splice(index + 1, 0, newChild);
    }

    // Delete a key from the B-tree
    delete(key: T): boolean {
        // Implementation omitted for brevity - B-tree deletion is complex
        // Would involve multiple cases and merging/redistributing nodes
        console.warn("Delete operation not implemented");
        return false;
    }

    // Traverse the B-tree (in-order)
    traverse(): T[] {
        const result: T[] = [];
        this.inOrderTraversal(this.root, result);
        return result;
    }

    private inOrderTraversal(node: BTreeNode<T>, result: T[]): void {
        if (node.isLeaf) {
            result.push(...node.keys);
        } else {
            for (let i = 0; i < node.keys.length; i++) {
                this.inOrderTraversal(node.children![i], result);
                result.push(node.keys[i]);
            }
            this.inOrderTraversal(node.children![node.keys.length], result);
        }
    }

    // Utility method to visualize the tree structure
    print(): void {
        this.printNode(this.root, 0);
    }

    private printNode(node: BTreeNode<T>, level: number): void {
        const indent = "  ".repeat(level);
        console.log(`${indent}Level ${level}: [${node.keys.join(", ")}] ${node.isLeaf ? "(leaf)" : ""}`);
        
        if (!node.isLeaf) {
            node.children!.forEach((child, index) => {
                console.log(`${indent}Child ${index}:`);
                this.printNode(child, level + 1);
            });
        }
    }
}
// Example usage with numbers
const btree = new BTree<number>(3);

// Insert keys
btree.insert(10);
btree.insert(20);
btree.insert(5);
btree.insert(6);
btree.insert(12);
btree.insert(30);
btree.insert(7);
btree.insert(17);

console.log("B-tree structure:");
btree.print();

console.log("\nIn-order traversal:", btree.traverse());

console.log("Search for 12:", btree.search(12)); // true
console.log("Search for 99:", btree.search(99)); // false

// Example with custom objects
interface Person {
    id: number;
    name: string;
}

const personBTree = new BTree<Person>(2, (a, b) => a.id - b.id);

personBTree.insert({ id: 1, name: "Alice" });
personBTree.insert({ id: 3, name: "Bob" });
personBTree.insert({ id: 2, name: "Charlie" });

console.log("\nPerson B-tree traversal by ID:");
console.log(personBTree.traverse().map(p => `${p.id}: ${p.name}`));
