/** Color of a node */
enum Color {
  RED = 'RED',
  BLACK = 'BLACK',
}

/** Comparator for generic keys */
type Comparator<K> = (a: K, b: K) => number;

/** Internal node representation */
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

  /** Helper: is this node red? */
  get isRed(): boolean {
    return this.color === Color.RED;
  }

  /** Helper: is this node black? */
  get isBlack(): boolean {
    return this.color === Color.BLACK;
  }

  /** Set color and return the node (useful for chaining) */
  setColor(c: Color): this {
    this.color = c;
    return this;
  }
}
export class RedBlackTree<K, V> implements Iterable<[K, V]> {
  private root: RBNode<K, V> | null = null;
  private _size = 0;
  private readonly compare: Comparator<K>;

  /** Create a tree. Pass a comparator for custom key types (e.g. strings, numbers, objects). */
  constructor(compareFn?: Comparator<K>) {
    if (compareFn) {
      this.compare = compareFn;
    } else {
      // Default comparator works for numbers and strings
      this.compare = (a: any, b: any) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      };
    }
  }

  /** Public size getter */
  get size(): number {
    return this._size;
  }

  /** Public height getter (O(n) – used only for debugging) */
  get height(): number {
    const heightRec = (node: RBNode<K, V> | null): number =>
      node ? 1 + Math.max(heightRec(node.left), heightRec(node.right)) : 0;
    return heightRec(this.root);
  }

  /** --------------------------------------------------------------
   *  PUBLIC API
   * -------------------------------------------------------------- */

  /** Insert a new key/value pair. Throws if the key already exists. */
  insert(key: K, value: V): void {
    const newNode = new RBNode(key, value);
    this._bstInsert(newNode);
    this.fixInsert(newNode);
    this._size++;
  }

  /** Delete a key. Returns true if the key existed and was removed. */
  delete(key: K): boolean {
    const node = this.searchNode(key);
    if (!node) return false;
    this.deleteNode(node);
    this._size--;
    return true;
  }

  /** Find the value associated with a key, or undefined if not present. */
  find(key: K): V | undefined {
    const node = this.searchNode(key);
    return node?.value;
  }

  /** Boolean version of find */
  has(key: K): boolean {
    return !!this.searchNode(key);
  }

  /** In‑order traversal – returns an array of [key, value] pairs */
  inOrder(): Array<[K, V]> {
    const result: Array<[K, V]> = [];
    const walk = (node: RBNode<K, V> | null) => {
      if (!node) return;
      walk(node.left);
      result.push([node.key, node.value]);
      walk(node.right);
    };
    walk(this.root);
    return result;
  }

  /** Pre‑order traversal (useful for debugging) */
  preOrder(): Array<[K, V]> {
    const result: Array<[K, V]> = [];
    const walk = (node: RBNode<K, V> | null) => {
      if (!node) return;
      result.push([node.key, node.value]);
      walk(node.left);
      walk(node.right);
    };
    walk(this.root);
    return result;
  }

  /** Post‑order traversal */
  postOrder(): Array<[K, V]> {
    const result: Array<[K, V]> = [];
    const walk = (node: RBNode<K, V> | null) => {
      if (!node) return;
      walk(node.left);
      walk(node.right);
      result.push([node.key, node.value]);
    };
    walk(this.root);
    return result;
  }

  /** Iterable support – yields entries in ascending key order */
  *[Symbol.iterator](): IterableIterator<[K, V]> {
    const stack: RBNode<K, V>[] = [];
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

  /** --------------------------------------------------------------
   *  PRIVATE HELPERS
   * -------------------------------------------------------------- */

  /** Classic BST insertion (no balancing) – returns the inserted node */
  private _bstInsert(z: RBNode<K, V>): void {
    let y: RBNode<K, V> | null = null;
    let x = this.root;

    while (x) {
      y = x;
      const cmp = this.compare(z.key, x.key);
      if (cmp < 0) {
        x = x.left!;
      } else if (cmp > 0) {
        x = x.right!;
      } else {
        // Duplicate key – you can change this to “replace” if you prefer
        throw new Error(`Duplicate key "${z.key}"`);
      }
    }

    z.parent = y;
    if (!y) {
      this.root = z; // Tree was empty
    } else if (this.compare(z.key, y.key) < 0) {
      y.left = z;
    } else {
      y.right = z;
    }

    // New node is red by default; children are null (black)
    z.left = null;
    z.right = null;
    z.color = Color.RED;
  }

  /** Search for a node by key – returns the node or null */
  private searchNode(key: K): RBNode<K, V> | null {
    let cur = this.root;
    while (cur) {
      const cmp = this.compare(key, cur.key);
      if (cmp === 0) return cur;
      cur = cmp < 0 ? cur.left! : cur.right!;
    }
    return null;
  }

  /** Left rotation around node x */
  private rotateLeft(x: RBNode<K, V>): void {
    const y = x.right!;
    // Turn y's left subtree into x's right subtree
    x.right = y.left;
    if (y.left) y.left.parent = x;

    // Link x's parent to y
    y.parent = x.parent;
    if (!x.parent) {
      this.root = y;
    } else if (x === x.parent.left) {
      x.parent.left = y;
    } else {
      x.parent.right = y;
    }

    // Put x on y's left
    y.left = x;
    x.parent = y;
  }

  /** Right rotation around node y */
  private rotateRight(y: RBNode<K, V>): void {
    const x = y.left!;
    // Turn x's right subtree into y's left subtree
    y.left = x.right;
    if (x.right) x.right.parent = y;

    // Link y's parent to x
    x.parent = y.parent;
    if (!y.parent) {
      this.root = x;
    } else if (y === y.parent.right) {
      y.parent.right = x;
    } else {
      y.parent.left = x;
    }

    // Put y on x's right
    x.right = y;
    y.parent = x;
  }

  /** Fix‑up after insertion to restore RBT properties */
  private fixInsert(z: RBNode<K, V>): void {
    while (z.parent?.isRed) {
      if (z.parent === z.parent.parent?.left) {
        const y = z.parent.parent.right; // Uncle
        if (y?.isRed) {
          // Case 1 – recolor
          z.parent.setColor(Color.BLACK);
          y.setColor(Color.BLACK);
          z.parent.parent!.setColor(Color.RED);
          z = z.parent.parent!;
        } else {
          if (z === z.parent.right) {
            // Case 2 – left rotate
            z = z.parent;
            this.rotateLeft(z);
          }
          // Case 3 – right rotate
          z.parent!.setColor(Color.BLACK);
          z.parent!.parent!.setColor(Color.RED);
          this.rotateRight(z.parent!.parent!);
        }
      } else {
        // Mirror of the above with "right" and "left" swapped
        const y = z.parent.parent?.left; // Uncle
        if (y?.isRed) {
          // Case 1
          z.parent.setColor(Color.BLACK);
          y.setColor(Color.BLACK);
          z.parent.parent!.setColor(Color.RED);
          z = z.parent.parent!;
        } else {
          if (z === z.parent.left) {
            // Case 2
            z = z.parent;
            this.rotateRight(z);
          }
          // Case 3
          z.parent!.setColor(Color.BLACK);
          z.parent!.parent!.setColor(Color.RED);
          this.rotateLeft(z.parent!.parent!);
        }
      }
    }
    // Ensure root is black
    if (this.root) this.root.setColor(Color.BLACK);
  }

  /** Transplant subtree u with subtree v (used by delete) */
  private transplant(u: RBNode<K, V>, v: RBNode<K, V> | null): void {
    if (!u.parent) {
      this.root = v;
    } else if (u === u.parent.left) {
      u.parent.left = v;
    } else {
      u.parent.right = v;
    }
    if (v) v.parent = u.parent;
  }

  /** Find the minimum node in a subtree */
  private minimum(node: RBNode<K, V>): RBNode<K, V> {
    let cur = node;
    while (cur.left) cur = cur.left;
    return cur;
  }

  /** Delete a node that is known to exist */
  private deleteNode(z: RBNode<K, V>): void {
    let y = z;
    let yOriginalColor = y.color;
    let x: RBNode<K, V> | null;

    if (!z.left) {
      x = z.right;
      this.transplant(z, z.right);
    } else if (!z.right) {
      x = z.left;
      this.transplant(z, z.left);
    } else {
      // Node has two children – find successor
      y = this.minimum(z.right);
      yOriginalColor = y.color;
      x = y.right;
      if (y.parent === z) {
        if (x) x.parent = y;
      } else {
        this.transplant(y, y.right);
        y.right = z.right;
        y.right!.parent = y;
      }
      this.transplant(z, y);
      y.left = z.left;
      y.left!.parent = y;
      y.color = z.color; // Preserve original color
    }

    // If the removed node was black we may have violated properties
    if (yOriginalColor === Color.BLACK) {
      this.fixDelete(x, y.parent);
    }
  }

  /** Fix‑up after deletion */
  private fixDelete(x: RBNode<K, V> | null, parent: RBNode<K, V> | null): void {
    while ((x !== this.root) && (x?.isBlack ?? true)) {
      if (x === parent?.left) {
        let w = parent.right!; // sibling
        if (w.isRed) {
          // Case 1: sibling red
          w.setColor(Color.BLACK);
          parent.setColor(Color.RED);
          this.rotateLeft(parent);
          w = parent.right!;
        }
        if ((w.left?.isBlack ?? true) && (w.right?.isBlack ?? true)) {
          // Case 2: both of sibling's children black
          w.setColor(Color.RED);
          x = parent;
          parent = x.parent!;
        } else {
          if (w.right?.isBlack ?? true) {
            // Case 3: sibling's right child black, left child red
            w.left?.setColor(Color.BLACK);
            w.setColor(Color.RED);
            this.rotateRight(w);
            w = parent.right!;
          }
          // Case 4: sibling's right child red
          w.setColor(parent.color);
          parent.setColor(Color.BLACK);
          w.right?.setColor(Color.BLACK);
          this.rotateLeft(parent);
          x = this.root!;
        }
      } else {
        // Mirror of the above with "left" and "right" swapped
        let w = parent!.left!;
        if (w.isRed) {
          w.setColor(Color.BLACK);
          parent!.setColor(Color.RED);
          this.rotateRight(parent!);
          w = parent!.left!;
        }
        if ((w.right?.isBlack ?? true) && (w.left?.isBlack ?? true)) {
          w.setColor(Color.RED);
          x = parent!;
          parent = x.parent!;
        } else {
          if (w.left?.isBlack ?? true) {
            w.right?.setColor(Color.BLACK);
            w.setColor(Color.RED);
            this.rotateLeft(w);
            w = parent!.left!;
          }
          w.setColor(parent!.color);
          parent!.setColor(Color.BLACK);
          w.left?.setColor(Color.BLACK);
          this.rotateRight(parent!);
          x = this.root!;
        }
      }
    }
    if (x) x.setColor(Color.BLACK);
  }

  /** --------------------------------------------------------------
   *  DEBUG / VALIDATION (optional)
   * -------------------------------------------------------------- */

  /** Verify the Red‑Black invariants – throws if broken (useful in tests) */
  validate(): void {
    if (!this.root) return;
    if (this.root.isRed) throw new Error('Root is red');

    const checkNode = (node: RBNode<K, V> | null): number => {
      if (!node) return 1; // Null leaves count as black height 1

      // Property 3 – no two reds in a row
      if (node.isRed && ((node.left?.isRed) || (node.right?.isRed))) {
        throw new Error(`Red violation at key ${node.key}`);
      }

      const leftBH = checkNode(node.left);
      const rightBH = checkNode(node.right);
      if (leftBH !== rightBH) {
        throw new Error(`Black‑height violation at key ${node.key}`);
      }

      // Return black height for parent
      return node.isBlack ? leftBH + 1 : leftBH;
    };

    checkNode(this.root);
  }
}
