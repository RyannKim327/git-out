class SuffixTreeNode {
    children: Record<string, SuffixTreeNode>;
    suffixLink: SuffixTreeNode | null;
    start: number;
    end: number | null;

    constructor(start: number, end: number | null) {
        this.children = {};
        this.suffixLink = null;
        this.start = start;
        this.end = end;
    }
}

class SuffixTree {
    private root: SuffixTreeNode;
    private text: string;
    private activeNode: SuffixTreeNode;
    private activeEdge: number;
    private activeLength: number;
    private remaining: number;
    private globalEnd: number;
    private lastNewNode: SuffixTreeNode | null;

    constructor(text: string) {
        this.text = text;
        this.globalEnd = -1;
        this.root = new SuffixTreeNode(-1, -1);
        this.activeNode = this.root;
        this.activeEdge = -1;
        this.activeLength = 0;
        this.remaining = 0;
        this.lastNewNode = null;

        this.build();
    }

    private build(): void {
        for (let i = 0; i < this.text.length; i++) {
            this.globalEnd = i;
            this.remaining++;
            this.lastNewNode = null;

            while (this.remaining > 0) {
                if (this.activeLength === 0) {
                    this.activeEdge = i;
                }

                const currentChar = this.text[this.activeEdge];
                if (!this.activeNode.children[currentChar]) {
                    // Rule 2: Add new leaf
                    this.activeNode.children[currentChar] = new SuffixTreeNode(i, null);
                    this.addSuffixLink(this.activeNode);
                } else {
                    const next = this.activeNode.children[currentChar];
                    const edgeLength = this.getEdgeLength(next);

                    // Rule 3: Showstopper
                    if (this.activeLength >= edgeLength) {
                        this.activeEdge += edgeLength;
                        this.activeLength -= edgeLength;
                        this.activeNode = next;
                        continue;
                    }

                    // Rule 1: Extension
                    if (this.text[next.start! + this.activeLength] === this.text[i]) {
                        this.activeLength++;
                        this.addSuffixLink(this.activeNode);
                        break;
                    }

                    // Rule 2: Split and create new branches
                    const splitEnd = next.start! + this.activeLength - 1;
                    const splitNode = new SuffixTreeNode(next.start!, splitEnd);
                    const leafNode = new SuffixTreeNode(i, null);

                    this.activeNode.children[currentChar] = splitNode;
                    splitNode.children[this.text[splitEnd + 1]] = next;
                    splitNode.children[this.text[i]] = leafNode;

                    next.start! += this.activeLength;
                    this.addSuffixLink(splitNode);
                }

                this.remaining--;

                // Walk down to next node for next suffix
                if (this.activeNode === this.root && this.activeLength > 0) {
                    this.activeLength--;
                    this.activeEdge = i - this.remaining + 1;
                } else if (this.activeNode !== this.root) {
                    this.activeNode = this.activeNode.suffixLink || this.root;
                }
            }
        }
    }

    private addSuffixLink(node: SuffixTreeNode): void {
        if (this.lastNewNode) {
            this.lastNewNode.suffixLink = node;
        }
        this.lastNewNode = node;
    }

    private getEdgeLength(node: SuffixTreeNode): number {
        return (node.end === null ? this.globalEnd : node.end) - node.start + 1;
    }

    // Search if substring exists in the tree
    public search(pattern: string): boolean {
        let current = this.root;
        let patternIndex = 0;

        while (patternIndex < pattern.length) {
            const char = pattern[patternIndex];
            if (!current.children[char]) return false;

            const child = current.children[char];
            const edgeLength = this.getEdgeLength(child);
            const textPart = this.text.slice(child.start, child.end !== null ? child.end + 1 : undefined);

            for (let i = 0; i < edgeLength && patternIndex < pattern.length; i++) {
                if (textPart[i] !== pattern[patternIndex]) return false;
                patternIndex++;
            }

            current = child;
        }

        return true;
    }

    // Visualize the tree structure
    public printTree(node = this.root, depth = 0): void {
        for (const [char, child] of Object.entries(node.children)) {
            const edgeLabel = this.text.slice(child.start, child.end === null ? this.text.length : child.end + 1);
            console.log(' '.repeat(depth * 2) + `[${char}] ${edgeLabel}`);
            this.printTree(child, depth + 1);
        }
    }
}

// Usage Example
const st = new SuffixTree('banana$');
console.log('Search \'an\':', st.search('an'));  // true
console.log('Search \'bad\':', st.search('bad')); // false
console.log('Tree Structure:');
st.printTree();
