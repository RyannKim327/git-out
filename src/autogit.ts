interface SuffixTreeNode {
    children: Map<string, SuffixTreeNode>;
    start?: number;
    end?: number;
    suffixLink?: SuffixTreeNode;
    index?: number;
}

class SuffixTree {
    private root: SuffixTreeNode;
    private text: string;
    private remainingSuffixCount: number = 0;
    private lastNewNode: SuffixTreeNode | null = null;
    private activeNode: SuffixTreeNode;
    private activeEdge: number = -1;
    private activeLength: number = 0;
    private size: number = -1;

    constructor(text: string) {
        this.text = text;
        this.root = { children: new Map() };
        this.activeNode = this.root;
        this.buildSuffixTree();
    }

    private buildSuffixTree(): void {
        this.size = this.text.length;
        
        for (let i = 0; i < this.size; i++) {
            this.extendSuffixTree(i);
        }
    }

    private extendSuffixTree(pos: number): void {
        this.lastNewNode = null;
        this.remainingSuffixCount++;
        
        while (this.remainingSuffixCount > 0) {
            if (this.activeLength === 0) {
                this.activeEdge = pos;
            }

            const activeEdgeChar = this.text[this.activeEdge];
            
            if (!this.activeNode.children.has(activeEdgeChar)) {
                this.activeNode.children.set(
                    activeEdgeChar,
                    {
                        children: new Map(),
                        start: pos,
                        end: this.size - 1,
                        index: pos - this.activeLength
                    }
                );
                
                if (this.lastNewNode !== null) {
                    this.lastNewNode.suffixLink = this.activeNode;
                    this.lastNewNode = null;
                }
            } else {
                const next = this.activeNode.children.get(activeEdgeChar)!;
                
                if (this.walkDown(next)) {
                    continue;
                }
                
                if (this.text[next.start! + this.activeLength] === this.text[pos]) {
                    if (this.lastNewNode !== null && this.activeNode !== this.root) {
                        this.lastNewNode.suffixLink = this.activeNode;
                        this.lastNewNode = null;
                    }
                    
                    this.activeLength++;
                    break;
                }

                const splitEnd = next.start! + this.activeLength - 1;
                const split = this.createNewNode(next.start!, splitEnd);
                
                split.children.set(
                    this.text[pos],
                    {
                        children: new Map(),
                        start: pos,
                        end: this.size - 1,
                        index: pos - this.activeLength
                    }
                );
                
                next.start! += this.activeLength;
                split.children.set(this.text[next.start!], next);
                
                this.activeNode.children.set(activeEdgeChar, split);
                
                if (this.lastNewNode !== null) {
                    this.lastNewNode.suffixLink = split;
                }
                
                this.lastNewNode = split;
            }

            this.remainingSuffixCount--;
            
            if (this.activeNode === this.root && this.activeLength > 0) {
                this.activeLength--;
                this.activeEdge = pos - this.remainingSuffixCount + 1;
            } else if (this.activeNode !== this.root) {
                this.activeNode = this.activeNode.suffixLink || this.root;
            }
        }
    }

    private walkDown(node: SuffixTreeNode): boolean {
        if (this.activeLength >= this.edgeLength(node)) {
            this.activeEdge += this.edgeLength(node);
            this.activeLength -= this.edgeLength(node);
            this.activeNode = node;
            return true;
        }
        return false;
    }

    private edgeLength(node: SuffixTreeNode): number {
        return (node.end! - node.start! + 1);
    }

    private createNewNode(start: number, end: number): SuffixTreeNode {
        return {
            children: new Map(),
            start: start,
            end: end,
            suffixLink: this.root
        };
    }

    // Search for a pattern in the suffix tree
    search(pattern: string): boolean {
        let currentNode = this.root;
        let patternIndex = 0;

        while (patternIndex < pattern.length) {
            const char = pattern[patternIndex];
            
            if (!currentNode.children.has(char)) {
                return false;
            }

            const child = currentNode.children.get(char)!;
            const edgeLength = Math.min(
                child.end! - child.start! + 1,
                pattern.length - patternIndex
            );

            for (let i = 0; i < edgeLength; i++) {
                if (this.text[child.start! + i] !== pattern[patternIndex + i]) {
                    return false;
                }
            }

            patternIndex += edgeLength;
            currentNode = child;
        }

        return true;
    }

    // Find all occurrences of a pattern
    findAllOccurrences(pattern: string): number[] {
        const occurrences: number[] = [];
        this.findAllOccurrencesRecursive(this.root, pattern, 0, occurrences);
        return occurrences;
    }

    private findAllOccurrencesRecursive(
        node: SuffixTreeNode,
        pattern: string,
        depth: number,
        occurrences: number[]
    ): void {
        if (node.children.size === 0) {
            if (node.index !== undefined) {
                occurrences.push(node.index);
            }
            return;
        }

        if (depth === pattern.length) {
            this.collectLeafIndices(node, occurrences);
            return;
        }

        const char = pattern[depth];
        if (!node.children.has(char)) return;

        const child = node.children.get(char)!;
        const edgeLength = child.end! - child.start! + 1;
        const patternRemaining = pattern.length - depth;

        if (edgeLength <= patternRemaining) {
            for (let i = 0; i < edgeLength; i++) {
                if (this.text[child.start! + i] !== pattern[depth + i]) {
                    return;
                }
            }
            this.findAllOccurrencesRecursive(child, pattern, depth + edgeLength, occurrences);
        } else {
            for (let i = 0; i < patternRemaining; i++) {
                if (this.text[child.start! + i] !== pattern[depth + i]) {
                    return;
                }
            }
            this.collectLeafIndices(child, occurrences);
        }
    }

    private collectLeafIndices(node: SuffixTreeNode, occurrences: number[]): void {
        if (node.children.size === 0) {
            if (node.index !== undefined) {
                occurrences.push(node.index);
            }
            return;
        }

        for (const child of node.children.values()) {
            this.collectLeafIndices(child, occurrences);
        }
    }

    // Visualize the suffix tree (for debugging)
    visualize(): string {
        return this.visualizeNode(this.root, 0);
    }

    private visualizeNode(node: SuffixTreeNode, depth: number): string {
        let result = '';
        const indent = '  '.repeat(depth);
        
        for (const [char, child] of node.children.entries()) {
            const edge = this.text.substring(child.start!, child.end! + 1);
            result += `${indent}${char}: "${edge}"`;
            if (child.index !== undefined) {
                result += ` [index: ${child.index}]`;
            }
            result += '\n';
            result += this.visualizeNode(child, depth + 1);
        }
        
        return result;
    }
}
// Create and use the suffix tree
const text = "banana$"; // $ is commonly used as terminator
const suffixTree = new SuffixTree(text);

// Search for patterns
console.log("Contains 'ana':", suffixTree.search("ana")); // true
console.log("Contains 'nan':", suffixTree.search("nan")); // true
console.log("Contains 'apple':", suffixTree.search("apple")); // false

// Find all occurrences
console.log("Occurrences of 'na':", suffixTree.findAllOccurrences("na")); // [2, 4]

// Visualize the tree
console.log("Suffix Tree structure:");
console.log(suffixTree.visualize());
class SimpleSuffixTree {
    private root: { children: Map<string, any> };
    private text: string;

    constructor(text: string) {
        this.text = text + '$';
        this.root = { children: new Map() };
        this.buildTree();
    }

    private buildTree(): void {
        for (let i = 0; i < this.text.length; i++) {
            this.insertSuffix(i);
        }
    }

    private insertSuffix(start: number): void {
        let currentNode = this.root;
        let i = start;

        while (i < this.text.length) {
            const char = this.text[i];
            
            if (!currentNode.children.has(char)) {
                currentNode.children.set(char, {
                    children: new Map(),
                    start: i,
                    end: this.text.length - 1,
                    index: start
                });
                break;
            }

            const child = currentNode.children.get(char);
            let j = child.start;
            let k = i;

            while (k < this.text.length && j <= child.end && this.text[k] === this.text[j]) {
                k++;
                j++;
            }

            if (j > child.end) {
                currentNode = child;
                i = k;
            } else {
                // Split the node
                const splitNode = {
                    children: new Map(),
                    start: child.start,
                    end: j - 1
                };

                splitNode.children.set(this.text[j], {
                    children: child.children,
                    start: j,
                    end: child.end,
                    index: child.index
                });

                splitNode.children.set(this.text[k], {
                    children: new Map(),
                    start: k,
                    end: this.text.length - 1,
                    index: start
                });

                currentNode.children.set(char, splitNode);
                break;
            }
        }
    }

    search(pattern: string): boolean {
        // Similar search implementation as above
        // ...
    }
}
