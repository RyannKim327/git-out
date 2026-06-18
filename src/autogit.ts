// 1️⃣ Node shape ----------------------------------------------------
class TreeNode<T> {
  constructor(
    public value: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null,
  ) {}
}
type Comparator<T> = (a: T, b: T) => number; // negative ⇧ positive ⇩

const defaultComparator = <T extends number | string>(a: T, b: T) => {
  if (a < b) return -1;
  if (a > b) return +1;
  return 0;
};
// 2️⃣ BST class ----------------------------------------------------
class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;
  public size = 0;

  constructor(private comp: Comparator<T> = defaultComparator) {}

  // -----------------------------------------------------------------
  // Insert
  // -----------------------------------------------------------------
  insert(value: T): void {
    this.root = this._insertRec(this.root, value);
  }

  private _insertRec(node: TreeNode<T> | null, value: T): TreeNode<T> {
    if (!node) {
      this.size++;
      return new TreeNode(value);
    }

    const cmp = this.comp(value, node.value);
    if (cmp < 0) {
      node.left = this._insertRec(node.left, value);
    } else if (cmp > 0) {
      node.right = this._insertRec(node.right, value);
    } else {
      // duplicates: decide how to handle. Here we skip insertion.
      return node;
    }
    return node;
  }

  // -----------------------------------------------------------------
  // Search
  // -----------------------------------------------------------------
  find(value: T): boolean {
    let node = this.root;
    while (node) {
      const cmp = this.comp(value, node.value);
      if (cmp === 0) return true;
      node = cmp < 0 ? node.left : node.right;
    }
    return false;
  }

  // -----------------------------------------------------------------
  // Remove
  // -----------------------------------------------------------------
  remove(value: T): void {
    this.root = this._removeRec(this.root, value);
  }

  private _removeRec(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    if (!node) return null;

    const cmp = this.comp(value, node.value);
    if (cmp < 0) {
      node.left = this._removeRec(node.left, value);
    } else if (cmp > 0) {
      node.right = this._removeRec(node.right, value);
    } else {
      // node to delete found
      this.size--;

      // case 1: no children
      if (!node.left && !node.right) return null;

      // case 2: one child
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // case 3: two children – replace by inorder predecessor
      const pred = this._maxNode(node.left)!; // non‑null
      node.value = pred.value;
      node.left = this._removeRec(node.left, pred.value);
    }
    return node;
  }

  private _maxNode(node: TreeNode<T>): TreeNode<T> {
    while (node.right) node = node.right;
    return node;
  }

  // -----------------------------------------------------------------
  // Traversal helpers – in‑order (sorted order)
  // -----------------------------------------------------------------
  inorder(cb: (value: T) => void): void {
    this._inorderRec(this.root, cb);
  }

  private _inorderRec(node: TreeNode<T> | null, cb: (value: T) => void): void {
    if (!node) return;
    this._inorderRec(node.left, cb);
    cb(node.value);
    this._inorderRec(node.right, cb);
  }

  // -----------------------------------------------------------------
  // Utility: pretty print as nested brackets
  // -----------------------------------------------------------------
  toString(): string {
    const parts: string[] = [];
    this._toStringRec(this.root, parts);
    return parts.join(' ');
  }

  private _toStringRec(node: TreeNode<T> | null, parts: string[]) {
    if (!node) { parts.push('null'); return; }
    parts.push(String(node.value));
    this._toStringRec(node.left, parts);
    this._toStringRec(node.right, parts);
  }
}
const bst = new BinarySearchTree<number>();

[50, 30, 70, 20, 40, 60, 80].forEach(n => bst.insert(n));
console.log('Initial tree:', bst.toString());   // 50 30 20 null null 40 null null 70 60 null null 80 null null

console.log('Contains 40? →', bst.find(40));   // true
console.log('Contains 99? →', bst.find(99));   // false

console.log('In‑order traversal:');
bst.inorder(v => console.log(v));  
