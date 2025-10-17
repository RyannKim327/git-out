class AVLNode<T> {
    key: T;
    height: number;
    left: AVLNode<T> | null;
    right: AVLNode<T> | null;

    constructor(key: T) {
        this.key = key;
        this.height = 1; // new nodes start with height 1
        this.left = null;
        this.right = null;
    }
}
function getHeight<T>(node: AVLNode<T> | null): number {
    return node ? node.height : 0;
}

function getBalance<T>(node: AVLNode<T> | null): number {
    return node ? getHeight(node.left) - getHeight(node.right) : 0;
}

function updateHeight<T>(node: AVLNode<T>): void {
    node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
}
function rightRotate<T>(y: AVLNode<T>): AVLNode<T> {
    const x = y.left!;
    const T2 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T2;

    // Update heights
    updateHeight(y);
    updateHeight(x);

    return x;
}

function leftRotate<T>(x: AVLNode<T>): AVLNode<T> {
    const y = x.right!;
    const T2 = y.left;

    // Perform rotation
    y.left = x;
    x.right = T2;

    // Update heights
    updateHeight(x);
    updateHeight(y);

    return y;
}
function insert<T>(node: AVLNode<T> | null, key: T): AVLNode<T> {
    // 1. Normal BST insertion
    if (!node) return new AVLNode(key);

    if (key < node.key) {
        node.left = insert(node.left, key);
    } else if (key > node.key) {
        node.right = insert(node.right, key);
    } else {
        // duplicate keys not inserted
        return node;
    }

    // 2. Update height
    updateHeight(node);

    // 3. Get balance factor
    const balance = getBalance(node);

    // 4. Balance tree
    // Left Left
    if (balance > 1 && key < (node.left?.key ?? key)) {
        return rightRotate(node);
    }

    // Right Right
    if (balance < -1 && key > (node.right?.key ?? key)) {
        return leftRotate(node);
    }

    // Left Right
    if (balance > 1 && key > (node.left?.key ?? key)) {
        node.left = node.left ? leftRotate(node.left) : null;
        return rightRotate(node);
    }

    // Right Left
    if (balance < -1 && key < (node.right?.key ?? key)) {
        node.right = node.right ? rightRotate(node.right) : null;
        return leftRotate(node);
    }

    return node;
}
class AVLTree<T> {
    root: AVLNode<T> | null = null;

    insert(key: T): void {
        this.root = insert(this.root, key);
    }

    // You can add search, deletion, traversal here
    inOrderTraversal(node: AVLNode<T> | null = this.root): void {
        if (!node) return;
        this.inOrderTraversal(node.left);
        console.log(node.key);
        this.inOrderTraversal(node.right);
    }
}
const tree = new AVLTree<number>();
tree.insert(10);
tree.insert(20);
tree.insert(30); // causes rotation
tree.insert(25);
tree.insert(5);

tree.inOrderTraversal(); // prints balanced order
