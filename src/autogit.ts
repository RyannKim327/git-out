// Red-Black Tree in TypeScript (generic, with NIL sentinel)
enum Color { Red = 0, Black = 1 }

class Node<K, V> {
  key: K;
  value: V;
  color: Color;
  left: Node<K, V>;
  right: Node<K, V>;
  parent: Node<K, V>;

  constructor(
    key: K,
    value: V,
    color: Color,
    left: Node<K, V>,
    right: Node<K, V>,
    parent: Node<K, V>
  ) {
    this.key = key;
    this.value = value;
    this.color = color;
    this.left = left;
    this.right = right;
    this.parent = parent;
  }
}

export class RedBlackTree<K, V> {
  private nil: Node<K, V>;      // sentinel leaf (all leaves point to this)
  private root: Node<K, V>;
  private compare: (a: K, b: K) => number;
  private _size: number;

  constructor(compare: (a: K, b: K) => number) {
    this.compare = compare;
    // Create a sentinel NIL node. We cast to any in a couple places since K,V are generic.
    this.nil = new Node<K, V>(null as any, null as any, Color.Black, null as any, null as any, null as any);
    // Point NIL to itself to keep things consistent
    (this.nil.left = this.nil), (this.nil.right = this.nil), (this.nil.parent = this.nil);
    this.root = this.nil;
    this._size = 0;
  }

  get size(): number {
    return this._size;
  }

  // Public API

  set(key: K, value: V): void {
    // Standard BST insert
    let z = new Node<K, V>(key, value, Color.Red, this.nil, this.nil, this.nil);
    let y = this.nil;
    let x = this.root;

    while (x !== this.nil) {
      y = x;
      const cmp = this.compare(z.key, x.key);
      if (cmp < 0) {
        x = x.left;
      } else if (cmp > 0) {
        x = x.right;
      } else {
        // Key exists; replace value and return
        x.value = value;
        return;
      }
    }

    z.parent = y;
    if (y === this.nil) {
      this.root = z;
    } else if (this.compare(z.key, y.key) < 0) {
      y.left = z;
    } else {
      y.right = z;
    }

    z.left = this.nil;
    z.right = this.nil;
    z.color = Color.Red;
    this._size++;
    this.insertFixup(z);
  }

  get(key: K): V | undefined {
    let x = this.root;
    while (x !== this.nil) {
      const cmp = this.compare(key, x.key);
      if (cmp === 0) return x.value;
      if (cmp < 0) x = x.left;
      else x = x.right;
    }
    return undefined;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: K): boolean {
    // Find node to delete
    let z = this.root;
    while (z !== this.nil) {
      const cmp = this.compare(key, z.key);
      if (cmp === 0) break;
      z = cmp < 0 ? z.left : z.right;
    }
    if (z === this.nil) return false; // not found

    let y = z;
    let yOriginalColor = y.color;
    let x: Node<K, V>;

    if (z.left === this.nil) {
      x = z.right;
      this.transplant(z, z.right);
    } else if (z.right === this.nil) {
      x = z.left;
      this.transplant(z, z.left);
    } else {
      y = this.minimum(z.right);
      yOriginalColor = y.color;
      x = y.right;
      if (y.parent === z) {
        x.parent = y;
      } else {
        this.transplant(y, y.right);
        y.right = z.right;
        y.right.parent = y;
      }
      this.transplant(z, y);
      y.left = z.left;
      y.left.parent = y;
      y.color = z.color;
    }

    if (yOriginalColor === Color.Black) {
      this.deleteFixup(x);
    }

    this._size--;
    return true;
  }

  inOrder(): Array<{ key: K; value: V }> {
    const res: Array<{ key: K; value: V }> = [];
    const stack: Array<Node<K, V>> = [];
    let cur = this.root;
    while (stack.length > 0 || cur !== this.nil) {
      while (cur !== this.nil) {
        stack.push(cur);
        cur = cur.left;
      }
      cur = stack.pop()!;
      res.push({ key: cur.key, value: cur.value });
      cur = cur.right;
    }
    return res;
  }

  // Optional: iterate as an array of {key, value} in-order
  entries(): Array<{ key: K; value: V }> {
    return this.inOrder();
  }

  // Internal helpers

  private insertFixup(z: Node<K, V>): void {
    while (z.parent.color === Color.Red) {
      if (z.parent === z.parent.parent.left) {
        const y = z.parent.parent.right;
        if (y.color === Color.Red) {
          z.parent.color = Color.Black;
          y.color = Color.Black;
          z.parent.parent.color = Color.Red;
          z = z.parent.parent;
        } else {
          if (z === z.parent.right) {
            z = z.parent;
            this.leftRotate(z);
          }
          z.parent.color = Color.Black;
          z.parent.parent.color = Color.Red;
          this.rightRotate(z.parent.parent);
        }
      } else {
        // Mirror
        const y = z.parent.parent.left;
        if (y.color === Color.Red) {
          z.parent.color = Color.Black;
          y.color = Color.Black;
          z.parent.parent.color = Color.Red;
          z = z.parent.parent;
        } else {
          if (z === z.parent.left) {
            z = z.parent;
            this.rightRotate(z);
          }
          z.parent.color = Color.Black;
          z.parent.parent.color = Color.Red;
          this.leftRotate(z.parent.parent);
        }
      }
    }
    this.root.color = Color.Black;
  }

  private deleteFixup(x: Node<K, V>): void {
    while (x !== this.root && x.color === Color.Black) {
      if (x === x.parent.left) {
        let w = x.parent.right;
        if (w.color === Color.Red) {
          w.color = Color.Black;
          x.parent.color = Color.Red;
          this.leftRotate(x.parent);
          w = x.parent.right;
        }
        if (w.left.color === Color.Black && w.right.color === Color.Black) {
          w.color = Color.Black;
          x = x.parent;
        } else {
          if (w.right.color === Color.Black) {
            w.left.color = Color.Black;
            w.color = Color.Red;
            this.rightRotate(w);
            w = x.parent.right;
          }
          w.color = x.parent.color;
          x.parent.color = Color.Black;
          w.right.color = Color.Black;
          this.leftRotate(x.parent);
          x = this.root;
        }
      } else {
        // Mirror
        let w = x.parent.left;
        if (w.color === Color.Red) {
          w.color = Color.Black;
          x.parent.color = Color.Red;
          this.rightRotate(x.parent);
          w = x.parent.left;
        }
        if (w.right.color === Color.Black && w.left.color === Color.Black) {
          w.color = Color.Black;
          x = x.parent;
        } else {
          if (w.left.color === Color.Black) {
            w.right.color = Color.Black;
            w.color = Color.Red;
            this.leftRotate(w);
            w = x.parent.left;
          }
          w.color = x.parent.color;
          x.parent.color = Color.Black;
          w.left.color = Color.Black;
          this.rightRotate(x.parent);
          x = this.root;
        }
      }
    }
    x.color = Color.Black;
  }

  private leftRotate(x: Node<K, V>): void {
    const y = x.right;
    x.right = y.left;
    if (y.left !== this.nil) {
      y.left.parent = x;
    }
    y.parent = x.parent;
    if (x.parent === this.nil) {
      this.root = y;
    } else if (x === x.parent.left) {
      x.parent.left = y;
    } else {
      x.parent.right = y;
    }
    y.left = x;
    x.parent = y;
  }

  private rightRotate(y: Node<K, V>): void {
    const x = y.left;
    y.left = x.right;
    if (x.right !== this.nil) {
      x.right.parent = y;
    }
    x.parent = y.parent;
    if (y.parent === this.nil) {
      this.root = x;
    } else if (y === y.parent.right) {
      y.parent.right = x;
    } else {
      y.parent.left = x;
    }
    x.right = y;
    y.parent = x;
  }

  private transplant(u: Node<K, V>, v: Node<K, V>): void {
    if (u.parent === this.nil) {
      this.root = v;
    } else if (u === u.parent.left) {
      u.parent.left = v;
    } else {
      u.parent.right = v;
    }
    v.parent = u.parent;
  }

  private minimum(x: Node<K, V>): Node<K, V> {
    while (x.left !== this.nil) {
      x = x.left;
    }
    return x;
  }
}
