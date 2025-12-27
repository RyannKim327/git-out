const st = new SuffixTree("banana");
st.contains("nan");      // true
st.contains("band");     // false
st.countOccurrences("na"); // 2
/**
 *  Edge: [start, end] indexes into the global string.
 *  end may be Infinity while the tree is being built (open edge).
 */
type Edge = { start: number; end: number };

class Node {
  // Edges keyed by first character of the substring they represent
  edges: Map<string, { edge: Edge; child: Node }> = new Map();
  suffixLink: Node | null = null;
  constructor(public start = 0, public end = Infinity) {}
}

export class SuffixTree {
  private text: string;
  private root = new Node();
  private activeNode: Node = this.root;
  private activeEdge = 0;   // index into text
  private activeLen = 0;
  private remaining = 0;
  private endIdx = -1;      // global “end” for open edges

  constructor(text: string) {
    this.text = text;
    this.build();
  }

  /* ---------- public API ---------- */
  contains(pattern: string): boolean {
    return this.findNode(pattern) !== null;
  }

  countOccurrences(pattern: string): number {
    const n = this.findNode(pattern);
    return n ? this.leafCount(n) : 0;
  }

  /* ---------- internal ---------- */
  private build(): void {
    for (let i = 0; i < this.text.length; i++) this.extend(i);
  }

  private extend(pos: number): void {
    this.endIdx = pos;
    this.remaining++;
    let needsSuffixLink: Node | null = null;

    while (this.remaining > 0) {
      if (this.activeLen === 0) this.activeEdge = pos;

      const ch = this.text[this.activeEdge];
      const edge = this.activeNode.edges.get(ch);

      if (!edge) {
        // Rule 2: create new outgoing edge
        this.activeNode.edges.set(ch, {
          edge: { start: pos, end: Infinity },
          child: new Node(pos),
        });
        this.addSuffixLink(this.activeNode);
      } else {
        const { edge: e, child: next } = edge;
        if (this.walkDown(e)) continue; // activeLen spans fully over edge

        if (this.text[e.start + this.activeLen] === this.text[pos]) {
          // Rule 3: already present
          this.activeLen++;
          this.addSuffixLink(this.activeNode);
          break;
        }

        // Rule 2: split edge
        const split = new Node(e.start, e.start + this.activeLen);
        this.activeNode.edges.set(ch, { edge: { start: e.start, end: e.start + this.activeLen }, child: split });

        // New edge for remainder
        split.edges.set(this.text[pos], {
          edge: { start: pos, end: Infinity },
          child: new Node(pos),
        });

        // Redirect old edge
        e.start += this.activeLen;
        split.edges.set(this.text[e.start], { edge: e, child: next });

        this.addSuffixLink(split);
        if (needsSuffixLink) needsSuffixLink.suffixLink = split;
        needsSuffixLink = split;
      }

      this.remaining--;
      if (this.activeNode === this.root && this.activeLen > 0) {
        this.activeLen--;
        this.activeEdge = pos - this.remaining + 1;
      } else {
        this.activeNode = this.activeNode.suffixLink || this.root;
      }
    }
  }

  private walkDown(e: Edge): boolean {
    const len = this.edgeLen(e);
    if (this.activeLen >= len) {
      this.activeEdge += len;
      this.activeLen -= len;
      this.activeNode = this.getChild(e);
      return true;
    }
    return false;
  }

  private edgeLen(e: Edge): number {
    return Math.min(e.end, this.endIdx + 1) - e.start;
  }

  private getChild(e: Edge): Node {
    // We always store the child in the map, so we can recover it quickly
    // (not needed for correctness, but keeps code simple).
    for (const [, { edge: ee, child }] of this.activeNode.edges) {
      if (ee === e) return child;
    }
    throw new Error("Invariant violated: child not found");
  }

  private addSuffixLink(node: Node): void {
    // dummy; we set suffixLink during split
  }

  private findNode(pattern: string): Node | null {
    let node: Node = this.root;
    let i = 0;
    while (i < pattern.length) {
      const ch = pattern[i];
      const edge = node.edges.get(ch);
      if (!edge) return null;
      const { edge: e, child } = edge;
      const len = this.edgeLen(e);
      let j = 0;
      while (j < len && i < pattern.length && this.text[e.start + j] === pattern[i]) {
        j++; i++;
      }
      if (j === len) node = child;
      else if (i < pattern.length) return null;
    }
    return node;
  }

  private leafCount(n: Node): number {
    if (n.edges.size === 0) return 1;
    let cnt = 0;
    for (const [, { child }] of n.edges) cnt += this.leafCount(child);
    return cnt;
  }
}

/* ---------- simple sanity check ---------- */
if (require.main === module) {
  const st = new SuffixTree("banana");
  console.log(st.contains("nan"));  // true
  console.log(st.contains("band")); // false
  console.log(st.countOccurrences("na")); // 2
}
