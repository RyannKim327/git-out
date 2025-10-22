/*  RedBlackTree.ts  –  A minimal, self-contained Red-Black Tree in TypeScript
    --------------------------------------------------------------------------
    Usage
    -----
    const map = new RedBlackTree<number,string>((a,b)=>a-b);
    map.insert(5, "five");
    map.insert(3, "three");
    console.log(map.get(3));          // "three"
    console.log([...map.entries()]);    // [[3,"three"],[5,"five"]]
*/

/* ---------- Internal node -------------------------------------------------- */

enum Color { Red = 0, Black = 1 }

class Node<K, V> {
  constructor(
    public key: K,
    public value: V,
    public color: Color = Color.Red,
    public left: Node<K, V> | null = null,
    public right: Node<K, V> | null = null,
    public parent: Node<K, V> | null = null
  ) {}
}

/* ---------- Public API ------------------------------------------------------- */

export class RedBlackTree<K, V> {
  private root: Node<K, V> | null = null;
  private readonly compare: (a: K, b: K) => number;

  constructor(compareFn: (a: K, b: K) => number) {
    this.compare = compareFn;
  }

  /* ---- Basic queries ------------------------------------------------------ */
  get(key: K): V | undefined {
    const n = this.searchNode(key);
    return n ? n.value : undefined;
  }

  min(): K | undefined {
    const m = this.minNode(this.root);
    return m ? m.key : undefined;
  }

  max(): K | undefined {
    const m = this.maxNode(this.root);
    return m ? m.key : undefined;
  }

  /* ---- Insert ------------------------------------------------------------ */
  insert(key: K, value: V): void {
    const newNode = new Node(key, value);
    if (!this.root) {
      this.root = newNode;
    } else {
      const parent = this.searchParent(key);
      const cmp = this.compare(key, parent.key);
      if (cmp === 0) {
        parent.value = value;          // update
        return;
      }
      const side = cmp < 0 ? 'left' : 'right';
      parent[side] = newNode;
      newNode.parent = parent;
    }
    this.insertFix(newNode);
  }

  /* ---- Delete ------------------------------------------------------------ */
  delete(key: K): boolean {
    const z = this.searchNode(key);
    if (!z) return false;
    this.deleteNode(z);
    return true;
  }

  /* ---- Iterators --------------------------------------------------------- */
  *keys(): IterableIterator<K> {
    for (const [k] of this.entries()) yield k;
  }
  *values(): IterableIterator<V> {
    for (const [, v] of this.entries()) yield v;
  }
  *entries(): IterableIterator<[K, V]> {
    function* walk(n: Node<K, V> | null): Generator<[K, V]> {
      if (!n) return;
      yield* walk(n.left);
      yield [n.key, n.value];
      yield* walk(n.right);
    }
    yield* walk(this.root);
  }

  /* ---- Debug helpers ----------------------------------------------------- */
  isValid(): boolean { return this.validate() === 0; }

  /* ---------- Internal helpers ------------------------------------------- */
  private searchNode(key: K): Node<K, V> | null {
    let cur = this.root;
    while (cur) {
      const cmp = this.compare(key, cur.key);
      if (cmp === 0) return cur;
      cur = cmp < 0 ? cur.left : cur.right;
    }
    return null;
  }

  private searchParent(key: K): Node<K, V> {
    let cur = this.root!;
    while (true) {
      const cmp = this.compare(key, cur.key);
      const next = cmp < 0 ? cur.left : cur.right;
      if (!next) return cur;
      cur = next;
    }
  }

  private minNode(n: Node<K, V> | null): Node<K, V> | null {
    while (n?.left) n = n.left;
    return n;
  }
  private maxNode(n: Node<K, V> | null): Node<K, V> | null {
    while (n?.right) n = n.right;
    return n;
  }

  /* ---------- Rotations ---------------------------------------------------- */
  private rotateLeft(x: Node<K, V>): void {
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

  private rotateRight(x: Node<K, V>): void {
    const y = x.left!;
    x.left = y.right;
    if (y.right) y.right.parent = x;
    y.parent = x.parent;
    if (!x.parent) this.root = y;
    else if (x === x.parent.right) x.parent.right = y;
    else x.parent.left = y;
    y.right = x;
    x.parent = y;
  }

  /* ---------- Insert rebalance ------------------------------------------- */
  private insertFix(z: Node<K, V>): void {
    while (z !== this.root && z.parent!.color === Color.Red) {
      const parent = z.parent!;
      const grand = parent.parent!;
      const uncleSide = parent === grand.left ? 'right' : 'left';
      const uncle = grand[uncleSide];
      if (uncle?.color === Color.Red) {
        parent.color = grand.color = Color.Red;
        uncle.color = Color.Black;
        z = grand;
      } else {
        if (z === parent[uncleSide]) {
          z = parent;
          uncleSide === 'right' ? this.rotateLeft(z) : this.rotateRight(z);
        }
        z.parent!.color = Color.Black;
        grand.color = Color.Red;
        uncleSide === 'right' ? this.rotateRight(grand) : this.rotateLeft(grand);
      }
    }
    this.root!.color = Color.Black;
  }

  /* ---------- Delete rebalance -------------------------------------------- */
  private deleteNode(z: Node<K, V>): void {
    const moveColors = (u: Node<K, V>, v: Node<K, V> | null) => {
      if (!v) return;
      const tmp = u.color;
      u.color = v.color;
      v.color = tmp;
    };
    const fixDoubleBlack = (x: Node<K, V>) => this.deleteFix(x);

    let y = z;
    let yOriginalColor = y.color;
    let x: Node<K, V> | null;

    if (!z.left) {
      x = z.right;
      this.transplant(z, z.right);
    } else if (!z.right) {
      x = z.left;
      this.transplant(z, z.left);
    } else {
      y = this.minNode(z.right)!;
      yOriginalColor = y.color;
      x = y.right;
      if (y.parent === z) {
        if (x) x.parent = y;
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
    if (yOriginalColor === Color.Black && x) fixDoubleBlack(x);
  }

  private deleteFix(x: Node<K, V>): void {
    while (x !== this.root && x.color === Color.Black) {
      const side = x === x.parent!.left ? 'left' : 'right';
      const siblingSide = side === 'left' ? 'right' : 'left';
      let s = x.parent![siblingSide]!;

      if (s.color === Color.Red) {
        s.color = Color.Black;
        x.parent!.color = Color.Red;
        side === 'left' ? this.rotateLeft(x.parent!) : this.rotateRight(x.parent!);
        s = x.parent![siblingSide]!;
      }
      if ((s.left?.color ?? Color.Black) === Color.Black &&
          (s.right?.color ?? Color.Black) === Color.Black) {
        s.color = Color.Red;
        x = x.parent!;
      } else {
        if ((s[siblingSide]?.color ?? Color.Black) === Color.Black) {
          s[side]!.color = Color.Black;
          s.color = Color.Red;
          siblingSide === 'right' ? this.rotateRight(s) : this.rotateLeft(s);
          s = x.parent![siblingSide]!;
        }
        s.color = x.parent!.color;
        x.parent!.color = Color.Black;
        s[siblingSide]!.color = Color.Black;
        side === 'left' ? this.rotateLeft(x.parent!) : this.rotateRight(x.parent!);
        x = this.root!;
      }
    }
    x.color = Color.Black;
  }

  private transplant(u: Node<K, V>, v: Node<K, V> | null): void {
    if (!u.parent) this.root = v;
    else if (u === u.parent.left) u.parent.left = v;
    else u.parent.right = v;
    if (v) v.parent = u.parent;
  }

  /* ---------- Validation (optional) ---------------------------------------- */
  private validate(): number {
    if (!this.root) return 1;
    if (this.root.color !== Color.Black) return 0;
    const dfs = (n: Node<K,, V> | null): { height: number; ok: boolean } => {
      if (!n) return { height: 1, ok: true };
      const l = dfs(n.left);
      const r = dfs(n.right);
      const ok = l.ok && r.ok &&
        (n.color === Color.Red
          ? (n.left?.color ?? Color.Black) === Color.Black &&
            (n.right?.color ?? Color.Black) === Color.Black
          : true) &&
        l.height === r.height;
      return { height: l.height + (n.color === Color.Black ? 1 : 0), ok };
    };
    return dfs(this.root).ok ? 1 : 0;
  }
}
tsc RedBlackTree.ts --strict
node -e "
const {RedBlackTree} = require('./RedBlackTree');
const t = new RedBlackTree((a,b)=>a-b);
[50,30,70,20,40,60,80].forEach(k=>t.insert(k,'v'+k));
console.log([...t.keys()]);          // [20,30,40,50,60,70,80]
t.delete(50);
console.log([...t.keys()]);          // [20,30,40,60,70,80]
"
