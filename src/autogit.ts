/**
 * Generic B-tree (order t) in TypeScript
 * Keys must be totally ordered (string | number | Date | …)
 */
export class BTree<T> {
  private root: BTreeNode<T> | null = null;

  constructor(
    private readonly t: number,           // minimum degree (t ≥ 2)
    private readonly cmp: (a: T, b: T) => number
  ) {
    if (t < 2) throw new Error('t must be ≥ 2');
  }

  /* ---------- public API ---------- */
  search(key: T): T | null {
    return this.root ? this._search(this.root, key) : null;
  }

  insert(key: T) {
    if (!this.root) {
      this.root = new BTreeNode<T>(true, this.t);
      this.root.keys[0] = key;
      this.root.n = 1;
      return;
    }
    // root is full → split before descending
    if (this.root.n === 2 * this.t - 1) {
      const s = new BTreeNode<T>(false, this.t);
      s.children[0] = this.root;
      this.splitChild(s, 0);
      this.root = s;
    }
    this._insertNonFull(this.root, key);
  }

  delete(key: T) {
    if (!this.root) return;
    this._delete(this.root, key);
    // shrink tree height if root became empty
    if (this.root.n === 0) {
      this.root = this.root.children[0] ?? null;
    }
  }

  *inOrder(): Generator<T> {
    if (this.root) yield* this._inOrder(this.root);
  }

  /* ---------- internal helpers ---------- */
  private _search(node: BTreeNode<T>, key: T): T | null {
    let i = 0;
    while (i < node.n && this.cmp(key, node.keys[i]) > 0) i++;
    if (i < node.n && this.cmp(key, node.keys[i]) === 0) return node.keys[i];
    if (node.leaf) return null;
    return this._search(node.children[i]!, key);
  }

  private splitChild(parent: BTreeNode<T>, idx: number) {
    const t = this.t;
    const full = parent.children[idx]!;
    const right = new BTreeNode<T>(full.leaf, t);
    right.n = t - 1;

    // move keys & children
    for (let j = 0; j < t - 1; j++) right.keys[j] = full.keys[j + t];
    if (!full.leaf) {
      for (let j = 0; j < t; j++) right.children[j] = full.children[j + t];
    }
    full.n = t - 1;

    // insert new child into parent
    for (let j = parent.n; j > idx; j--) parent.children[j + 1] = parent.children[j];
    parent.children[idx + 1] = right;

    for (let j = parent.n - 1; j >= idx; j--) parent.keys[j + 1] = parent.keys[j];
    parent.keys[idx] = full.keys[t - 1];
    parent.n++;
  }

  private _insertNonFull(node: BTreeNode<T>, key: T) {
    let i = node.n - 1;
    if (node.leaf) {
      while (i >= 0 && this.cmp(key, node.keys[i]) < 0) {
        node.keys[i + 1] = node.keys[i];
        i--;
      }
      node.keys[i + 1] = key;
      node.n++;
    } else {
      while (i >= 0 && this.cmp(key, node.keys[i]) < 0) i--;
      i++;
      if (node.children[i]!.n === 2 * this.t - 1) {
        this.splitChild(node, i);
        if (this.cmp(key, node.keys[i]) > 0) i++;
      }
      this._insertNonFull(node.children[i]!, key);
    }
  }

  /* ---------- delete helpers ---------- */
  private _delete(node: BTreeNode<T>, key: T) {
    const t = this.t;
    let idx = 0;
    while (idx < node.n && this.cmp(key, node.keys[idx]) > 0) idx++;

    if (idx < node.n && this.cmp(key, node.keys[idx]) === 0) {
      // key is in current node
      if (node.leaf) {
        // Case 1: leaf
        for (let i = idx; i < node.n - 1; i++) node.keys[i] = node.keys[i + 1];
        node.n--;
      } else {
        // Cases 2a,2b,2c
        this.deleteInternalNode(node, key, idx);
      }
    } else {
      // key not in current node
      if (node.leaf) return; // not found
      const flag = idx === node.n;
      if (node.children[idx]!.n < t) this.fill(node, idx);
      const target = flag && idx > node.n ? node.children[idx - 1]! : node.children[idx]!;
      this._delete(target, key);
    }
  }

  private deleteInternalNode(node: BTreeNode<T>, key: T, idx: number) {
    const t = this.t;
    const k = node.keys[idx];

    if (node.children[idx]!.n >= t) {
      // Case 2a: left sibling has enough
      const pred = this.getPred(node, idx);
      node.keys[idx] = pred;
      this._delete(node.children[idx]!, pred);
    } else if (node.children[idx + 1]!.n >= t) {
      // Case 2b: right sibling has enough
      const succ = this.getSucc(node, idx);
      node.keys[idx] = succ;
      this._delete(node.children[idx + 1]!, succ);
    } else {
      // Case 2c: merge with right sibling
      this.merge(node, idx);
      this._delete(node.children[idx]!, k);
    }
  }

  private getPred(node: BTreeNode<T>, idx: number): T {
    let cur = node.children[idx]!;
    while (!cur.leaf) cur = cur.children[cur.n]!;
    return cur.keys[cur.n - 1];
  }

  private getSucc(node: BTreeNode<T>, idx: number): T {
    let cur = node.children[idx + 1]!;
    while (!cur.leaf) cur = cur.children[0]!;
    return cur.keys[0];
  }

  private fill(node: BTreeNode<T>, idx: number) {
    const t = this.t;
    if (idx > 0 && node.children[idx - 1]!.n >= t) this.borrowFromPrev(node, idx);
    else if (idx < node.n && node.children[idx + 1]!.n >= t) this.borrowFromNext(node, idx);
    else {
      if (idx < node.n) this.merge(node, idx);
      else this.merge(node, idx - 1);
    }
  }

  private borrowFromPrev(node: BTreeNode<T>, idx: number) {
    const child = node.children[idx]!;
    const sibling = node.children[idx - 1]!;
    for (let i = child.n - 1; i >= 0; i--) child.keys[i + 1] = child.keys[i];
    if (!child.leaf) for (let i = child.n; i >= 0; i--) child.children[i + 1] = child.children[i];
    child.keys[0] = node.keys[idx - 1];
    if (!child.leaf) child.children[0] = sibling.children[sibling.n]!;
    node.keys[idx - 1] = sibling.keys[sibling.n - 1];
    child.n++;
    sibling.n--;
  }

  private borrowFromNext(node: BTreeNode<T>, idx: number) {
    const child = node.children[idx]!;
    const sibling = node.children[idx + 1]!;
    child.keys[child.n] = node.keys[idx];
    if (!child.leaf) child.children[child.n + 1] = sibling.children[0]!;
    node.keys[idx] = sibling.keys[0];
    for (let i = 1; i < sibling.n; i++) sibling.keys[i - 1] = sibling.keys[i];
    if (!sibling.leaf) for (let i = 0; i < sibling.n; i++) sibling.children[i] = sibling.children[i + 1];
    child.n++;
    sibling.n--;
  }

  private merge(node: BTreeNode<T>, idx: number) {
    const t = this.t;
    const child = node.children[idx]!;
    const sibling = node.children[idx + 1]!;
    child.keys[t - 1] = node.keys[idx];
    for (let i = 0; i < sibling.n; i++) child.keys[i + t] = sibling.keys[i];
    if (!child.leaf) for (let i = 0; i <= sibling.n; i++) child.children[i + t] = sibling.children[i];
    for (let i = idx + 1; i < node.n; i++) node.keys[i - 1] = node.keys[i];
    for (let i = idx + 2; i <= node.n; i++) node.children[i - 1] = node.children[i];
    child.n += sibling.n + 1;
    node.n--;
  }

  private *_inOrder(node: BTreeNode<T>): Generator<T> {
    for (let i = 0; i < node.n; i++) {
      if (!node.leaf) yield* this._inOrder(node.children[i]!);
      yield node.keys[i];
    }
    if (!node.leaf) yield* this._inOrder(node.children[node.n]!);
  }
}

/* ---------- node definition ---------- */
class BTreeNode<T> {
  public n: number;                       // current number of keys
  public keys: T[] = [];
  public children: (BTreeNode<T> | null)[] = [];
  constructor(
    public leaf: boolean,
    t: number
  ) {
    this.n = 0;
    this.keys = new Array(2 * t - 1);
    this.children = new Array(2 * t);
  }
}

/* ---------- quick demo ---------- */
if (require.main === module) {
  const tree = new BTree<number>(3, (a, b) => a - b);
  const data = [10, 20, 5, 6, 12, 30, 7, 17];
  data.forEach(n => tree.insert(n));
  console.log('In-order after insert:', [...tree.inOrder()]);
  tree.delete(10);
  console.log('After delete 10:', [...tree.inOrder()]);
  console.log('Search 17:', tree.search(17));
  console.log('Search 42:', tree.search(42));
}
npx tsc btree.ts --target es2020 --module commonjs
node btree.js
