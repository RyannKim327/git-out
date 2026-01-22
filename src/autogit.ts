class TreeNode<T> {
  /** Value stored in the node. */
  value: T

  /** Left child (values < this.value). */
  left: TreeNode<T> | null = null

  /** Right child (values > this.value). */
  right: TreeNode<T> | null = null

  constructor(value: T) {
    this.value = value
  }
}
class BinaryTree<T> {
  root: TreeNode<T> | null = null

  /* --------------------------------- */
  /* Core helpers (private) */
  /* --------------------------------- */

  /** Simple comparison that works for numbers or strings. */
  private compare(a: T, b: T): number {
    if (a === b) return 0
    return a < b ? -1 : 1
  }

  /* --------------------------------- */
  /* Public API */
  /* --------------------------------- */

  /** Insert a value into the tree. */
  insert(value: T): void {
    this.root = this.insertRec(this.root, value)
  }
  private insertRec(node: TreeNode<T> | null, value: T): TreeNode<T> {
    if (!node) return new TreeNode(value)

    if (this.compare(value, node.value) < 0) {
      node.left = this.insertRec(node.left, value)
    } else if (this.compare(value, node.value) > 0) {
      node.right = this.insertRec(node.right, value)
    }
    // (duplicates are ignored for a classic BST – change if you need them)
    return node
  }

  /** Search for a value, return the node or null. */
  find(value: T): TreeNode<T> | null {
    return this.findRec(this.root, value)
  }
  private findRec(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    if (!node) return null
    const cmp = this.compare(value, node.value)
    if (cmp === 0) return node
    return cmp < 0 ? this.findRec(node.left, value) : this.findRec(node.right, value)
  }

  /** Depth‑first in‑order traversal — gives you sorted values. */
  inorder(callback: (node: TreeNode<T>) => void): void {
    this.inorderRec(this.root, callback)
  }
  private inorderRec(node: TreeNode<T> | null, callback: (node: TreeNode<T>) => void): void {
    if (!node) return
    this.inorderRec(node.left, callback)
    callback(node)
    this.inorderRec(node.right, callback)
  }

  /** Remove a value from the tree (simple BST delete). */
  delete(value: T): void {
    this.root = this.deleteRec(this.root, value)
  }
  private deleteRec(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    if (!node) return null

    const cmp = this.compare(value, node.value)
    if (cmp < 0) {
      node.left = this.deleteRec(node.left, value)
      return node
    }
    if (cmp > 0) {
      node.right = this.deleteRec(node.right, value)
      return node
    }

    // Node to delete found.

    // 1️⃣ No children
    if (!node.left && !node.right) return null

    // 2️⃣ One child
    if (!node.left) return node.right
    if (!node.right) return node.left

    // 3️⃣ Two children – replace with inorder successor
    const successor = this.minNode(node.right)!
    node.value = successor.value
    node.right = this.deleteRec(node.right, successor.value)
    return node
  }

  /** Find the minimum node in a subtree (used in delete). */
  private minNode(node: TreeNode<T> | null): TreeNode<T> | null {
    let current = node
    while (current?.left) current = current.left
    return current
  }
}
const bst = new BinaryTree<number>()

// Insert values
[7, 3, 9, 1, 5, 8, 10].forEach(v => bst.insert(v))

// In‑order prints 1 3 5 7 8 9 10
bst.inorder(n => console.log(n.value))

// Search
const node = bst.find(5)
console.log(node ? `Found ${node.value}` : 'Not found')

// Delete
bst.delete(7)                // Remove root node
bst.inorder(n => console.log(n.value)) // 1 3 5 8 9 10
