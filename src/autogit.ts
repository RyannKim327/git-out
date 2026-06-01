// avl.ts
export type Comparator<K> = (a: K, b: K) => number;

export class AVLTNode<K, V> {
  key: K;
  value: V;
  left: AVLTNode<K, V> | null = null;
  right: AVLTNode<K, V> | null = null;
  height: number = 1; // leaf nodes start with height 1

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}

export class AVLTree<K, V> {
  private root: AVLTNode<K, V> | null = null;
  private compare: Comparator<K>;

  constructor(compareFn: Comparator<K>) {
    this.compare = compareFn;
  }

  /* ---------------------------------------------------------- */
  /*  Public API                                               */
  /* ---------------------------------------------------------- */

  /** Insert or update a key/value pair */
  insert(key: K, value: V): void {
    this.root = this._insert(this.root, key, value);
  }

  /** Delete a node by key */
  delete(key: K): void {
    this.root = this._delete(this.root, key);
  }

  /** Find a value by key, or undefined if not present */
  find(key: K): V | undefined {
    let node = this.root;
    while (node !== null) {
      const cmp = this.compare(key, node.key);
      if (cmp === 0) return node.value;
      node = cmp < 0 ? node.left : node.right;
    }
    return undefined;
  }

  /** In‑order traversal: callback receives key/value pairs in ascending key order */
  inOrder(callback: (key: K, value: V) => void): void {
    this._inOrder(this.root, callback);
  }

  /** Return a string showing the tree structure (for debugging) */
  pretty(): string {
    const lines: string[] = [];
    this._pretty(this.root, "", true, lines);
    return lines.join("\n");
  }

  /* ---------------------------------------------------------- */
  /*  Internal helpers                                         */
  /* ---------------------------------------------------------- */

  private height(node: AVLTNode<K, V> | null): number {
    return node ? node.height : 0;
  }

  private updateHeight(node: AVLTNode<K, V>): void {
    node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  private balanceFactor(node: AVLTNode<K, V>): number {
    return this.height(node.left) - this.height(node.right);
  }

  /* ----- Rotations ----- */
  private rotateRight(y: AVLTNode<K, V>): AVLTNode<K, V> {
    const x = y.left!;
    const T2 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T2;

    // Update heights
    this.updateHeight(y);
    this.updateHeight(x);

    return x; // New root
  }

  private rotateLeft(x: AVLTNode<K, V>): AVLTNode<K, V> {
    const y = x.right!;
    const T2 = y.left;

    // Perform rotation
    y.left = x;
    x.right = T2;

    // Update heights
    this.updateHeight(x);
    this.updateHeight(y);

    return y; // New root
  }

  /* ----- Rebalancing ----- */
  private rebalance(node: AVLTNode<K, V>): AVLTNode<K, V> {
    this.updateHeight(node);
    const bf = this.balanceFactor(node);

    // Left heavy
    if (bf > 1) {
      if (this.balanceFactor(node.left!) < 0) {
        node.left = this.rotateLeft(node.left!);
      }
      return this.rotateRight(node);
    }

    // Right heavy
    if (bf < -1) {
      if (this.balanceFactor(node.right!) > 0) {
        node.right = this.rotateRight(node.right!);
      }
      return this.rotateLeft(node);
    }

    return node; // balanced
  }

  /* ----- Insertion ----- */
  private _insert(node: AVLTNode<K, V> | null, key: K, value: V): AVLTNode<K, V> {
    if (node === null) {
      return new AVLTNode(key, value);
    }

    const cmp = this.compare(key, node.key);

    if (cmp < 0) {
      node.left = this._insert(node.left, key, value);
    } else if (cmp > 0) {
      node.right = this._insert(node.right, key, value);
    } else {
      // Existing key – replace value
      node.value = value;
      return node;
    }

    return this.rebalance(node);
  }

  /* ----- Deletion ----- */
  private _delete(node: AVLTNode<K, V> | null, key: K): AVLTNode<K, V> | null {
    if (node === null) {
      return null;
    }

    const cmp = this.compare(key, node.key);

    if (cmp < 0) {
      node.left = this._delete(node.left, key);
    } else if (cmp > 0) {
      node.right = this._delete(node.right, key);
    } else {
      // Node found – handle three cases
      if (node.left === null && node.right === null) {
        return null; // 0 children
      } else if (node.left === null) {
        return node.right; // 1 child (right)
      } else if (node.right === null) {
        return node.left; // 1 child (left)
      } else {
        // 2 children – choose in-order predecessor (max left)
        let predecessor = node.left;
        while (predecessor.right !== null) {
          predecessor = predecessor.right;
        }
        node.key = predecessor.key;
        node.value = predecessor.value;
        node.left = this._delete(node.left, predecessor.key);
      }
    }

    return this.rebalance(node);
  }

  /* ----- Traversal ----- */
  private _inOrder
