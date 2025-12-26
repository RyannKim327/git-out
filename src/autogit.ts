/**
 * Suffix Tree (Ukkonen's algorithm) – TypeScript 5.x
 *
 *  • Works for any UTF‑16 string (each code unit is treated as a character).
 *  • The tree is built in O(n) time and O(n) memory.
 *  • Provides a simple `hasSubstring` query.
 *
 *  Author: ChatGPT (2025)
 *  License: MIT
 */

type Index = number; // position in the original string

/** Edge label is stored as a half‑open interval [start, end) on the original text. */
class Edge {
    /** inclusive start index */
    public start: Index;
    /** exclusive end index – for leaf edges this is a reference to the global `leafEnd` */
    public end: Index | { value: Index };

    /** Destination node */
    public dest: Node;

    constructor(start: Index, end: Index | { value: Index }, dest: Node) {
        this.start = start;
        this.end = end;
        this.dest = dest;
    }

    /** Length of the edge label (dynamic for leaf edges). */
    length(currentPos: Index): number {
        const e = typeof this.end === "object" ? this.end.value : this.end;
        return e - this.start + 1; // +1 because end is inclusive in Ukkonen's formulation
    }

    /** Returns the character at offset `i` (0‑based) inside the edge label. */
    charAt(i: number, text: string): string {
        const e = typeof this.end === "object" ? this.end.value : this.end;
        return text[this.start + i];
    }

    /** Returns the string represented by this edge (useful for debugging). */
    toString(text: string): string {
        const e = typeof this.end === "object" ? this.end.value : this.end;
        return text.substring(this.start, e + 1);
    }
}

/** Node of the suffix tree. */
class Node {
    /** Outgoing edges keyed by the first character of the edge label. */
    public edges: Map<string, Edge> = new Map();

    /** Suffix link used by Ukkonen's algorithm (null for the root). */
    public suffixLink: Node | null = null;

    /** For leaf nodes we store the start index of the suffix they represent. */
    public leafStart: Index | null = null;

    /** Helper for debugging – assign each node a unique id. */
    private static _idCounter = 0;
    public readonly id: number;

    constructor() {
        this.id = Node._idCounter++;
    }

    /** Returns the edge that starts with `ch`, or undefined. */
    getEdge(ch: string): Edge | undefined {
        return this.edges.get(ch);
    }

    /** Adds an edge keyed by its first character. */
    addEdge(ch: string, edge: Edge): void {
        this.edges.set(ch, edge);
    }

    /** Returns true if the node is a leaf (has no outgoing edges). */
    isLeaf(): boolean {
        return this.edges.size === 0;
    }
}

/** Helper structure that tracks the “active point” during construction. */
class ActivePoint {
    public node: Node;          // active node
    public edgeChar: string;    // first character of the active edge (or empty string if activeLength == 0)
    public length: number = 0; // active length

    constructor(root: Node) {
        this.node = root;
        this.edgeChar = "";
    }

    /** Resets the active point to the root (used after each phase). */
    reset(root: Node) {
        this.node = root;
        this.edgeChar = "";
        this.length = 0;
    }
}

/** Main suffix‑tree class. */
export class SuffixTree {
    private readonly text: string; // original string + terminal symbol
    private readonly root: Node = new Node();

    // Global end for all leaf edges – updated as we scan the string.
    private leafEnd: { value: Index } = { value: -1 };

    // The active point used by Ukkonen.
    private active: ActivePoint = new ActivePoint(this.root);

    // Number of suffixes that still need to be added in the current phase.
    private remainingSuffixCount = 0;

    // The last internal node created (used to set suffix links).
    private lastCreatedInternalNode: Node | null = null;

    /** Build a suffix tree for `input`. The function automatically appends `$`. */
    static build(input: string): SuffixTree {
        const tree = new SuffixTree(input + "$");
        tree.construct();
        return tree;
    }

    private constructor(text: string) {
        this.text = text;
    }

    /** Public API – does the tree contain `pattern`? */
    public hasSubstring(pattern: string): boolean {
        let curNode = this.root;
        let i = 0;

        while (i < pattern.length) {
            const edge = curNode.getEdge(pattern[i]);
            if (!edge) return false;

            const edgeLen = edge.length(this.leafEnd.value);
            const edgeLabel = edge.toString(this.text);
            const compareLen = Math.min(edgeLen, pattern.length - i);

            if (pattern.substr(i, compareLen) !== edgeLabel.substr(0, compareLen)) {
                return false;
            }

            i += compareLen;
            if (compareLen < edgeLen) {
                // pattern ended inside an edge → match
                return true;
            }
            curNode = edge.dest;
        }
        return true;
    }

    /** Debug helper – prints all edges (pre‑order). */
    public printEdges(): void {
        const dfs = (node: Node, depth: number) => {
            for (const [ch, edge] of node.edges) {
                const label = edge.toString(this.text);
                console.log(`${" ".repeat(depth * 2)}${node.id} --[${label}]--> ${edge.dest.id}`);
                dfs(edge.dest, depth + 1);
            }
        };
        dfs(this.root, 0);
    }

    /** -------------------  Ukkonen core  ------------------- */

    private construct(): void {
        for (let pos = 0; pos < this.text.length; ++pos) {
            this.extendTree(pos);
        }
    }

    /** Extend the tree by adding the character at position `pos`. */
    private extendTree(pos: Index): void {
        // 1. Increment the global leaf end – all leaf edges now implicitly include the new character.
        this.leafEnd.value = pos;

        // 2. One more suffix needs to be added.
        this.remainingSuffixCount++;

        // 3. Reset the last created internal node (used for suffix links).
        this.lastCreatedInternalNode = null;

        // 4. Main loop – keep adding suffixes until none are left for this phase.
        while (this.remainingSuffixCount > 0) {
            if (this.active.length === 0) {
                // Active point is on a node → the next character is the first character of the active edge.
                this.active.edgeChar = this.text[pos];
            }

            const edge = this.active.node.getEdge(this.active.edgeChar);

            if (!edge) {
                // ---------- CASE 1: No edge starting with active.edgeChar ----------
                // Create a new leaf edge from the active node.
                const leaf = new Node();
                leaf.leafStart = pos - this.remainingSuffixCount + 1; // start index of the suffix
                this.active.node.addEdge(this.text[pos], new Edge(pos, this.leafEnd, leaf));

                // If we created an internal node in the previous iteration, link it to the current active node.
                if (this.lastCreatedInternalNode) {
                    this.lastCreatedInternalNode.suffixLink = this.active.node;
                    this.lastCreatedInternalNode = null;
                }
            } else {
                // ---------- CASE 2: Edge exists ----------
                const edgeLen = edge.length(this.leafEnd.value);
                const nextChar = this.text[edge.start + this.active.length];

                if (this.active.length >= edgeLen) {
                    // Walk down (skip/count trick) – the active point moves to the next node.
                    this.active.node = edge.dest;
                    this.active.length -= edgeLen;
                    this.active.edgeChar = this.text[pos];
                    continue; // re‑evaluate with the new active point
                }

                // If the next character on the edge matches the current character, we are done for this phase.
                if (nextChar === this.text[pos]) {
                    // Rule 3 (extension rule): just increment active length.
                    this.active.length++;

                    // If we created an internal node earlier, set its suffix link to the current active node.
                    if (this.lastCreatedInternalNode) {
                        this.lastCreatedInternalNode.suffixLink = this.active.node;
                        this.lastCreatedInternalNode = null;
                    }
                    break; // stop processing this phase
                }

                // ---------- CASE 3: Mismatch → split edge ----------
                // 1) Create a new internal node (splitNode) that will become the parent of the existing edge.
                const splitNode = new Node();

                // Edge from splitNode to the original child (the “right” part of the split edge)
                const rightEdge = new Edge(edge.start + this.active.length, edge.end, edge.dest);
                splitNode.addEdge(this.text[rightEdge.start], rightEdge);

                // Edge from splitNode to a new leaf (the “left” part – the new suffix)
                const leaf = new Node();
                leaf.leafStart = pos - this.remainingSuffixCount + 1;
                splitNode.addEdge(this.text[pos], new Edge(pos, this.leafEnd, leaf));

                // Update the original edge to point to splitNode and shorten its label.
                edge.end = edge.start + this.active.length - 1;
                edge.dest = splitNode;

                // Replace the edge in the parent node.
                this.active.node.addEdge(this.active.edgeChar, edge);

                // Suffix link handling.
                if (this.lastCreatedInternalNode) {
                    this.lastCreatedInternalNode.suffixLink = splitNode;
                }
                this.lastCreatedInternalNode = splitNode;
            }

            // After handling the current suffix, move the active point according to the suffix link rule.
            this.remainingSuffixCount--;

            if (this.active.node === this.root && this.active.length > 0) {
                // Special case: we are at the root and have a non‑empty active length.
                this.active.length--;
                this.active.edgeChar = this.text[pos - this.remainingSuffixCount + 1];
            } else {
                // Follow the suffix link if it exists; otherwise go to root.
                this.active.node = this.active.node.suffixLink ?? this.root;
            }
        }
    }
}

/* ------------------------------------------------------------------ */
/* ---------------------------  Demo / Tests  ----------------------- */
/* ------------------------------------------------------------------ */

function demo() {
    const input = "bananas";
    const tree = SuffixTree.build(input);

    console.log(`Suffix tree for "${input}$":`);
    tree.printEdges();

    const queries = ["ana", "nana", "ban", "as", "banana", "s$", "a$", "b", "x"];
    for (const q of queries) {
        console.log(`contains("${q}") → ${tree.hasSubstring(q)}`);
    }
}

/* Run the demo when this file is executed directly (Node.js) */
if (require.main === module) {
    demo();
}

/* ------------------------------------------------------------------ */
/* -----------------------  What to Extend / Optimize  -------------- */
/* ------------------------------------------------------------------ */

/*
 * 1. **Generalised Suffix Tree** – support multiple strings by using a unique
 *    terminator per string (e.g. `$`, `#`, `@`, …) and storing the string id
 *    on each leaf.
 *
 * 2. **Compressed representation** – store edge labels as (start, length) pairs
 *    instead of (start, end) to avoid the extra `+1` arithmetic.
 *
 * 3. **Iterative traversal** – expose an iterator that yields all suffixes,
 *    all substrings, or all repeated substrings.
 *
 * 4. **Memory pool** – for very large inputs you may want to allocate nodes
 *    from a pre‑allocated array to reduce GC pressure.
 *
 * 5. **Unicode support** – the current implementation works on UTF‑16 code units.
 *    For full Unicode grapheme‑cluster handling you would need to preprocess the
 *    string into an array of code points.
 */
