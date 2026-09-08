/**
 * A node in the B‑tree.
 * Keys are stored in ascending order.
 */
class BTreeNode<K, V> {
  // Keys and values are kept together to simplify return of key/value pairs.
  keys: K[] = [];
  values: V[] = [];

  // Children – null for leaf nodes.
  children: (BTreeNode<K, V> | null)[] = [];

  // Whether this node is a leaf.
  leaf: boolean;

  constructor(leaf: boolean) {
    this.leaf = leaf;
  }

  /* Helper: find first index where key should be inserted */
  findKey(key: K, cmp: (a: K, b: K) => number): number {
    let idx = 0;
    while (idx < this.keys.length && cmp(this.keys[idx], key) < 0) {
      ++idx;
    }
    return idx;
  }
}
/**
 * B‑Tree implementation
 *
 * @param t Minimum degree (≥ 2). Every node except the root contains
 *          at least t‑1 keys and at most 2*t‑1 keys.
 */
class BTree<K, V> {
  private root: BTreeNode<K, V>;
  private readonly t: number;
  private readonly cmp: (a: K, b: K) => number;

  constructor(
    t: number = 2,
    cmp?: (a: K, b: K) => number
  ) {
    if (t < 2) throw new Error('B‑tree order must be >= 2');
    this.t = t;
    this.root = new BTreeNode<K, V>(true);
    this.cmp = cmp ?? ((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  }

  /* Public API --------------------------------------------------- */
  search(key: K): V | undefined {
    return this._search(this.root, key);
  }

  insert(key: K, value: V): void {
    // If root is full, create a new leaf and split
    if (this.root.keys.length === 2 * this.t - 1) {
      const newRoot = new BTreeNode<K, V>(false);
      newRoot.children[0] = this.root;
      this._splitChild(newRoot, 0);
      this.root = newRoot;
    }
    this._insertNonFull(this.root, key, value);
  }

  /* Delete is optional – implement if you need it. */
  /* delete(key: K): void { … } */

  /* Iterator over all key/value pairs in order */
  *inOrder(): IterableIterator<[K, V]> {
    yield* this._inOrder(this.root);
  }

  /* ------------------------------------------------------------------ */

  /* Core recursive operations --------------------------------------- */
  private _search(node: BTreeNode<K, V>, key: K): V | undefined {
    const idx = node.findKey(key, this.cmp);

    if (idx < node.keys.length && this.cmp(node.keys[idx], key) === 0) {
      return node.values[idx];
    }

    if (node.leaf) {
      return undefined;
    }

    return this._search(node.children[idx]!, key);
  }

  private _insertNonFull(node: BTreeNode<K, V>, key: K, value: V): void {
    let i = node.keys.length - 1;

    if (node.leaf) {
      // Insert into leaf – shift keys/vals right of insertion point
      const idx = node.findKey(key, this.cmp);
      node.keys.splice(idx, 0, key);
      node.values.splice(idx, 0, value);
    } else {
      // Find child to descend into
      const idx = node.findKey(key, this.cmp);
      const child = node.children[idx]!;

      if (child.keys.length === 2 * this.t - 1) {
        // Child is full → split then decide which side to go
        this._splitChild(node, idx);

        // After split, middle key moves up – need to decide child again
        if (this.cmp(key, node.keys[idx]) > 0) {
          i = idx + 1;
        } else {
          i = idx;
        }
      }
      this._insertNonFull(node.children[i]!, key, value);
    }
  }

  private _splitChild(parent: BTreeNode<K, V>, idx: number): void {
    const t = this.t;
    const child = parent.children[idx]!;
    const newNode = new BTreeNode<K, V>(child.leaf);

    // Move the second half of child’s keys/values to newNode
    newNode.keys = child.keys.splice(t);   // removes elements [t, end]
    newNode.values = child.values.splice(t);

    if (!child.leaf) {
      newNode.children = child.children.splice(t
