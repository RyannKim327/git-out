class TreeNode<T> {
    public key: T;
    public left: TreeNode<T> | null = null;
    public right: TreeNode<T> | null = null;
    public height: number = 1;

    constructor(key: T) {
        this.key = key;
    }
}

class AVLTree<T> {
    private root: TreeNode<T> | null = null;

    // Get height of the tree
    private getHeight(node: TreeNode<T> | null): number {
        return node ? node.height : 0;
    }

    // Right rotate subtree rooted with y
    private rightRotate(y: TreeNode<T>): TreeNode<T> {
        let x = y.left!;
        let T2 = x.right;

        // Perform rotation
        x.right = y;
        y.left = T2;

        // Update heights
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

        // Return new root
        return x;
    }

    // Left rotate subtree rooted with x
    private leftRotate(x: TreeNode<T>): TreeNode<T> {
        let y = x.right!;
        let T2 = y.left;

        // Perform rotation
        y.left = x;
        x.right = T2;

        // Update heights
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

        // Return new root
        return y;
    }

    // Get balance factor of node
    private getBalance(node: TreeNode<T>): number {
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    // Recursive function to insert a key
    public insert(key: T): void {
        this.root = this.insertNode(this.root, key);
    }

    private insertNode(node: TreeNode<T> | null, key: T): TreeNode<T> {
        // Perform the normal BST insert
        if (!node) {
            return new TreeNode(key);
        }

        if (key < node.key) {
            node.left = this.insertNode(node.left, key);
        } else if (key > node.key) {
            node.right = this.insertNode(node.right, key);
        } else {
            // Duplicate keys are not allowed in the AVL tree
            return node;
        }

        // Update the height of this ancestor node
        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right)));

        // Get the balance factor of this ancestor node to check whether
        // this node became unbalanced
        let balance = this.getBalance(node);

        // If this node becomes unbalanced, then there are 4 cases

        // Left Left Case
        if (balance > 1 && key < node.left!.key) {
            return this.rightRotate(node);
        }

        // Right Right Case
        if (balance < -1 && key > node.right!.key) {
            return this.leftRotate(node);
        }

        // Left Right Case
        if (balance > 1 && key > node.left!.key) {
            node.left = this.leftRotate(node.left!);
            return this.rightRotate(node);
        }

        // Right Left Case
        if (balance < -1 && key < node.right!.key) {
            node.right = this.rightRotate(node.right!);
            return this.leftRotate(node);
        }

        // Return the (unchanged) node pointer
        return node;
    }

    // Function to perform in-order traversal of the tree
    public inOrder(): T[] {
        const result: T[] = [];
        this.inOrderHelper(this.root, result);
        return result;
    }

    private inOrderHelper(node: TreeNode<T> | null, result: T[]): void {
        if (node) {
            this.inOrderHelper(node.left, result);
            result.push(node.key);
            this.inOrderHelper(node.right, result);
        }
    }
}

// Example usage
const avl = new AVLTree<number>();
avl.insert(10);
avl.insert(20);
avl.insert(30);
avl.insert(40);
avl.insert(50);
avl.insert(25);

console.log(avl.inOrder()); // Output: [10, 20, 25, 30, 40, 50]
