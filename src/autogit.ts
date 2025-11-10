// suffix-tree.ts
export class SuffixTree {
  private readonly text: string;
  private readonly root: Node;
  private activeNode: Node;
  private activeEdge = 0;   // index into text
  private activeLen = 0;
  private remaining = 0;    // # suffixes left to insert in current phase
  private end = -1;           // global “pointer” shared by all leaves

  constructor(str: string) {
    this.text = str;
    this.root = new Node(null, -1);
    this.activeNode = this.root;
    this.build();
  }

  /* ---------- public query helpers (optional) ---------- */

  /** Returns true if `pat` occurs as substring. */
  contains(pat: string): boolean {
    let cur = this.root;
    let i = 0;
    while (i < pat.length) {
      const edge = cur.children.get(pat[i]);
      if (!edge) return false;
      const edgeLen = edge.len();
      const cmpLen = Math.min(edgeLen, pat.length - i);
      const seg1 = this.text.substring(edge.from, edge.from + cmpLen);
      const seg2 = pat.substring(i, i + cmpLen);
      if (seg1 !== seg2) return false;
      i += cmpLen;
      if (i < pat.length) cur = edge.target;
    }
    return true;
  }

  /* ---------- internal construction ---------- */

  private build(): void {
    for (let i = 0; i < this.text.length; i++) {
      this.end = i;
      this.remaining++;
      let lastNewNode: Node | null = null;

      while (this.remaining > 0) {
        if (this.activeLen === 0) this.activeEdge = i;

        const ch = this.text[this.activeEdge];
        let edge = this.activeNode.children.get(ch);

        if (!edge) {
          // extension rule 2: new leaf
          const leaf = new Node(this.activeNode, i);
          this.activeNode.children.set(ch, new Edge(i, this.end, leaf));
          if (lastNewNode) {
            lastNewNode.suffixLink = this.activeNode;
            lastNewNode = null;
          }
        } else {
          const edgeLen = edge.len();
          if (this.activeLen >= edgeLen) {
            // walk down
            this.activeEdge += edgeLen;
            this.activeLen -= edgeLen;
            this.activeNode = edge.target;
            continue;
          }
          // compare next character
          if (this.text[edge.from + this.activeLen] === this.text[i]) {
            // match: APCFERY skip trick
            if (lastNewNode) {
              lastNewNode.suffixLink = this.activeNode;
              lastNewNode = null;
            }
            this.activeLen++;
            break;
          }
          // split edge
          const splitEnd = edge.from + this.activeLen - 1;
          const splitNode = new Node(null, -1);
          const leaf = new Node(splitNode, i);
          splitNode.children.set(this.text[i], new Edge(i, this.end, leaf));
          splitNode.children.set(
            this.text[edge.from + this.activeLen],
            new Edge(edge.from + this.activeLen, edge.to, edge.target)
          );
          edge.target = splitNode;
          edge.to = splitEnd;
          if (lastNewNode) lastNewNode.suffixLink = splitNode;
          lastNewNode = splitNode;
        }

        this.remaining--;
        if (this.activeNode === this.root && this.activeLen > 0) {
          this.activeLen--;
          this.activeEdge = i - this.remaining + 1;
        } else {
          this.activeNode = this.activeNode.suffixLink ?? this.root;
        }
      }
    }
  }
}

/* ---------- internal classes ---------- */

class Node {
  children = new Map<string, Edge>();
  suffixLink: Node | null = null;
  constructor(
    readonly parent: Node | null,
    readonly start: number // for leaves: index into text where suffix starts
  ) {}
}

class Edge {
  constructor(
    public from: number,
    public to: number,
    public target: Node
  ) {}
  len(): number {
    return this.to - this.from + 1;
  }
}
import { SuffixTree } from "./suffix-tree";

const st = new SuffixTree("banana");
console.log(st.contains("ana")); // true
console.log(st.contains("band"));  // false
