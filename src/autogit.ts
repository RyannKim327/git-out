/* ---------- BST Node ---------- */
class TreeNode<T> {
  constructor(
    public key: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null
  ) {}
}

/* ---------- Binary Search Tree ---------- */
class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;

  constructor(private compareFn?: (a: T, b: T) => number) {
    // Default comparator works for numbers, strings, Dates, etc.
    if (!compareFn) {
      this.compareFn = (a: T, b: T) => (a as any) - (b as any);
    }
  }

  /* --------- Public API --------- */
  insert(key: T): void {
    this.root = this._insert(this.root, key);
  }

  remove(key: T): void {
    this.root = this._remove(this.root, key);
  }

  search(key: T): boolean {
    return this._search(this.root, key);
  }

  /* Returns keys in ascending order */
  inOrder(): T[] {
    const res: T[] = [];
    this._inOrder(this.root, res);
    return res;
  }

  min(): T | undefined {
    const node = this._minNode(this.root);
    return node ? node.key : undefined;
  }

  max(): T | undefined {
    const node = this._maxNode(this.root);
    return node ? node.key : undefined;
  }

  isEmpty(): boolean {
    return this.root === null;
  }

  /* --------- Private helpers --------- */
  private _insert(node: TreeNode<T> | null, key: T): TreeNode<T> {
    if (!node) return new TreeNode(key);

    const cmp = this.compareFn!(key, node.key);
    if (cmp < 0) node.left = this._insert(node.left, key);
    else if (cmp > 0) node.right = this._insert(node.right, key);
    // duplicate keys are ignored (could also count them)
    return node;
  }

  private _remove(node: TreeNode<T> | null, key: T): TreeNode<T> | null {
    if (!node) return null;

    const cmp = this.compareFn!(key, node.key);
    if (cmp < 0) node.left = this._remove(node.left, key);
    else if (cmp > 0) node.right = this._remove(node.right, key);
    else {
      // Node with only one child or no child
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // Node with two children: get in-order successor (smallest in right subtree)
      const minRight = this._minNode(node.right)!;
      node.key = minRight.key;
      node.right = this._remove(node.right, minRight.key);
    }
    return node;
  }

  private _search(node: TreeNode<T> | null, key: T): boolean {
    if (!node) return false;
    const cmp = this.compareFn!(key, node.key);
    if (cmp === 0) return true;
    return cmp < 0
      ? this._search(node.left, key)
      : this._search(node.right, key);
  }

  private _inOrder(node: TreeNode<T> | null, out: T[]): void {
    if (!node) return;
    this._inOrder(node.left, out);
    out.push(node.key);
    this._inOrder(node.right, out);
  }

  private _minNode(node: TreeNode<T> | null): TreeNode<T> | null {
    while (node && node.left) node = node.left;
    return node;
  }

  private _maxNode(node: TreeNode<T> | null): TreeNode<T> | null {
    while (node && node.right) node = node.right;
    return node;
  }
}

/* ---------- Usage ---------- */
const bst = new BinarySearchTree<number>();
[50, 30, 70, 20, 40, 60, 80].forEach(n => bst.insert(n));
console.log('In-order:', bst.inOrder()); // [20,30,40,50,60,70,80]
console.log('Has 60?', bst.search(60));   // true
bst.remove(50);
console.log('After deleting 50:', bst.inOrder()); // [20,30,40,60,70,80]

/* Custom comparator example */
interface Person { id: number; name: string }
const peopleTree = new BinarySearchTree<Person>(
  (a, b) => a.id - b.id
);
peopleTree.insert({ id: 3, name: 'Carol' });
peopleTree.insert({ id: 1, name: 'Alice' });
console.log(peopleTree.inOrder().map(p => p.name)); // ["Alice","Carol"]
