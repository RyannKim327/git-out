// btree.ts
type Comparator<T> = (a: T, b: T) => number;

class BTree<K, V> {
  private readonly t: number;          // minimum degree (≥2)
  private readonly cmp: Comparator<K>;
  private root: BTreeNode<K, V> | null = null;

  constructor(t: number, cmp: Comparator<K>) {
    if (t < 2) throw new Error('t must be ≥ 2');
    this.t = t;
    this.cmp = cmp;
  }

  /* ---------- Public API ---------- */
  search(key: K): V | undefined {
    return this.root ? this.root.search(key) : undefined;
  }

  insert(key: K, value: V): void {
    if (!this.root) {
      this.root = new BTreeNode<K, V>(this.t, true);
      this.root.keys[0] = key;
      this.root.values[0] = value;
      this.root.keyCount = 1;
    } else {
      if (this.root.keyCount === 2 * this.t - 1) {
        const s = new BTreeNode<K, V>(this.t, false);
        s.children[0] = this.root;
        s.splitChild(0, this.root);
        let i = 0;
        if (this.cmp(key, s.keys[0])! > 0) i++;
        s.children[i]!.insertNonFull(key, value, this.cmp);
        this.root = s;
      } else {
        this.root.insertNonFull(key, value, this.cmp);
      }
    }
  }

  delete(key: K): boolean {
    if (!this.root) return false;
    const res = this.root.delete(key, this.cmp);
    if (this.root.keyCount === 0) {
      this.root = this.root.leaf ? null : this.root.children[0];
    }
    return res;
  }

  range(low: K, high: K): Array<[K, V]> {
    const out: Array<[K, V]> = [];
    if (this.root) this.root.range(low, high, this.cmp, out);
    return out;
  }

  /* ---------- Internal node ---------- */
}

class BTreeNode<K, V> {
  readonly t: number;
  readonly leaf: boolean;
  keys: K[] = [];
  values: V[] = [];
  children: (BTreeNode<K, V> | null)[] = [];
  keyCount: number = 0;

  constructor(t: number, leaf: boolean) {
    this.t = t;
    this.leaf = leaf;
    this.keys = new Array(2 * t - 1);
    this.values = new Array(2 * t - 1);
    if (!leaf) this.children = new Array(2 * t);
  }

  search(key: K): V | undefined {
    let i = 0;
    while (i < this.keyCount && this.cmp(key, this.keys[i]) > 0) i++;
    if (i < this.keyCount && this.cmp(key, this.keys[i]) === 0) return this.values[i];
    if (this.leaf) return undefined;
    return this.children[i]!.search(key);
  }

  insertNonFull(key: K, value: V, cmp: Comparator<K>): void {
    let i = this.keyCount - 1;
    if (this.leaf) {
      while (i >= 0 && cmp(key, this.keys[i]) < 0) {
        this.keys[i + 1] = this.keys[i];
        this.values[i + 1] = this.values[i];
        i--;
      }
      this.keys[i + 1] = key;
      this.values[i + 1] = value;
      this.keyCount++;
    } else {
      while (i >= 0 && cmp(key, this.keys[i]) < 0) i--;
      i++;
      if (this.children[i]!.keyCount === 2 * this.t - 1) {
        this.splitChild(i, this.children[i]!);
        if (cmp(key, this.keys[i]) > 0) i++;
      }
      this.children[i]!.insertNonFull(key, value, cmp);
    }
  }

  splitChild(i: number, y: BTreeNode<K, V>): void {
    const z = new BTreeNode<K, V>(this.t, y.leaf);
    z.keyCount = this.t - 1;
    for (let j = 0; j < this.t - 1; j++) {
      z.keys[j] = y.keys[j + this.t];
      z.values[j] = y.values[j + this.t];
    }
    if (!y.leaf) {
      for (let j = 0; j < this.t; j++) z.children[j] = y.children[j + this.t];
    }
    y.keyCount = this.t - 1;
    for (let j = this.keyCount; j >= i + 1; j--) this.children[j + 1] = this.children[j];
    this.children[i + 1] = z;
    for (let j = this.keyCount - 1; j >= i; j--) {
      this.keys[j + 1] = this.keys[j];
      this.values[j + 1] = this.values[j];
    }
    this.keys[i] = y.keys[this.t - 1];
    this.values[i] = y.values[this.t - 1];
    this.keyCount++;
  }

  delete(key: K, cmp: Comparator<K>): boolean {
    let idx = 0;
    while (idx < this.keyCount && cmp(key, this.keys[idx]) > 0) idx++;
    if (idx < this.keyCount && cmp(key, this.keys[idx]) === 0) {
      if (this.leaf) {
        for (let i = idx; i < this.keyCount - 1; i++) {
          this.keys[i] = this.keys[i + 1];
          this.values[i] = this.values[i + 1];
        }
        this.keyCount--;
        return true;
      } else {
        this.deleteInternal(idx, cmp);
        return true;
      }
    }
    if (this.leaf) return false;
    const flag = idx < this.keyCount && this.children[idx]!.keyCount >= this.t;
    if (this.children[idx]!.keyCount < this.t) this.fill(idx, cmp);
    const nxt = flag && idx > this.keyCount ? this.children[idx - 1] : this.children[idx];
    return nxt!.delete(key, cmp);
  }

  private deleteInternal(idx: number, cmp: Comparator<K>): void {
    const k = this.keys[idx];
    if (this.children[idx]!.keyCount >= this.t) {
      const [predKey, predVal] = this.getPred(idx);
      this.keys[idx] = predKey;
      this.values[idx] = predVal;
      this.children[idx]!.delete(predKey, cmp);
    } else if (this.children[idx + 1]!.keyCount >= this.t) {
      const [succKey, succVal] = this.getSucc(idx);
      this.keys[idx] = succKey;
      this.values[idx] = succVal;
      this.children[idx + 1]!.delete(succKey, cmp);
    } else {
      this.merge(idx);
      this.children[idx]!.delete(k, cmp);
    }
  }

  private getPred(idx: number): [K, V] {
    let cur = this.children[idx]!;
    while (!cur.leaf) cur = cur.children[cur.keyCount]!;
    return [cur.keys[cur.keyCount - 1], cur.values[cur.keyCount - 1]];
  }

  private getSucc(idx: number): [K, V] {
    let cur = this.children[idx + 1]!;
    while (!cur.leaf) cur = cur.children[0]!;
    return [cur.keys[0], cur.values[0]];
  }

  private fill(idx: number, cmp: Comparator<K>): void {
    if (idx !== 0 && this.children[idx - 1]!.keyCount >= this.t) this.borrowFromPrev(idx);
    else if (idx !== this.keyCount && this.children[idx + 1]!.keyCount >= this.t) this.borrowFromNext(idx);
    else {
      if (idx !== this.keyCount) this.merge(idx);
      else this.merge(idx - 1);
    }
  }

  private borrowFromPrev(idx: number): void {
    const child = this.children[idx]!;
    const sibling = this.children[idx - 1]!;
    for (let i = child.keyCount - 1; i >= 0; i--) {
      child.keys[i + 1] = child.keys[i];
      child.values[i + 1] = child.values[i];
    }
    if (!child.leaf) child.children[1] = child.children[0];
    child.keys[0] = this.keys[idx - 1];
    child.values[0] = this.values[idx - 1];
    if (!child.leaf) child.children[0] = sibling.children[sibling.keyCount];
    this.keys[idx - 1] = sibling.keys[sibling.keyCount - 1];
    this.values[idx - 1] = sibling.values[sibling.keyCount - 1];
    child.keyCount++;
    sibling.keyCount--;
  }

  private borrowFromNext(idx: number): void {
    const child = this.children[idx]!;
    const sibling = this.children[idx + 1]!;
    child.keys[child.keyCount] = this.keys[idx];
    child.values[child.keyCount] = this.values[idx];
    if (!child.leaf) child.children[child.keyCount + 1] = sibling.children[0];
    this.keys[idx] = sibling.keys[0];
    this.values[idx] = sibling.values[0];
    for (let i = 1; i < sibling.keyCount; i++) {
      sibling.keys[i - 1] = sibling.keys[i];
      sibling.values[i - 1] = sibling.values[i];
    }
    if (!sibling.leaf) {
      for (let i = 1; i <= sibling.keyCount; i++) sibling.children[i - 1] = sibling.children[i];
    }
    child.keyCount++;
    sibling.keyCount--;
  }

  private merge(idx: number): void {
    const child = this.children[idx]!;
    const sibling = this.children[idx + 1]!;
    child.keys[this.t - 1] = this.keys[idx];
    child.values[this.t - 1] = this.values[idx];
    for (let i = 0; i < sibling.keyCount; i++) {
      child.keys[i + this.t] = sibling.keys[i];
      child.values[i + this.t] = sibling.values[i];
    }
    if (!child.leaf) {
      for (let i = 0; i <= sibling.keyCount; i++) child.children[i + this.t] = sibling.children[i];
    }
    for (let i = idx + 1; i < this.keyCount; i++) {
      this.keys[i - 1] = this.keys[i];
      this.values[i - 1] = this.values[i];
      this.children[i] = this.children[i + 1];
    }
    child.keyCount += sibling.keyCount + 1;
    this.keyCount--;
  }

  range(low: K, high: K, cmp: Comparator<K>, out: Array<[K, V]>): void {
    for (let i = 0; i < this.keyCount; i++) {
      if (!this.leaf) this.children[i]!.range(low, high, cmp, out);
      if (cmp(this.keys[i], low) >= 0 && cmp(this.keys[i], high) <= 0) out.push([this.keys[i], this.values[i]]);
    }
    if (!this.leaf) this.children[this.keyCount]!.range(low, high, cmp, out);
  }

  private cmp: Comparator<K> = (a, b) => (a as any) - (b as any); // placeholder, overridden
}

/* ---------- Demo ---------- */
if (require.main === module) {
  const btree = new BTree<number, string>(3, (a, b) => a - b);
  const data = [20, 10, 30, 5, 15, 25, 35, 1, 7, 13, 18, 22, 27, 33, 37];
  data.forEach(n => btree.insert(n, `val${n}`));
  console.log('Search 15:', btree.search(15));
  console.log('Range [15,30]:', btree.range(15, 30));
  btree.delete(15);
  console.log('After delete 15, search 15:', btree.search(15));
}
npx tsc btree.ts
node btree.js
