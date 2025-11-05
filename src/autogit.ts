enum Color {
    RED = 'RED',
    BLACK = 'BLACK',
}

/**
 * Represents a node in the Red-Black Tree.
 * K: Type of the key
 * V: Type of the value
 */
class Node<K, V> {
    key: K;
    value: V;
    color: Color;
    parent: Node<K, V>;
    left: Node<K, V>;
    right: Node<K, V>;

    constructor(
        key: K,
        value: V,
        color: Color = Color.RED, // New nodes are typically red upon insertion
        parent: Node<K, V>,
        left: Node<K, V>,
        right: Node<K, V>
    ) {
        this.key = key;
        this.value = value;
        this.color = color;
        this.parent = parent;
        this.left = left;
        this.right = right;
    }
}
class RedBlackTree<K, V> {
    private root: Node<K, V>;
    private NIL: Node<K, V>; // Sentinel node
    private compare: (a: K, b: K) => number; // Comparison function

    constructor(compareFn?: (a: K, b: K) => number) {
        // Initialize the NIL node: it's always BLACK, points to itself for children/parent,
        // and its key/value are irrelevant.
        this.NIL = new Node(
            null as any, // Type assertion as K and V might not be nullable
            null as any, // Type assertion
            Color.BLACK,
            null as any, // Parent of NIL is typically not used, but set to null
            null as any, // Left child of NIL
            null as any  // Right child of NIL
        );
        this.NIL.left = this.NIL;
        this.NIL.right = this.NIL;
        this.NIL.parent = this.NIL; // Point to itself initially, or null

        this.root = this.NIL; // Initially, the tree is empty, root points to NIL

        // Set up the comparison function
        this.compare = compareFn || this.defaultCompare;
    }

    // Default comparison function for primitive types
    private defaultCompare(a: K, b: K): number {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }

    // Helper: Is a node the NIL sentinel?
    private isNil(node: Node<K, V>): boolean {
        return node === this.NIL;
    }

    // --- Core Operations ---
    // Search for a key
    public get(key: K): V | undefined {
        let currentNode = this.root;
        while (!this.isNil(currentNode) && this.compare(key, currentNode.key) !== 0) {
            if (this.compare(key, currentNode.key) < 0) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }
        return this.isNil(currentNode) ? undefined : currentNode.value;
    }

    // Insert a key-value pair
    public put(key: K, value: V): void {
        const newNode = new Node(key, value, Color.RED, this.NIL, this.NIL, this.NIL);
        let parent: Node<K, V> = this.NIL;
        let current: Node<K, V> = this.root;

        // Standard BST insertion to find the correct position
        while (!this.isNil(current)) {
            parent = current;
            if (this.compare(newNode.key, current.key) < 0) {
                current = current.left;
            } else if (this.compare(newNode.key, current.key) > 0) {
                current = current.right;
            } else {
                // Key already exists, update value and return
                current.value = value;
                return;
            }
        }

        newNode.parent = parent;

        if (this.isNil(parent)) {
            this.root = newNode; // Tree was empty
        } else if (this.compare(newNode.key, parent.key) < 0) {
            parent.left = newNode;
        } else {
            parent.right = newNode;
        }

        // If the newly inserted node is the root, it must be black
        if (this.isNil(newNode.parent)) {
            newNode.color = Color.BLACK;
            return;
        }

        // If parent is also the root (and not NIL), its color should be black
        if (this.isNil(newNode.parent.parent)) {
            return; // Parent is root, which is black (handled by RBT-INSERT-FIXUP if parent was red initially)
        }

        this.insertFixup(newNode);
    }

    // Deletion (omitted for brevity, very complex)
    // public remove(key: K): V | undefined { ... }

    // --- RBT Balancing Helpers ---
    private leftRotate(x: Node<K, V>): void {
        const y = x.right; // y is x's right child
        x.right = y.left; // x's right child becomes y's left child

        if (!this.isNil(y.left)) {
            y.left.parent = x;
        }

        y.parent = x.parent; // y's parent becomes x's parent

        if (this.isNil(x.parent)) {
            this.root = y; // If x was root, y becomes root
        } else if (x === x.parent.left) {
            x.parent.left = y; // If x was left child
        } else {
            x.parent.right = y; // If x was right child
        }

        y.left = x; // x becomes y's left child
        x.parent = y; // x's parent becomes y
    }

    private rightRotate(y: Node<K, V>): void {
        const x = y.left; // x is y's left child
        y.left = x.right; // y's left child becomes x's right child

        if (!this.isNil(x.right)) {
            x.right.parent = y;
        }

        x.parent = y.parent; // x's parent becomes y's parent

        if (this.isNil(y.parent)) {
            this.root = x; // If y was root, x becomes root
        } else if (y === y.parent.left) {
            y.parent.left = x; // If y was left child
        } else {
            y.parent.right = x; // If y was right child
        }

        x.right = y; // y becomes x's right child
        y.parent = x; // y's parent becomes x
    }

    // Fixes the RBT properties after insertion
    private insertFixup(z: Node<K, V>): void {
        // Loop while the parent of z is RED (violates property 4)
        while (z.parent.color === Color.RED) {
            if (z.parent === z.parent.parent.left) { // Parent is a left child of grandparent
                const y = z.parent.parent.right; // y is the uncle

                if (y.color === Color.RED) { // Case 1: Uncle is RED
                    z.parent.color = Color.BLACK;
                    y.color = Color.BLACK;
                    z.parent.parent.color = Color.RED;
                    z = z.parent.parent; // Move z up to the grandparent
                } else { // Uncle is BLACK
                    if (z === z.parent.right) { // Case 2: z is a right child (triangle)
                        z = z.parent; // Move z to its parent
                        this.leftRotate(z); // Perform left rotation
                    }
                    // Case 3: z is a left child (line)
                    z.parent.color = Color.BLACK;
                    z.parent.parent.color = Color.RED;
                    this.rightRotate(z.parent.parent); // Perform right rotation on grandparent
                }
            } else { // Parent is a right child of grandparent (symmetric cases)
                const y = z.parent.parent.left; // y is the uncle

                if (y.color === Color.RED) { // Case 1: Uncle is RED
                    z.parent.color = Color.BLACK;
                    y.color = Color.BLACK;
                    z.parent.parent.color = Color.RED;
                    z = z.parent.parent; // Move z up to the grandparent
                } else { // Uncle is BLACK
                    if (z === z.parent.left) { // Case 2: z is a left child (triangle)
                        z = z.parent; // Move z to its parent
                        this.rightRotate(z); // Perform right rotation
                    }
                    // Case 3: z is a right child (line)
                    z.parent.color = Color.BLACK;
                    z.parent.parent.color = Color.RED;
                    this.leftRotate(z.parent.parent); // Perform left rotation on grandparent
                }
            }
        }
        this.root.color = Color.BLACK; // Ensure root is always black (Property 2)
    }

    // --- Traversal for testing/viewing ---
    public inOrderTraversal(): { key: K, value: V, color: Color }[] {
        const result: { key: K, value: V, color: Color }[] = [];
        this.inOrderHelper(this.root, result);
        return result;
    }

    private inOrderHelper(node: Node<K, V>, result: { key: K, value: V, color: Color }[]): void {
        if (!this.isNil(node)) {
            this.inOrderHelper(node.left, result);
            result.push({ key: node.key, value: node.value, color: node.color });
            this.inOrderHelper(node.right, result);
        }
    }

    public printTree(): void {
        console.log("--- Red-Black Tree ---");
        this.printTreeHelper(this.root, "", true);
        console.log("----------------------");
    }

    private printTreeHelper(node: Node<K, V>, indent: string, isLast: boolean): void {
        if (!this.isNil(node)) {
            console.log(indent + (isLast ? "└── " : "├── ") + `(${node.color}) ${node.key}: ${node.value}`);
            const newIndent = indent + (isLast ? "    " : "│   ");
            this.printTreeHelper(node.left, newIndent, false);
            this.printTreeHelper(node.right, newIndent, true);
        }
    }
}
// Create a tree for numbers
const rbt = new RedBlackTree<number, string>();

console.log("Inserting values:");
rbt.put(10, "ten");
rbt.printTree();
rbt.put(20, "twenty");
rbt.printTree();
rbt.put(30, "thirty"); // Triggers rotations/recoloring
rbt.printTree();
rbt.put(15, "fifteen"); // Triggers more complex cases
rbt.printTree();
rbt.put(5, "five");
rbt.printTree();
rbt.put(25, "twenty-five");
rbt.printTree();
rbt.put(1, "one");
rbt.printTree();

console.log("\nTree in-order traversal:");
console.log(rbt.inOrderTraversal());

console.log("\nSearching for keys:");
console.log(`Key 20: ${rbt.get(20)}`); // twenty
console.log(`Key 12: ${rbt.get(12)}`); // undefined

// Example with custom comparison function for strings (case-insensitive)
const rbtStrings = new RedBlackTree<string, number>((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

rbtStrings.put("Apple", 1);
rbtStrings.put("Banana", 2);
rbtStrings.put("apple", 3); // Updates "Apple" to value 3
rbtStrings.put("Cherry", 4);
rbtStrings.printTree();

console.log(`Value for "banana": ${rbtStrings.get("banana")}`); // 2
console.log(`Value for "Apple": ${rbtStrings.get("Apple")}`); // 3
