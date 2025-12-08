class SuffixTreeNode {
    children: Map<string, SuffixTreeNode> = new Map();
    suffixLink: SuffixTreeNode | null = null;
    start: number;
    end: number | (() => number); // Using function pointer for dynamic end
    index: number = -1; // For leaf nodes to store suffix starting index

    constructor(start: number, end: number | (() => number)) {
        this.start = start;
        this.end = end;
    }

    get edgeLength(): number {
        return (typeof this.end === 'function' ? this.end() : this.end) - this.start + 1;
    }
}

class SuffixTree {
    private root: SuffixTreeNode;
    private activeNode: SuffixTreeNode;
    private activeEdge: string = '';
    private activeLength: number = 0;
    private remaining: number = 0;
    private globalEnd: number = -1;
    private text: string = '';
    private rootEnd: number;
    private splitNode: SuffixTreeNode | null = null;

    constructor(text: string) {
        this.text = text;
        this.rootEnd = -1;
        this.root = new SuffixTreeNode(-1, () => this.rootEnd);
        this.activeNode = this.root;
        this.buildTree();
    }

    private buildTree(): void {
        this.root.suffixLink = this.root;
        let activeNode = this.root;

        for (let i = 0; i < this.text.length; i++) {
            this.globalEnd = i;
            this.remaining++;
            this.splitNode = null;

            while (this.remaining > 0) {
                if (this.activeLength === 0) {
                    this.activeEdge = this.text[i];
                }

                const nextNode = this.activeNode.children.get(this.activeEdge);
                if (!nextNode) {
                    // Rule 2: Add new leaf
                    this.activeNode.children.set(
                        this.text[i],
                        new SuffixTreeNode(i, () => this.globalEnd)
                    );
                    this.addSuffixLink(this.activeNode);
                } else {
                    if (this.walkDown(nextNode)) continue;
                    
                    // Rule 3: Current character exists in edge
                    if (this.text[nextNode.start + this.activeLength] === this.text[i]) {
                        this.activeLength++;
                        this.addSuffixLink(this.activeNode);
                        break; // Observation 1: Showstopper
                    }

                    // Rule 2: Split edge (create internal node)
                    const splitEnd = nextNode.start + this.activeLength - 1;
                    const splitNode = new SuffixTreeNode(nextNode.start, splitEnd);
                    this.activeNode.children.set(this.activeEdge, splitNode);
                    
                    // Create new leaf
                    splitNode.children.set(
                        this.text[i],
                        new SuffixTreeNode(i, () => this.globalEnd)
                    );
                    
                    // Update original node
                    nextNode.start += this.activeLength;
                    splitNode.children.set(this.text[nextNode.start], nextNode);
                    
                    this.addSuffixLink(splitNode);
                }

                this.remaining--;
                if (this.activeNode === this.root && this.activeLength > 0) {
                    // Rule 1: Follow suffix link from root
                    this.activeLength--;
                    this.activeEdge = this.text[i - this.remaining + 1];
                } else {
                    // Follow suffix link if exists
                    this.activeNode = this.activeNode.suffixLink ?? this.root;
                }
            }
        }
        this.setSuffixIndices(this.root, 0);
    }

    private walkDown(node: SuffixTreeNode): boolean {
        if (this.activeLength >= node.edgeLength) {
            this.activeEdge = this.text[node.start + node.edgeLength];
            this.activeLength -= node.edgeLength;
            this.activeNode = node;
            return true;
        }
        return false;
    }

    private addSuffixLink(node: SuffixTreeNode): void {
        if (this.splitNode !== null) {
            this.splitNode.suffixLink = node;
            this.splitNode = null;
        }
    }

    private setSuffixIndices(node: SuffixTreeNode, labelHeight: number): void {
        if (node.children.size === 0) {
            node.index = this.text.length - labelHeight;
            return;
        }

        for (const child of node.children.values()) {
            this.setSuffixIndices(
                child,
                labelHeight + (child.end - child.start + 1)
            );
        }
    }

    // Search if pattern exists in the suffix tree
    search(pattern: string): boolean {
        let currentNode = this.root;
        let currentIndex = 0;

        while (currentIndex < pattern.length) {
            const char = pattern[currentIndex];
            const child = currentNode.children.get(char);

            if (!child) return false;

            // Compare edge characters
            const edgeLength = child.end - child.start + 1;
            const edgeText = this.text.slice(child.start, child.end + 1);
            const remainingPattern = pattern.slice(currentIndex);
            
            for (let i = 0; i < Math.min(edgeLength, remainingPattern.length); i++) {
                if (edgeText[i] !== remainingPattern[i]) {
                    return false;
                }
            }

            currentIndex += edgeLength;
            currentNode = child;
        }
        return true;
    }
}

// Usage Example
const text = "abcabxabcd";
const suffixTree = new SuffixTree(text);

console.log("Search 'abx':", suffixTree.search("abx"));  // true
console.log("Search 'abc':", suffixTree.search("abc"));  // true
console.log("Search 'xyz':", suffixTree.search("xyz"));  // false
