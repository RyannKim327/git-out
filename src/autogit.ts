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

    constructor() {
        this.root = null;
    }

    // Get the height of a node
    private getHeight(node: AVLNode<T> | null): number {
        return node ? node.height : 0;
    }

    // Get the balance factor of a node
    private getBalance(node: AVLNode<T> | null): number {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    // Update the height of a node
    private updateHeight(node: AVLNode<T>): void {
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }

    // Right rotation
    private rightRotate(y: AVLNode<T>): AVLNode<T> {
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
    private leftRotate(x: AVLNode<T>): AVLNode<T> {
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

    // Insert a value into the tree
    insert(value: T): void {
        this.root = this.insertNode(this.root, value);
    }

    private insertNode(node: AVLNode<T> | null, value: T): AVLNode<T> {
        // 1. Perform normal BST insertion
        if (node === null) {
            return new AVLNode(value);
        }

        if (value < node.value) {
            node.left = this.insertNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.insertNode(node.right, value);
        } else {
            // Duplicate values not allowed
            return node;
        }

        // 2. Update height of this ancestor node
        this.updateHeight(node);

        // 3. Get the balance factor
        const balance = this.getBalance(node);

        // 4. If unbalanced, then there are 4 cases

        // Left Left Case
        if (balance > 1 && value < node.left!.value) {
            return this.rightRotate(node);
        }

        // Right Right Case
        if (balance < -1 && value > node.right!.value) {
            return this.leftRotate(node);
        }

        // Left Right Case
        if (balance > 1 && value > node.left!.value) {
            node.left = this.leftRotate(node.left!);
            return this.rightRotate(node);
        }

        // Right Left Case
        if (balance < -1 && value < node.right!.value) {
            node.right = this.rightRotate(node.right!);
            return this.leftRotate(node);
        }

        return node;
    }

    // Delete a value from the tree
    delete(value: T): void {
        this.root = this.deleteNode(this.root, value);
    }

    private deleteNode(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
        // 1. Perform standard BST delete
        if (node === null) {
            return null;
        }

        if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.deleteNode(node.right, value);
        } else {
            // Node with only one child or no child
            if (node.left === null || node.right === null) {
                const temp = node.left || node.right;
                
                // No child case
                if (temp === null) {
                    return null;
                } else {
                    // One child case
                    return temp;
                }
            } else {
                // Node with two children: get inorder successor
                const temp = this.getMinValueNode(node.right)!;
                node.value = temp.value;
                node.right = this.deleteNode(node.right, temp.value);
            }
        }

        // If the tree had only one node then return
        if (node === null) {
            return null;
        }

        // 2. Update height
        this.updateHeight(node);

        // 3. Get the balance factor
        const balance = this.getBalance(node);

        // 4. If unbalanced, then there are 4 cases

        // Left Left Case
        if (balance > 1 && this.getBalance(node.left) >= 0) {
            return this.rightRotate(node);
        }

        // Left Right Case
        if (balance > 1 && this.getBalance(node.left) < 0) {
            node.left = this.leftRotate(node.left!);
            return this.rightRotate(node);
        }

        // Right Right Case
        if (balance < -1 && this.getBalance(node.right) <= 0) {
            return this.leftRotate(node);
        }

        // Right Left Case
        if (balance < -1 && this.getBalance(node.right) > 0) {
            node.right = this.rightRotate(node.right!);
            return this.leftRotate(node);
        }

        return node;
    }

    // Find the node with minimum value
    private getMinValueNode(node: AVLNode<T>): AVLNode<T> | null {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }

    // Search for a value
    search(value: T): boolean {
        return this.searchNode(this.root, value);
    }

    private searchNode(node: AVLNode<T> | null, value: T): boolean {
        if (node === null) {
            return false;
        }

        if (value < node.value) {
            return this.searchNode(node.left, value);
        } else if (value > node.value) {
            return this.searchNode(node.right, value);
        } else {
            return true;
        }
    }

    // In-order traversal
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

    // Get the height of the tree
    getTreeHeight(): number {
        return this.getHeight(this.root);
    }

    // Check if the tree is empty
    isEmpty(): boolean {
        return this.root === null;
    }

    // Level order traversal (BFS)
    levelOrder(): T[] {
        const result: T[] = [];
        if (this.root === null) {
            return result;
        }

        const queue: AVLNode<T>[] = [this.root];
        
        while (queue.length > 0) {
            const node = queue.shift()!;
            result.push(node.value);
            
            if (node.left !== null) {
                queue.push(node.left);
            }
            if (node.right !== null) {
                queue.push(node.right);
            }
        }
        
        return result;
    }
}

// Example usage
const avl = new AVLTree<number>();

// Insert values
avl.insert(10);
avl.insert(20);
avl.insert(30);
avl.insert(40);
avl.insert(50);
avl.insert(25);

console.log("In-order traversal:", avl.inOrder());
console.log("Pre-order traversal:", avl.preOrder());
console.log("Level order traversal:", avl.levelOrder());
console.log("Tree height:", avl.getTreeHeight());

// Search for values
console.log("Search 30:", avl.search(30)); // true
console.log("Search 100:", avl.search(100)); // false

// Delete values
avl.delete(30);
console.log("After deleting 30 - In-order:", avl.inOrder());

// Generic type example
const stringAVL = new AVLTree<string>();
stringAVL.insert("apple");
stringAVL.insert("banana");
stringAVL.insert("cherry");
console.log("String AVL in-order:", stringAVL.inOrder());
