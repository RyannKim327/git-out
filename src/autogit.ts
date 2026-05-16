type EdgeMap = Map<number, Node>; // key = first char code of the edge

export class Node {
  // Children edges keyed by first character code
  public children: EdgeMap = new Map();

  // Edge that leads **to** this node
  public start: number = -1;           // inclusive
  public end: number = -1;             // exclusive
  public suffixLink: Node | null = null;

  constructor(start: number = -1, end: number = -1) {
    this.start = start;
    this.end   = end;
  }
}
export class SuffixTree {
  /** original text, appended with a unique terminator that does not appear elsewhere */
  private text: string[];

  /** root node */
  private root: Node = new Node();

  /** active point */
  private activeNode: Node = this.root;
  private activeEdge: number | null = null;
  private activeLength: number = 0;

  /** number of suffixes that have yet to be inserted for the current phase */
  private remainder: number = 0;

  /** end index for leaves – shared so all leaves refer to the current suffix end */
  private leafEnd: number = -1;

  constructor(text: string) {
    // Ensure a single terminator is appended; '#' is common
    this.text = text.split('').concat('#');
    this.build();
  }

  /** Core driver – runs one pass over the text */
  private build(): void {
    for (let i = 0; i < this.text.length; i++) {
      this.extend(i);
    }
  }

  /** Ukkonen’s “extension” for position i of the text */
  private extend(pos: number): void {
    this.leafEnd = pos;  // All current leaves stretch to the new char

    this.remainder++;   // We have one more suffix to add

    let lastNewNode: Node | null = null;

    while (this.remainder > 0) {
      if (this.activeLength === 0) {
        // Start a new edge from the active node
        this.activeEdge = pos;
      }

      const activeChar = this.text[this.activeEdge!];
      const child = this.activeNode.children.get(activeChar.charCodeAt(0));

      // 1. No edge starting with the active char → create a leaf
      if (!child) {
        const leaf = new Node(pos, Infinity); // Infinity means “extends to leafEnd”
        this.activeNode.children.set(activeChar.charCodeAt(0), leaf);

        // set suffix link for last internal node
        if (lastNewNode) {
          lastNewNode.suffixLink = this.activeNode;
          lastNewNode = null;
        }
      }
      // 2. Edge exists → walk down if we have to
      else if (this.walkDown(child, pos)) {
        // edge fully traversed – repeat loop with updated active point
        continue;
      }
      // 3. Edge exists but activeLength < edge length → split edge
      else {
        const edgeLen = this.edgeLength(child, pos);
        if (this.activeLength === edgeLen) {
          // If we are *exactly* at the end of an edge, further walk down happens
          if (lastNewNode && this.activeNode !== this.root) {
            lastNewNode.suffixLink = this.activeNode;
            lastNewNode = null;
          }
          this.activeNode = child;
          this.activeLength++; // effectively moving to next character on edge
          break;               // proceed to next i
        }

        // Create internal node
