// A "comparable" type: any that supports the < and > operators.
type Comparable = number | string | { compareTo(other: this): number };

interface INode<K extends Comparable, V> {
  keys: K[];
  values: V[];      // same length as keys
  children: (INode<K, V> | null)[];
  leaf: boolean;
}
const compare = <K extends Comparable>(a: K, b: K): number => {
  if (typeof a === 'number' || typeof a === 'string')
    return a < b ? -1 : a > b ? 1 : 0;
  return a.compareTo(b);
};

const findIndex = <K extends Comparable>(arr: K[], key: K): number => {
  // binary search – returns the position where key should be inserted
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    const cmp = compare(arr[mid], key);
    if (cmp === 0) return mid;
    if (cmp < 0) low = mid + 1; else high = mid - 1;
  }
  return low; // insertion point
};
class BTreeNode<K extends Comparable, V> implements INode<K, V> {
  keys: K[] = [];
  values: V[] = [];
  children: (BTreeNode<K, V> | null)[] = [];
  leaf: boolean;

  constructor(leaf: boolean) {
    this.leaf = leaf;
  }
}
export class BTree<K extends Comparable, V> {
  readonly order: number;          // minimum number of keys per node (t)
  private root: BTreeNode<K, V>;

  constructor(order: number) {
    if (order < 2) throw new Error('B‑Tree order must be ≥ 2');
    this.order = order;
    this.root = new BTreeNode<K, V>(true);   // start with a leaf
  }

  /* ---------- Public API ---------- */
  public search(key: K): V | undefined {
    return this.searchNode(this.root, key);
  }

  public insert(key: K, value: V): void {
    if (this.root.keys.length === 2 * this.order - 1) {
      // root is full – split it
      const newRoot = new BTreeNode<K, V>(false);
      newRoot.children[0] = this.root;
      this.splitChild(newRoot, 0);
      this.root = newRoot;
    }
    this.insertNonFull(this.root, key, value);
  }

  public delete(key: K): void {
    this.deleteNode(this.root, key);
    // shrink the root if it becomes empty
    if (!this.root.leaf && this.root.keys.length === 0) {
      this.root = this.root.children[0]!;
    }
  }

  /* ---------- Traversal helpers (optional) ---------- */
  public *inOrder(): IterableIterator<[K, V]> {
    yield* this.inOrderNode(this.root);
  }

  /* ---------- Internal helpers ---------- */
  private searchNode(node: BTreeNode<K, V>, key: K): V | undefined {
    const i = findIndex(node.keys, key);
    if (i < node.keys.length && compare(node.keys[i], key) === 0) {
      return node.values[i];
    }
    if (node.leaf) return undefined;
    return this.searchNode(node.children[i]!, key);
  }

  private insertNonFull(node: BTreeNode<K, V>, key: K, value: V) {
    let i = node.keys.length - 1;
    if (node.leaf) {
      // Insert in sorted order
      const pos = findIndex(node.keys, key);
      node.keys.splice(pos, 0, key);
      node.values.splice(pos, 0, value);
    } else {
      // Descend to the right child
      const pos = findIndex(node.keys, key);
      const child = node.children[pos]!;
      if (child.keys.length === 2 * this.order - 1) {
        this.splitChild(node, pos);
        // After split, the middle key moves up
        if (compare(key, node.keys[pos]) > 0) pos++;
      }
      this.insertNonFull(node.children[pos]!, key, value);
    }
  }

  private splitChild(parent: BTreeNode<K, V>, idx: number) {
    const t = this.order;
    const y = parent.children[idx]!;               // node to split
    const z = new BTreeNode<K, V>(y.leaf);          // new sibling

    // Move upper half of y's keys/values to z
    z.keys = y.keys.splice(t, t - 1);              // keys t … 2t-2
    z.values = y.values.splice(t, t - 1);

    if (!y.leaf) {
      z.children = y.children.splice(t, t);         // children t … 2t-1
    }

    // Insert z into parent
    parent.children.splice(idx + 1, 0, z);
    parent.keys.splice(idx, 0, y.keys.splice(t - 1, 1)[0]);      // median key
    parent.values.splice(idx
