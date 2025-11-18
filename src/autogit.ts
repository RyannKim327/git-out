enum Color {
    RED = 'RED',
    BLACK = 'BLACK',
}

interface Node<T> {
    value: T | null; // null for the sentinel NIL node
    color: Color;
    parent: Node<T>;
    left: Node<T>;
    right: Node<T>;
}

type Comparator<T> = (a: T, b: T) => number; // Returns -1 if a < b, 0 if a == b, 1 if a > b

// Default comparator for primitive types
const defaultComparator = <T>(a: T, b: T): number => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
};
class RedBlackTree<T> {
    private root: Node<T>;
    private NIL: Node<T>; // Sentinel node
    private comparator: Comparator<T>;

    constructor(comparator: Comparator<T> = defaultComparator) {
        // Initialize NIL node: always black, children and parent point to itself
        this.NIL = {
            value: null,
            color: Color.BLACK,
            parent: null as any, // Will be set to itself later
            left: null as any,   // Will be set to itself later
            right: null as any,  // Will be set to itself later
        };
        this.NIL.parent = this.NIL;
        this.NIL.left = this.NIL;
        this.NIL.right = this.NIL;

        this.root = this.NIL; // Initially, the tree is empty, root points to NIL
        this.comparator = comparator;
    }

    //region Helper Methods

    private createNode(value: T, color: Color, parent: Node<T>, left: Node<T>, right: Node<T>): Node<T> {
        return { value, color, parent, left, right };
    }

    private isRed(node: Node<T>): boolean {
        return node.color === Color.RED;
    }

    private isBlack(node: Node<T>): boolean {
        return node.color === Color.BLACK;
    }

    private transplant(u: Node<T>, v: Node<T>): void {
        if (u.parent === this.NIL) {
            this.root = v;
        } else if (u === u.parent.left) {
            u.parent.left = v;
        } else {
            u.parent.right = v;
        }
        v.parent = u.parent;
    }

    // Find the node with the minimum value in a subtree
    private minimum(node: Node<T>): Node<T> {
        while (node.left !== this.NIL) {
            node = node.left;
        }
        return node;
    }

    // Performs a left rotation on the given nodeX
    // Before:
    //      Px           Px
    //     /            /
    //    X            Y
    //     \          / \
    //      Y   ->   X   Ry
    //     / \        \
    //   Ly  Ry       Ly
    private leftRotate(nodeX: Node<T>): void {
        const nodeY = nodeX.right; // Set Y
        nodeX.right = nodeY.left;   // Turn Y's left subtree into X's right subtree
        if (nodeY.left !== this.NIL) {
            nodeY.left.parent = nodeX;
        }
        nodeY.parent = nodeX.parent; // Link X's parent to Y
        if (nodeX.parent === this.NIL) {
            this.root = nodeY;
        } else if (nodeX === nodeX.parent.left) {
            nodeX.parent.left = nodeY;
        } else {
            nodeX.parent.right = nodeY;
        }
        nodeY.left = nodeX; // Put X on Y's left
        nodeX.parent = nodeY;
    }

    // Performs a right rotation on the given nodeY
    // Before:
    //      Py           Py
    //     /            /
    //    Y            X
    //   / \          / \
    //  X   Ry   ->  Lx  Y
    // / \              /
    //Lx Ly            Ly Ry
    private rightRotate(nodeY: Node<T>): void {
        const nodeX = nodeY.left; // Set X
        nodeY.left = nodeX.right;  // Turn X's right subtree into Y's left subtree
        if (nodeX.right !== this.NIL) {
            nodeX.right.parent = nodeY;
        }
        nodeX.parent = nodeY.parent; // Link Y's parent to X
        if (nodeY.parent === this.NIL) {
            this.root = nodeX;
        } else if (nodeY === nodeY.parent.right) {
            nodeY.parent.right = nodeX;
        } else {
            nodeY.parent.left = nodeX;
        }
        nodeX.right = nodeY; // Put Y on X's right
        nodeY.parent = nodeX;
    }

    //endregion

    //region Public API

    public insert(value: T): void {
        let newNode: Node<T> = this.createNode(value, Color.RED, this.NIL, this.NIL, this.NIL);
        let current = this.root;
        let parent = this.NIL;

        // Perform standard BST insertion
        while (current !== this.NIL) {
            parent = current;
            const cmp = this.comparator(newNode.value!, current.value!);
            if (cmp < 0) {
                current = current.left;
            } else if (cmp > 0) {
                current = current.right;
            } else {
                // Value already exists, perhaps update or simply return.
                // For simplicity, we'll just return. To allow duplicates,
                // you might insert to left/right based on some other criteria.
                return;
            }
        }

        newNode.parent = parent;
        if (parent === this.NIL) {
            this.root = newNode;
        } else {
            const cmp = this.comparator(newNode.value!, parent.value!);
            if (cmp < 0) {
                parent.left = newNode;
            } else {
                parent.right = newNode;
            }
        }

        // If the new node is the root, it must be black
        if (newNode.parent === this.NIL) {
            newNode.color = Color.BLACK;
            return;
        }
        // If the new node's parent is the root, and root is black, no violation
        if (newNode.parent.parent === this.NIL) {
            return;
        }

        this.insertFixup(newNode);
    }

    private insertFixup(nodeZ: Node<T>): void {
        // Loop while parent is RED (violation of property 4)
        while (this.isRed(nodeZ.parent)) {
            let grandparent = nodeZ.parent.parent;

            // Case 1: Parent is a left child of grandparent
            if (nodeZ.parent === grandparent.left) {
                let uncle = grandparent.right;

                // Subcase 1.1: Uncle is RED
                if (this.isRed(uncle)) {
                    nodeZ.parent.color = Color.BLACK;
                    uncle.color = Color.BLACK;
                    grandparent.color = Color.RED;
                    nodeZ = grandparent; // Move up the tree
                }
                // Subcase 1.2: Uncle is BLACK
                else {
                    // Subcase 1.2.1: nodeZ is a right child
                    if (nodeZ === nodeZ.parent.right) {
                        nodeZ = nodeZ.parent;
                        this.leftRotate(nodeZ);
                        grandparent = nodeZ.parent.parent; // Update grandparent after rotation
                    }
                    // Subcase 1.2.2: nodeZ is a left child
                    nodeZ.parent.color = Color.BLACK;
                    grandparent.color = Color.RED;
                    this.rightRotate(grandparent);
                }
            }
            // Case 2: Parent is a right child of grandparent (symmetric to Case 1)
            else {
                let uncle = grandparent.left;

                // Subcase 2.1: Uncle is RED
                if (this.isRed(uncle)) {
                    nodeZ.parent.color = Color.BLACK;
                    uncle.color = Color.BLACK;
                    grandparent.color = Color.RED;
                    nodeZ = grandparent; // Move up the tree
                }
                // Subcase 2.2: Uncle is BLACK
                else {
                    // Subcase 2.2.1: nodeZ is a left child
                    if (nodeZ === nodeZ.parent.left) {
                        nodeZ = nodeZ.parent;
                        this.rightRotate(nodeZ);
                        grandparent = nodeZ.parent.parent; // Update grandparent after rotation
                    }
                    // Subcase 2.2.2: nodeZ is a right child
                    nodeZ.parent.color = Color.BLACK;
                    grandparent.color = Color.RED;
                    this.leftRotate(grandparent);
                }
            }
        }
        this.root.color = Color.BLACK; // Property 2: Root must be black
    }

    public delete(value: T): boolean {
        let nodeZ = this.searchNode(value);
        if (nodeZ === this.NIL) {
            return false; // Value not found
        }

        let nodeY = nodeZ; // nodeY is the node to be removed from the tree structure
        let yOriginalColor = nodeY.color;
        let nodeX: Node<T>; // nodeX is the child of nodeY, or the child that replaces nodeY

        if (nodeZ.left === this.NIL) {
            nodeX = nodeZ.right;
            this.transplant(nodeZ, nodeZ.right);
        } else if (nodeZ.right === this.NIL) {
            nodeX = nodeZ.left;
            this.transplant(nodeZ, nodeZ.left);
        } else {
            nodeY = this.minimum(nodeZ.right); // Find successor
            yOriginalColor = nodeY.color;
            nodeX = nodeY.right;

            if (nodeY.parent === nodeZ) {
                // If successor is a direct child of nodeZ, nodeX's parent must be nodeY
                nodeX.parent = nodeY;
            } else {
                this.transplant(nodeY, nodeY.right);
                nodeY.right = nodeZ.right;
                nodeY.right.parent = nodeY;
            }
            this.transplant(nodeZ, nodeY);
            nodeY.left = nodeZ.left;
            nodeY.left.parent = nodeY;
            nodeY.color = nodeZ.color; // nodeY takes on nodeZ's color
        }

        // If the node that was actually removed was black, fix the tree
        if (yOriginalColor === Color.BLACK) {
            this.deleteFixup(nodeX);
        }
        return true;
    }

    private deleteFixup(nodeX: Node<T>): void {
        while (nodeX !== this.root && this.isBlack(nodeX)) {
            // Case 1: nodeX is a left child
            if (nodeX === nodeX.parent.left) {
                let sibling = nodeX.parent.right;

                // Subcase 1.1: Sibling is RED
                if (this.isRed(sibling)) {
                    sibling.color = Color.BLACK;
                    nodeX.parent.color = Color.RED;
                    this.leftRotate(nodeX.parent);
                    sibling = nodeX.parent.right; // Update sibling after rotation
                }

                // Subcase 1.2: Sibling is BLACK, and both sibling's children are BLACK
                if (this.isBlack(sibling.left) && this.isBlack(sibling.right)) {
                    sibling.color = Color.RED;
                    nodeX = nodeX.parent; // Move up the tree
                }
                // Subcase 1.3: Sibling is BLACK, sibling's right child is BLACK, sibling's left child is RED
                else {
                    if (this.isBlack(sibling.right)) {
                        sibling.left.color = Color.BLACK;
                        sibling.color = Color.RED;
                        this.rightRotate(sibling);
                        sibling = nodeX.parent.right; // Update sibling after rotation
                    }
                    // Subcase 1.4: Sibling is BLACK, sibling's right child is RED
                    sibling.color = nodeX.parent.color;
                    nodeX.parent.color = Color.BLACK;
                    sibling.right.color = Color.BLACK;
                    this.leftRotate(nodeX.parent);
                    nodeX = this.root; // Terminate loop
                }
            }
            // Case 2: nodeX is a right child (symmetric to Case 1)
            else {
                let sibling = nodeX.parent.left;

                // Subcase 2.1: Sibling is RED
                if (this.isRed(sibling)) {
                    sibling.color = Color.BLACK;
                    nodeX.parent.color = Color.RED;
                    this.rightRotate(nodeX.parent);
                    sibling = nodeX.parent.left; // Update sibling after rotation
                }

                // Subcase 2.2: Sibling is BLACK, and both sibling's children are BLACK
                if (this.isBlack(sibling.left) && this.isBlack(sibling.right)) {
                    sibling.color = Color.RED;
                    nodeX = nodeX.parent; // Move up the tree
                }
                // Subcase 2.3: Sibling is BLACK, sibling's left child is BLACK, sibling's right child is RED
                else {
                    if (this.isBlack(sibling.left)) {
                        sibling.right.color = Color.BLACK;
                        sibling.color = Color.RED;
                        this.leftRotate(sibling);
                        sibling = nodeX.parent.left; // Update sibling after rotation
                    }
                    // Subcase 2.4: Sibling is BLACK, sibling's left child is RED
                    sibling.color = nodeX.parent.color;
                    nodeX.parent.color = Color.BLACK;
                    sibling.left.color = Color.BLACK;
                    this.rightRotate(nodeX.parent);
                    nodeX = this.root; // Terminate loop
                }
            }
        }
        nodeX.color = Color.BLACK; // Final step, ensures current nodeX (if not root) becomes black
    }

    public search(value: T): T | null {
        const node = this.searchNode(value);
        return node === this.NIL ? null : node.value;
    }

    private searchNode(value: T): Node<T> {
        let current = this.root;
        while (current !== this.NIL) {
            const cmp = this.comparator(value, current.value!);
            if (cmp === 0) {
                return current;
            } else if (cmp < 0) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return this.NIL; // Not found
    }

    public inorderTraversal(): T[] {
        const result: T[] = [];
        this.inorderTraversalRecursive(this.root, result);
        return result;
    }

    private inorderTraversalRecursive(node: Node<T>, result: T[]): void {
        if (node !== this.NIL) {
            this.inorderTraversalRecursive(node.left, result);
            result.push(node.value!);
            this.inorderTraversalRecursive(node.right, result);
        }
    }

    public getRoot(): Node<T> {
        return this.root;
    }

    //endregion
}
// For numbers, the defaultComparator works fine
const rbt = new RedBlackTree<number>();

console.log("Inserting values:");
rbt.insert(10);
rbt.insert(20);
rbt.insert(30);
rbt.insert(15);
rbt.insert(5);
rbt.insert(25);
rbt.insert(35);
rbt.insert(1);
rbt.insert(40);

console.log("Inorder Traversal (after insertions):", rbt.inorderTraversal()); // Should be sorted: [1, 5, 10, 15, 20, 25, 30, 35, 40]

console.log("\nSearching for 20:", rbt.search(20)); // 20
console.log("Searching for 100:", rbt.search(100)); // null

console.log("\nDeleting 10:");
rbt.delete(10);
console.log("Inorder Traversal (after deleting 10):", rbt.inorderTraversal()); // [1, 5, 15, 20, 25, 30, 35, 40]

console.log("\nDeleting 20 (root in this case):");
rbt.delete(20);
console.log("Inorder Traversal (after deleting 20):", rbt.inorderTraversal()); // [1, 5, 15, 25, 30, 35, 40]

console.log("\nDeleting a non-existent value (99):", rbt.delete(99)); // false
console.log("Inorder Traversal (no change):", rbt.inorderTraversal());

console.log("\nDeleting 1 (a leaf):");
rbt.delete(1);
console.log("Inorder Traversal (after deleting 1):", rbt.inorderTraversal()); // [5, 15, 25, 30, 35, 40]

// Example with custom comparator for objects
interface Person {
    id: number;
    name: string;
}

const personComparator: Comparator<Person> = (a, b) => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
};

const personRBT = new RedBlackTree<Person>(personComparator);

console.log("\nInserting Persons:");
personRBT.insert({ id: 5, name: "Alice" });
personRBT.insert({ id: 2, name: "Bob" });
personRBT.insert({ id: 8, name: "Charlie" });
personRBT.insert({ id: 3, name: "David" });

console.log("Inorder Traversal (Persons):", personRBT.inorderTraversal().map(p => p.name)); // [ 'Bob', 'David', 'Alice', 'Charlie' ]

const searchPerson = { id: 8, name: "Charlie" };
console.log("Searching for Charlie (id 8):", personRBT.search(searchPerson));

personRBT.delete({ id: 2, name: "Bob" }); // Delete Bob
console.log("Inorder Traversal (after deleting Bob):", personRBT.inorderTraversal().map(p => p.name)); // [ 'David', 'Alice', 'Charlie' ]
