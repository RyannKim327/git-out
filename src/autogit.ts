type Comparator<K> = (a: K, b: K) => number; // <0 a<b, 0 a==b, >0 a>b
class BTreeNode<K> {
  keys: K[] = [];
  children: BTreeNode<K>[] = [];
  leaf: boolean;

  constructor(leaf: boolean) {
    this.leaf = leaf;
  }
}
export class BTree<K> {
  private root!: BTreeNode<K>;
  private readonly t: number;              // minimum degree
  private readonly cmp: Comparator<K>;

  constructor(t: number, cmp: Comparator<K>) {
    if (t < 2) throw new Error('BTree minimum degree must be at least 2');
    this.t = t;
    this.cmp = cmp;
    this.root = new BTreeNode<K>(true);
  }
  search(key: K, node?: BTreeNode<K>): BTreeNode<K> | null {
    node ??= this.root;
    let i = 0;
    while (i < node.keys.length && this.cmp(key, node.keys[i]) > 0) i++;

    if (i < node.keys.length && this.cmp(key, node.keys[i]) === 0) {
      return node;                                       // found
    }

    if (node.leaf) return null;                          // not found
    return this.search(key, node.children[i]);           // recurse
  }
  private splitChild(x: BTreeNode<K>, i: number): void {
    const y = x.children[i];
    const z = new BTreeNode<K>(y.leaf);
    const t = this.t;

    // Transfer the upper half of y's keys to z
    z.keys = y.keys.splice(t, t - 1);

    // If y is not a leaf, pull the corresponding children
    if (!y.leaf) {
      z.children = y.children.splice(t, t);
    }

    // Insert z as y's sibling
    x.children.splice(i + 1, 0, z);
    // Move y's median key up into x
    x.keys.splice(i, 0, y.keys.splice(t - 1, 1)[0]!);
  }
  insert(key: K): void {
    const r = this.root;
    if (r.keys.length === 2 * this.t - 1) {           // root full → split
      const s = new BTreeNode<K>(false);
      s.children.push(r);
      this.splitChild(s, 0);
      this.root = s;
      this._insertNonFull(s, key);
    } else {
      this._insertNonFull(r, key);
    }
  }

  private _insertNonFull(x: BTreeNode<K>, key: K): void {
    let i = x.keys.length - 1;
    if (x.leaf) {                                    // insert directly
      // Find slot for key
      while (i >= 0 && this.cmp(key, x.keys[i]) < 0) i--;
      x.keys.splice(i + 1, 0, key);
    } else {                                          // descend
      while (i >= 0 && this.cmp(key, x.keys[i]) < 0) i--;
      i++;                                            // child index
      const child = x.children[i];
      if (child.keys.length === 2 * this.t - 1) {     // full child → split
        this.splitChild(x, i);
        if (this.cmp(key, x.keys[i]) > 0) i++;        // key goes right of median
      }
      this._insertNonFull(x.children[i], key);
    }
  }
const cmp = (a: number, b: number) => a - b;
const tree = new BTree<number>(3, cmp);          // t = 3, 2t‑1 = 5 keys per node

[10, 20, 5, 6, 12, 30, 7, 17].forEach(k => tree.insert(k));

console.log(tree.search(6));   // node containing 
