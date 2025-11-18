enum Color { RED, BLACK }

class RBNode<T> {
    value: T;
    color: Color;
    left: RBNode<T> | null = null;
    right: RBNode<T> | null = null;
    parent: RBNode<T> | null = null;

    constructor(value: T, color: Color = Color.RED) {
        this.value = value;
        this.color = color;
    }
}
class RBTree<T> {
    root: RBNode<T> | null = null;

    // Insert value
    insert(value: T) {
        const newNode = new RBNode(value);
        this.root = this._bstInsert(this.root, newNode);
        this.fixInsert(newNode);
    }

    // Basic BST insert
    private _bstInsert(root: RBNode<T> | null, node: RBNode<T>): RBNode<T> {
        if (!root) return node;

        if (node.value < root.value) {
            root.left = this._bstInsert(root.left, node);
            root.left.parent = root;
        } else if (node.value > root.value) {
            root.right = this._bstInsert(root.right, node);
            root.right.parent = root;
        }
        // Ignore duplicate values for simplicity
        return root;
    }

    // Balancing after insertion
    private fixInsert(node: RBNode<T>) {
        while (node !== this.root && node.parent.color === Color.RED) {
            let parent = node.parent;
            let grandparent = parent.parent;
            if (!grandparent) break;

            // Parent is left child
           
