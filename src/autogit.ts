class AVLNode<T> {
    value: T;
    left: AVLNode<T> | null;
    right: AVLNode<T> | null;
    height: number;

    constructor(value: T) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree<T> {
    private root: AVLNode<T> | null;
    private comparator: (a: T, b: T) => number;

    constructor(comparator?: (a: T, b: T) => number) {
        this.root = null;
        this.comparator = comparator || ((a: T, b: T) => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        });
    }

    // Get height of node
    private getHeight(node: AVLNode<T> | null): number {
        return node ? node.height : 0;
    }

    // Update height of node
    private updateHeight(node: AVLNode<T>): void {
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }

    // Get balance factor
    private getBalance(node: AVLNode<T> | null): number {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    // Right rotation
    private rotateRight(y: AVLNode<T>): AVLNode<T> {
        const x = y.left!;
        const T2 = x.right;

        // Perform rotation
        x.right = y;
        y.left = T2;

        // Update heights
        this.updateHeight(y);
        this.updateHeight(x);

        return x;
    }

    // Left rotation
    private rotateLeft(x: AVLNode<T>): AVLNode<T> {
        const y = x.right!;
        const T2 = y.left;

        // Perform rotation
        y.left = x;
        x.right = T2;

        // Update heights
        this.updateHeight(x);
        this.updateHeight(y);

        return y;
    }

    // Insert value into the tree
    insert(value: T): void {
        this.root = this.insertNode(this.root, value);
    }

    private insertNode(node: AVLNode<T> | null, value: T): AVLNode<T> {
        // 1. Perform normal BST insertion
        if (node === null) {
            return new AVLNode(value);
        }

        const cmp = this.comparator(value, node.value);
        if (cmp < 0) {
            node.left = this.insertNode(node.left, value);
        } else if (cmp > 0) {
            node.right = this.insertNode(node.right, value);
        } else {
            // Duplicate values not allowed
            return node;
        }

        // 2. Update height of current node
        this.updateHeight(node);

        // 3. Get balance factor
        const balance = this.getBalance(node);

        // 4. Perform rotations if unbalanced

        // Left Left Case
        if (balance > 1 && this.comparator(value, node.left!.value) < 0) {
            return this.rotateRight(node);
        }

        // Right Right Case
        if (balance < -1 && this.comparator(value, node.right!.value) > 0) {
            return this.rotateLeft(node);
        }

        // Left Right Case
        if (balance > 1 && this.comparator(value, node.left!.value) > 0) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }

        // Right Left Case
        if (balance < -1 && this.comparator(value, node.right!.value) < 0) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }

        return node;
    }

    // Delete value from the tree
    delete(value: T): void {
        this.root = this.deleteNode(this.root, value);
    }

    private deleteNode(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
        // 1. Perform standard BST delete
        if (node === null) {
            return null;
        }

        const cmp = this.comparator(value, node.value);
        if (cmp < 0) {
            node.left = this.deleteNode(node.left, value);
        } else if (cmp > 0) {
            node.right = this.deleteNode(node.right, value);
        } else {
            // Node with only one child or no child
            if (node.left === null || node.right === null) {
                const temp = node.left || node.right;
                node = temp || null;
            } else {
                // Node with two children: get inorder successor
                const temp = this.getMinNode(node.right);
                node.value = temp.value;
                node.right = this.deleteNode(node.right, temp.value);
            }
        }

        // If tree had only one node
        if (node === null) {
            return null;
        }

        // 2. Update height
        this.updateHeight(node);

        // 3. Get balance factor
        const balance = this.getBalance(node);

        // 4. Perform rotations if unbalanced

        // Left Left Case
        if (balance > 1 && this.getBalance(node.left) >= 0) {
            return this.rotateRight(node);
        }

        // Left Right Case
        if (balance > 1 && this.getBalance(node.left) < 0) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }

        // Right Right Case
        if (balance < -1 && this.getBalance(node.right) <= 0) {
            return this.rotateLeft(node);
        }

        // Right Left Case
        if (balance < -1 && this.getBalance(node.right) > 0) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }

        return node;
    }

    // Search for a value
    search(value: T): boolean {
        return this.searchNode(this.root, value);
    }

    private searchNode(node: AVLNode<T> | null, value: T): boolean {
        if (node === null) {
            return false;
        }

        const cmp = this.comparator(value, node.value);
        if (cmp === 0) {
            return true;
        } else if (cmp < 0) {
            return this.searchNode(node.left, value);
        } else {
            return this.searchNode(node.right, value);
        }
    }

    // Get minimum value node
    private getMinNode(node: AVLNode<T>): AVLNode<T> {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }

    // Get minimum value
    getMin(): T | null {
        if (this.root === null) return null;
        return this.getMinNode(this.root).value;
    }

    // Get maximum value
    getMax(): T | null {
        if (this.root === null) return null;
        
        let current = this.root;
        while (current.right !== null) {
            current = current.right;
        }
        return current.value;
    }

    // In-order traversal (returns sorted array)
    inOrder(): T[] {
        const result: T[] = [];
        this.inOrderTraversal(this.root, result);
        return result;
    }

    private inOrderTraversal(node: AVLNode<T> | null, result: T[]): void {
        if (node !== null) {
            this.inOrderTraversal(node.left, result);
            result.push(node.value);
            this.inOrderTraversal(node.right, result);
        }
    }

    // Pre-order traversal
    preOrder(): T[] {
        const result: T[] = [];
        this.preOrderTraversal(this.root, result);
        return result;
    }

    private preOrderTraversal(node: AVLNode<T> | null, result: T[]): void {
        if (node !== null) {
            result.push(node.value);
            this.preOrderTraversal(node.left, result);
            this.preOrderTraversal(node.right, result);
        }
    }

    // Post-order traversal
    postOrder(): T[] {
        const result: T[] = [];
        this.postOrderTraversal(this.root, result);
        return result;
    }

    private postOrderTraversal(node: AVLNode<T> | null, result: T[]): void {
        if (node !== null) {
            this.postOrderTraversal(node.left, result);
            this.postOrderTraversal(node.right, result);
            result.push(node.value);
        }
    }

    // Check if tree is balanced (for testing)
    isBalanced(): boolean {
        return this.checkBalance(this.root);
    }

    private checkBalance(node: AVLNode<T> | null): boolean {
        if (node === null) return true;
        
        const balance = this.getBalance(node);
        return Math.abs(balance) <= 1 && 
               this.checkBalance(node.left) && 
               this.checkBalance(node.right);
    }

    // Get tree height
    getTreeHeight(): number {
        return this.getHeight(this.root);
    }

    // Check if tree is empty
    isEmpty(): boolean {
        return this.root === null;
    }
}
// Example usage with numbers
const avl = new AVLTree<number>();

// Insert values
avl.insert(10);
avl.insert(20);
avl.insert(30);
avl.insert(40);
avl.insert(50);
avl.insert(25);

console.log('In-order traversal:', avl.inOrder()); // [10, 20, 25, 30, 40, 50]
console.log('Tree height:', avl.getTreeHeight());
console.log('Is balanced:', avl.isBalanced());
console.log('Search 25:', avl.search(25)); // true
console.log('Min value:', avl.getMin()); // 10
console.log('Max value:', avl.getMax()); // 50

// Delete a value
avl.delete(30);
console.log('After deletion:', avl.inOrder()); // [10, 20, 25, 40, 50]

// Example with custom comparator for objects
interface Person {
    name: string;
    age: number;
}

const personAVL = new AVLTree<Person>((a, b) => a.age - b.age);

personAVL.insert({ name: 'Alice', age: 25 });
personAVL.insert({ name: 'Bob', age: 30 });
personAVL.insert({ name: 'Charlie', age: 20 });

console.log('People sorted by age:', personAVL.inOrder());
