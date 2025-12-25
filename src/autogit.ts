/* -----------------------------------------
 *  B-tree in TypeScript – plain, no B+ twist
 * ----------------------------------------- */

/* ---------- 1. Comparable contract ---------- */
type CompareResult = -1 | 0 | 1;
interface Comparable<T> {
  compare(other: T): CompareResult;
}

/* ---------- 2. Entry = key + value ---------- */
class Entry<K extends Comparable<K>, V> {
  constructor(public key: K, public value: V) {}
}

/* ---------- 3. Node ---------- */
class BTreeNode<K extends Comparable<K>, V> {
  entries: Array<Entry<K, V>> = [];   // keys + values
  children: Array<BTreeNode<K, V>> = []; // subtrees (length = 0 for leaves)

  constructor(public isLeaf: boolean) {}

  /* ---- helpers ---- */
  get length(): number { return this.entries.length; }
}

/* ---------- 4. Tree ---------- */
export class BTree<K extends Comparable<K>, V> {
  private root: BTreeNode<K, V>;
  private readonly t: number;          // minimum degree

  constructor(degree: number) {
    if (degree < 2) throw new Error('degree must be ≥ 2');
    this.t = degree;
    this.root = new BTreeNode<K, V>(true);
  }

  /* ---------------- search ---------------- */
  search(key: K): V | undefined {
    return this.searchNode(this.root, key);
  }

  private searchNode(node: BTreeNode<K, V>, key: K): V | undefined {
    let i = 0;
    while (i < node.length && key.compare(node.entries[i].key) > 0) i++;

    if (i < node.length && key.compare(node.entries[i].key) === 0)
      return node.entries[i].value;

    if (node.isLeaf) return undefined;
    return this.searchNode(node.children[i], key);
  }

  /* ---------------- insert ---------------- */
  insert(key: K, value: V): void {
    const r = this.root;
    if (r.length === 2 * this.t - 1) {           // root is full
      const s = new BTreeNode<K, V>(false);
      this.root = s;
      s.children.push(r);
      this.splitChild(s, 0);
      this.insertNonFull(s, key, value);
    } else {
      this.insertNonFull(r, key, value);
    }
  }

  private insertNonFull(node: BTreeNode<K, V>, key: K, value: V): void {
    let i = node.length - 1;

    if (node.isLeaf) {
      // make room and insert
      node.entries.push(null as any);
      while (i >= 0 && key.compare(node.entries[i].key) < 0) {
        node.entries[i + 1] = node.entries[i];
        i--;
      }
      node.entries[i + 1] = new Entry(key, value);
    } else {
      // find subtree
      while (i >= 0 && key.compare(node.entries[i].key) < 0) i--;
      i++;
      if (node.children[i].length === 2 * this.t - 1) {
        this.splitChild(node, i);
        if (key.compare(node.entries[i].key) > 0) i++;
      }
      this.insertNonFull(node.children[i], key, value);
    }
  }

  private splitChild(parent: BTreeNode<K, V>, index: number): void {
    const t = this.t;
    const y = parent.children[index];
    const z = new BTreeNode<K, V>(y.isLeaf);

    // middle key moves up
    parent.entries.splice(index, 0, y.entries[t - 1]);
    parent.children.splice(index + 1, 0, z);

    // z gets right half
    z.entries = y.entries.splice(t, t - 1);
    if (!y.isLeaf) {
      z.children = y.children.splice(t, t);
    }
  }

  /* ---------------- delete ---------------- */
  delete(key: K): boolean {
    const { deleted, newRoot } = this.deleteFromNode(this.root, key);
    if (newRoot.length === 0 && !newRoot.isLeaf && newRoot.children.length === 1) {
      // shrink height
      this.root = newRoot.children[0];
    } else {
      this.root = newRoot;
    }
    return deleted;
  }

  private deleteFromNode(
    node: BTreeNode<K, V>,
    key: K
  ): { deleted: boolean; newRoot: BTreeNode<K, V> } {
    const t = this.t;
    let idx = 0;
    while (idx < node.length && key.compare(node.entries[idx].key) > 0) idx++;

    if (idx < node.length && key.compare(node.entries[idx].key) === 0) {
      // key is in this node
      if (node.isLeaf) {
        node.entries.splice(idx, 1);
        return { deleted: true, newRoot: node };
      } else {
        // internal node
        if (node.children[idx].length >= t) {
          const pred = this.getPredecessor(node, idx);
          node.entries[idx] = pred;
          const { deleted, newRoot } = this.deleteFromNode(node.children[idx], pred.key);
          node.children[idx] = newRoot;
          return { deleted, newRoot: node };
        } else if (node.children[idx + 1].length >= t) {
          const succ = this.getSuccessor(node, idx);
          node.entries[idx] = succ;
          const { deleted, newRoot } = this.deleteFromNode(node.children[idx + 1], succ.key);
          node.children[idx + 1] = newRoot;
          return { deleted, newRoot: node };
        } else {
          // merge with right sibling
          this.merge(node, idx);
          const { deleted, newRoot } = this.deleteFromNode(node.children[idx], key);
          node.children[idx] = newRoot;
          return { deleted, newRoot: node };
        }
      }
    } else {
      // key not in this node
      if (node.isLeaf) return { deleted: false, newRoot: node };
      const childIdx = idx;
      let child = node.children[childIdx];
      if (child.length < t) this.fill(node, childIdx);
      const { deleted, newRoot } = this.deleteFromNode(node.children[childIdx], key);
      node.children[childIdx] = newRoot;
      return { deleted, newRoot: node };
    }
  }

  private getPredecessor(node: BTreeNode<K, V>, idx: number): Entry<K, V> {
    let cur = node.children[idx];
    while (!cur.isLeaf) cur = cur.children[cur.length];
    return cur.entries[cur.length - 1];
  }

  private getSuccessor(node: BTreeNode<K, V>, idx: number): Entry<K, V> {
    let cur = node.children[idx + 1];
    while (!cur.isLeaf) cur = cur.children[0];
    return cur.entries[0];
  }

  private merge(node: BTreeNode<K, V>, idx: number): void {
    const t = this.t;
    const child = node.children[idx];
    const sibling = node.children[idx + 1];

    child.entries.push(node.entries[idx]);
    child.entries.push(...sibling.entries);
    if (!child.isLeaf) child.children.push(...sibling.children);

    node.entries.splice(idx, 1);
    node.children.splice(idx + 1, 1);
  }

  private fill(node: BTreeNode<K, V>, idx: number): void {
    const t = this.t;
    if (idx > 0 && node.children[idx - 1].length >= t) this.borrowFromPrev(node, idx);
    else if (idx < node.length && node.children[idx + 1].length >= t) this.borrowFromNext(node, idx);
    else {
      if (idx < node.length) this.merge(node, idx);
      else this.merge(node, idx - 1);
    }
  }

  private borrowFromPrev(node: BTreeNode<K, V>, idx: number): void {
    const child = node.children[idx];
    const sibling = node.children[idx - 1];

    child.entries.unshift(node.entries[idx - 1]);
    if (!child.isLeaf) child.children.unshift(sibling.children.pop()!);
    node.entries[idx - 1] = sibling.entries.pop()!;
  }

  private borrowFromNext(node: BTreeNode<K, V>, idx: number): void {
    const child = node.children[idx];
    const sibling = node.children[idx + 1];

    child.entries.push(node.entries[idx]);
    if (!child.isLeaf) child.children.push(sibling.children.shift()!);
    node.entries[idx] = sibling.entries.shift()!;
  }

  /* ---------------- debug ---------------- */
  toString(): string {
    return this.nodeToString(this.root, '', true);
  }

  private nodeToString(node: BTreeNode<K, V>, prefix: string, isTail: boolean): string {
    let s = '';
    const entries = node.entries.map(e => `${e.key}`).join(',');
    s += prefix + (isTail ? '└── ' : '├── ') + `[${entries}]\n`;
    if (!node.isLeaf) {
      for (let i = 0; i < node.children.length; i++) {
        const last = i === node.children.length - 1;
        s += this.nodeToString(node.children[i], prefix + (isTail ? '    ' : '│   '), last);
      }
    }
    return s;
  }
}

/* ---------- 5. Tiny demo ---------- */
class IntKey implements Comparable<IntKey> {
  constructor(public value: number) {}
  compare(other: IntKey): CompareResult {
    return this.value < other.value ? -1 : this.value > other.value ? 1 : 0;
  }
  toString() { return this.value.toString(); }
}

if (require.main === module) {
  const tree = new BTree<IntKey, string>(3); // degree 3 → max 5 keys/node
  for (let i = 1; i <= 20; i++) tree.insert(new IntKey(i), `val${i}`);
  console.log(tree.toString());

  tree.delete(new IntKey(5));
  tree.delete(new IntKey(10));
  console.log(tree.toString());

  console.log('Search 7 ->', tree.search(new IntKey(7)));
  console.log('Search 99 ->', tree.search(new IntKey(99)));
}
