// suffix-tree.ts
// ------------------------------------------------------------
//  Minimal suffix tree (Ukkonen) for one or more strings.
//  Run: npx ts-node suffix-tree.ts
// ------------------------------------------------------------

type Edge = { start: number; end: number };   // [start, end) indices into text[]
type NodeId = number;

class SuffixTree {
  private text: string[] = [];                 // global concatenated text
  private nodes: {                             // flat array of nodes
    children: Map<string, NodeId>;             // first char -> child id
    suffixLink?: NodeId;
    start: number;                             // for leaves: start in text
    end: number;                               // for leaves: active length
  }[] = [];

  private activeNode: NodeId = 0;
  private activeEdge = 0;
  private activeLength = 0;
  private remainder = 0;
  private needsSuffixLink?: NodeId;
  private pos = -1;

  constructor(initial?: string) {
    this.nodes.push({ children: new Map() }); // root
    if (initial) this.add(initial);
  }

  // ---------- public API ----------
  add(str: string): void {
    for (const ch of str) this.extend(ch);
  }

  contains(needle: string): boolean {
    let cur: NodeId = 0;
    let i = 0;
    while (i < needle.length) {
      const ch = needle[i];
      const next = this.nodes[cur].children.get(ch);
      if (next === undefined) return false;
      const edge = this.getEdge(next);
      let len = edge.end - edge.start;
      let cmp = Math.min(len, needle.length - i);
      if (this.text.slice(edge.start, edge.start + cmp).join('') !==
          needle.slice(i, i + cmp)) return false;
      i += cmp;
      cur = next;
    }
    return true;
  }

  // ---------- internal ----------
  private extend(ch: string): void {
    this.text.push(ch);
    this.pos++;
    this.needsSuffixLink = undefined;
    this.remainder++;

    while (this.remainder > 0) {
      if (this.activeLength === 0) this.activeEdge = this.pos;

      const activeChar = this.text[this.activeEdge];
      const next = this.nodes[this.activeNode].children.get(activeChar);

      if (!next) {                                      // rule 2: create leaf
        const leaf = this.createNode(this.pos, Infinity);
        this.nodes[this.activeNode].children.set(activeChar, leaf);
        this.addSuffixLink(this.activeNode);
      } else {
        const edge = this.getEdge(next);
        if (this.walkDown(next)) continue;             // skip-count trick
        if (this.text[edge.start + this.activeLength] === ch) {
          this.activeLength++;
          this.addSuffixLink(this.activeNode);
          break;                                        // rule 3: showstopper
        }
        // rule 2: split edge
        const split = this.createNode(edge.start, edge.start + this.activeLength);
        const leaf = this.createNode(this.pos, Infinity);
        this.nodes[this.activeNode].children.set(activeChar, split);
        this.nodes[split].children.set(ch, leaf);
        this.nodes[split].children.set(this.text[edge.start + this.activeLength], next);
        this.setEdgeStart(next, edge.start + this.activeLength);
        this.addSuffixLink(split);
      }
      this.remainder--;
      if (this.activeNode === 0 && this.activeLength > 0) {
        this.activeLength--;
        this.activeEdge = this.pos - this.remainder + 1;
      } else {
        this.activeNode = this.nodes[this.activeNode].suffixLink ?? 0;
      }
    }
  }

  private createNode(start: number, end: number): NodeId {
    const id = this.nodes.length;
    this.nodes.push({ children: new Map(), start, end });
    return id;
  }

  private getEdge(node: NodeId): Edge {
    const n = this.nodes[node];
    return { start: n.start, end: n.end === Infinity ? this.pos + 1 : n.end };
  }

  private setEdgeStart(node: NodeId, start: number): void {
    this.nodes[node].start = start;
  }

  private walkDown(node: NodeId): boolean {
    const edge = this.getEdge(node);
    const len = edge.end - edge.start;
    if (this.activeLength >= len) {
      this.activeEdge += len;
      this.activeLength -= len;
      this.activeNode = node;
      return true;
    }
    return false;
  }

  private addSuffixLink(node: NodeId): void {
    if (this.needsSuffixLink !== undefined)
      this.nodes[this.needsSuffixLink].suffixLink = node;
    this.needsSuffixLink = node;
  }
}

// ---------- quick demo ----------
if (require.main === module) {
  const st = new SuffixTree();
  st.add("banana");
  console.log("Contains 'ana'? ->", st.contains("ana"));   // true
  console.log("Contains 'band'? ->", st.contains("band")); // false
}
