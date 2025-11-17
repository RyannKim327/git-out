interface SuffixTreeNode {
    children: Map<string, SuffixTreeNode>;
    start?: number;
    end?: number;
    suffixLink?: SuffixTreeNode;
}

class SuffixTree {
    private root: SuffixTreeNode;
    private text: string;
    
    constructor(text: string) {
        this.text = text;
        this.root = { children: new Map() };
        this.buildSuffixTree();
    }

    // Build the suffix tree using Ukkonen's algorithm
    private buildSuffixTree(): void {
        let activeNode = this.root;
        let activeEdge = '';
        let activeLength = 0;
        let remainingSuffixCount = 0;
        let lastNewNode: SuffixTreeNode | null = null;

        // Initialize the root
        this.root.suffixLink = this.root;

        for (let i = 0; i <= this.text.length; i++) {
            lastNewNode = null;
            remainingSuffixCount++;

            while (remainingSuffixCount > 0) {
                if (activeLength === 0) {
                    activeEdge = this.text[i];
                }

                if (!activeNode.children.has(activeEdge)) {
                    // Rule 2: Create new leaf node
                    const leafNode: SuffixTreeNode = {
                        children: new Map(),
                        start: i,
                        end: this.text.length
                    };
                    activeNode.children.set(activeEdge, leafNode);

                    if (lastNewNode !== null) {
                        lastNewNode.suffixLink = activeNode;
                        lastNewNode = null;
                    }
                } else {
                    const nextNode = activeNode.children.get(activeEdge)!;
                    
                    if (activeLength >= this.edgeLength(nextNode)) {
                        activeEdge = this.text[nextNode.start! + this.edgeLength(nextNode)];
                        activeLength -= this.edgeLength(nextNode);
                        activeNode = nextNode;
                        continue;
                    }

                    if (this.text[nextNode.start! + activeLength] === this.text[i]) {
                        // Rule 3: Extension
                        if (lastNewNode !== null && activeNode !== this.root) {
                            lastNewNode.suffixLink = activeNode;
                            lastNewNode = null;
                        }
                        activeLength++;
                        break;
                    }

                    // Rule 2: Split edge
                    const splitEnd = nextNode.start! + activeLength - 1;
                    const splitNode: SuffixTreeNode = {
                        children: new Map(),
                        start: nextNode.start,
                        end: splitEnd
                    };

                    // Update the existing node
                    nextNode.start = splitEnd + 1;
                    splitNode.children.set(this.text[nextNode.start], nextNode);

                    // Create new leaf node
                    const leafNode: SuffixTreeNode = {
                        children: new Map(),
                        start: i,
                        end: this.text.length
                    };
                    splitNode.children.set(this.text[i], leafNode);

                    activeNode.children.set(activeEdge, splitNode);

                    if (lastNewNode !== null) {
                        lastNewNode.suffixLink = splitNode;
                    }

                    lastNewNode = splitNode;
                }

                remainingSuffixCount--;
                if (activeNode === this.root && activeLength > 0) {
                    activeLength--;
                    activeEdge = this.text[i - remainingSuffixCount + 1];
                } else if (activeNode !== this.root) {
                    activeNode = activeNode.suffixLink!;
                }
            }
        }
    }

    private edgeLength(node: SuffixTreeNode): number {
        return (node.end === this.text.length ? this.text.length : node.end! + 1) - node.start!;
    }

    // Public method to check if a pattern exists
    public contains(pattern: string): boolean {
        return this.findNode(pattern) !== null;
    }

    private findNode(pattern: string): SuffixTreeNode | null {
        let currentNode = this.root;
        let patternIndex = 0;

        while (patternIndex < pattern.length) {
            const char = pattern[patternIndex];
            if (!currentNode.children.has(char)) {
                return null;
            }

            currentNode = currentNode.children.get(char)!;
            const edgeLength = this.edgeLength(currentNode);
            
            for (let i = 0; i < edgeLength && patternIndex < pattern.length; i++, patternIndex++) {
                if (this.text[currentNode.start! + i] !== pattern[patternIndex]) {
                    return null;
                }
            }
        }

        return currentNode;
    }

    // Find all occurrences of a pattern
    public findAllOccurrences(pattern: string): number[] {
        const node = this.findNode(pattern);
        if (!node) return [];

        return this.getLeafIndices(node);
    }

    private getLeafIndices(node: SuffixTreeNode): number[] {
        const indices: number[] = [];
        
        if (node.children.size === 0) {
            // Leaf node
            indices.push(node.start! - (this.text.length - (node.end! - node.start! + 1)));
        } else {
            // Internal node - traverse all children
            for (const child of node.children.values()) {
                indices.push(...this.getLeafIndices(child));
            }
        }
        
        return indices;
    }

    // Visualize the tree (for debugging)
    public visualize(): void {
        this.printNode(this.root, 0);
    }

    private printNode(node: SuffixTreeNode, depth: number): void {
        const indent = '  '.repeat(depth);
        
        if (node.children.size === 0) {
            console.log(`${indent}Leaf: "${this.text.substring(node.start!, node.end! + 1)}" [${node.start!}-${node.end!}]`);
        } else {
            console.log(`${indent}Node:`);
            for (const [char, child] of node.children.entries()) {
                console.log(`${indent}  Edge "${char}":`);
                this.printNode(child, depth + 2);
            }
        }
    }
}
// Example usage
const text = "banana";
const suffixTree = new SuffixTree(text);

// Check if pattern exists
console.log("Contains 'ana':", suffixTree.contains("ana")); // true
console.log("Contains 'nan':", suffixTree.contains("nan")); // true
console.log("Contains 'xyz':", suffixTree.contains("xyz")); // false

// Find all occurrences
console.log("Occurrences of 'na':", suffixTree.findAllOccurrences("na")); // [2, 4]

// Visualize the tree
suffixTree.visualize();
class SimpleSuffixTree {
    private root: any;
    private text: string;

    constructor(text: string) {
        this.text = text;
        this.root = {};
        this.buildTree();
    }

    private buildTree(): void {
        for (let i = 0; i < this.text.length; i++) {
            this.addSuffix(this.text.substring(i));
        }
    }

    private addSuffix(suffix: string): void {
        let node = this.root;
        
        for (const char of suffix) {
            if (!node[char]) {
                node[char] = {};
            }
            node = node[char];
        }
        node['$'] = true; // Mark end of suffix
    }

    public contains(pattern: string): boolean {
        let node = this.root;
        
        for (const char of pattern) {
            if (!node[char]) return false;
            node = node[char];
        }
        return true;
    }
}
