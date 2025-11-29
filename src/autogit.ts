export class SuffixTree {
  readonly root = new Node(-1, -1, null);   // the machine
  private text = '';                        // concatenated input
  private nodes: Node[] = [this.root];    // flat storage so we can index
  private activeNode = this.root;
  private activeEdge = -1;
  private activeLen = 0;
  private remainder = 0;
  private end = new End(0);                 // global “pointer” trick

  /* ---------- public ---------- */

  /** Insert one or more strings and build the tree. */
  insert(str: string, sep = '$'): this {
    const start = this.text.length;
    this.text += str + sep;
    for (let i = start; i < this.text.length; i++) this.extend(i);
    return this;
  }

  /** True iff needle occurs in any inserted string. */
  contains(needle: string): boolean {
    let node = this.root;
    let i = 0;
    while (i < needle.length) {
      const next = node.edge(needle.charCodeAt(i));
      if (!next) return false;
      const [l, r] = next.slice(this.text);
      const len = Math.min(r - l + 1, needle.length - i);
      if (this.text.substr(l, len) !== needle.substr(i, len)) return false;
      i += len;
      node = next;
    }
    return true;
  }

  /** Return all strings that contain needle (if you inserted with distinct $). */
  find(needle: string): number[] {
    let node = this.root;
    let i = 0;
    while (i < needle.length) {
      const next = node.edge(needle.charCodeAt(i));
      if (!next) return [];
      const [l, r] = next.slice(this.text);
      const len = Math.min(r - l + 1, needle.length - i);
      if (this.text.substr(l, len) !== needle.substr(i, len)) return [];
      i += len;
      node = next;
    }
    return Array.from(this.collectLeaves(node));
  }

  /* ---------- internal ---------- */

  private extend(pos: number): void {
    const c = this.text.charCodeAt(pos);
    this.end.v = pos;
    this.remainder++;
    let last: Node | null = null;

    while (this.remainder) {
      if (this.activeLen === 0) this.activeEdge = pos;

      const edgeChar = this.text.charCodeAt(this.activeEdge);
      const next = this.activeNode.edge(edgeChar);

      if (!next) { // explicit fallback – just create leaf
        const leaf = this.newNode(pos, this.end);
        this.activeNode.setEdge(edgeChar, leaf);
        this.addSuffixLink(this.activeNode, last);
        last = this.activeNode;
      } else {
        const [l, r] = next.slice(this.text);
        if (this.walkDown(next, l, r)) continue; // skip-count

        if (this.text.charCodeAt(l + this.activeLen) === c) {
          // already on the path
          if (++this.activeLen === 1 && this.activeNode !== this.root) {
            this.addSuffixLink(this.activeNode, last);
            last = this.activeNode;
          }
          break;
        }

        // split edge
        const split = this.newNode(l, l + this.activeLen - 1);
        this.activeNode.setEdge(edgeChar, split);
        const leaf = this.newNode(pos, this.end);
        split.setEdge(c, leaf);
        split.setEdge(this.text.charCodeAt(l + this.activeLen), next);
        next.start += this.activeLen;
        this.addSuffixLink(split, last);
        last = split;
      }

      this.remainder--;
      if (this.activeNode === this.root && this.activeLen > 0) {
        this.activeLen--;
        this.activeEdge = pos - this.remainder + 1;
      } else {
        this.activeNode = this.activeNode.suffixLink || this.root;
      }
    }
  }

  private walkDown(n: Node, l: number, r: number): boolean {
    const len = r - l + 1;
    if (this.activeLen >= len) {
      this.activeEdge += len;
      this.activeLen -= len;
      this.activeNode = n;
      return true;
    }
    return false;
  }

  private addSuffixLink(from: Node, to: Node | null): void {
    if (to) to.suffixLink = from;
  }

  private newNode(l: number, r: End | number): Node {
    const node = new Node(l, typeof r === 'number' ? r : r.v, this.nodes.length);
    this.nodes.push(node);
    return node;
  }

  private* collectLeaves(n: Node): Iterable<number> {
    if (n.isLeaf) yield n.id;
    for (const c of Object.values(n.children))
      for (const leaf of this.collectLeaves(c)) yield leaf;
  }
}

/* ---------- helpers ---------- */

class End {
  constructor(public v: number) {}
}

class Node {
  children: Record<number, Node> = Object.create(null);
  suffixLink: Node | null = null;
  constructor(
    public start: number,
    public end: number,
    public id: number | null
  ) {}
  get isLeaf() { return this.children[0] === undefined; }
  edge(ch: number) { return this.children[ch]; }
  setEdge(ch: number, n: Node) { this.children[ch] = n; }
  slice(text: string): [number, number] {
    return [this.start, this.end instanceof End ? this.end.v : this.end];
  }
}
const st = new SuffixTree()
  .insert('banana')
  .insert('bandana');

console.log(st.contains('ana'));   // true
console.log(st.contains('xyz'));   // false
console.log(st.find('ana'));       // [0,1]  (indices of inserted strings)
