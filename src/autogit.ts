// --------------  Comparable helper  --------------
type CompareResult = -1 | 0 | 1;
interface Comparable<T> {
  compare(other: T): CompareResult;
}
// A ready-made wrapper for numbers
class Num implements Comparable<Num> {
  constructor(public value: number) {}
  compare(other: Num): CompareResult {
    return this.value < other.value ? -1 : this.value > other.value ? 1 : 0;
  }
}

// --------------  B-tree  --------------
class BTree<K extends Comparable<K>, V> {
  private root: BTreeNode<K, V> | null = null;
  constructor(private readonly t: number) {
    if (t < 2) throw new Error("t must be >= 2");
  }

  // ---------- public API ----------
  search(key: K): V | undefined {
    return this.root ? this.root.search(key) : undefined;
  }

  insert(key: K, value: V): void {
    if (!this.root) {
      this.root = new BTreeNode<K, V>(true, this.t);
      this.root.keys[0] = key;
      this.root.values[0] = value;
      this.root.keyCount = 1;
    } else {
      if (this.root.isFull()) {
        const newRoot = new BTreeNode<K, V>(false, this.t);
        newRoot.children[0] = this.root;
        newRoot.splitChild(0);
        // decide which child to continue insert into
        const i = newRoot.keys[0].compare(key) > 0 ? 0 : 1;
        newRoot.children[i]!.insertNonFull(key, value);
        this.root = newRoot;
      } else {
        this.root.insertNonFull(key, value);
      }
    }
  }

  delete(key: K): boolean {
    if (!this.root) return false;
    const removed = this.root.delete(key);
    if (this.root.keyCount === 0) {
      this.root = this.root.isLeaf ? null : this.root.children[0]!;
    }
    return removed;
  }

  *inOrder(): IterableIterator<[K, V]> {
    if (this.root) yield* this.root.inOrder();
  }

  // ---------- helpers ----------
  toString(): string {
    const out: string[] = [];
    this.root?.print(out, 0);
    return out.join("\n");
  }
}

// --------------  Node  --------------
class BTreeNode<K extends Comparable<K>, V> {
  keyCount = 0;
  keys: (K | undefined)[] = [];
  values: (V | undefined)[] = [];
  children: (BTreeNode<K, V> | null)[] = [];

  constructor(public readonly isLeaf: boolean, private readonly t: number) {
    const size = 2 * t - 1;
    this.keys = new Array(size);
    this.values = new Array(size);
    this.children = new Array(size + 1);
  }

  isFull(): boolean {
    return this.keyCount === 2 * this.t - 1;
  }

  search(key: K): V | undefined {
    let i = 0;
    while (i < this.keyCount && key.compare(this.keys[i]!)! > 0) i++;
    if (i < this.keyCount && key.compare(this.keys[i]!) === 0)
      return this.values[i];
    if (this.isLeaf) return undefined;
    return this.children[i]!.search(key);
  }

  insertNonFull(key: K, value: V): void {
    let i = this.keyCount - 1;
    if (this.isLeaf) {
      while (i >= 0 && key.compare(this.keys[i]!) < 0) {
        this.keys[i + 1] = this.keys[i];
        this.values[i + 1] = this.values[i];
        i--;
      }
      this.keys[i + 1] = key;
      this.values[i + 1] = value;
      this.keyCount++;
    } else {
      while (i >= 0 && key.compare(this.keys[i]!) < 0) i--;
      i++;
      if (this.children[i]!.isFull()) {
        this.splitChild(i);
        if (key.compare(this.keys[i]!) > 0) i++;
      }
      this.children[i]!.insertNonFull(key, value);
    }
  }

  splitChild(i: number): void {
    const t = this.t;
    const y = this.children[i]!;
    const z = new BTreeNode<K, V>(y.isLeaf, t);
    z.keyCount = t - 1;
    for (let j = 0; j < t - 1; j++) {
      z.keys[j] = y.keys[j + t];
      z.values[j] = y.values[j + t];
    }
    if (!y.isLeaf) {
      for (let j = 0; j < t; j++) z.children[j] = y.children[j + t];
    }
    y.keyCount = t - 1;
    for (let j = this.keyCount; j >= i + 1; j--)
      this.children[j + 1] = this.children[j];
    this.children[i + 1] = z;
    for (let j = this.keyCount - 1; j >= i; j--) {
      this.keys[j + 1] = this.keys[j];
      this.values[j + 1] = this.values[j];
    }
    this.keys[i] = y.keys[t - 1];
    this.values[i] = y.values[t - 1];
    this.keyCount++;
  }

  delete(key: K): boolean {
    const t = this.t;
    let idx = 0;
    while (idx < this.keyCount && this.keys[idx]!.compare(key) < 0) idx++;

    if (idx < this.keyCount && this.keys[idx]!.compare(key) === 0) {
      if (this.isLeaf) {
        // Case 1: key in leaf
        for (let i = idx; i < this.keyCount - 1; i++) {
          this.keys[i] = this.keys[i + 1];
          this.values[i] = this.values[i + 1];
        }
        this.keyCount--;
        return true;
      } else {
        // Case 2: internal node
        const k = this.keys[idx]!;
        // 2a: left child has t keys
        if (this.children[idx]!.keyCount >= t) {
          const [predK, predV] = this.getPred(idx);
          this.keys[idx] = predK;
          this.values[idx] = predV;
          return this.children[idx]!.delete(predK);
        }
        // 2b: right child has t keys
        else if (this.children[idx + 1]!.keyCount >= t) {
          const [succK, succV] = this.getSucc(idx);
          this.keys[idx] = succK;
          this.values[idx] = succV;
          return this.children[idx + 1]!.delete(succK);
        }
        // 2c: both have t-1 -> merge
        else {
          this.merge(idx);
          return this.children[idx]!.delete(key);
        }
      }
    } else {
      // Case 3: key not in this node
      if (this.isLeaf) return false;
      const flag = idx === this.keyCount;
      if (this.children[idx]!.keyCount < t) this.fill(idx);
      const toCall = flag && idx > this.keyCount ? this.children[idx - 1] : this.children[idx];
      return toCall!.delete(key);
    }
  }

  private getPred(idx: number): [K, V] {
    let cur = this.children[idx]!;
    while (!cur.isLeaf) cur = cur.children[cur.keyCount]!;
    return [cur.keys[cur.keyCount - 1]!, cur.values[cur.keyCount - 1]!];
  }
  private getSucc(idx: number): [K, V] {
    let cur = this.children[idx + 1]!;
    while (!cur.isLeaf) cur = cur.children[0]!;
    return [cur.keys[0]!, cur.values[0]!];
  }

  private merge(idx: number): void {
    const t = this.t;
    const child = this.children[idx]!;
    const sibling = this.children[idx + 1]!;
    child.keys[t - 1] = this.keys[idx];
    child.values[t - 1] = this.values[idx];
    for (let i = 0; i < sibling.keyCount; i++) {
      child.keys[i + t] = sibling.keys[i];
      child.values[i + t] = sibling.values[i];
    }
    if (!child.isLeaf) {
      for (let i = 0; i <= sibling.keyCount; i++)
        child.children[i + t] = sibling.children[i];
    }
    for (let i = idx + 1; i < this.keyCount; i++) {
      this.keys[i - 1] = this.keys[i];
      this.values[i - 1] = this.values[i];
    }
    for (let i = idx + 2; i <= this.keyCount; i++) this.children[i - 1] = this.children[i];
    child.keyCount += sibling.keyCount + 1;
    this.keyCount--;
  }

  private fill(idx: number): void {
    const t = this.t;
    if (idx !== 0 && this.children[idx - 1]!.keyCount >= t) this.borrowFromPrev(idx);
    else if (idx !== this.keyCount && this.children[idx + 1]!.keyCount >= t) this.borrowFromNext(idx);
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
    if (!child.isLeaf) child.children[1] = child.children[0];
    child.keys[0] = this.keys[idx - 1];
    child.values[0] = this.values[idx - 1];
    if (!child.isLeaf) child.children[0] = sibling.children[sibling.keyCount];
    this.keys[idx - 1] = sibling.keys[sibling.keyCount - 1]!;
    this.values[idx - 1] = sibling.values[sibling.keyCount - 1]!;
    child.keyCount++;
    sibling.keyCount--;
  }

  private borrowFromNext(idx: number): void {
    const child = this.children[idx]!;
    const sibling = this.children[idx + 1]!;
    child.keys[child.keyCount] = this.keys[idx];
    child.values[child.keyCount] = this.values[idx];
    if (!child.isLeaf) child.children[child.keyCount + 1] = sibling.children[0];
    this.keys[idx] = sibling.keys[0]!;
    this.values[idx] = sibling.values[0]!;
    for (let i = 1; i < sibling.keyCount; i++) {
      sibling.keys[i - 1] = sibling.keys[i];
      sibling.values[i - 1] = sibling.values[i];
    }
    if (!sibling.isLeaf) {
      for (let i = 1; i <= sibling.keyCount; i++) sibling.children[i - 1] = sibling.children[i];
    }
    child.keyCount++;
    sibling.keyCount--;
  }

  *inOrder(): IterableIterator<[K, V]> {
    for (let i = 0; i < this.keyCount; i++) {
      if (!this.isLeaf) yield* this.children[i]!.inOrder();
      yield [this.keys[i]!, this.values[i]!];
    }
    if (!this.isLeaf) yield* this.children[this.keyCount]!.inOrder();
  }

  print(out: string[], depth: number): void {
    const indent = "  ".repeat(depth);
    out.push(`${indent}${this.keys.slice(0, this.keyCount).map(k => (k as any).value ?? k).join(" | ")}`);
    if (!this.isLeaf) {
      for (let i = 0; i <= this.keyCount; i++) this.children[i]!.print(out, depth + 1);
    }
  }
}

// --------------  quick demo  --------------
if (require.main === module) {
  const tree = new BTree<Num, string>(3); // t=3 -> 2..5 keys per node
  const data = [10, 20, 5, 6, 12, 30, 7, 17];
  data.forEach(v => tree.insert(new Num(v), `val${v}`));
  console.log("Tree after inserts:\n" + tree.toString());

  tree.delete(new Num(6));
  tree.delete(new Num(10));
  console.log("\nAfter deleting 6,10:\n" + tree.toString());

  console.log("\nIn-order traversal:");
  for (const [k, v] of tree.inOrder()) console.log(k.value, v);
}
tsc BTree.ts --target es2017 --module commonjs
node BTree.js
