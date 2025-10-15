/**
 * A single edge of the suffix tree.
 * It represents a substring of the text by
 * [start, end) indices into the original string.
 */
class Edge {
  constructor(
    public start: number,
    public end: number,
    public target: Node
  ) {}
}

/**
 * Each node owns:
 *  - children: Map<firstCharacter, Edge>
 *  - suffixLink: used by Ukkonen’s algorithm
 */
class Node {
  children = new Map<string, Edge>();
  suffixLink: Node | null = null;

  /** Edges that end at the last character of the text
      point to this singleton. */
  static readonly GlobalEnd = { value: -1 };
}

/**
 * Active point used while building the tree.
 */
class Active {
  constructor(
    public node: Node,
    public edge: string | null, // first char of outgoing edge
    public length: number
  ) {}
}

export class SuffixTree {
  private readonly text: string;
  private readonly root = new Node();
  private active = new Active(this.root, null, 0);
  private remainder = 0;
  private j = 0; // global index of next char to add

  constructor(text: string) {
    this.text = text;
    this.build();
  }

  /* --------------------------------------------------
   *  Public API
   * -------------------------------------------------- */
  hasSubstring(sub: string): boolean {
    let cur: Node = this.root;
    let i = 0;
    while (i < sub.length) {
      const edge = cur.children.get(sub[i]);
      if (!edge) return false;
      const len = this.edgeLength(edge);
      const part = this.text.substring(edge.start, edge.start + len);
      if (!sub.startsWith(part, i)) return false;
      i += part.length;
      cur = edge.target;
    }
    return true;
  }

  hasSuffix(suf: string): boolean {
    let cur: Node = this.root;
    let i = 0;
    while (i < suf.length) {
      const edge = cur.children.get(suf[i]);
      if (!edge) return false;
      const len = Math.min(this.edgeLength(edge), suf.length - i);
      const part = this.text.substring(edge.start, edge.start + len);
      if (suf.substr(i, len) !== part) return false;
      i += len;
      cur = edge.target;
    }
    return true;
  }

  countOccurrences(sub: string): number {
    const [node, depth] = this.traverse(sub);
    if (!node) return 0;
    return this.countLeaves(node);
  }

  /* --------------------------------------------------
   *  Internal helpers
   * -------------------------------------------------- */
  private build(): void {
    for (let i = 0; i < this.text.length; ++i) this.extend(i);
  }

  private extend(pos: number): void {
    const c = this.text[pos];
    Node.GlobalEnd.value = pos;
    this.remainder++;

    let needsSuffixLink: Node | null = null;

    while (this.remainder > 0) {
      if (this.active.length === 0) this.active.edge = c;

      const edge = this.active.node.children.get(this.active.edge!);

      if (!edge) {
        // Rule 2: create new edge
        this.active.node.children.set(
          this.active.edge!,
          new Edge(pos, Node.GlobalEnd as any, new Node())
        );
        this.addSuffixLink(this.active.node);
      } else {
        const len = this.edgeLength(edge);
        if (this.active.length >= len) {
          // hop over this edge
          this.active.length -= len;
          this.active.node = edge.target;
          this.active.edge = this.text[pos - this.active.length];
          continue;
        }

        // next char on edge
        const nextChar = this.text[edge.start + this.active.length];
        if (nextChar === c) {
          // Rule 3: already here
          this.addSuffixLink(this.active.node);
          break;
        } else {
          // Rule 2: split edge
          const split = new Node();
          this.active.node.children.set(
            this.active.edge!,
            new Edge(edge.start, edge.start + this.active.length, split)
          );
          split.children.set(c, new Edge(pos, Node.GlobalEnd as any, new Node()));
          edge.start += this.active.length;
          split.children.set(
            this.text[edge.start],
            edge
          );
          this.addSuffixLink(split);
        }
      }

      this.remainder--;
      if (this.active.node === this.root && this.active.length > 0) {
        this.active.length--;
        this.active.edge = this.text[pos - this.active.length + 1];
      } else if (this.active.node !== this.root) {
        this.active.node = this.active.node.suffixLink!;
      }
    }
  }

  private edgeLength(e: Edge): number {
    return (e.end as any).value !== undefined
      ? (e.end as any).value - e.start + 1
      : (e.end as number) - e.start;
  }

  private addSuffixLink(node: Node): void {
    if (this.needsSuffixLink) {
      this.needsSuffixLink.suffixLink = node;
    }
    this.needsSuffixLink = node;
  }

  private traverse(sub: string): [Node | null, number] {
    let cur: Node = this.root;
    let i = 0;
    let depth = 0;
    while (i < sub.length) {
      const edge = cur.children.get(sub[i]);
      if (!edge) return [null, depth];
      const len = this.edgeLength(edge);
      const part = this.text.substring(edge.start, edge.start + len);
      if (!sub.startsWith(part, i)) return [null, depth];
      i += part.length;
      depth += part.length;
      cur = edge.target;
    }
    return [cur, depth];
  }

  private countLeaves(node: Node): number {
    if (node.children.size === 0) return 1;
    let sum = 0;
    for (const e of node.children.values()) {
      sum += this.countLeaves(e.target);
    }
    return sum;
  }

  private needsSuffixLink: Node | null = null;
}
import { SuffixTree } from './suffix-tree';

const st = new SuffixTree('banana');

console.log(st.hasSubstring('ana'));   // true
console.log(st.hasSubstring('band'));  // false
console.log(st.hasSuffix('ana'));      // true
console.log(st.hasSuffix('anana'));    // true
console.log(st.countOccurrences('ana')); // 1  (overlapping counted once)
