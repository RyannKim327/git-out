/** A key/value pair stored in the tree. */
export interface BTreeEntry<K, V> {
  key: K;
  value: V;
}

/** Comparator function – must return <0, 0, >0 like Array.sort. */
export type Comparator<K> = (a: K, b: K) => number;
class BTreeNode<K, V> {
  /** Number of keys currently stored */
  public size: number = 0;

  /** Sorted keys */
  public keys: K[] = [];

  /** Parallel values */
  public values: V[] = [];

  /** Child pointers – length = size + 1 (or 0 for leaf) */
  public children: BTreeNode<K, V>[] = [];

  /** True for leaf nodes */
  public leaf: boolean;

  constructor(public readonly t: number, leaf: boolean) {
    this.leaf = leaf;
    // Pre‑allocate the maximum possible slots for speed (optional)
    this.keys = new Array<K>(2 * t - 1);
    this.values = new Array<V>(2 * t - 1);
    this.children = new Array<BTreeNode<K, V>>(2 * t);
  }

  /** Helper: true if node is full (needs a split) */
  get isFull(): boolean {
    return this.size === 2 * this.t - 1;
  }

  /** Helper: true if node has the minimum allowed keys */
  get isMin(): boolean {
    return this.size === this.t - 1;
  }
}
export class BTree<K, V> {
  private root: BTreeNode<K, V>;
  private readonly t: number;               // minimum degree
  private readonly cmp: Comparator<K>;

  /**
   * @param t          Minimum degree (≥2). Larger t → shallower tree, more memory per node.
   * @param comparator Function that orders keys.
   */
  constructor(t: number = 2, comparator: Comparator<K>) {
    if (t < 2) throw new Error('B‑Tree minimum degree t must be >= 2');
    this.t = t;
    this.cmp = comparator;
    this.root = new BTreeNode<K, V>(t, true); // start with an empty leaf
  }

  /* ------------------------------------------------------------------ *
   *  PUBLIC SEARCH
   * ------------------------------------------------------------------ */
  /** Returns the value associated with `key` or `undefined` if not found. */
  public search(key: K): V | undefined {
    return this._search(this.root, key);
  }

  private _search(node: BTreeNode<K, V>, key: K): V | undefined {
    // 1️⃣ Find the first index i such that key <= node.keys[i]
    let i = 0;
    while (i < node.size && this.cmp(key, node.keys[i]) > 0) i++;

    // 2️⃣ If we found the key exactly, return its value
    if (i < node.size && this.cmp(key, node.keys[i]) === 0) {
      return node.values[i];
    }

    // 3️⃣ If leaf → not present
    if (node.leaf) return undefined;

    // 4️⃣ Otherwise descend to the appropriate child
    return this._search(node.children[i], key);
  }

  /* ------------------------------------------------------------------ *
   *  PUBLIC INSERT
   * ------------------------------------------------------------------ */
  /** Insert a (key, value) pair. Overwrites existing value if key already exists. */
  public insert(key: K, value: V): void {
    const r = this.root;
    if (r.isFull) {
      // Root is full → create a new root and split old root
      const s = new BTreeNode<K, V>(this.t, false);
      this.root = s;
      s.children[0] = r;
      this._splitChild(s, 0);
      this._insertNonFull(s, key, value);
    } else {
      this._insertNonFull(r, key, value);
    }
  }

  /** Insert into a node that we *know* is not full. */
  private _insertNonFull(node: BTreeNode<K, V>, key: K, value: V): void {
    let i = node.size - 1;

    if (node.leaf) {
      // ---- leaf case -------------------------------------------------
      // Find location to insert the new key (shift larger keys right)
      while (i >= 0 && this.cmp(key, node.keys[i]) < 0) {
        node.keys[i + 1] = node.keys[i];
        node.values[i + 1] = node.values[i];
        i--;
      }

      // If key already exists, just replace the value
      if (i >= 0 && this.cmp(key, node.keys[i]) === 0) {
        node.values[i] = value;
        return;
      }

      // Insert new key/value
      node.keys[i + 1] = key;
      node.values[i + 1] = value;
      node.size++;
    } else {
      // ---- internal node case ----------------------------------------
      // Find child that should receive the new key
      while (i >= 0 && this.cmp(key, node.keys[i]) < 0) i--;
      i++; // child index

      const child = node.children[i];
      if (child.isFull) {
        // If child is full, split it first
        this._splitChild(node, i);
        // After split, the middle key moves up; decide which of the two children to descend into
        if (this.cmp(key, node.keys[i]) > 0) i++;
      }
      this._insertNonFull(node.children[i], key, value);
    }
  }

  /** Split child `y` of `parent` at index `i`.  `y` must be full. */
  private _splitChild(parent: BTreeNode<K, V>, i: number): void {
    const t = this.t;
    const y = parent.children[i];
    const z = new BTreeNode<K, V>(t, y.leaf); // new sibling

    // z will receive t‑1 keys from y
    z.size = t - 1;

    // Copy the high‑half keys/values from y to z
    for (let j = 0; j < t - 1; j++) {
      z.keys[j] = y.keys[j + t];
      z.values[j] = y.values[j + t];
    }

    // If y is internal, also copy its high‑half children
    if (!y.leaf) {
      for (let j = 0; j < t; j++) {
        z.children[j] = y.children[j + t];
      }
    }

    // Reduce y's size
    y.size = t - 1;

    // Insert z as a new child of parent (shift existing children right)
    for (let j = parent.size; j >= i + 1; j--) {
      parent.children[j + 1] = parent.children[j];
    }
    parent.children[i + 1] = z;

    // Move y's middle key up to parent (shift keys right)
    for (let j = parent.size - 1; j >= i; j--) {
      parent.keys[j + 1] = parent.keys[j];
      parent.values[j + 1] = parent.values[j];
    }
    parent.keys[i] = y.keys[t - 1];
    parent.values[i] = y.values[t - 1];
    parent.size++;
  }

  /* ------------------------------------------------------------------ *
   *  PUBLIC DELETE (optional but useful)
   * ------------------------------------------------------------------ */
  /** Remove a key from the tree. Returns true if the key existed and was removed. */
  public delete(key: K): boolean {
    if (!this.root) return false;
    const result = this._delete(this.root, key);
    // If the root became empty and has a child, make that child the new root.
    if (this.root.size === 0 && !this.root.leaf) {
      this.root = this.root.children[0];
    }
    return result;
  }

  /** Recursive delete helper – returns true if key was found. */
  private _delete(node: BTreeNode<K, V>, key: K): boolean {
    const idx = this._findKey(node, key);

    // --------------------------------------------------------------
    // CASE 1 – key is present in this node
    // --------------------------------------------------------------
    if (idx < node.size && this.cmp(node.keys[idx], key) === 0) {
      if (node.leaf) {
        // 1a – leaf: simply remove it
        this._removeFromLeaf(node, idx);
        return true;
      } else {
        // 1b – internal node: replace with predecessor or successor
        return this._removeFromInternal(node, idx);
      }
    }

    // --------------------------------------------------------------
    // CASE 2 – key is NOT present in this node
    // --------------------------------------------------------------
    if (node.leaf) {
      // Key not found
      return false;
    }

    // Determine if the child that must contain the key has the minimum number of keys.
    const child = node.children[idx];
    if (child.isMin) {
      this._fixChildSize(node, idx);
    }

    // After fixing, the appropriate child might have shifted (if we merged).
    const nextIdx = this.cmp(key, node.keys[idx]) > 0 ? idx + 1 : idx;
    return this._delete(node.children[nextIdx], key);
  }

  /** Find the first index i such that key <= node.keys[i] */
  private _findKey(node: BTreeNode<K, V>, key: K): number {
    let i = 0;
    while (i < node.size && this.cmp(key, node.keys[i]) > 0) i++;
    return i;
  }

  /** Remove key/value at position idx from a leaf node */
  private _removeFromLeaf(node: BTreeNode<K, V>, idx: number): void {
    for (let i = idx; i < node.size - 1; i++) {
      node.keys[i] = node.keys[i + 1];
      node.values[i] = node.values[i + 1];
    }
    node.size--;
  }

  /** Remove key/value at idx from an internal node */
  private _removeFromInternal(node: BTreeNode<K, V>, idx: number): boolean {
    const predChild = node.children[idx];
    const succChild = node.children[idx + 1];

    if (predChild.size >= this.t) {
      // Replace with predecessor (max key in left subtree)
      const { key: predKey, value: predVal } = this._getPredecessor(predChild);
      node.keys[idx] = predKey;
      node.values[idx] = predVal;
      return this._delete(predChild, predKey);
    } else if (succChild.size >= this.t) {
      // Replace with successor (min key in right subtree)
      const { key: succKey, value: succVal } = this._getSuccessor(succChild);
      node.keys[idx] = succKey;
      node.values[idx] = succVal;
      return this._delete(succChild, succKey);
    } else {
      // Both children have t‑1 keys → merge them + the middle key, then delete recursively
      this._merge(node, idx);
      return this._delete(predChild, key);
    }
  }

  /** Get the maximum key/value from subtree rooted at node (predecessor) */
  private _getPredecessor(node: BTreeNode<K, V>): BTreeEntry<K, V> {
    let cur = node;
    while (!cur.leaf) {
      cur = cur.children[cur.size];
    }
    return { key: cur.keys[cur.size - 1], value: cur.values[cur.size - 1] };
  }

  /** Get the minimum key/value from subtree rooted at node (successor) */
  private _getSuccessor(node: BTreeNode<K, V>): BTreeEntry<K, V> {
    let cur = node;
    while (!cur.leaf) {
      cur = cur.children[0];
    }
    return { key: cur.keys[0], value: cur.values[0] };
  }

  /** Ensure that child `idx` of `parent` has at least t keys (by borrowing or merging). */
  private _fixChildSize(parent: BTreeNode<K, V>, idx: number): void {
    const child = parent.children[idx];
    const leftSibling = idx > 0 ? parent.children[idx - 1] : null;
    const rightSibling = idx < parent.size ? parent.children[idx + 1] : null;

    // Try to borrow from left sibling
    if (leftSibling && leftSibling.size >= this.t) {
      // Shift child's keys/rightmost sibling key down
      for (let i = child.size - 1; i >= 0; i--) {
        child.keys[i + 1] = child.keys[i];
        child.values[i + 1] = child.values[i];
      }
      if (!child.leaf) {
        for (let i = child.size; i >= 0; i--) {
          child.children[i + 1] = child.children[i];
        }
      }
      child.keys[0] = parent.keys[idx - 1];
      child.values[0] = parent.values[idx - 1];
      if (!child.leaf) {
        child.children[0] = leftSibling.children[leftSibling.size];
      }
      child.size++;

      // Move sibling's last key up to parent
      parent.keys[idx - 1] = leftSibling.keys[leftSibling.size - 1];
      parent.values[idx - 1] = leftSibling.values[leftSibling.size - 1];
      leftSibling.size--;
      return;
    }

    // Try to borrow from right sibling
    if (rightSibling && rightSibling.size >= this.t) {
      // Move parent's key down to child
      child.keys[child.size] = parent.keys[idx];
      child.values[child.size] = parent.values[idx];
      if (!child.leaf) {
        child.children[child.size + 1] = rightSibling.children[0];
      }
      child.size++;

      // Move right sibling's first key up to parent
      parent.keys[idx] = rightSibling.keys[0];
      parent.values[idx] = rightSibling.values[0];

      // Shift right sibling's keys left
      for (let i = 0; i < rightSibling.size - 1; i++) {
        rightSibling.keys[i] = rightSibling.keys[i + 1];
        rightSibling.values[i] = rightSibling.values[i + 1];
      }
      if (!rightSibling.leaf) {
        for (let i = 0; i < rightSibling.size; i++) {
          rightSibling.children[i] = rightSibling.children[i + 1];
        }
      }
      rightSibling.size--;
      return;
    }

    // If we reach here, both siblings have t‑1 keys → merge with one sibling
    if (leftSibling) {
      this._merge(parent, idx - 1);
    } else if (rightSibling) {
      this._merge(parent, idx);
    }
  }

  /** Merge child `idx` and `idx+1` of `parent` into a single node. */
  private _merge(parent: BTreeNode<K, V>, idx: number): void {
    const child = parent.children[idx];
    const sibling = parent.children[idx + 1];

    // Pull down the separator key from parent
    child.keys[this.t - 1] = parent.keys[idx];
    child.values[this.t - 1] = parent.values[idx];

    // Copy sibling's keys/values after the separator
    for (let i = 0; i < sibling.size; i++) {
      child.keys[i + this.t] = sibling.keys[i];
      child.values[i + this.t] = sibling.values[i];
    }

    // If not leaf, copy sibling's children as well
    if (!child.leaf) {
      for (let i = 0; i <= sibling.size; i++) {
        child.children[i + this.t
