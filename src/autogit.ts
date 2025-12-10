SuffixTree
 ├─ root : Node
 └─ text : string   // the original string (plus a unique terminator)
class EndPointer {
  value: number;   // mutable integer
  constructor(v: number) { this.value = v; }
}
// suffixTree.ts --------------------------------------------------------------

/**
 * A mutable integer wrapper used for the "open" end of leaf edges.
 */
class EndPointer {
  constructor(public value: number) {}
}

/**
 * Edge of the suffix tree.
 * Stores a range [start, end] into the original text and a destination node.
 */
class Edge {
  /** The first character of the edge (cached for fast map lookup) */
  readonly firstChar: number;

  constructor(
    public start: number,
    public end: EndPointer,
    public dest: Node,
    private text: string
  ) {
    this.firstChar = text.charCodeAt(start);
  }

  /** Length of the edge (inclusive start, inclusive end) */
  get length(): number {
    return this.end.value - this.start + 1;
  }

  /** Returns the character at offset `i` (0‑based) inside the edge */
  charAt(i: number): string {
    return this.text[this.start + i];
  }
}

/**
 * Node of the suffix tree.
 * Holds outgoing edges keyed by the first character code.
 */
class Node {
  /** Map from first character code → Edge */
  edges: Map<number, Edge> = new Map();

  /** Suffix link used by Ukkonen's algorithm (may be undefined for the root) */
  suffixLink?: Node;

  /** For debugging / visualisation */
  id: number;
  static nextId = 0;
  constructor() {
    this.id = Node.nextId++;
  }

  /** Find an outgoing edge that starts with `ch` (character code) */
  getEdge(ch: number): Edge | undefined {
    return this.edges.get(ch);
  }

  /** Add a new edge */
  addEdge(edge: Edge) {
    this.edges.set(edge.firstChar, edge);
  }
}

/**
 * The suffix tree itself.
 *
 * Usage:
 *   const tree = new SuffixTree('banana');
 *   console.log(tree.contains('ana')); // true
 *   console.log(tree.contains('apple')); // false
 */
export class SuffixTree {
  private root: Node = new Node();
  private text: string;               // original string + terminator
  private readonly terminator = '$';  // unique char not present in the input
  private globalEnd: EndPointer;      // shared end for all leaf edges

  // ---- Ukkonen state -------------------------------------------------------
  private activeNode: Node;
  private activeEdge: number = -1; // index in text of the first char of the active edge
  private activeLength: number = 0;
  private remainingSuffixCount: number = 0;
  private lastCreatedInternalNode?: Node;

  constructor(input: string) {
    // Append a unique terminator to guarantee that every suffix ends at a leaf.
    this.text = input + this.terminator;
    this.globalEnd = new EndPointer(-1);
    this.activeNode = this.root;

    // Build the tree incrementally.
    for (let i = 0; i < this.text.length; i++) {
      this.extendTree(i);
    }
  }

  // -------------------------------------------------------------------------
  /** Core of Ukkonen's algorithm – add character at position `pos` to the tree */
  private extendTree(pos: number) {
    this.globalEnd.value = pos; // extend all leaf edges
    this.remainingSuffixCount++;
    this.lastCreatedInternalNode = undefined;

    while (this.remainingSuffixCount > 0) {
      // Step 1: make sure activeEdge is set correctly
      if (this.activeLength === 0) {
        this.activeEdge = pos; // the current character becomes the active edge
      }

      const activeEdgeChar = this.text.charCodeAt(this.activeEdge);
      let edge = this.activeNode.getEdge(activeEdgeChar);

      // --------------------------------------------------------------
      // CASE A – No edge starting with activeEdgeChar → create a leaf
      // --------------------------------------------------------------
      if (!edge) {
        const leaf = new Node();
        const newEdge = new Edge(pos, this.globalEnd, leaf, this.text);
        this.activeNode.addEdge(newEdge);

        // If we created an internal node in the previous iteration,
        // set its suffix link to the current active node.
        if (this.lastCreatedInternalNode) {
          this.lastCreatedInternalNode.suffixLink = this.activeNode;
          this.lastCreatedInternalNode = undefined;
        }
      } else {
        // --------------------------------------------------------------
        // CASE B – Walk down the edge if activeLength >= edge length
        // --------------------------------------------------------------
        if (this.activeLength >= edge.length) {
          this.activeEdge += edge.length;
          this.activeLength -= edge.length;
          this.activeNode = edge.dest;
          continue; // restart the while loop with the new active point
        }

        // --------------------------------------------------------------
        // CASE C – Next character on the edge matches the new character → just walk
        // --------------------------------------------------------------
        const nextChar = this.text.charCodeAt(edge.start + this.activeLength);
        if (nextChar === this.text.charCodeAt(pos)) {
          // The current suffix is already in the tree – just increment activeLength
          this.activeLength++;

          // If we created an internal node in the previous iteration,
          // set its suffix link to the current active node.
          if (this.lastCreatedInternalNode) {
            this.lastCreatedInternalNode.suffixLink = this.activeNode;
            this.lastCreatedInternalNode = undefined;
          }
          break; // No more extensions for this phase
        }

        // --------------------------------------------------------------
        // CASE D – Split edge, create a new internal node + leaf
        // --------------------------------------------------------------
        const splitNode = new Node();

        // 1️⃣ Edge from splitNode to the existing subtree (suffix part)
        const splitEdge = new Edge(
          edge.start + this.activeLength,
          edge.end,
          edge.dest,
          this.text
        );
        splitNode.addEdge(splitEdge);

        // 2️⃣ Edge from splitNode to the new leaf (new suffix)
        const leaf = new Node();
        const leafEdge = new Edge(pos, this.globalEnd, leaf, this.text);
        splitNode.addEdge(leafEdge);

        // 3️⃣ Replace original edge with edge to splitNode
        edge.end = new EndPointer(edge.start + this.activeLength - 1);
        edge.dest = splitNode;

        // 4️⃣ Update suffix link of previously created internal node
        if (this.lastCreatedInternalNode) {
          this.lastCreatedInternalNode.suffixLink = splitNode;
        }
        this.lastCreatedInternalNode = splitNode;
      }

      // --------------------------------------------------------------
      // Move to the next suffix (rule 1 & 2 of Ukkonen)
      // --------------------------------------------------------------
      this.remainingSuffixCount--;

      if (this.activeNode === this.root && this.activeLength > 0) {
        // Rule 2: If we are at root, just shrink the active length
        this.activeLength--;
        this.activeEdge = pos - this.remainingSuffixCount + 1;
      } else {
        // Follow suffix link if it exists, otherwise go to root
        this.activeNode = this.activeNode.suffixLink ?? this.root;
      }
    }
  }

  // -------------------------------------------------------------------------
  /** Returns true if `pattern` occurs in the original string */
  public contains(pattern: string): boolean {
    let node: Node = this.root;
    let i = 0;

    while (i < pattern.length) {
      const edge = node.getEdge(pattern.charCodeAt(i));
      if (!edge) return false;

      const edgeLen = edge.length;
      const remaining = pattern.length - i;
      const compareLen = Math.min(edgeLen, remaining);

      // Compare character by character (could be optimized with slice)
      for (let k = 0; k < compareLen; k++) {
        if (this.text[edge.start + k] !== pattern[i + k]) {
          return false;
        }
      }

      i += compareLen;
      if (compareLen < edgeLen) {
        // Pattern ended in the middle of an edge → match succeeded
        return true;
      }
      node = edge.dest;
    }

    return true;
  }

  // -------------------------------------------------------------------------
  /** Debug helper – prints the tree in a readable form */
  public dump(): void {
    const lines: string[] = [];
    const walk = (node: Node, indent: string) => {
      for (const edge of node.edges.values()) {
        const label = this.text.substring(edge.start, edge.end.value + 1);
        lines.push(`${indent}${label} (${node.id} → ${edge.dest.id})`);
        walk(edge.dest, indent + '  ');
      }
    };
    walk(this.root, '');
    console.log(lines.join('\n'));
  }
}

// ---------------------------------------------------------------------------
// Example usage (you can paste this into a separate file or a REPL):
// ---------------------------------------------------------------------------

if (require.main === module) {
  const tree = new SuffixTree('banana');
  console.log('Tree built for "banana$" (terminator hidden)');

  const tests = ['ana', 'nan', 'ban', 'apple', 'a', ''];
  for (const p of tests) {
    console.log(`contains("${p}") = ${tree.contains(p)}`);
  }

  // Uncomment to see the whole tree structure:
  // tree.dump();
}
// test.ts ---------------------------------------------------------------
import { SuffixTree } from './suffixTree';

function randomString(len: number): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let s = '';
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

// Small sanity test
const tree = new SuffixTree('mississippi');
console.assert(tree.contains('issi'));
console.assert(!tree.contains('xyz'));

// Large random test (measure time)
const big = randomString(200_000);
console.time('build');
const bigTree = new SuffixTree(big);
console.timeEnd('build'); // should be well under a second on a modern laptop

console.time('search');
console.assert(bigTree.contains(big.slice(1000, 1010)));
console.timeEnd('search'); // O(pattern length)
ts-node test.ts
import { SuffixTree } from './suffixTree';

const st = new SuffixTree('abracadabra');
console.log(st.contains('cad'));   // true
console.log(st.contains('xyz'));   // false
// st.dump(); // optional visualisation
