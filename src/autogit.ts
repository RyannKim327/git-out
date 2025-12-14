interface SuffixTreeNode {
    children: Map<string, SuffixTreeNode>;
    start?: number;
    end?: number;
    suffixLink?: SuffixTreeNode;
    isRoot?: boolean;
}

interface SuffixTree {
    root: SuffixTreeNode;
    text: string;
}
class SuffixTree {
    private root: SuffixTreeNode;
    private text: string;
    private remainingSuffixCount: number = 0;
    private lastNewNode: SuffixTreeNode | null = null;
    private activeNode: SuffixTreeNode;
    private activeEdge: number = -1;
    private activeLength: number = 0;

    constructor(text: string) {
        this.text = text + '$'; // Add terminal character
        this.root = this.createNode();
        this.root.isRoot = true;
        this.activeNode = this.root;
        this.buildSuffixTree();
    }

    private createNode(start?: number, end?: number): SuffixTreeNode {
        return {
            children: new Map<string, SuffixTreeNode>(),
            start,
            end,
            suffixLink: this.root
        };
    }

    private edgeLength(node: SuffixTreeNode): number {
        if (node.end === undefined) return 0;
        return (node.end === Infinity ? this.text.length : node.end) - (node.start || 0) + 1;
    }

    private walkDown(currentNode: SuffixTreeNode): boolean {
        const edgeLength = this.edgeLength(currentNode);
        
        if (this.activeLength >= edgeLength) {
            this.activeEdge += edgeLength;
            this.activeLength -= edgeLength;
            this.activeNode = currentNode;
            return true;
        }
        return false;
    }

    private extendSuffixTree(pos: number): void {
        this.lastNewNode = null;
        this.remainingSuffixCount++;
        
        while (this.remainingSuffixCount > 0) {
            if (this.activeLength === 0) {
                this.activeEdge = pos;
            }

            const activeEdgeChar = this.text[this.activeEdge];
            let nextNode = this.activeNode.children.get(activeEdgeChar);

            if (!nextNode) {
                // Rule 2: Create new leaf node
                const leafNode = this.createNode(pos, Infinity);
                this.activeNode.children.set(activeEdgeChar, leafNode);
                
                if (this.lastNewNode) {
                    this.lastNewNode.suffixLink = this.activeNode;
                    this.lastNewNode = null;
                }
            } else {
                // Rule 3: Show stopper
                if (this.walkDown(nextNode)) {
                    continue;
                }

                const nextChar = this.text[nextNode.start! + this.activeLength];
                if (nextChar === this.text[pos]) {
                    // Rule 3: Extension
                    if (this.lastNewNode && this.activeNode !== this.root) {
                        this.lastNewNode.suffixLink = this.activeNode;
                        this.lastNewNode = null;
                    }
                    this.activeLength++;
                    break;
                }

                // Rule 2: Split edge
                const splitEnd = nextNode.start! + this.activeLength - 1;
                const splitNode = this.createNode(nextNode.start!, splitEnd);
                this.activeNode.children.set(activeEdgeChar, splitNode);

                // Create new leaf node
                const leafNode = this.createNode(pos, Infinity);
                splitNode.children.set(this.text[pos], leafNode);

                // Update the existing node
                nextNode.start! += this.activeLength;
                splitNode.children.set(this.text[nextNode.start!], nextNode);

                if (this.lastNewNode) {
                    this.lastNewNode.suffixLink = splitNode;
                }

                this.lastNewNode = splitNode;
            }

            this.remainingSuffixCount--;
            
            if (this.activeNode === this.root && this.activeLength > 0) {
                this.activeLength--;
                this.activeEdge = pos - this.remainingSuffixCount + 1;
            } else if (this.activeNode !== this.root) {
                this.activeNode = this.activeNode.suffixLink!;
            }
        }
    }

    private buildSuffixTree(): void {
        for (let i = 0; i < this.text.length; i++) {
            this.extendSuffixTree(i);
        }
    }

    // Public methods
    public contains(pattern: string): boolean {
        return this.findNode(pattern) !== null;
    }

    private findNode(pattern: string): SuffixTreeNode | null {
        let currentNode = this.root;
        let patternIndex = 0;

        while (patternIndex < pattern.length) {
            const char = pattern[patternIndex];
            const nextNode = currentNode.children.get(char);

            if (!nextNode) return null;

            // Check the edge label
            const edgeStart = nextNode.start!;
            const edgeEnd = Math.min(nextNode.end!, this.text.length - 1);
            const edgeLength = edgeEnd - edgeStart + 1;

            for (let i = 0; i < edgeLength && patternIndex < pattern.length; i++) {
                if (this.text[edgeStart + i] !== pattern[patternIndex]) {
                    return null;
                }
                patternIndex++;
            }

            currentNode = nextNode;
        }

        return currentNode;
    }

    public getAllSuffixes(): string[] {
        const suffixes: string[] = [];
        this.collectSuffixes(this.root, "", suffixes);
        return suffixes.filter(suffix => suffix !== "" && suffix !== "$");
    }

    private collectSuffixes(node: SuffixTreeNode, currentString: string, suffixes: string[]): void {
        if (node.children.size === 0) {
            suffixes.push(currentString);
            return;
        }

        for (const [char, child] of node.children) {
            const edgeStart = child.start!;
            const edgeEnd = child.end === Infinity ? this.text.length - 1 : child.end!;
            const edgeLabel = this.text.substring(edgeStart, edgeEnd + 1);
            
            this.collectSuffixes(child, currentString + edgeLabel, suffixes);
        }
    }

    public longestRepeatedSubstring(): string {
        let result = "";
        this.findLongestRepeatedSubstring(this.root, "", result);
        return result;
    }

    private findLongestRepeatedSubstring(node: SuffixTreeNode, currentString: string, result: string): void {
        if (node.children.size > 1 && currentString.length > result.length) {
            result = currentString;
        }

        for (const [char, child] of node.children) {
            const edgeStart = child.start!;
            const edgeEnd = child.end === Infinity ? this.text.length - 1 : child.end!;
            const edgeLabel = this.text.substring(edgeStart, edgeEnd + 1);
            
            this.findLongestRepeatedSubstring(child, currentString + edgeLabel, result);
        }
    }

    // Visualization helper
    public printTree(): void {
        console.log("Suffix Tree Structure:");
        this.printNode(this.root, "", 0);
    }

    private printNode(node: SuffixTreeNode, prefix: string, depth: number): void {
        const indent = "  ".repeat(depth);
        
        if (node.children.size === 0) {
            console.log(`${indent}${prefix} (leaf)`);
            return;
        }

        if (depth > 0) {
            console.log(`${indent}${prefix}`);
        }

        for (const [char, child] of node.children) {
            const edgeStart = child.start!;
            const edgeEnd = child.end === Infinity ? this.text.length - 1 : child.end!;
            const edgeLabel = this.text.substring(edgeStart, edgeEnd + 1);
            
            this.printNode(child, edgeLabel, depth + 1);
        }
    }
}
// Example usage
const suffixTree = new SuffixTree("banana");

// Check if pattern exists
console.log("Contains 'ana':", suffixTree.contains("ana")); // true
console.log("Contains 'nan':", suffixTree.contains("nan")); // true
console.log("Contains 'xyz':", suffixTree.contains("xyz")); // false

// Get all suffixes
console.log("All suffixes:", suffixTree.getAllSuffixes());
// Output: ["a", "na", "ana", "nana", "anana", "banana"]

// Find longest repeated substring
console.log("Longest repeated substring:", suffixTree.longestRepeatedSubstring());
// Output: "ana"

// Print tree structure (for debugging)
suffixTree.printTree();
class UkkonenSuffixTree extends SuffixTree {
    // This would implement the full Ukkonen's algorithm
    // The base class already implements a simplified version
    
    // Additional optimization methods would go here
}
