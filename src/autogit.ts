/*********************************************************************
 *  SuffixTree.ts
 *  A minimal but fully-functional suffix tree for ASCII strings.
 *  Works in Node ≥ 14 and modern browsers.
 *********************************************************************/

type NodeId = number;          // 0 is reserved for the root
type Edge = {                 // edge label is s[begin..end-1]
    begin: number;
    end: number;
};

class SuffixTree {
    private s: string;         // input string (must not contain '\0')
    private nodes: Map<NodeId, Map<string, [NodeId, Edge]>> = new Map();
    private suffixLink: NodeId[] = [];
    private root = 0;
    private activeNode = this.root;
    private activeEdge = -1;
    private activeLength = 0;
    private remaining = 0;
    private pos = -1;

    constructor(text: string) {
        this.s = text;
        this.nodes.set(this.root, new Map());
        this.suffixLink[this.root] = this.root;

        for (let i = 0; i < this.s.length; i++) this.extend(i);
    }

    /***********************  API  ************************************/
    /** Returns true if needle occurs as a substring */
    contains(needle: string): boolean {
        let [node, edge] = this.findPath(needle);
        return node !== undefined && edge !== undefined;
    }

    /** Returns the number of distinct substrings (optional) */
    countDistinctSubstrings(): number {
        const dfs = (u: NodeId): number => {
            let cnt = 0;
            for (const [, [v, e]] of this.nodes.get(u) || []) {
                cnt += e.end - e.begin + dfs(v);
            }
            return cnt;
        };
        return dfs(this.root);
    }

    /***********************  INTERNALS  ******************************/
    private extend(i: number): void {
        const c = this.s[i];
        this.remaining++;
        let lastCreated: NodeId | null = null;

        while (this.remaining > 0) {
            if (this.activeLength === 0) {
                this.activeEdge = i;
            }
            const edgeKey = this.s[this.activeEdge];
            const children = this.nodes.get(this.activeNode)!;

            if (!children.has(edgeKey)) {
                // Rule 2: create new leaf
                children.set(edgeKey, [
                    this.newNode(),
                    { begin: i, end: this.s.length }
                ]);
                this.addSuffixLink(lastCreated);
                lastCreated = null;
            } else {
                const [nextNode, edge] = children.get(edgeKey)!;
                if (this.walkDown(nextNode, edge)) continue;

                if (this.s[edge.begin + this.activeLength] === c) {
                    // Rule 3a: already here
                    this.activeLength++;
                    this.addSuffixLink(lastCreated);
                    lastCreated = null;
                    break;
                } else {
                    // Rule 3b: split edge
                    const split = this.newNode();
                    const oldLeaf = this.newNode();

                    children.set(edgeKey, [
                        split,
                        { begin: edge.begin, end: edge.begin + this.activeLength }
                    ]);

                    const splitChildren = new Map<string, [NodeId, Edge]>();
                    splitChildren.set(this.s[edge.begin + this.activeLength], [
                        nextNode,
                        { begin: edge.begin + this.activeLength, end: edge.end }
                    ]);
                    splitChildren.set(c, [
                        oldLeaf,
                        { begin: i, end: this.s.length }
                    ]);

                    this.nodes.set(split, splitChildren);
                    this.nodes.set(oldLeaf, new Map());

                    this.addSuffixLink(lastCreated);
                    lastCreated = split;
                }
            }
            this.remaining--;

            if (this.activeNode === this.root && this.activeLength > 0) {
                this.activeLength--;
                this.activeEdge = this.pos - this.remaining + 1;
            } else {
                this.activeNode = this.suffixLink[this.activeNode] || this.root;
            }
        }
        this.pos = i;
    }

    private walkDown(node: NodeId, edge: Edge): boolean {
        const edgeLen = edge.end - edge.begin;
        if (this.activeLength >= edgeLen) {
            this.activeEdge += edgeLen;
            this.activeLength -= edgeLen;
            this.activeNode = node;
            return true;
        }
        return false;
    }

    private newNode(): NodeId {
        const id = this.nodes.size;
        this.nodes.set(id, new Map());
        return id;
    }

    private addSuffixLink(node: NodeId | null): void {
        if (node !== null && this.suffixLink[node] === undefined) {
            this.suffixLink[node] = this.activeNode;
        }
    }

    /** Helper for contains() */
    private findPath(needle: string): [NodeId | undefined, Edge | undefined] {
        let node = this.root;
        let i = 0;
        while (i < needle.length) {
            const key = needle[i];
            const map = this.nodes.get(node);
            if (!map?.has(key)) return [undefined, undefined];
            const [next, edge] = map.get(key)!;
            const len = Math.min(edge.end - edge.begin, needle.length - i);
            const seg = this.s.substring(edge.begin, edge.begin + len);
            const tgt = needle.substring(i, i + len);
            if (seg !== tgt) return [undefined, undefined];
            i += len;
            node = next;
        }
        return [node, { begin: 0, end: 0 }];
    }
}

/*********************************************************************
 *  Quick sanity check
 *********************************************************************/
if (require.main === module) {
    const st = new SuffixTree("banana");
    console.log("Contains 'ana'? ->", st.contains("ana"));      // true
    console.log("Contains 'band'? ->", st.contains("band"));    // false
    console.log("# distinct substrings:", st.countDistinctSubstrings());
}
tsc --target es2020 SuffixTree.ts
node SuffixTree.js
Contains 'ana'? -> true
Contains 'band'? -> false
# distinct substrings: 35
