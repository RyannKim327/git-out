// A comparison delegate: returns <0 if a<b, 0 if a===b, >0 if a>b
type Comparator<T> = (a: T, b: T) => number;

// Default comparator for numbers & strings; for other types supply your own
const defaultComparator = <T extends number | string>(a: T, b: T) =>
  (a < b ? -1 : a > b ? 1 : 0);
class TreeNode<T> {
  constructor(
    public value: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null
  ) {}
}
class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;

  constructor(private comparator: Comparator<T> = defaultComparator) {}

  /** Public API ---------------------------------------------------------- */

  insert(value: T) {
    this.root = this._insert(this.root, value);
  }

  find(value: T): boolean {
    return !!this._find(this.root, value);
  }

  delete(value: T) {
    this.root = this._delete(this.root, value);
  }

  // In‑order traversal (ascending order)
  inOrder(callback: (val: T) => void) {
    this._traverse(this.root, callback);
  }

  // Pre‑order
  preOrder(callback: (val: T) => void) {
    this._pre(this.root, callback);
  }

  // Post‑order
  postOrder(callback: (val: T) => void) {
    this._post(this.root, callback);
  }

  // Height of the tree
  get height(): number {
    const calc = (node: TreeNode<T> | null): number =>
      node ? 1 + Math.max(calc(node.left), calc(node.right)) : -1;
    return calc(this.root);
  }

  /** Private helpers ----------------------------------------------------- */

  private _insert(node: TreeNode<T> | null, value: T): TreeNode<T> {
    if (!node) return new TreeNode(value);

    if (this.comparator(value, node.value) < 0) {
      node.left = this._insert(node.left, value);
    } else if (this.comparator(value, node.value) > 0) {
      node.right = this._insert(node.right, value);
    } // else value already exists – ignore duplicates

    return node;
  }

  private _find(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    if (!node) return null;

    const cmp = this.comparator(value, node.value);
    if (cmp === 0) return node;
    return cmp < 0
      ? this._find(node.left, value)
      : this._find(node.right, value);
  }

  private _delete(
    node: TreeNode<T> | null,
    value: T
  ): TreeNode<T> | null {
    if (!node) return null;

    const cmp = this.comparator(value, node.value);
    if (cmp < 0) {
      node.left = this._delete(node.left, value);
    } else if (cmp > 0) {
      node.right = this._delete(node.right, value);
    } else {
      // Node to delete found
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // Two children – swap with in‑order successor (smallest on right)
      const succ = this._min(node.right)!;
      node.value = succ.value;
      node.right = this._delete(node.right, succ.value);
    }
    return node;
  }

  private _min(node: TreeNode<T>): TreeNode<T> | null {
    return node.left ? this._min(node.left) : node;
  }

  private _traverse(node: TreeNode<T> | null, cb: (val: T) => void) {
    if (!node) return;
    this._traverse(node.left, cb);
    cb(node.value);
    this._traverse(node.right, cb);
  }

  private _pre(node: TreeNode<T> | null, cb: (val: T) => void) {
    if (!node) return;
    cb(node.value);
    this._pre(node.left, cb);
    this._pre(node.right, cb);
  }

  private _post(node: TreeNode<T> | null, cb: (val: T) => void) {
    if (!node) return;
    this._post(node.left, cb);
    this._post(node.right, cb);
    cb(node.value);
  }
}
const tree = new BinarySearchTree<number>();

[50, 30, 70, 20, 40, 60, 80].forEach(tree.insert);

console.log('Found 40?', tree.find(40));      // true
console.log('Found 100?', tree.find(100));    // false

console.log('In‑order:');
tree.inOrder(v => process.stdout.write(v + ' '));
// → 20 30 40 50 60 70 80

tree.delete(70);

console.log('\nAfter deleting 70, in‑order:');
tree.inOrder(v => process.stdout.write(v + ' '));
// → 20 30 40 50 60 80
type Person = { id: number; name: string };

const personComp: Comparator<Person> = (a, b) => a.id - b.id;
const personTree = new BinarySearchTree<Person>(personComp);

personTree.insert({ id: 5, name: 'Alice' });
personTree.insert({ id: 3, name: 'Bob' });
