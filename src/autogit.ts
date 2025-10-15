/********************************************************************
 *  B-tree in TypeScript  (c) 2023 – MIT License
 *******************************************************************/
type CompareResult = -1 | 0 | 1;
interface Comparable<T> {
  compare(other: T): CompareResult;
}

/* --------------------------------------------------------------- */
/*  Internal node layout                                           */
/* ---------------------------------------------------------------*/
const MIN_DEGREE = 32;                 // t ≥ 2
const MAX_KEYS = 2 * MIN_DEGREE - 1;
const MIN_KEYS = MIN_DEGREE - 1;

class Entry<K extends Comparable<K>, V> {
  constructor(public key: K, public values: V[]) {}
}

class BTreeNode<K extends Comparable<K>, V> {
  entries: Array<Entry<K, V>> = [];   // keys + payload
  children: Array<BTreeNode<K, V>> = []; // subtrees
  isLeaf = true;
}

/* --------------------------------------------------------------- */
/*  The tree itself                                                */
/* ---------------------------------------------------------------*/
export class BTree<K extends Comparable<K>, V> {
  private root: BTreeNode<K, V> = new BTreeNode<K, V>();

  /* ------------------ public API ------------------------------- */
  insert(key: K, value: V): void {
    const r = this.root;
    if (r.entries.length === MAX_KEYS) {
      const s = new BTreeNode<K, V>();
      this.root = s;
      s.isLeaf = false;
      s.children.push(r);
      this.splitChild(s, 0);
      this.insertNonFull(s, key, value);
    } else {
      this.insertNonFull(r, key, value);
    }
  }

  search(key: K): V[] | undefined {
    return this.searchNode(this.root, key);
  }

  /** inclusive range [low, high] */
  range(low: K, high: K): V[] {
    const out: V[] = [];
    this.rangeNode(this.root, low, high, out);
    return out;
  }

  delete(key: K, value?: V): boolean {
    const ans = this.deleteFromNode(this.root, key, value);
    if (this.root.entries.length === 0 && !this.root.isLeaf)
      this.root = this.root.children[0];
    return ans;
  }

  /* ------------------ internal helpers ------------------------- */
  private searchNode(x: BTreeNode<K, V>, key: K): V[] | undefined {
    let i = 0;
    while (i < x.entries.length && key.compare(x.entries[i].key) > 0) i++;
    if (i < x.entries.length && key.compare(x.entries[i].key) === 0)
      return x.entries[i].values;
    if (x.isLeaf) return undefined;
    return this.searchNode(x.children[i], key);
  }

  private rangeNode(
    x: BTreeNode<K, V>,
    low: K,
    high: K,
    out: V[]
  ): void {
    for (let i = 0; i < x.entries.length; i++) {
      const k = x.entries[i].key;
      if (!x.isLeaf) this.rangeNode(x.children[i], low, high, out);
      if (low.compare(k) <= 0 && high.compare(k) >= 0)
        out.push(...x.entries[i].values);
    }
    if (!x.isLeaf)
      this.rangeNode(x.children[x.entries.length], low, high, out);
  }

  private insertNonFull(
    x: BTreeNode<K, V>,
    key: K,
    value: V
  ): void {
    let i = x.entries.length - 1;
    if (x.isLeaf) {
      // Find slot and insert (or append to existing)
      while (i >= 0 && key.compare(x.entries[i].key) < 0) i--;
      if (
        i >= 0 &&
        i < x.entries.length &&
        key.compare(x.entries[i].key) === 0
      ) {
        x.entries[i].values.push(value);
      } else {
        x.entries.splice(i + 1, 0, new Entry(key, [value]));
      }
    } else {
      while (i >= 0 && key.compare(x.entries[i].key) < 0) i--;
      i++;
      if (x.children[i].entries.length === MAX_KEYS) {
        this.splitChild(x, i);
        if (key.compare(x.entries[i].key) > 0) i++;
      }
      this.insertNonFull(x.children[i], key, value);
    }
  }

  private splitChild(x: BTreeNode<K, V>, i: number): void {
    const y = x.children[i];
    const z = new BTreeNode<K, V>();
    z.isLeaf = y.isLeaf;
    const mid = MIN_DEGREE - 1;
    z.entries = y.entries.splice(mid + 1);
    if (!y.isLeaf) z.children = y.children.splice(mid + 1);
    const median = y.entries.pop()!;
    x.entries.splice(i, 0, median);
    x.children.splice(i + 1, 0, z);
  }

  /* ------------------ deletion --------------------------------- */
  private deleteFromNode(
    x: BTreeNode<K, V>,
    key: K,
    value?: V
  ): boolean {
    const idx = x.entries.findIndex(e => e.key.compare(key) === 0);
    if (idx >= 0) {
      if (x.isLeaf) {
        if (value === undefined) {
          x.entries.splice(idx, 1);
          return true;
        }
        const vals = x.entries[idx].values;
        const vIdx = vals.indexOf(value);
        if (vIdx >= 0) {
          vals.splice(vIdx, 1);
          if (vals.length === 0) x.entries.splice(idx, 1);
          return true;
        }
        return false;
      } else {
        return this.deleteInternalNode(x, key, idx, value);
      }
    }
    if (x.isLeaf) return false;
    const (child, idxC) = this.findChild(x, key);
    if (child.entries.length === MIN_KEYS) this.fill(x, idxC);
    const target = idxC < x.entries.length ? idxC : idxC - 1;
    return this.deleteFromNode(x.children[target], key, value);
  }

  private deleteInternalNode(
    x: BTreeNode<K, V>,
    key: K,
    idx: number,
    value?: V
  ): boolean {
    const entry = x.entries[idx];
    if (entry.values.length > 1 && value !== undefined) {
      const vIdx = entry.values.indexOf(value);
      if (vIdx >= 0) {
        entry.values.splice(vIdx, 1);
        return true;
      }
      return false;
    }
    if (x.children[idx].entries.length >= MIN_DEGREE) {
      const pred = this.getPredecessor(x, idx);
      x.entries[idx] = pred;
      return this.deleteFromNode(x.children[idx], pred.key, undefined);
    } else if (x.children[idx + 1].entries.length >= MIN_DEGREE) {
      const succ = this.getSuccessor(x, idx);
      x.entries[idx] = succ;
      return this.deleteFromNode(x.children[idx + 1], succ.key, undefined);
    } else {
      this.merge(x, idx);
      return this.deleteFromNode(x.children[idx], key, value);
    }
  }

  private findChild(
    x: BTreeNode<K, V>,
    key: K
  ): { child: BTreeNode<K, V>; idx: number } {
    let i = 0;
    while (i < x.entries.length && key.compare(x.entries[i].key) > 0) i++;
    return { child: x.children[i], idx: i };
  }

  private getPredecessor(x: BTreeNode<K, V>, idx: number): Entry<K, V> {
    let cur = x.children[idx];
    while (!cur.isLeaf) cur = cur.children[cur.children.length - 1];
    return cur.entries[cur.entries.length - 1];
  }

  private getSuccessor(x: BTreeNode<K, V>, idx: number): Entry<K, V> {
    let cur = x.children[idx + 1];
    while (!cur.isLeaf) cur = cur.children[0];
    return cur.entries[0];
  }

  private fill(x: BTreeNode<K, V>, idx: number): void {
    if (idx > 0 && x.children[idx - 1].entries.length >= MIN_DEGREE)
      this.borrowFromPrev(x, idx);
    else if (
      idx < x.entries.length &&
      x.children[idx + 1].entries.length >= MIN_DEGREE
    )
      this.borrowFromNext(x, idx);
    else {
      if (idx < x.entries.length) this.merge(x, idx);
      else this.merge(x, idx - 1);
    }
  }

  private borrowFromPrev(x: BTreeNode<K, V>, idx: number): void {
    const child = x.children[idx];
    const sibling = x.children[idx - 1];
    child.entries.unshift(x.entries[idx - 1]);
    if (!child.isLeaf) child.children.unshift(sibling.children.pop()!);
    x.entries[idx - 1] = sibling.entries.pop()!;
  }

  private borrowFromNext(x: BTreeNode<K, V>, idx: number): void {
    const child = x.children[idx];
    const sibling = x.children[idx + 1];
    child.entries.push(x.entries[idx]);
    if (!child.isLeaf) child.children.push(sibling.children.shift()!);
    x.entries[idx] = sibling.entries.shift()!;
  }

  private merge(x: BTreeNode<K, V>, idx: number): void {
    const child = x.children[idx];
    const sibling = x.children[idx + 1];
    child.entries.push(x.entries[idx]);
    child.entries.push(...sibling.entries);
    if (!child.isLeaf) child.children.push(...sibling.children);
    x.entries.splice(idx, 1);
    x.children.splice(idx + 1, 1);
  }
}

/* --------------------------------------------------------------- */
/*  Small test driver                                              */
/* ---------------------------------------------------------------*/
class IntKey implements Comparable<IntKey> {
  constructor(public v: number) {}
  compare(other: IntKey): CompareResult {
    return this.v < other.v ? -1 : this.v > other.v ? 1 : 0;
  }
}

if (require.main === module) {
  const tree = new BTree<IntKey, string>();
  const rnd = (n: number) => Math.floor(Math.random() * n);
  for (let i = 0; i < 1_000; i++) tree.insert(new IntKey(rnd(500)), `v${i}`);
  console.log("Range [10,20]:", tree.range(new IntKey(10), new IntKey(20)).length);
  console.log("Search 5:", tree.search(new IntKey(5))?.length ?? 0);
}
npx tsc btree.ts && node btree.js
