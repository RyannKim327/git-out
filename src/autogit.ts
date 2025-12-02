class TreeNode<T> {
    value: T;
    left: TreeNode<T> | null = null;
    right: TreeNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

class BinarySearchTree<T> {
    private root: TreeNode<T> | null = null;

    // Insert a new value into the BST
    insert(value: T): void {
        this.root = this.insertRec(this.root, value);
    }

    private insertRec(node: TreeNode<T> | null, value: T): TreeNode<T> {
        if (!node) {
            return new TreeNode(value);
        }

        if (value < node.value) {
            node.left = this.insertRec(node.left, value);
        } else if (value > node.value) {
            node.right = this.insertRec(node.right, value);
        }

        return node;
    }

    // Search for a value in the BST
    search(value: T): boolean {
        return this.searchRec(this.root, value);
    }

    private searchRec(node: TreeNode<T> | null, value: T): boolean {
        if (!node) return false;
        
        if (value === node.value) return true;
        if (value < node.value) return this.searchRec(node.left, value);
        return this.searchRec(node.right, value);
    }

    // Delete a value from the BST
    delete(value: T): void {
        this.root = this.deleteRec(this.root, value);
    }

    private deleteRec(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
        if (!node) return null;

        if (value < node.value) {
            node.left = this.deleteRec(node.left, value);
        } else if (value > node.value) {
            node.right = this.deleteRec(node.right, value);
        } else {
            // Node found - implement deletion logic
            if (!node.left) return node.right;
            if (!node.right) return node.left;

            // Node with two children: Get inorder successor
            node.value = this.minValue(node.right);
            node.right = this.deleteRec(node.right, node.value);
        }

        return node;
    }

    private minValue(node: TreeNode<T>): T {
        let min = node.value;
        let current = node;
        while (current.left) {
            min = current.left.value;
            current = current.left;
        }
        return min;
    }

    // In-order traversal (returns values sorted in ascending order)
    inOrder(): T[] {
        const result: T[] = [];
        this.inOrderRec(this.root, result);
        return result;
    }

    private inOrderRec(node: TreeNode<T> | null, result: T[]): void {
        if (!node) return;
        this.inOrderRec(node.left, result);
        result.push(node.value);
        this.inOrderRec(node.right, result);
    }

    // Pre-order traversal (root -> left -> right)
    preOrder(): T[] {
        const result: T[] = [];
        this.preOrderRec(this.root, result);
        return result;
    }

    private preOrderRec(node: TreeNode<T> | null, result: T[]): void {
        if (!node) return;
        result.push(node.value);
        this.preOrderRec(node.left, result);
        this.preOrderRec(node.right, result);
    }

    // Post-order traversal (left -> right -> root)
    postOrder(): T[] {
        const result: T[] = [];
        this.postOrderRec(this.root, result);
        return result;
    }

    private postOrderRec(node: TreeNode<T> | null, result: T[]): void {
        if (!node) return;
        this.postOrderRec(node.left, result);
        this.postOrderRec(node.right, result);
        result.push(node.value);
    }

    // Get the tree height
    height(): number {
        return this.heightRec(this.root);
    }

    private heightRec(node: TreeNode<T> | null): number {
        if (!node) return -1;
        return Math.max(this.heightRec(node.left), this.heightRec(node.right)) + 1;
    }
}

// Example Usage
const bst = new BinarySearchTree<number>();

// Insert values
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);
bst.insert(12);
bst.insert(18);

console.log('In-order:', bst.inOrder()); // [3, 5, 7, 10, 12, 15, 18]
console.log('Pre-order:', bst.preOrder()); // [10, 5, 3, 7, 15, 12, 18]
console.log('Post-order:', bst.postOrder()); // [3, 7, 5, 12, 18, 15, 10]

console.log('Search 7:', bst.search(7)); // true
console.log('Search 20:', bst.search(20)); // false

// Delete node
bst.delete(15);
console.log('After deletion of 15:', bst.inOrder()); // [3, 5, 7, 10, 12, 18]

console.log('Tree height:', bst.height()); // 2
const stringBst = new BinarySearchTree<string>();
stringBst.insert("apple");
stringBst.insert("banana");
interface Person {
    age: number;
    name: string;
}

const personBst = new BinarySearchTree<Person>((a, b) => a.age - b.age);
personBst.insert({ age: 25, name: "Alice" });
