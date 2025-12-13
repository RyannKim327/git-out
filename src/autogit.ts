enum Color {
  RED,
  BLACK,
}
class RBNode<K, V> {
  key: K;
  value: V;
  color: Color;
  left: RBNode<K, V> | null = null;
  right: RBNode<K, V> | null = null;
  parent: RBNode<K, V> | null = null;

  constructor(key: K, value: V, color: Color = Color.RED) {
    this.key = key;
    this.value = value;
    this.color = color;
  }

  // Helper: is this node red?
  get isRed(): boolean {
    return this.color === Color.RED;
  }

  // Helper: sibling of this node (null if none)
  get sibling(): RBNode<K, V> | null {
    if (!this.parent) return null;
    return this === this.parent.left ? this.parent.right : this.parent.left;
  }
}
private rotateLeft(x: RBNode<K, V>): void {
  const y = x.right!;
  x.right = y.left;
  if (y.left) y.left.parent = x;

  y.parent = x.parent;
  if (!x.parent) this.root = y;
  else if (x === x.parent.left) x.parent.left = y;
  else x.parent.right = y;

  y.left = x;
  x.parent = y;
}

private rotateRight(y: RBNode<K, V>): void {
  const x = y.left!;
  y.left = x.right;
  if (x.right) x.right.parent = y;

  x.parent = y.parent;
  if (!y.parent) this.root = x;
  else if (y === y.parent.left) y.parent.left = x;
  else y.parent.right = x;

  x.right = y;
  y.parent = x;
}
private flipColors(node: RBNode<K, V>): void {
  node.color = node.color === Color.RED ? Color.BLACK : Color.RED;
  if (node.left) node.left.color = node.left.color === Color.RED ? Color.BLACK : Color.RED;
  if (node.right) node.right.color = node.right.color === Color.RED ? Color.BLACK : Color.RED;
}
private insertFix(node: RBNode<K, V>): void {
  while (node.parent && node.parent.isRed) {
    const parent = node.parent;
    const grand = parent.parent!; // parent is red ⇒ grand exists

    if (parent === grand.left) {
      const uncle = grand.right;
      // Case 3: Uncle is red → recolor
      if (uncle && uncle.isRed) {
        parent.color = Color.BLACK;
        uncle.color = Color.BLACK;
        grand.color = Color.RED;
        node = grand; // continue fixing up the tree
      } else {
        // Case 2: node is right child → rotate left
        if (node === parent.right) {
          this.rotateLeft(parent);
          node = parent; // after rotation, node becomes left child
        }
        // Case 1: node is left child → rotate right
        this.rotateRight(grand);
        parent.color = Color.BLACK;
        grand.color = Color.RED;
        break; // tree is fixed
      }
    } else {
      // Mirror of the above (parent is right child)
      const uncle = grand.left;
      if (uncle && uncle.isRed) {
        parent.color = Color.BLACK;
        uncle.color = Color.BLACK;
        grand.color = Color.RED;
        node = grand;
      } else {
        if (node === parent.left) {
          this.rotateRight(parent);
          node = parent;
        }
        this.rotateLeft(grand);
        parent.color = Color.BLACK;
        grand.color = Color.RED;
        break;
      }
    }
  }
  this.root!.color = Color.BLACK; // property 2
}
insert(key: K, value: V): void {
  if (!this.root) {
    this.root = new RBNode(key, value, Color.BLACK);
    this._size = 1;
    return;
  }

  // 1️⃣ BST insertion
  let cur = this.root;
  let parent: RBNode<K, V> | null = null;
  let cmp = 0;
  while (cur) {
    parent = cur;
    cmp = this.compare(key, cur.key);
    if (cmp === 0) {
      // Key already exists → replace value and stop
      cur.value = value;
      return;
    }
    cur = cmp < 0 ? cur.left : cur.right;
  }

  const newNode = new RBNode(key, value, Color.RED);
  newNode.parent = parent;
  if (cmp < 0) parent!.left = newNode;
  else parent!.right = newNode;
  this._size++;

  // 2️⃣ Fix violations
  this.insertFix(newNode);
}
private moveRedLeft(h: RBNode<K, V>): RBNode<K, V> {
  this.flipColors(h);
  if (h.right && h.right.left && h.right.left.isRed) {
    this.rotateRight(h.right);
    this.rotateLeft(h);
    this.flipColors(h);
  }
  return h;
}

private moveRedRight(h: RBNode<K, V>): RBNode<K, V> {
  this.flipColors(h);
  if (h.left && h.left.left && h.left.left.isRed) {
    this.rotateRight(h);
    this.flipColors(h);
  }
  return h;
}
private deleteMin(node: RBNode<K, V> | null): RBNode<K, V> | null {
  if (!node) return null;
  if (!node.left) {
    // leaf → remove it
    this._size--;
    return null;
  }

  if (!node.left.isRed && !(node.left.left?.isRed ?? false)) {
    node = this.moveRedLeft(node);
  }

  node.left = this.deleteMin(node.left);
  return this.fixUp(node);
}
private fixUp(h: RBNode<K, V>): RBNode<K, V> {
  // 1. Rotate left if right child is red
  if (h.right?.isRed) this.rotateLeft(h);
  // 2. Rotate right if left child and its left child are red
  if (h.left?.isRed && h.left.left?.isRed) this.rotateRight(h);
  // 3. Split 4‑node
  if (h.left?.isRed && h.right?.isRed) this.flipColors(h);
  return h;
}
delete(key: K): void {
  if (!this.root) return; // empty tree

  // Ensure the root is not a 2‑node (both children black)
  if (!this.root.left?.isRed && !this.root.right?.isRed) {
    this.root.color = Color.RED;
  }

  this.root = this._delete(this.root, key);
  if (this.root) this.root.color = Color.BLACK;
}

// Recursive helper
private _delete(node: RBNode<K, V> | null, key: K): RBNode<K, V> | null {
  if (!node) return null;

  if (this.compare(key, node.key) < 0) {
    // Key is in left subtree
    if (node.left) {
      if (!node.left.isRed && !(node.left.left?.isRed ?? false)) {
        node = this.moveRedLeft(node);
      }
      node.left = this._delete(node.left, key);
    }
  } else {
    // Key is >= node.key
    if (node.left?.isRed) {
      this.rotateRight(node);
    }

    if (this.compare(key, node.key) === 0 && !node.right) {
      // Found leaf node → delete it
      this._size--;
      return null;
    }

    if (node.right) {
      if (!node.right.isRed && !(node.right.left?.isRed ?? false)) {
        node = this.moveRedRight(node);
      }

      if (this.compare(key, node.key) === 0) {
        // Replace node with its successor (min of right subtree)
        const minNode = this.min(node.right)!;
        node.key = minNode.key;
        node.value = minNode.value;
        node.right = this.deleteMin(node.right);
      } else {
        node.right = this._delete(node.right, key);
      }
    }
  }

  return this.fixUp(node);
}
private min(node: RBNode<K, V>): RBNode<K, V> | null {
  let cur = node;
  while (cur.left) cur = cur.left;
  return cur;
}
/** Returns the value associated with `key` or `undefined` if not present */
find(key: K): V | undefined {
  let cur = this.root;
  while (cur) {
    const cmp = this.compare(key, cur.key);
    if (cmp === 0) return cur.value;
    cur = cmp < 0 ? cur.left : cur.right;
  }
  return undefined;
}

/** In‑order traversal – useful for debugging or building a sorted array */
inOrder(callback: (key: K, value: V) => void): void {
  const walk = (node: RBNode<K, V> | null): void => {
    if (!node) return;
    walk(node.left);
    callback(node.key, node.value);
    walk(node.right);
  };
  walk(this.root);
}

/** Iterable – enables `for (const [k, v] of tree) { … }` */
* [Symbol.iterator](): IterableIterator<[K, V]> {
  const stack: RBNode<K, V>[] = [];
  let cur = this.root;
  while (stack.length || cur) {
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    const node = stack.pop()!;
    yield [node.key, node.value];
    cur = node.right;
  }
}
private _size = 0;
get size(): number { return this._size; }

height(node: RBNode<K, V> | null = this.root): number {
  if (!node) return -1; // empty tree has height -1 (convention)
  return 1 + Math.max(this.height(node.left), this.height(node.right));
}
/* --------------------------------------------------------------
 * Red‑Black Tree (Left‑leaning) – TypeScript 5.x
 * ------------------------------------------------------------*/

enum Color {
  RED,
  BLACK,
}

/** Node of the tree */
class RBNode<K, V> {
  key: K;
  value: V;
  color: Color;
  left: RBNode<K, V> | null = null;
  right: RBNode<K, V> | null = null;
  parent: RBNode<K, V> | null = null;

  constructor(key: K, value: V, color: Color = Color.RED) {
    this.key = key;
    this.value = value;
    this.color = color;
  }

  get isRed(): boolean {
    return this.color === Color.RED;
  }

  get sibling(): RBNode<K, V> | null {
    if (!this.parent) return null;
    return this === this.parent.left ? this.parent.right : this.parent.left;
  }
}

/** Public Red‑Black Tree class */
export class RedBlackTree<K, V> {
  private root: RBNode<K, V> | null = null;
  private _size = 0;
  private readonly compare: (a: K, b: K) => number;

  /**
   * @param compare - function returning <0 if a<b, 0 if equal, >0 if a>b
   */
  constructor(compare: (a: K, b: K) => number) {
    this.compare = compare;
  }

  /* ---------- PUBLIC API ---------- */

  /** Insert or replace a key/value pair */
  insert(key: K, value: V): void {
    if (!this.root) {
      this.root = new RBNode(key, value, Color.BLACK);
      this._size = 1;
      return;
    }

    // BST insertion
    let cur = this.root;
    let parent: RBNode<K, V> | null = null;
    let cmp = 0;
    while (cur) {
      parent = cur;
      cmp = this.compare(key, cur.key);
      if (cmp === 0) {
        cur.value = value; // replace
        return;
      }
      cur = cmp < 0 ? cur.left : cur.right;
    }

    const node = new RBNode(key, value, Color.RED);
    node.parent = parent;
    if (cmp < 0) parent!.left = node;
    else parent!.right = node;
    this._size++;

    this.insertFix(node);
  }

  /** Delete a key (no‑op if key not present) */
  delete(key: K): void {
    if (!this.root) return;

    // Ensure root is not a 2‑node
    if (!this.root.left?.isRed && !this.root.right?.isRed) {
      this.root.color = Color.RED;
    }

    this.root = this._delete(this.root, key);
    if (this.root) this.root.color = Color.BLACK;
  }

  /** Find a value by key */
  find(key: K): V | undefined {
    let cur = this.root;
    while (cur) {
      const cmp = this.compare(key, cur.key);
      if (cmp === 0) return cur.value;
      cur = cmp < 0 ? cur.left : cur.right;
    }
    return undefined;
  }

  /** Number of stored entries */
  get size(): number {
    return this._size;
  }

  /** Height of the tree (log₂ n in the average case) */
  height(node: RBNode<K, V> | null = this.root): number {
    if (!node) return -1;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  /** In‑order traversal */
  inOrder(callback: (key: K, value: V) => void): void {
    const walk = (node: RBNode<K, V> | null): void => {
      if (!node) return;
      walk(node.left);
      callback(node.key, node.value);
      walk(node.right);
    };
    walk(this.root);
  }

  /** Iterable – yields `[key, value]` pairs in sorted order */
  *[Symbol.iterator](): IterableIterator<[K, V]> {
    const stack: RBNode<K, V>[] = [];
    let cur = this
