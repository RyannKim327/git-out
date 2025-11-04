// -------------  BST.ts  -------------

export class TreeNode<T> {
  constructor(
    public key: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null
  ) {}
}

export class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;

  constructor(private compare: (a: T, b: T) => number) {}

  /* ---------- Public API ---------- */

  insert(key: T): void {
    this.root = this._insert(this.root, key);
  }

  remove(key: T): void {
    this.root = this._delete(this.root, key);
  }

  search(key: T): boolean {
    return this._search(this.root, key) !== null;
  }

  min(): T | undefined {
    const node = this._minNode(this.root);
    return node ? node.key : undefined;
  }

  max(): T | undefined {
    const node = this._maxNode(this.root);
    return node ? node.key : undefined;
  }

  /* In-order traversal (ascending order) */
  *inOrder(): Generator<T, void, unknown> {
    yield* this._inOrder(this.root);
  }

  /* Pre-order traversal (root, left, right) */
  *preOrder(): Generator<T, void, unknown> {
    yield* this._preOrder(this.root);
  }

  /* Post-order traversal (left, right, root) */
  *postOrder(): Generator<T, void, unknown> {
    yield* this._postOrder(this.root);
  }

  /* Returns the smallest key > key (or undefined) */
  successor(key: T): T | undefined {
    const node = this._search(this.root, key);
    if (!node) return undefined;
    const succ = this._successor(node);
    return succ ? succ.key : undefined;
  }

  /* Returns the largest key < key (or undefined) */
  predecessor(key: T): T | undefined {
    const node = this._search(this.root, key);
    if (!node) return undefined;
    const pred = this._predecessor(node);
    return pred ? pred.key : undefined;
  }

  /* ---------- Private helpers ---------- */

  private _insert(node: TreeNode<T> | null, key: T): TreeNode<T> {
    if (!node) return new TreeNode(key);
    const cmp = this.compare(key, node.key);
    if (cmp < 0) node.left = this._insert(node.left, key);
    else if (cmp > 0) node.right = this._insert(node.right, key);
    /* duplicate keys are ignored; change policy here if desired */
    return node;
  }

  private _delete(node: TreeNode<T> | null, key: T): TreeNode<T> | null {
    if (!node) return null;
    const cmp = this.compare(key, node.key);
    if (cmp < 0) node.left = this._delete(node.left, key);
    else if (cmp > 0) node.right = this._delete(node.right, key);
    else {
      /* Node with only one child or no child */
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      /* Node with two children: get the in-order successor */
      const minRight = this._minNode(node.right)!;
      node.key = minRight.key;
      node.right = this._delete(node.right, minRight.key);
    }
    return node;
  }

  private _search(node: TreeNode<T> | null, key: T): TreeNode<T> | null {
    if (!node) return null;
    const cmp = this.compare(key, node.key);
    if (cmp === 0) return node;
    return cmp < 0
      ? this._search(node.left, key)
      : this._search(node.right, key);
  }

  private _minNode(node: TreeNode<T> | null): TreeNode<T> | null {
    while (node?.left) node = node.left;
    return node;
  }

  private _maxNode(node: TreeNode<T> | null): TreeNode<T> | null {
    while (node?.right) node = node.right;
    return node;
  }

  private _successor(node: TreeNode<T>): TreeNode<T> | null {
    if (node.right) return this._minNode(node.right);
    let succ: TreeNode<T> | null = null;
    let curr: TreeNode<T> | null = this.root;
    while (curr) {
      const cmp = this.compare(node.key, curr.key);
      if (cmp < 0) {
        succ = curr;
        curr = curr.left;
      } else if (cmp > 0) {
        curr = curr.right;
      } else {
        break;
      }
    }
    return succ;
  }

  private _predecessor(node: TreeNode<T>): TreeNode<T> | null {
    if (node.left) return this._maxNode(node.left);
    let pred: TreeNode<T> | null = null;
    let curr: TreeNode<T> | null = this.root;
    while (curr) {
      const cmp = this.compare(node.key, curr.key);
      if (cmp > 0) {
        pred = curr;
        curr = curr.right;
      } else if (cmp < 0) {
        curr = curr.left;
      } else {
        break;
      }
    }
    return pred;
  }

  private *_inOrder(node: TreeNode<T> | null): Generator<T, void, unknown> {
    if (node) {
      yield* this._inOrder(node.left);
      yield node.key;
      yield* this._inOrder(node.right);
    }
  }

  private *_preOrder(node: TreeNode<T> | null): Generator<T, void, unknown> {
    if (node) {
      yield node.key;
      yield* this._preOrder(node.left);
      yield* this._preOrder(node.right);
    }
  }

  private *_postOrder(node: TreeNode<T> | null): Generator<T, void, unknown> {
    if (node) {
      yield* this._postOrder(node.left);
      yield* this._postOrder(node.right);
      yield node.key;
    }
  }
}

/* ------------- Usage example ------------- */

const bst = new BinarySearchTree<number>((a, b) => a - b);
[50, 30, 70, 20, 40, 60, 80].forEach((n) => bst.insert(n));

console.log([...bst.inOrder()]); // [20, 30, 40, 50, 60, 70, 80]
console.log(bst.search(60));     // true
bst.remove(50);
console.log([...bst.inOrder()]); // [20, 30, 40, 60, 70, 80]
console.log(bst.successor(40));  // 60
console.log(bst.predecessor(40));// 30
npx ts-node BST.ts
