/** The two colours that a node can be. */
enum Color { RED, BLACK }

/** Sentinel that represents all NIL leaves. It is shared by every
 *  subtree so that we never have to check for `null` – the tree knows
 *  that `NIL` is a perfectly black node with no actual key/value. */
const NIL = new class {
    color = Color.BLACK
    left: this | null = null
    right: this | null = null
    parent: this | null = null
    // Sentinel never carries real payload
} as any

/** A node in the tree.  We keep the children *always* defined as
 *  `RBNode` so that the rest of the code never has to deal with `null`s. */
class RBNode<TKey, TValue> {
    left: RBNode<TKey, TValue>
    right: RBNode<TKey, TValue>
    parent: RBNode<TKey, TValue>
    color: Color

    constructor(
        public key: TKey,
        public value: TValue,
        color: Color = Color.RED,
        parent: RBNode<TKey, TValue> = NIL as RBNode<TKey, TValue>
    ) {
        this.left = NIL as RBNode<TKey, TValue>
        this.right = NIL as RBNode<TKey, TValue>
        this.parent = parent
        this.color = color
    }
}
class RedBlackTree<TKey, TValue> {
    private root: RBNode<TKey, TValue> = NIL as RBNode<TKey, TValue>

    /* ---------- Public API ---------- */

    /** Insert a key/value pair.  If the key already exists, its value
     *  is overwritten. */
    insert(key: TKey, value: TValue): void {
        const newNode = new RBNode(key, value)
        let y = NIL as RBNode<TKey, TValue>
        let x = this.root

        // --- 1. Standard BST insertion to find the parent --- //
        while (x !== NIL) {
            y = x
            if (key < x.key) {          // assuming TKey is number/string
                x = x.left
            } else if (key > x.key) {
                x = x.right
            } else {                     // key already exists → replace
                x.value = value
                return
            }
        }

        newNode.parent = y
        if (y === NIL) {
            this.root = newNode
        } else if (key < y.key) {
            y.left = newNode
        } else {
            y.right = newNode
        }
        newNode.left = NIL
        newNode.right = NIL
        newNode.color = Color.RED

        // --- 2. Fix the tree to restore rbt properties --- //
        this.fixInsert(newNode)
    }

    /** Return the value for a key, or `undefined`. */
    get(key: TKey): TValue | undefined {
        const node = this.search(key)
        return node ? node.value : undefined
    }

    /** Delete a key if it exists; otherwise do nothing. */
    delete(key: TKey): void {
        const node = this.search(key)
        if (!node) return
        this.deleteNode(node)
    }

    /** In‑order traversal – useful for debugging or debugging. */
    inorder(f: (k: TKey, v: TValue) => void): void {
        const walk = (node: RBNode<TKey, TValue>) => {
            if (node === NIL) return
            walk(node.left)
            f(node.key, node.value)
            walk(node.right)
        }
        walk(this.root)
    }

    /* ---------- Private helpers ---------- */

    /** Helper to walk down the tree and find a node by key. */
    private search(key: TKey): RBNode<TKey, TValue> | null {
        let node = this.root
        while (node !== NIL) {
            if (key < node.key) node = node.left
            else if (key > node.key) node = node.right
            else return node
        }
        return null
    }

    /* Rotations – keep the tree balanced if you’re playing with your own
     * recursive helper.  They are basically a graft + replace.*
     */

    private leftRotate(x: RBNode<TKey, TValue>): void {
        const y = x.right
        x.right = y.left
        if (y.left !== NIL) y.left.parent = x

        y.parent = x.parent
        if (x.parent === NIL) this.root = y
        else if (x === x.parent.left) x.parent.left = y
        else x.parent.right = y

        y.left = x
        x.parent = y
    }

    private rightRotate(y: RBNode<TKey, TValue>): void {
        const x = y.left
        y.left = x.right
        if (x.right !== NIL) x.right.parent = y

        x.parent = y.parent
        if (y.parent === NIL) this.root = x
        else if (y === y.parent.left) y.parent.left = x
