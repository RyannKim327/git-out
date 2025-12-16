// rb-tree.ts
type Color = 'RED' | 'BLACK';

class Node<K, V> {
  key: K;
  value: V;
  left: Node<K, V> | null = null;
  right: Node<K, V> | null = null;
  parent: Node<K, V> | null = null;
  color: Color = 'RED';

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }

  /** Is this node on the left of its parent? */
  isOnLeft(): boolean {
    return this.parent !== null && this === this.parent.left;
  }

  /** Sibling or null */
  sibling(): Node<K, V> | null {
    if (!this.parent) return null;
    return this.isOnLeft() ? this.parent.right : this.parent.left;
  }

  /** Has exactly one child (used during delete) */
  hasOneChild(): boolean {
    return (this.left === null && this.right !== null) ||
           (this.left !== null && this.right === null);
  }
}

export class RedBlackTree<K, V> implements Iterable<[K, V]> {
  private root: Node<K, V> | null = null;
  private _size = 0;
  private compare: (a: K, b: K) => number;

  constructor(compareFn?: (a: K, b: K) => number) {
    this.compare = compareFn || this.defaultCompare;
  }

  get size() {
    return this._size;
  }

  private defaultCompare(a: K, b: K): number {
    return a < b ? -1 : a > b ? 1 : 0;
  }

  /* ---------- Public API ---------- */

  get(key: K): V | undefined {
    const node = this.searchNode(this.root, key);
    return node ? node.value : undefined;
  }

  has(key: K): boolean {
    return this.searchNode(this.root, key) !== null;
  }

  set(key: K, value: V): this {
    let parent: Node<K, V> | null = null;
    let curr = this.root;

    while (curr !== null) {
      parent = curr;
      const cmp = this.compare(key, curr.key);
      if (cmp === 0) {
        curr.value = value;          // overwrite
        return this;
      }
      curr = cmp < 0 ? curr.left : curr.right;
    }

    const node = new Node(key, value);
    node.parent = parent;
    if (!parent) this.root = node;
    else if (this.compare(key, parent.key) < 0) parent.left = node;
    else parent.right = node;

    this.fixAfterInsert(node);
    this._size++;
    return this;
  }

  delete(key: K): boolean {
    const node = this.searchNode(this.root, key);
    if (!node) return false;

    this.deleteNode(node);
    this._size--;
    return true;
  }

  min(): [K, V] | undefined {
    const node = this.minimumNode(this.root);
    return node ? [node.key, node.value] : undefined;
  }

  max(): [K, V] | undefined {
    const node = this.maximumNode(this.root);
    return node ? [node.key, node.value] : undefined;
  }

  forEach(callback: (value: V, key: K, tree: this) => void): void {
    for (const [k, v] of this) callback(v, k, this);
  }

  *[Symbol.iterator](): Iterator<[K, V]> {
    const stack: Node<K, V>[] = [];
    let curr = this.root;
    while (curr || stack.length) {
      while (curr) {
        stack.push(curr);
        curr = curr.left;
      }
      curr = stack.pop()!;
      yield [curr.key, curr.value];
      curr = curr.right;
    }
  }

  /* ---------- Internal helpers ---------- */

  private searchNode(node: Node<K, V> | null, key: K): Node<K, V> | null {
    while (node) {
      const cmp = this.compare(key, node.key);
      if (cmp === 0) return node;
      node = cmp < 0 ? node.left : node.right;
    }
    return null;
  }

  private minimumNode(node: Node<K, V> | null): Node<K, V> | null {
    while (node?.left) node = node.left;
    return node;
  }

  private maximumNode(node: Node<K, V> | null): Node<K, V> | null {
    while (node?.right) node = node.right;
    return node;
  }

  private rotateLeft(pt: Node<K, V>): void {
    const right = pt.right!;
    pt.right = right.left;
    if (pt.right) pt.right.parent = pt;
    right.parent = pt.parent;
    if (!pt.parent) this.root = right;
    else if (pt.isOnLeft()) pt.parent.left = right;
    else pt.parent.right = right;
    right.left = pt;
    pt.parent = right;
  }

  private rotateRight(pt: Node<K, V>): void {
    const left = pt.left!;
    pt.left = left.right;
    if (pt.left) pt.left.parent = pt;
    left.parent = pt.parent;
    if (!pt.parent) this.root = left;
    else if (pt.isOnLeft()) pt.parent.left = left;
    else pt.parent.right = left;
    left.right = pt;
    pt.parent = left;
  }

  private swapColor(a: Node<K, V>, b: Node<K, V>): void {
    [a.color, b.color] = [b.color, a.color];
  }

  private fixAfterInsert(pt: Node<K, V>): void {
    let parent: Node<K, V> | null;
    let grandParent: Node<K, V> | null;

    while (pt !== this.root && pt.color === 'RED' && pt.parent?.color === 'RED') {
      parent = pt.parent;
      grandParent = parent.parent!;

      /* Case A: Parent is left child of grand-parent */
      if (parent === grandParent.left) {
        const uncle = grandParent.right;

        /* 1. Uncle is RED -> only recolor */
        if (uncle?.color === 'RED') {
          grandParent.color = 'RED';
          parent.color = 'BLACK';
          uncle.color = 'BLACK';
          pt = grandParent;
        } else {
          /* 2. pt is right child -> rotate left to convert to case 3 */
          if (pt === parent.right) {
            this.rotateLeft(parent);
            pt = parent;
            parent = pt.parent!;
          }
          /* 3. pt is left child -> rotate right on gP */
          this.rotateRight(grandParent);
          this.swapColor(parent, grandParent);
          pt = parent;
        }
      } else { /* Case B: Mirror of Case A */
        const uncle = grandParent.left;
        if (uncle?.color === 'RED') {
          grandParent.color = 'RED';
          parent.color = 'BLACK';
          uncle.color = 'BLACK';
          pt = grandParent;
        } else {
          if (pt === parent.left) {
            this.rotateRight(parent);
            pt = parent;
            parent = pt.parent!;
          }
          this.rotateLeft(grandParent);
          this.swapColor(parent, grandParent);
          pt = parent;
        }
      }
    }
    this.root!.color = 'BLACK';
  }

  private deleteNode(v: Node<K, V>): void {
    let u = this.bstReplace(v); // node that physically replaces v
    const bothBlack = (!u || u.color === 'BLACK') && v.color === 'BLACK';
    const parent = v.parent;

    if (!u) {
      if (v === this.root) this.root = null;
      else {
        if (bothBlack) this.fixDelete(v);
        else if (v.sibling()) v.sibling()!.color = 'RED';
        if (v.isOnLeft()) parent!.left = null;
        else parent!.right = null;
      }
      return;
    }

    if (!v.left || !v.right) {
      if (v === this.root) {
        v.key = u.key;
        v.value = u.value;
        v.left = v.right = null;
        if (v.left === u) v.left = null;
        if (v.right === u) v.right = null;
      } else {
        if (v.isOnLeft()) parent!.left = u;
        else parent!.right = u;
        u.parent = parent;
        if (bothBlack) this.fixDelete(u);
        else u.color = 'BLACK';
      }
    } else {
      const sKey = u.key, sVal = u.value;
      this.deleteNode(u);
      v.key = sKey;
      v.value = sVal;
    }
  }

  private bstReplace(v: Node<K, V>): Node<K, V> | null {
    if (v.left && v.right) return this.minimumNode(v.right);
    if (!v.left && !v.right) return null;
    return v.left ?? v.right;
  }

  private fixDelete(x: Node<K, V>): void {
    while (x !== this.root && x.color === 'BLACK) {
      if (x === x.parent!.left) {
        let sib = x.parent!.right!;
        if (sib.color === 'RED') {
          sib.color = 'BLACK';
          x.parent!.color = 'RED';
          this.rotateLeft(x.parent!);
          sib = x.parent!.right!;
        }
        if ((sib.left?.color ?? 'BLACK') === 'BLACK' &&
            (sib.right?.color ?? 'BLACK') === 'BLACK') {
          sib.color = 'RED';
          x = x.parent!;
        } else {
          if ((sib.right?.color ?? 'BLACK') === 'BLACK') {
            (sib.left!.color = 'BLACK');
            sib.color = 'RED';
            this.rotateRight(sib);
            sib = x.parent!.right!;
          }
          sib.color = x.parent!.color;
          x.parent!.color = 'BLACK';
          sib.right!.color = 'BLACK';
          this.rotateLeft(x.parent!);
          x = this.root!;
        }
      } else {
        let sib = x.parent!.left!;
        if (sib.color === 'RED') {
          sib.color = 'BLACK';
          x.parent!.color = 'RED';
          this.rotateRight(x.parent!);
          sib = x.parent!.left!;
        }
        if ((sib.right?.color ?? 'BLACK') === 'BLACK' &&
            (sib.left?.color ?? 'BLACK') === 'BLACK') {
          sib.color = 'RED';
          x = x.parent!;
        } else {
          if ((sib.left?.color ?? 'BLACK') === 'BLACK') {
            (sib.right!.color = 'BLACK');
            sib.color = 'RED';
            this.rotateLeft(sib);
            sib = x.parent!.left!;
          }
          sib.color = x.parent!.color;
          x.parent!.color = 'BLACK';
          sib.left!.color = 'BLACK';
          this.rotateRight(x.parent!);
          x = this.root!;
        }
      }
    }
    x.color = 'BLACK';
  }
}
const map = new RedBlackTree<number, string>();
map.set(5, 'five');
map.set(3, 'three');
map.set(7, 'seven');
console.log([...map]);          // [ [3,'three'], [5,'five'], [7,'seven'] ]
console.log(map.get(3));          // 'three'
map.delete(5);
console.log(map.size);            // 2
