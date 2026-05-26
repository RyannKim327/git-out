class Edge {
  public start: number;          // index in text where label starts
  public end: number | string;   // end symbol or index
  public child: SuffixNode;

  constructor(start: number, end: number | string, child: SuffixNode) {
    this.start = start;
    this.end = end;          // can be a "shared" reference for leaf edges
    this.child = child;
  }

  /** Length of the label (end is inclusive) */
  get length(): number {
    if (typeof this.end === 'number') {
      return this.end - this.start + 1;
    }
    // leaf edge: end is shared and increments as we extend
    return (this.end as string) === '$' ? Infinity : this.end - this.start + 1;
  }
}

class SuffixNode {
  public edges: Map<string, Edge>;   // first char → edge
  public suffixLink?: SuffixNode;    // Ukkonen’s suffix link
  constructor() {
    this.edges = new Map();
  }
}
class SuffixTree {
  private root: SuffixNode;
  private text: string;          // original string
  private leafEnd: number;       // shared end for all leaves

  private active: ActivePoint;   // current active point
  private remainder: number;    // # of suffixes that need insertion

  constructor(text: string) {
    this.text = text + '$';  // append unique terminator
    this.leafEnd = -1;
    this.root = new SuffixNode();
    this.active = { node: this.root, edge: '', length: 0 };
    this.remainder = 0;

    this.build();
  }

  /* -------------------------------------------------- */
  /*  Core routine: Ukkonen’s O(n) construction        */
  /* -------------------------------------------------- */
  private build(): void {
    for (let i = 0; i < this.text.length; i++) {
      this.extend(i);
    }
  }

  private extend(pos: number): void {
    this.leafEnd = pos;
    this.remainder++;
    let lastNewNode: SuffixNode | undefined;

    while (this.remainder > 0) {
      // 1.  If active length is zero → the active edge is the char at pos
      if (this.active.length === 0) {
        this.active.edge = this.text[pos];
      }

      const edgeChar = this.active.edge;
      const edge = this.active.node.edges.get(edgeChar);

      // 2.  No edge starts with active.edge
      if (!edge) {
        // create new leaf edge
        const leaf = new SuffixNode();
        const newEdge = new Edge(pos, this.leafEnd, leaf);
        this.active.node.edges.set(edgeChar, newEdge);

        if (lastNewNode) {
          lastNewNode.suffixLink = this.active.node;
          lastNewNode = undefined;
        }
      } else {
        // 3.  Edge exists – walk down if needed
        if (this.active.length >= edge.length) {
          this.active.node = edge.child;
          this.active.length -= edge.length;
          this.active.edge = this.text[pos - this.remainder + 1];
          continue;  // restart loop, remainder unchanged
        }

        // 4.  Check next char on the edge
        const nextChar = this.text[edge.start + this.active.length];
        if (nextChar === this.text[pos]) {
          // 4a.  Character already present → just increment active length
          this.active.length++;
          if (lastNewNode) {
            lastNewNode.suffixLink = this.active.node;
            lastNewNode = undefined;
          }
          break; // done for this phase
        }

        // 4b.  Split the edge: create an intermediate node
        const splitEnd = edge.start + this.active.length - 1;
        const splitNode = new SuffixNode();
        const splitEdge = new Edge(edge.start, splitEnd, splitNode);

        // replace old edge with split edge
        this.active.node.edges.set(edgeChar, splitEdge);

        // old child becomes child of splitNode
        splitNode.edges.set(nextChar, edge);
        edge.start = splitEnd + 1; // shift start of old edge

        // new leaf for current suffix
        const leaf = new SuffixNode();
        const newLeafEdge = new Edge(pos, this.leafEnd, leaf);
        splitNode.edges.set(this.text[pos], newLeafEdge);

        // 4c.  Suffix link handling
        if (lastNewNode) {
          lastNewNode.suffixLink = splitNode;
        }
        lastNewNode = splitNode;
      }

      this.remainder--;

      // 5.  Move active point using suffix link
      if (this.active.node === this.root &&
