/* ----------  B-Tree in TypeScript  ---------- */

type Nullable<T> = T | null;

/* ----------  Configuration  ---------- */
const MIN_DEGREE = 128;          // t ≥ 2  (larger = wider nodes = fewer levels)
const MAX_KEYS   = 2 * MIN_DEGREE - 1;
const MIN_KEYS   = MIN_DEGREE - 1;

/* ----------  Entry  ---------- */
class Entry<K, V> {
  constructor(public key: K, public value: V) {}
}

/* ----------  Node  ---------- */
class BTreeNode<K, V> {
  n: number = 0;                       // #keys currently stored
  entries: Array<Nullable<Entry<K, V>>> = new Array(MAX_KEYS + 1);
  children: Array<Nullable<BTreeNode<K, V>>> = new Array(MAX_KEYS + 2);

  constructor(public isLeaf: boolean) {}
}

/* ----------  Tree  ---------- */
class BTree<K, V> {
  private root: BTreeNode<K, V>;
  private compare: (a: K, b: K) => number;

  constructor(compareFn?: (a: K, b: K) => number) {
    this.compare = compareFn || ((a, b) => (a as any) - (b as any));
    this.root = new BTreeNode<K, V>(true);
  }

  /* --------  Public API  -------- */
  insert(key: K, value: V): void {
    const r = this.root;
    if (r.n === MAX_KEYS) {              // root is full, split it
      const s = new BTreeNode<K, V>(false);
      this.root = s;
      s.children[0] = r;
      this.splitChild(s, 0);
      this.insertNonFull(s, key, value);
    } else {
      this.insertNonFull(r, key, value);
    }
  }

  search(key: K): Nullable<V> {
    const entry = this.searchNode(this.root, key);
    return entry ? entry.value : null;
  }

  /* inclusive range [low, high] */
  *range(low: K, high: K): IterableIterator<Entry<K, V>> {
    yield* this.rangeNode(this.root, low, high);
  }

  delete(key: K): void {
    this.deleteFromNode(this.root, key);
    if (this.root.n === 0 && !this.root.isLeaf) {
      this.root = this.root.children[0]!;
    }
  }

  /* --------  Internal helpers  -------- */
  private searchNode(node: BTreeNode<K, V>, key: K): Nullable<Entry<K, V>> {
    let i = 0;
    while (i < node.n && this.compare(key, node.entries[i]!.key) > 0) i++;
    if (i < node.n && this.compare(key, node.entries[i]!.key) === 0) return node.entries[i];
    if (node.isLeaf) return null;
    return this.searchNode(node.children[i]!, key);
  }

  private insertNonFull(node: BTreeNode<K, V>, key: K, value: V): void {
    let i = node.n - 1;
    if (node.isLeaf) {
      while (i >= 0 && this.compare(key, node.entries[i]!.key) < 0) {
        node.entries[i + 1] = node.entries[i];
        i--;
      }
      node.entries[i + 1] = new Entry(key, value);
      node.n++;
    } else {
      while (i >= 0 && this.compare(key, node.entries[i]!.key) < 0) i--;
      i++;
      if (node.children[i]!.n === MAX_KEYS) {
        this.splitChild(node, i);
        if (this.compare(key, node.entries[i]!.key) > 0) i++;
      }
      this.insertNonFull(node.children[i]!, key, value);
    }
  }

  private splitChild(parent: BTreeNode<K, V>, idx: number): void {
    const full = parent.children[idx]!;
    const z = new BTreeNode<K, V>(full.isLeaf);
    const t = MIN_DEGREE;

    z.n = t - 1;
    for (let j = 0; j < t - 1; j++) z.entries[j] = full.entries[j + t];
    if (!full.isLeaf) {
      for (let j = 0; j < t; j++) z.children[j] = full.children[j + t];
    }
    full.n = t - 1;

    for (let j = parent.n; j >= idx + 1; j--) parent.children[j + 1] = parent.children[j];
    parent.children[idx + 1] = z;

    for (let j = parent.n - 1; j >= idx; j--) parent.entries[j + 1] = parent.entries[j];
    parent.entries[idx] = full.entries[t - 1]!;
    parent.n++;
  }

  /* --------  Deletion  -------- */
  private deleteFromNode(node: BTreeNode<K, V>, key: K): void {
    const t = MIN_DEGREE;
    let idx = 0;
    while (idx < node.n && this.compare(key, node.entries[idx]!.key) > 0) idx++;

    if (idx < node.n && this.compare(key, node.entries[idx]!.key) === 0) {
      if (node.isLeaf) this.removeFromLeaf(node, idx);
      else this.removeFromInternal(node, idx);
    } else {
      if (node.isLeaf) return; // not found
      const flag = (idx === node.n);
      if (node.children[idx]!.n < t) this.fill(node, idx);
      const target = flag && idx > node.n ? node.children[idx - 1]! : node.children[idx]!;
      this.deleteFromNode(target, key);
    }
  }

  private removeFromLeaf(node: BTreeNode<K, V>, idx: number): void {
    for (let i = idx + 1; i < node.n; i++) node.entries[i - 1] = node.entries[i];
    node.n--;
  }

  private removeFromInternal(node: BTreeNode<K, V>, idx: number): void {
    const t = MIN_DEGREE;
    const key = node.entries[idx]!.key;

    if (node.children[idx]!.n >= t) {
      const pred = this.getPredecessor(node, idx);
      node.entries[idx] = pred;
      this.deleteFromNode(node.children[idx]!, pred.key);
    } else if (node.children[idx + 1]!.n >= t) {
      const succ = this.getSuccessor(node, idx);
      node.entries[idx] = succ;
      this.deleteFromNode(node.children[idx + 1]!, succ.key);
    } else {
      this.merge(node, idx);
      this.deleteFromNode(node.children[idx]!, key);
    }
  }

  private getPredecessor(node: BTreeNode<K, V>, idx: number): Entry<K, V> {
    let cur = node.children[idx]!;
    while (!cur.isLeaf) cur = cur.children[cur.n]!;
    return cur.entries[cur.n - 1]!;
  }

  private getSuccessor(node: BTreeNode<K, V>, idx: number): Entry<K, V> {
    let cur = node.children[idx + 1]!;
    while (!cur.isLeaf) cur = cur.children[0]!;
    return cur.entries[0]!;
  }

  private fill(node: BTreeNode<K, V>, idx: number): void {
    const t = MIN_DEGREE;
    if (idx !== 0 && node.children[idx - 1]!.n >= t) this.borrowFromPrev(node, idx);
    else if (idx !== node.n && node.children[idx + 1]!.n >= t) this.borrowFromNext(node, idx);
    else {
      if (idx !== node.n) this.merge(node, idx);
      else this.merge(node, idx - 1);
    }
  }

  private borrowFromPrev(node: BTreeNode<K, V>, idx: number): void {
    const child = node.children[idx]!;
    const sibling = node.children[idx - 1]!;
    for (let i = child.n - 1; i >= 0; --i) child.entries[i + 1] = child.entries[i];
    if (!child.isLeaf) {
      for (let i = child.n; i >= 0; --i) child.children[i + 1] = child.children[i];
    }
    child.entries[0] = node.entries[idx - 1];
    if (!child.isLeaf) child.children[0] = sibling.children[sibling.n];
    node.entries[idx - 1] = sibling.entries[sibling.n - 1];
    child.n++;
    sibling.n--;
  }

  private borrowFromNext(node: BTreeNode<K, V>, idx: number): void {
    const child = node.children[idx]!;
    const sibling = node.children[idx + 1]!;
    child.entries[child.n] = node.entries[idx];
    if (!child.isLeaf) child.children[child.n + 1] = sibling.children[0];
    node.entries[idx] = sibling.entries[0];
    for (let i = 1; i < sibling.n; i++) sibling.entries[i - 1] = sibling.entries[i];
    if (!sibling.isLeaf) {
      for (let i = 1; i <= sibling.n; i++) sibling.children[i - 1] = sibling.children[i];
    }
    child.n++;
    sibling.n--;
  }

  private merge(node: BTreeNode<K, V>, idx: number): void {
    const t = MIN_DEGREE;
    const child = node.children[idx]!;
    const sibling = node.children[idx + 1]!;
    child.entries[t - 1] = node.entries[idx];
    for (let i = 0; i < sibling.n; i++) child.entries[i + t] = sibling.entries[i];
    if (!child.isLeaf) {
      for (let i = 0; i <= sibling.n; i++) child.children[i + t] = sibling.children[i];
    }
    for (let i = idx + 1; i < node.n; i++) node.entries[i - 1] = node.entries[i];
    for (let i = idx + 2; i <= node.n; i++) node.children[i - 1] = node.children[i];
    child.n += sibling.n + 1;
    node.n--;
  }

  /* --------  Range iteration  -------- */
  private *rangeNode(node: BTreeNode<K, V>, low: K, high: K): IterableIterator<Entry<K, V>> {
    let i = 0;
    while (i < node.n && this.compare(node.entries[i]!.key, low) < 0) i++;
    while (i < node.n && this.compare(node.entries[i]!.key, high) <= 0) {
      if (!node.isLeaf) yield* this.rangeNode(node.children[i]!, low, high);
      yield node.entries[i]!;
      i++;
    }
    if (!node.isLeaf) yield* this.rangeNode(node.children[i]!, low, high);
  }
}

/* ----------  Simple sanity test  ---------- */
if (require.main === module) {
  const tree = new BTree<number, string>();
  const n = 500_000;
  console.time('insert');
  for (let i = 0; i < n; i++) tree.insert(Math.floor(Math.random() * n), `v${i}`);
  console.timeEnd('insert');

  console.time('search');
  for (let i = 0; i < 100_000; i++) tree.search(Math.floor(Math.random() * n));
  console.timeEnd('search');

  console.log('All good ✅');
}
tsc btree.ts
node btree.js
