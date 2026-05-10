/* ──────────────────────────────────────────────────────────────────────
   AVL tree for any type T that can be compared via a comparator
   ────────────────────────────────────────────────────────────────────── */

interface Node<T> {
  value: T;
  left?: Node<T>;
  right?: Node<T>;
  height: number;           // height of the subtree rooted at this node
}

type Comparator<T> = (a: T, b: T) => number;

/* ──────────────────────────────────────────────────────────────────────
   Binary‑search‑tree helper: node height, balance factor, update
   ────────────────────────────────────────────────────────────────────── */

function nodeHeight<T>(n: Node<T> | undefined): number {
  return n ? n.height : 0;
}

function balanceFactor<T>(n: Node<T> | undefined): number {
  return n ? nodeHeight(n.left) - nodeHeight(n.right) : 0;
}

function updateHeight<T>(n: Node<T>): void {
  n.height = 1 + Math.max(nodeHeight(n.left), nodeHeight(n.right));
}

/* ──────────────────────────────────────────────────────────────────────
   Rotations
   ────────────────────────────────────────────────────────────────────── */

function rotateRight<T>(y: Node<T>): Node<T> {
  const x = y.left!;
  const T2 = x.right;

  // Rotation
  x.right = y;
  y.left = T2;

  // Update heights
  updateHeight(y);
  updateHeight(x);
  return x;                  // new root
}

function rotateLeft<T>(x: Node<T>): Node<T> {
  const y = x.right!;
  const T2 = y.left;

  // Rotation
  y.left = x;
  x.right = T2;

  // Update heights
  updateHeight(x);
  updateHeight(y);
  return y;                  // new root
}

/* ──────────────────────────────────────────────────────────────────────
   Rebalance a node
   ────────────────────────────────────────────────────────────────────── */

function rebalance<T>(node: Node<T>): Node<T> {
  updateHeight(node);
  const bf = balanceFactor(node);

  // Left heavy
  if (bf > 1) {
    if (balanceFactor(node.left) < 0) {
      node.left = rotateLeft(node.left!);
    }
    return rotateRight(node);
  }

  // Right heavy
  if (bf < -1) {
    if (balanceFactor(node.right) > 0) {
      node.right = rotateRight(node.right!);
    }
    return rotateLeft(node);
  }

  return node;   // already balanced
}

/* ──────────────────────────────────────────────────────────────────────
   AVL tree class
   ────────────────────────────────────────────────────────────────────── */

export class AVLTree<T> {
  private root?: Node<T>;
  private readonly compare: Comparator<T>;

  constructor(compareFn: Comparator<T>) {
    this.compare = compareFn;
  }

  /* ── PUBLIC API ───────────────────────────────────────────────────── */

  insert(value: T): void {
    this.root = this._insert(this.root, value);
  }

  delete(value: T): void {
    this.root = this._delete(this.root, value);
  }

  find(value: T): Node<T> | undefined {
    return this._find(this.root, value);
  }

  /** In‑order traversal – handy for visualising the tree */
  inOrder(): T[] {
    const res: T[] = [];
    this._inOrder(this.root, res);
    return res;
  }

  /** Return raw root – useful for debugging */
  getRoot(): Node<T> | undefined {
    return this.root;
  }

  /* ── INTERNAL IMPLEMENTATION ─────────────────────────────────────── */

  private _insert(node: Node<T> | undefined, value: T): Node<T> {
    if (!node) return { value, height: 1 };           // new leaf

    const cmp = this.compare(value, node.value);
    if (cmp < 0) node.left  = this._insert(node.left,  value);
    else if (cmp > 0) node.right = this._insert(node.right, value);
    else return node;                                 // ignore duplicates

    return rebalance(node);
  }

  private _find(node: Node<T> | undefined, value: T): Node<T> | undefined {
    if (!node) return undefined;
    const cmp = this.compare(value, node.value);
    if (cmp === 0) return node;
    return cmp < 0 ? this._find(node.left,  value) : this._find(node.right, value);
  }

  private _inOrder(node: Node<T> | undefined, out: T[]): void {
    if (!node) return;
    this._inOrder(node.left, out);
    out.push(node.value);
    this._inOrder(node.right, out);
  }

  /** Delete and rebalance */
  private _delete(node: Node<T> | undefined, value: T): Node<T> | undefined {
    if (!node) return undefined;

    const cmp = this.compare(value, node.value);
    if (cmp < 0) {
      node.left = this._delete(node.left, value);
    } else if (cmp > 0) {
      node.right = this._delete(node.right, value);
    } else {
      // node to delete found
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // Two children: use in‑order predecessor (max of left subtree)
      const maxLeft = this._max
