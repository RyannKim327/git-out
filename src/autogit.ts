/*-------------------------------------------------------
  Binary‑Tree Data Structures & Operations in TypeScript
-------------------------------------------------------*/

// 1️⃣ A node that holds one element and links to its children
class TreeNode<T> {
  constructor(
    public value: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null
  ) {}
}

// 2️⃣ The tree itself – only the root is stored
class BinaryTree<T> {
  private root: TreeNode<T> | null = null

  /* ------------ Insertion (BST style) ------------ */
  insert(value: T): void {
    this.root = this._insertRec(this.root, value)
  }

  private _insertRec(node: TreeNode<T> | null, value: T): TreeNode<T> {
    if (!node) return new TreeNode(value)

    // Basic BST rule – < goes left, >= goes right
    if (value < node.value) node.left = this._insertRec(node.left, value)
    else node.right = this._insertRec(node.right, value)

    return node
  }

  /* ------------ Search ------------ */
  find(value: T): boolean {
    return this._findRec(this.root, value)
  }

  private _findRec(node: TreeNode<T> | null, value: T): boolean {
    if (!node) return false
    if (node.value === value) return true
    return value < node.value
      ? this._findRec(node.left, value)
      : this._findRec(node.right, value)
  }

  /* ------------ Traversals ------------ */

  // In‑order: left, node, right  (sorted for BST)
  inorder(callback: (val: T) => void) {
    this._inorderRec(this.root, callback)
  }
  private _inorderRec(node: TreeNode<T> | null, cb: (val: T) => void) {
    if (!node) return
    this._inorderRec(node.left, cb)
    cb(node.value)
    this._inorderRec(node.right, cb)
  }

  // Pre‑order: node, left, right
  preorder(callback: (val: T) => void) {
    this._preorderRec(this.root, callback)
  }
  private _preorderRec(node: TreeNode<T> | null, cb: (val: T) => void) {
    if (!node) return
    cb(node.value)
    this._preorderRec(node.left, cb)
    this._preorderRec(node.right, cb)
  }

  // Post‑order: left, right, node
  postorder(callback: (val: T) => void) {
    this._postorderRec(this.root, callback)
  }
  private _postorderRec(node: TreeNode<T> | null, cb: (val: T) => void) {
    if (!node) return
    this._postorderRec(node.left, cb)
    this._postorderRec(node.right, cb)
    cb(node.value)
  }

  /* ------------ Utility ------------ */

  // Height of the tree (root = 0)
  height(): number {
    return this._heightRec(this.root)
  }
  private _heightRec(node: TreeNode<T> | null): number {
    if (!node) return -1
    return 1 + Math.max(this._heightRec(node.left), this._heightRec(node.right))
  }

  // Size (total number of nodes)
  size(): number {
    return this._sizeRec(this.root)
  }
  private _sizeRec(node: TreeNode<T> | null): number {
    if (!node) return 0
    return 1 + this._sizeRec(node.left) + this._sizeRec(node.right)
  }
}

/*-------------------------------------------------------
  Example use
-------------------------------------------------------*/
const tree = new BinaryTree<number>()

// Inserting some numbers
for (const v of [7, 3, 9, 1, 5, 8, 10]) {
  tree.insert(v)
}

// Find
console.log('Has 5?', tree.find(5))   // true
console.log('Has 4?', tree.find(4))   // false

// In‑order prints the numbers sorted
tree.inorder(v => console.log(v))     // 1 3 5 7 8 9 10

// Tree metadata
console.log('Height:', tree.height()) // 2
console.log('Size:', tree.size())     // 7
