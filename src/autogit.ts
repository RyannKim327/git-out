/**
 * AVL Tree implementation in TypeScript.
 *
 * Features:
 *  - Generic key/value (K must be comparable via a supplied comparator)
 *  - Insert, delete, search, in‑order traversal
 *  - Automatic rebalancing with LL, RR, LR, RL rotations
 *  - O(log n) operations
 *
 *  Author: ChatGPT (2026)
 */

type Comparator<T> = (a: T, b: T) => number;

/**
 * Internal node class – not exported because users only interact with AVLTree.
 */
class AVLNode<K, V> {
  key: K;
  value: V;
  left: AVLNode<K, V> | null = null;
  right: AVLNode<K, V> | null = null;
  height: number = 1; // Height of a leaf node is 1

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}

/**
 * Public AVL Tree class.
 */
export class AVLTree<K, V> {
  private root: AVLNode<K, V> | null = null;
  private compare: Comparator<K>;

  /**
   * @param compareFn – function that returns <0 if a<b, 0 if a==b, >0 if a>b.
   *                    If omitted, a default numeric/string comparator is used.
   */
  constructor(compareFn?: Comparator<K>) {
    this.compare = compareFn ?? ((a: any, b: any) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  }

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------

  /** Insert a (key, value) pair. If the key already exists, its value is replaced. */
  insert(key: K, value: V): void {
    this.root = this._insert(this.root, key, value);
  }

  /** Delete a node by key. Returns true if a node was removed. */
  delete(key: K): boolean {
    const [newRoot, deleted] = this._delete(this.root, key);
    this.root = newRoot;
    return deleted;
  }

  /** Find the value associated with a key. Returns undefined if not found. */
  find(key: K): V | undefined {
    let cur = this.root;
    while (cur) {
      const cmp = this.compare(key, cur.key);
      if (cmp === 0) return cur.value;
      cur = cmp < 0 ? cur.left : cur.right;
    }
    return undefined;
  }

  /** Returns true if the tree contains the given key. */
  contains(key: K): boolean {
    return this.find(key) !== undefined;
  }

  /** In‑order traversal – returns an array of [key, value] pairs sorted by key. */
  inorder(): Array<[K, V]> {
    const result: Array<[K, V]> = [];
    this._inorder(this.root, result);
    return result;
  }

  /** Height of the whole tree (0 for empty tree). */
  height(): number {
    return this._height(this.root);
  }

  // -------------------------------------------------------------------------
  // Private helpers – recursion, rotations, bookkeeping
  // -------------------------------------------------------------------------

  private _height(node: AVLNode<K, V> | null): number {
    return node?.height ?? 0;
  }

  private _updateHeight(node: AVLNode<K, V>): void {
    node.height = Math.max(this._height(node.left), this._height(node.right)) + 1;
  }

  private _balanceFactor(node: AVLNode<K, V>): number {
    return this._height(node.left) - this._height(node.right);
  }

  // ---------- Rotations ----------
  private _rotateRight(y: AVLNode<K, V>): AVLNode<K, V> {
    const x = y.left!;
    const T2 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T2;

    // Update heights
    this._updateHeight(y);
    this._updateHeight(x);

    return x; // New root of this subtree
  }

  private _rotateLeft(x: AVLNode<K, V>): AVLNode<K, V> {
    const y = x.right!;
    const T2 = y.left;

    // Perform rotation
    y.left = x;
    x.right = T2;

    // Update heights
    this._updateHeight(x);
    this._updateHeight(y);

    return y; // New root of this subtree
  }

  // ---------- Rebalancing ----------
  private _rebalance(node: AVLNode<K, V>): AVLNode<K, V> {
    const bf = this._balanceFactor(node);

    // Left heavy
    if (bf > 1) {
      // Left‑Right case?
      if (this._balanceFactor(node.left!) < 0) {
        node.left = this._rotateLeft(node.left!);
      }
      // Left‑Left case
      return this._rotateRight(node);
    }

    // Right heavy
    if (bf < -1) {
      // Right‑Left case?
      if (this._balanceFactor(node.right!) > 0) {
        node.right = this._rotateRight(node.right!);
      }
      // Right‑Right case
      return this._rotateLeft(node);
    }

    // Already balanced
    return node;
  }

  // ---------- Insert ----------
  private _insert(
    node: AVLNode<K, V> | null,
    key: K,
    value: V
  ): AVLNode<K, V> {
    // Standard BST insertion
    if (!node) return new AVLNode(key, value);

    const cmp = this.compare(key, node.key);
    if (cmp < 0) {
      node.left = this._insert(node.left, key, value);
    } else if (cmp > 0) {
      node.right = this._insert(node.right, key, value);
    } else {
      // Key already exists → replace value
      node.value = value;
      return node;
    }

    // Update height & rebalance
    this._updateHeight(node);
    return this._rebalance(node);
  }

  // ---------- Delete ----------
  private _delete(
    node: AVLNode<K, V> | null,
    key: K
  ): [AVLNode<K, V> | null, boolean] {
    if (!node) return [null, false]; // Not found

    let deleted = false;
    const cmp = this.compare(key, node.key);

    if (cmp < 0) {
      const [newLeft, didDelete] = this._delete(node.left, key);
      node.left = newLeft;
      deleted = didDelete;
    } else if (cmp > 0) {
      const [newRight, didDelete] = this._delete(node.right, key);
      node.right = newRight;
      deleted = didDelete;
    } else {
      // Node to delete found
      deleted = true;

      // Node with only one child or no child
      if (!node.left) return [node.right, true];
      if (!node.right) return [node.left, true];

      // Node with two children: get inorder successor (smallest in right subtree)
      const successor = this._minValueNode(node.right);
      node.key = successor.key;
      node.value = successor.value;

      // Delete the inorder successor
      const [newRight, _] = this._delete(node.right, successor.key);
      node.right = newRight;
    }

    // If we removed a leaf, node may be null now
    if (!node) return [null, deleted];

    // Update height & rebalance
    this._updateHeight(node);
    const balancedNode = this._rebalance(node);
    return [balancedNode, deleted];
  }

  private _minValueNode(node: AVLNode<K, V>): AVLNode<K, V> {
    let cur = node;
    while (cur.left) cur = cur.left;
    return cur;
  }

  // ---------- Traversal ----------
  private _inorder(
    node: AVLNode<K, V> | null,
    out: Array<[K, V]>
  ): void {
    if (!node) return;
    this._inorder(node.left, out);
    out.push([node.key, node.value]);
    this._inorder(node.right, out);
  }

  // -------------------------------------------------------------------------
  // Optional: iterator support (for-of)
  // -------------------------------------------------------------------------
  *[Symbol.iterator](): IterableIterator<[K, V]> {
    const stack: AVLNode<K, V>[] = [];
    let cur = this.root;

    while (stack.length || cur) {
      while (cur) {
        stack.push(cur);
        cur = cur.left;
      }
      cur = stack.pop()!;
      yield [cur.key, cur.value];
      cur = cur.right;
    }
  }
}

/* -------------------------------------------------------------------------
   Example usage (run with `ts-node` or compile to JS)
   ------------------------------------------------------------------------- */
if (require.main === module) {
  const tree = new AVLTree<number, string>();

  // Insert a bunch of keys (deliberately out‑of‑order to trigger rotations)
  const data = [
    [30, "thirty"],
    [20, "twenty"],
    [40, "forty"],
    [10, "ten"],
    [25, "twenty‑five"],
    [35, "thirty‑five"],
    [50, "fifty"],
    [5, "five"],
    [15, "fifteen"],
  ];

  console.log("=== Inserting ===");
  for (const [k, v] of data) {
    console.log(`insert(${k}, "${v}")`);
    tree.insert(k, v);
  }

  console.log("\nTree height:", tree.height());
  console.log("In‑order traversal:", tree.inorder());

  console.log("\n=== Searching ===");
  console.log("find(25) →", tree.find(25));
  console.log("contains(99) →", tree.contains(99));

  console.log("\n=== Deleting ===");
  const toDelete = [20, 30, 5];
  for (const k of toDelete) {
    console.log(`delete(${k}) →`, tree.delete(k));
  }

  console.log("\nTree height after deletions:", tree.height());
  console.log("In‑order traversal after deletions:", tree.inorder());

  console.log("\n=== Iterating with for‑of ===");
  for (const [k, v] of tree) {
    console.log(k, "=>", v);
  }
}
class AVLNode<K, V> {
  key: K;
  value: V;
  left: AVLNode<K, V> | null = null;
  right: AVLNode<K, V> | null = null;
  height: number = 1;
}
private _height(node) => node?.height ?? 0;
private _balanceFactor(node) => this._height(node.left) - this._height(node.right);
# Assuming you have ts-node installed:
npm i -g ts-node typescript
ts-node avl-tree.ts
=== Inserting ===
insert(30, "thirty")
...
Tree height: 4
In-order traversal: [ [ 5, 'five' ], [10,'ten'], [15,'fifteen'], ... ]

=== Searching ===
find(25) → twenty-five
contains(99) → false

=== Deleting ===
delete(20) → true
delete(30) → true
delete(5) → true

Tree height after deletions: 3
In-order traversal after deletions: [ [10,'ten'], [15,'fifteen'], [25,'twenty-five'], ... ]

=== Iterating with for-of ===
10 => ten
15 => fifteen
...
