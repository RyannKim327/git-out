enum Color {
    RED,
    BLACK
}

class RBNode<T> {
    value: T;
    color: Color;
    left: RBNode<T> | null;
    right: RBNode<T> | null;
    parent: RBNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.color = Color.RED; // New nodes are always red
        this.left = null;
        this.right = null;
        this.parent = null;
    }

    isRed(): boolean {
        return this.color === Color.RED;
    }
}

class RedBlackTree<T> {
    private root: RBNode<T> | null;
    private nil: RBNode<T>; // Sentinel leaf node

    constructor() {
        this.nil = new RBNode<T>(null as any);
        this.nil.color = Color.BLACK;
        this.root = this.nil;
    }

    // Basic rotations
    private leftRotate(x: RBNode<T>): void {
        const y = x.right!;
        x.right = y.left;

        if (y.left !== this.nil) {
            y.left.parent = x;
        }

        y.parent = x.parent;

        if (x.parent === this.nil) {
            this.root = y;
        } else if (x === x.parent!.left) {
            x.parent!.left = y;
        } else {
            x.parent!.right = y;
        }

        y.left = x;
        x.parent = y;
    }

    private rightRotate(y: RBNode<T>): void {
        const x = y.left!;
        y.left = x.right;

        if (x.right !== this.nil) {
            x.right.parent = y;
        }

        x.parent = y.parent;

        if (y.parent === this.nil) {
            this.root = x;
        } else if (y === y.parent!.left) {
            y.parent!.left = x;
        } else {
            y.parent!.right = x;
        }

        x.right = y;
        y.parent = x;
    }

    // Insertion with fixup
    public insert(value: T): void {
        const newNode = new RBNode(value);
        newNode.left = this.nil;
        newNode.right = this.nil;
        newNode.parent = this.nil;

        let parent = this.nil;
        let current = this.root;

        // BST insertion
        while (current !== this.nil) {
            parent = current;
            if (newNode.value < current.value) {
                current = current.left!;
            } else {
                current = current.right!;
            }
        }

        newNode.parent = parent;

        if (parent === this.nil) {
            this.root = newNode;
        } else if (newNode.value < parent.value) {
            parent.left = newNode;
        } else {
            parent.right = newNode;
        }

        this.fixInsert(newNode);
    }

    private fixInsert(z: RBNode<T>): void {
        while (z.parent?.isRed()) {
            if (z.parent === z.parent.parent?.left) {
                const y = z.parent.parent.right!;
                if (y.isRed()) {
                    z.parent.color = Color.BLACK;
                    y.color = Color.BLACK;
                    z.parent.parent.color = Color.RED;
                    z = z.parent.parent!;
                } else {
                    if (z === z.parent.right) {
                        z = z.parent!;
                        this.leftRotate(z);
                    }
                    z.parent!.color = Color.BLACK;
                    z.parent!.parent!.color = Color.RED;
                    this.rightRotate(z.parent!.parent!);
                }
            } else {
                // Mirror case
                const y = z.parent.parent!.left!;
                if (y.isRed()) {
                    z.parent.color = Color.BLACK;
                    y.color = Color.BLACK;
                    z.parent.parent!.color = Color.RED;
                    z = z.parent.parent!;
                } else {
                    if (z === z.parent.left) {
                        z = z.parent!;
                        this.rightRotate(z);
                    }
                    z.parent!.color = Color.BLACK;
                    z.parent!.parent!.color = Color.RED;
                    this.leftRotate(z.parent!.parent!);
                }
            }
        }
        this.root!.color = Color.BLACK;
    }

    // Search method
    public search(value: T): boolean {
        return this.searchNode(this.root!, value) !== this.nil;
    }

    private searchNode(node: RBNode<T>, value: T): RBNode<T> | null {
        if (node === this.nil) return null;
        if (value === node.value) return node;
        if (value < node.value) return this.searchNode(node.left!, value);
        return this.searchNode(node.right!, value);
    }
}
const rbt = new RedBlackTree<number>();
rbt.insert(10);
rbt.insert(20);
rbt.insert(5);
rbt.insert(15);

console.log(rbt.search(15)); // true
console.log(rbt.search(99)); // false
