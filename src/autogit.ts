// suffix-tree.ts
/**
 * Lightweight suffix tree for ASCII strings.
 * The implementation uses Ukkonen’s algorithm
 * and is fully typed for clarity.
 */

/** Each node can have many outgoing edges keyed by the
 * first character of the edge label (i.e., “transition”).
 * The tree is rooted (root is an empty string). */
class Node {
  /** Map from a character to a child node. */
  children = new Map<string, Node>();

  /** For nodes that represent the end of a suffix,
   *  we record the starting index of that suffix in the
   *  original text.  The set version lets us keep
   *  multiple suffixes that collapse at the same node.
   */
  suffixIndices = new Set<number>();

  /* In Ukkonen, each edge is implicitly defined by the
   * start and length on the original text.  We store
   * those pairs on the node that is the *target* of the edge.
   */
  edgeStart?: number;
  edgeEnd?: number; // inclusive

  /** The parent of this node (root’s parent is null). */
  parent: Node | null = null;
}

/** A convenience wrapper around a Node that stores the
 *  current active point used during construction.
 */
interface ActivePoint {
  node: Node;     // the deepest node where the active span ends
  edge: string;   // first character of the edge we are on
  length: number; // how far we have walked down that edge
}

/**
 * The SuffixTree itself.
 */
export class SuffixTree {
  /** The root of the tree.  Its edgeStart/edgeEnd are undefined
   *  because it has no incoming edge. */
  private _root = new Node();

  /** The input string.  We keep it as an array of characters
   *  for O(1) random access. */
  private _text: string[];

  /** The active point used by Ukkonen’s algorithm. */
  private _active: ActivePoint;

  /** The number of “steps” we have taken from the root
   *  during construction.  This is the suffix link counter,
   *  useful primarily for debugging but also for truncated
   *  construction. */
  private _remainder = 0;

  constructor(text: string) {
    this._text = [...text];
    this._active = { node: this._root, edge: "", length: 0 };
    this.build();
  }

  /* ------------------------------------------------------------------- */
  /*  BUILDING
   * ------------------------------------------------------------------- */

  private build(): void {
    for (let pos = 0; pos < this._text.length; pos++) {
      this._addCharacter(pos);
    }
  }

  /**
   * Extend the tree with the character at position `pos` in the input.
   * This is Ukkonen’s “phase” step.
   */
  private _addCharacter(pos: number): void {
    this._remainder++;

    let lastNewNode: Node | null = null;

    while (this._remainder > 0) {
      const currentActiveEdge = this._active.edge || this._text[pos];

      // 1. If there is no outgoing edge from the active node
      //    that starts with the active edge character, create one.
      if (!this._active.node.children.has(currentActiveEdge)) {
        const leaf = this._createNode(pos, this._text.length - 1); // leaf points to suffix start
        this._active.node.children.set(currentActiveEdge, leaf);
        leaf.parent = this._active.node;

        if (lastNewNode) {
          lastNewNode.suffixLink = this._active.node;
          lastNewNode = null;
        }
      } else {
        // 2. There is an edge; we need to walk down it.
        const nextNode = this._active.node.children.get(currentActiveEdge)!;

        // What character does the edge label have at the next position?
        const edgeChar = this._text[nextNode.edgeStart! + this._active.length];

        if (edgeChar === this._text[pos]) {
          // 2a. The current character is already in the tree.
          //     Just extend the active point and break.
          if (lastNewNode) {
            lastNewNode.suffixLink = this._active.node;
            lastNewNode = null;
          }
          this._active.length++;
          break;
        }

        // 2b. Need to split the edge because we hit a mismatch.
        const splitEnd = nextNode.edgeStart! + this._active.length - 1;
        const split = this._createNode(nextNode.edgeStart!, splitEnd);
        this._active.node.children.set(currentActiveEdge, split);
        split.parent = this._active.node;

        // 2b.i. The old child becomes a grand‑child of the new split node.
        nextNode.edgeStart! = splitEnd + 1;
        split.children.set(this._text[nextNode.edgeStart!], nextNode);
        nextNode.parent = split;

        // 2b.ii. Add a new leaf for the new character.
        const leaf = this._createNode(pos, this._text.length - 1);
        split.children.set(this._text[pos], leaf);
        leaf.parent = split;

        // 2b.iii. Link suffixes
        if (lastNewNode) {
          lastNewNode.suffixLink = split;
        }
        lastNewNode = split;
        split.suffixLink = this._root;
      }

      // 3. Move to the next phase: decrement remainder
      this._remainder--;

      // 4. If the active node has a suffix link, follow it,
      //    otherwise reset to root and adjust length.
      if (this._active.node === this._root && this._active.length > 0) {
        this._active.length--;
        this._active.edge = this._text[pos - this._remainder + 1];
      } else if (this._active.node !== this._root) {
        this._active.node = this._active.node.suffixLink!;
      } else {
        this._active.edge = this._text[pos - this._remainder + 1];
        this._active.length = 1;
        this._active.node = this
