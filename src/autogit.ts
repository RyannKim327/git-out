class SuffixTreeNode {
    children: Map<string, SuffixTreeNode>;
    start: number;
    end: number | null; // null indicates the edge goes to end of string
    suffixLink: SuffixTreeNode | null;

    constructor(start: number, end: number | null = null) {
        this.children = new Map();
        this.start = start;
        this.end = end;
        this.suffixLink = null;
    }

    getEdgeLength(position: number): number {
        const end = this.end === null ? position : this.end;
        return end - this.start + 1;
    }
}

class SuffixTree {
    private root: SuffixTreeNode;
    private text: string;
    private activeNode: SuffixTreeNode;
    private activeEdge: number;
    private activeLength: number;
    private remaining: number;
    private currentNode: SuffixTreeNode;
    private position: number;
    private lastInternalNode: SuffixTreeNode | null;

    constructor(text: string) {
        this.text = text + '$'; // Add terminator
        this.root = new SuffixTreeNode(-1, -1);
        this.buildTree();
    }

    private buildTree(): void {
        this.activeNode = this.root;
        this.activeEdge = 0;
        this.activeLength = 0;
        this.remaining = 0;
        this.position = -1;

        for (let i = 0; i < this.text.length; i++) {
            this.extendTree(i);
        }
    }

    private extendTree(pos: number): void {
        this.position = pos;
        this.remaining++;
        this.lastInternalNode = null;

        while (this.remaining > 0) {
            if (this.activeLength === 0) {
                this.activeEdge = pos;
            }

            const activeChar = this.text[this.activeEdge];
            if (!this.activeNode.children.has(activeChar)) {
                // Rule 2: Insert new leaf node
                const newNode = new SuffixTreeNode(pos);
                this.activeNode.children.set(activeChar, newNode);
                
                if (this.lastInternalNode) {
                    this.lastInternalNode.suffixLink = this.activeNode;
                    this.lastInternalNode = null;
                }
            } else {
                const nextNode = this.activeNode.children.get(activeChar)!;
                const edgeLength = nextNode.getEdgeLength(this.position);

                // Skip count
                if (this.activeLength >= edgeLength) {
                    this.activeEdge += edgeLength;
                    this.activeLength -= edgeLength;
                    this.activeNode = nextNode;
                    continue;
                }

                // Rule 3: Current character exists on edge
                if (this.text[nextNode.start + this.activeLength] === this.text[pos]) {
                    this.activeLength++;
                    if (this.lastInternalNode) {
                        this.lastInternalNode.suffixLink = this.activeNode;
                    }
                    break;
                }

                // Rule 2: Split edge
                const splitNode = new SuffixTreeNode(nextNode.start, nextNode.start + this.activeLength - 1);
                const newNode = new SuffixTreeNode(pos);
                nextNode.start += this.activeLength;
                
                this.activeNode.children.set(activeChar, splitNode);
                splitNode.children.set(this.text[nextNode.start], nextNode);
                splitNode.children.set(this.text[pos], newNode);

                // Update suffix links
                if (this.lastInternalNode) {
                    this.lastInternalNode.suffixLink = splitNode;
                }
                this.lastInternalNode = splitNode;
            }

            this.remaining--;
            if (this.activeNode === this.root && this.activeLength > 0) {
                this.activeLength--;
                this.activeEdge = pos - this.remaining + 1;
            } else if (this.activeNode !== this.root) {
                this.activeNode = this.activeNode.suffixLink || this.root;
            }
        }
    }

    public search(substring: string): boolean {
        let currentNode = this.root;
        let currentPosition = 0;

        while (currentPosition < substring.length) {
            const currentChar = substring[currentPosition];
            const childNode = currentNode.children.get(currentChar);

            if (!childNode) return false;

            const edgeString = this.text.slice(
                childNode.start,
                childNode.end === null ? this.text.length : childNode.end + 1
            );

            for (let i = 0; i < edgeString.length && currentPosition < substring.length; i++) {
                if (edgeString[i] !== substring[currentPosition]) return false;
                currentPosition++;
            }

            currentNode = childNode;
        }

        return true;
    }

    public printTree(node: SuffixTreeNode = this.root, level: number = 0): void {
        console.log(' '.repeat(level * 4) + `Node(${node.start}, ${node.end})`);
        node.children.forEach((child, key) => {
            const edge = this.text.slice(
                child.start,
                child.end === null ? this.text.length : child.end + 1
            );
            console.log(' '.repeat((level + 1) * 4) + `Edge: '${edge}'`);
            this.printTree(child, level + 2);
        });
    }
}

// Usage example
const suffixTree = new SuffixTree('banana');
console.log('Contains "ana":', suffixTree.search('ana')); // true
console.log('Contains "ban":', suffixTree.search('ban')); // true
console.log('Contains "nan":', suffixTree.search('nan')); // true
console.log('Contains "ax":', suffixTree.search('ax'));   // false

// Print the tree structure
suffixTree.printTree();
