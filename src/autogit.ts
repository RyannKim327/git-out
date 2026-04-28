type Comparator<T> = (a: T, b: T) => number;

interface BSTNode<T> {
  value: T;
  left: BSTNode<T> | null;
  right: BSTNode<T> | null;
}
class BinarySearchTree<T> {
  private root: BSTNode<T> | null = null;
  private readonly compare: Comparator<T>;

  constructor(compareFn: Comparator<T>) {
    this.compare = compareFn;
  }

  /* ---------- Public API ---------- */

  insert(value: T): void {
    this.root = this._insert(this.root, value);
  }

  find(value: T): T | null {
    const node = this._find(this.root, value);
    return node ? node.value : null;
  }

  delete(value: T): void {
    this.root = this._delete(this.root, value);
  }

  // In‑order walk: returns the keys sorted ascending
  inorder(): T[] {
    const out: T[] = [];
    this._inorder(this.root, out);
    return out;
  }

  // Optional helpers
  preorder(): T[] { /* … */ }
  postorder(): T[] { /* … */ }
}
private _insert(node: BSTNode<T> | null, value: T): BSTNode<T> {
  if (!node) return { value, left: null, right: null };

  const cmp = this.compare(value, node.value);
  if (cmp < 0) {
    node.left = this._insert(node.left, value);
  } else if (cmp > 0) {
    node.right = this._insert(node.right, value);
  } // duplicate values are ignored

  return node;
}

private _find(node: BSTNode<T> | null, value: T): BSTNode<T> | null {
  if (!node) return null;

  const cmp = this.compare(value, node.value);
  if (cmp === 0) return node;
  return cmp < 0 ? this._find(node.left, value) : this._find(node.right, value);
}
private _delete(node: BSTNode<T> | null, value: T): BSTNode<T> | null {
  if (!node) return null;

  const cmp = this.compare(value, node.value);
  if (cmp < 0) {
    node.left = this._delete(node.left, value);
  } else if (cmp > 0) {
    node.right = this._delete(node.right, value);
  } else {
    // node to delete found
    if (!node.left) return node.right;          // only right child or none
    if (!node.right) return node.left;          // only left child

    // two children: find the in‑order successor (smallest on right)
    const succ = this._minNode(node.right)!;
    node.value = succ.value;                   // replace value
    node.right = this._delete(node.right, succ.value); // delete successor
  }
  return node;
}

private _minNode(node: BSTNode<T>): BSTNode<T> | null {
  while (node.left) node = node.left;
  return node;
}
private _inorder(node: BSTNode<T> | null, out: T[]): void {
  if (!node) return;
  this._inorder(node.left, out);
  out.push(node.value);
  this._inorder(node.right, out);
}

// You can add preorder/postorder in the same style if you need them.
const compareNumbers = (a: number, b: number) => a - b;

const bst = new BinarySearchTree<number>(compareNumbers);

bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);

console.log("inorder:", bst.inorder());   // [3,5,7,10,15]
console.log("find 7:", bst.find(7));      // 7
console.log("find 99:", bst.find(99));    // null

bst.delete(5);
console.log("after delete 5:", bst.inorder()); // [3,7,10,15]
*inorderIter(): Generator<T> {
  const stack: BSTNode<T>[] = [];
  let current = this.root;

  while (stack.length || current) {
    while (current) {
      stack.push(current);
      current = current.left!;
    }

    current = stack.pop()!;
    yield current.value;
    current = current.right!;
  }
}
for (const val of bst.inorderIter()) {
  console.log(val);
}
