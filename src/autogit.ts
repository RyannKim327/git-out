/* ---------- BST Node ---------- */
class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

/* ---------- Comparator ---------- */
type CompareFn<T> = (a: T, b: T) => number;   // <0 → a<b, 0 → equal, >0 → a>b

/* ---------- Binary Search Tree ---------- */
class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;
  private compare: CompareFn<T>;

  constructor(compareFn?: CompareFn<T>) {
    this.compare = compareFn || this.defaultCompare;
  }

  /* ---- Public API ---- */
  insert(value: T): this {
    this.root = this._insert(this.root, value);
    return this;
  }

  delete(value: T): boolean {
    const { node, found } = this._delete(this.root, value);
    if (found) this.root = node;
    return found;
  }

  search(value: T): boolean {
    return this._search(this.root, value);
  }

  inOrder(): T[] {
    const out: T[] = [];
    this._inOrder(this.root, out);
    return out;
  }

  size(): number {
    return this._size(this.root);
  }

  isEmpty(): boolean {
    return this.root === null;
  }

  /* ---- Private helpers ---- */
  private defaultCompare(a: T, b: T): number {
    return a < b ? -1 : a > b ? 1 : 0;
  }

  private _insert(node: TreeNode<T> | null, value: T): TreeNode<T> {
    if (!node) return new TreeNode(value);
    const cmp = this.compare(value, node.value);
    if (cmp < 0) node.left = this._insert(node.left, value);
    else if (cmp > 0) node.right = this._insert(node.right, value);
    /* duplicate → ignore or update policy here */
    return node;
  }

  private _search(node: TreeNode<T> | null, value: T): boolean {
    if (!node) return false;
    const cmp = this.compare(value, node.value);
    return cmp === 0
      ? true
      : cmp < 0
      ? this._search(node.left, value)
      : this._search(node.right, value);
  }

  private _delete(
    node: TreeNode<T> | null,
    value: T
  ): { node: TreeNode<T> | null; found: boolean } {
    if (!node) return { node: null, found: false };

    const cmp = this.compare(value, node.value);
    if (cmp < 0) {
      const { node: newLeft, found } = this._delete(node.left, value);
      node.left = newLeft;
      return { node, found };
    }
    if (cmp > 0) {
      const { node: newRight, found } = this._delete(node.right, value);
      node.right = newRight;
      return { node, found };
    }

    /* Found node to delete */
    if (!node.left) return { node: node.right, found: true };
    if (!node.right) return { node: node.left, found: true };

    /* Two children: replace with in-order successor (min of right subtree) */
    const minNode = this._minNode(node.right)!;
    node.value = minNode.value;
    const { node: newRight } = this._delete(node.right, minNode.value);
    node.right = newRight;
    return { node, found: true };
  }

  private _minNode(node: TreeNode<T>): TreeNode<T> | null {
    while (node.left) node = node.left;
    return node;
  }

  private _inOrder(node: TreeNode<T> | null, out: T[]): void {
    if (!node) return;
    this._inOrder(node.left, out);
    out.push(node.value);
    this._inOrder(node.right, out);
  }

  private _size(node: TreeNode<T> | null): number {
    return node ? 1 + this._size(node.left) + this._size(node.right) : 0;
  }
}

/* ---------- Usage ---------- */
const bst = new BinarySearchTree<number>();
bst.insert(50).insert(30).insert(70).insert(20).insert(40);
console.log("In-order:", bst.inOrder()); // [20, 30, 40, 50, 70]
console.log("Contains 40?", bst.search(40)); // true
bst.delete(30);
console.log("After delete 30:", bst.inOrder()); // [20, 40, 50, 70]

/* Custom comparator example */
interface Person { name: string; age: number }
const peopleTree = new BinarySearchTree<Person>(
  (a, b) => a.age - b.age
);
peopleTree.insert({ name: "Alice", age: 25 });
peopleTree.insert({ name: "Bob", age: 30 });
console.log(peopleTree.inOrder());
