/**
 * AVL Tree implementation in TypeScript.
 *
 * The tree is generic over a key type K (must be comparable) and a value type V.
 * Comparison is performed via a user‑supplied comparator function.
 *
 * Features:
 *   - insert(key, value)
 *   - delete(key)
 *   - find(key) → V | undefined
 *   - contains(key) → boolean
 *   - inOrder(callback) – walk the tree in sorted order
 *   - rangeQuery(low, high, callback) – visit nodes whose keys lie in [low, high]
 *
 * Complexity:
 *   All mutating operations are O(log n) amortized thanks to the AVL balancing.
 */

type Comparator<K> = (a: K, b: K) => number;

/**
 * Node of the AVL tree.
 */
class AVLNode<K, V> {
  public left: AVLNode<K, V> | null = null;
  public right: AVLNode<K, V> | null = null;
  public height: number = 1; // leaf node height = 1

  constructor(public key: K, public value: V) {}
}

/**
 * AVL Tree class.
 */
export class AVLTree<K, V> {
  private root: AVLNode<K, V> | null = null;
  private readonly compare: Comparator<K>;

  /**
   * @param compareFn – a function that returns <0 if a<b, 0 if a===b, >0 if a>b.
   *                    If omitted, the default works for numbers and strings.
   */
  constructor(compareFn?: Comparator<K>) {
    if (compareFn) {
      this.compare = compareFn;
    } else {
      // default comparator works for number | string
      this.compare = ((a: any, b: any) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      }) as Comparator<K>;
    }
  }

  /* ------------------------------------------------------------------ *
   *  Public API
   * ------------------------------------------------------------------ */

  /** Insert a key/value pair. If the key already exists, its value is replaced. */
  public insert(key: K, value: V): void {
    this.root = this._insert(this.root, key, value);
  }

  /** Delete a key from the tree. Returns true if the key existed and was removed. */
  public delete(key: K): boolean {
    const originalSize = this.size();
    this.root = this._delete(this.root, key);
    return this.size() < originalSize;
  }

  /** Find the value associated with a key, or undefined if not present. */
  public find(key: K): V | undefined {
    let node = this.root;
    while (node) {
      const cmp = this.compare(key, node.key);
      if (cmp === 0) return node.value;
      node = cmp < 0 ? node.left : node.right;
    }
    return undefined;
  }

  /** Returns true if the key exists in the tree. */
  public contains(key: K): boolean {
    return this.find(key) !== undefined;
  }

  /** Number of nodes in the tree. O(n) if you call it often – you can cache it if needed. */
  public size(): number {
    return this._size(this.root);
  }

  /** In‑order traversal (sorted order). */
  public inOrder(callback: (key: K, value: V) => void): void {
    this._inOrder(this.root, callback);
  }

  /** Visit all nodes with keys in the inclusive range [low, high] (sorted). */
  public rangeQuery(
    low: K,
    high: K,
    callback: (key: K, value: V) => void
  ): void {
    this._rangeQuery(this.root, low, high, callback);
  }

  /** Returns the minimum key (or undefined if empty). */
  public min(): K | undefined {
    const node = this._minNode(this.root);
    return node?.key;
  }

  /** Returns the maximum key (or undefined if empty). */
  public max(): K | undefined {
    const node = this._maxNode(this.root);
    return node?.key;
  }

  /* ------------------------------------------------------------------ *
   *  Private helpers – recursion, rotations, height bookkeeping
   * ------------------------------------------------------------------ */

  private _size(node: AVLNode<K, V> | null): number {
    if (!node) return 0;
    return 1 + this._size(node.left) + this._size(node.right);
  }

  private _height(node: AVLNode<K, V> | null): number {
    return node?.height ?? 0;
  }

  private _updateHeight(node: AVLNode<K, V>): void {
    node.height = 1 + Math.max(this._height(node.left), this._height(node.right));
  }

  private _balanceFactor(node: AVLNode<K, V>): number {
    return this._height(node.left) - this._height(node.right);
  }

  /** Right rotation (LL case) */
  private _rotateRight(y: AVLNode<K, V>): AVLNode<K, V> {
    const x = y.left!;
    const T2 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T2;

    // Update heights
    this._updateHeight(y);
    this._updateHeight(x);

    return x; // new root of this subtree
  }

  /** Left rotation (RR case) */
  private _rotateLeft(x: AVLNode<K, V>): AVLNode<K, V> {
    const y = x.right!;
    const T2 = y.left;

    // Perform rotation
    y.left = x;
    x.right = T2;

    // Update heights
    this._updateHeight(x);
    this._updateHeight(y);

    return y; // new root of this subtree
  }

  /** Rebalance a node that may have become unbalanced after insertion/deletion */
  private _rebalance(node: AVLNode<K, V>): AVLNode<K, V> {
    const balance = this._balanceFactor(node);

    // Left heavy
    if (balance > 1) {
      // Left‑Right case?
      if (this._balanceFactor(node.left!) < 0) {
        node.left = this._rotateLeft(node.left!);
      }
      // Left‑Left case
      return this._rotateRight(node);
    }

    // Right heavy
    if (balance < -1) {
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

  /** Recursive insertion */
  private _insert(node: AVLNode<K, V> | null, key: K, value: V): AVLNode<K, V> {
    if (!node) return new AVLNode(key, value);

    const cmp = this.compare(key, node.key);
    if (cmp === 0) {
      // Key already exists – replace value
      node.value = value;
    } else if (cmp < 0) {
      node.left = this._insert(node.left, key, value);
    } else {
      node.right = this._insert(node.right, key, value);
    }

    this._updateHeight(node);
    return this._rebalance(node);
  }

  /** Recursive deletion */
  private _delete(node: AVLNode<K, V> | null, key: K): AVLNode<K, V> | null {
    if (!node) return null; // key not found

    const cmp = this.compare(key, node.key);
    if (cmp < 0) {
      node.left = this._delete(node.left, key);
    } else if (cmp > 0) {
      node.right = this._delete(node.right, key);
    } else {
      // Node to delete found
      if (!node.left || !node.right) {
        // One child or leaf – replace node with the non‑null child (or null)
        const temp = node.left ?? node.right;
        return temp; // may be null
      } else {
        // Node with two children: get inorder successor (smallest in right subtree)
        const succ = this._minNode(node.right)!;
        node.key = succ.key;
        node.value = succ.value;
        node.right = this._delete(node.right, succ.key);
      }
    }

    // If we removed the only node, node may be null now
    if (!node) return null;

    this._updateHeight(node);
    return this._rebalance(node);
  }

  /** Find node with minimum key in subtree */
  private _minNode(node: AVLNode<K, V> | null): AVLNode<K, V> | null {
    let cur = node;
    while (cur?.left) cur = cur.left;
    return cur ?? null;
  }

  /** Find node with maximum key in subtree */
  private _maxNode(node: AVLNode<K, V> | null): AVLNode<K, V> | null {
    let cur = node;
    while (cur?.right) cur = cur.right;
    return cur ?? null;
  }

  /** In‑order traversal helper */
  private _inOrder(
    node: AVLNode<K, V> | null,
    cb: (key: K, value: V) => void
  ): void {
    if (!node) return;
    this._inOrder(node.left, cb);
    cb(node.key, node.value);
    this._inOrder(node.right, cb);
  }

  /** Range query helper */
  private _rangeQuery(
    node: AVLNode<K, V> | null,
    low: K,
    high: K,
    cb: (key: K, value: V) => void
  ): void {
    if (!node) return;
    const cmpLow = this.compare(node.key, low);
    const cmpHigh = this.compare(node.key, high);

    if (cmpLow > 0) this._rangeQuery(node.left, low, high, cb); // left subtree may contain values >= low
    if (cmpLow >= 0 && cmpHigh <= 0) cb(node.key, node.value); // node is inside range
    if (cmpHigh < 0) this._rangeQuery(node.right, low, high, cb); // right subtree may contain values <= high
  }
}

/* ------------------------------------------------------------------ *
 *  Example / Test harness
 * ------------------------------------------------------------------ */

if (require.main === module) {
  // Simple numeric AVL tree
  const tree = new AVLTree<number, string>();

  console.log('--- Inserting 1..15 ---');
  for (let i = 1; i <= 15; i++) {
    tree.insert(i, `value-${i}`);
  }

  console.log('Size after inserts:', tree.size()); // 15

  console.log('In‑order traversal (should be sorted 1..15):');
  tree.inOrder((k, v) => process.stdout.write(`${k} `));
  console.log('\n');

  console.log('Find 7 →', tree.find(7)); // value-7
  console.log('Contains 20 →', tree.contains(20)); // false

  console.log('--- Deleting some keys (3, 7, 14) ---');
  tree.delete(3);
  tree.delete(7);
  tree.delete(14);
  console.log('Size after deletes:', tree.size()); // 12

  console.log('In‑order after deletions:');
  tree.inOrder((k, v) => process.stdout.write(`${k} `));
  console.log('\n');

  console.log('Range query [5, 10]:');
  tree.rangeQuery(5, 10, (k, v) => console.log(`  ${k} → ${v}`));

  console.log('Min key:', tree.min()); // 1
  console.log('Max key:', tree.max()); // 15 (since 14 was removed, 15 stays)

  // Demonstrate custom comparator (e.g., case‑insensitive string keys)
  const caseInsensitiveTree = new AVLTree<string, number>((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' })
  );
  caseInsensitiveTree.insert('Apple', 1);
  caseInsensitiveTree.insert('banana', 2);
  caseInsensitiveTree.insert('CHERRY', 3);
  console.log('Case‑insensitive find "apple":', caseInsensitiveTree.find('apple')); // 1
}
interface Person {
  id: number;
  name: string;
}
const byId = new AVLTree<Person, string>((a, b) => a.id - b.id);
byId.insert({id: 5, name: 'Bob'}, 'engineer');
byId.insert({id: 2, name: 'Ada'}, 'scientist');
// import { AVLTree } from "./AVLTree";   // if you split the file

const tree = new AVLTree<number, string>();
tree.insert(10, "ten");
tree.insert(5, "five");
tree.insert(15, "fifteen");
tree.delete(5);
console.log(tree.find(10)); // "ten"
tree.inOrder((k, v) => console.log(k, v));
