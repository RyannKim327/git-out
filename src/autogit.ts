class SuffixTreeNode {
    children: Map<string, SuffixTreeNode>;
    start: number;
    end: number | null; // null indicates the end of the string
    suffixLink: SuffixTreeNode | null;
    index: number; // starting index of suffix (for leaf nodes)

    constructor(start: number, end: number | null = null) {
        this.children = new Map();
        this.start = start;
        this.end = end;
        this.suffixLink = null;
        this.index = -1;
    }

    getEdgeLength(): number {
        if (this.end === null) {
            throw new Error("Cannot calculate edge length for node with null end");
        }
        return this.end - this.start + 1;
    }
}

class SuffixTree {
    private root: SuffixTreeNode;
    private text: string;
    private activeNode: SuffixTreeNode;
    private activeEdge: number;
    private activeLength: number;
    private remainingSuffixCount: number;
    private leafEnd: number;
    private size: number;

    constructor(text: string) {
        this.text = text + '$'; // Add termination character
        this.size = this.text.length;
        this.root = new SuffixTreeNode(-1, -1);
        this.activeNode = this.root;
        this.activeEdge = -1;
        this.activeLength = 0;
        this.remainingSuffixCount = 0;
        this.leafEnd = -1;
        
        this.build();
    }

    private build(): void {
        for (let i = 0; i < this.size; i++) {
            this.extend(i);
        }
    }

    private extend(pos: number): void {
        this.leafEnd = pos;
        this.remainingSuffixCount++;
        let lastNewNode: SuffixTreeNode | null = null;

        while (this.remainingSuffixCount > 0) {
            if (this.activeLength === 0) {
                this.activeEdge = pos;
            }

            const activeEdgeChar = this.text[this.activeEdge];

            if (!this.activeNode.children.has(activeEdgeChar)) {
                // Rule 2: Create new leaf
                this.activeNode.children.set(
                    activeEdgeChar,
                    new SuffixTreeNode(pos, null)
                );

                if (lastNewNode !== null) {
                    lastNewNode.suffixLink = this.activeNode;
                    lastNewNode = null;
                }
            } else {
                const nextNode = this.activeNode.children.get(activeEdgeChar)!;
                const edgeLength = nextNode.getEdgeLength();

                if (this.activeLength >= edgeLength) {
                    this.activeEdge += edgeLength;
                    this.activeLength -= edgeLength;
                    this.activeNode = nextNode;
                    continue;
                }

                // Rule 3: Character already exists
                if (this.text[nextNode.start + this.activeLength] === this.text[pos]) {
                    if (lastNewNode !== null && this.activeNode !== this.root) {
                        lastNewNode.suffixLink = this.activeNode;
                    }
                    this.activeLength++;
                    break;
                }

                // Rule 2: Split the edge
                const splitEnd = nextNode.start + this.activeLength - 1;
                const splitNode = new SuffixTreeNode(nextNode.start, splitEnd);
                this.activeNode.children.set(activeEdgeChar, splitNode);

                // New leaf for the new character
                splitNode.children.set(
                    this.text[pos],
                    new SuffixTreeNode(pos, null)
                );

                // Update the original node
                nextNode.start += this.activeLength;
                splitNode.children.set(this.text[nextNode.start], nextNode);

                if (lastNewNode !== null) {
                    lastNewNode.suffixLink = splitNode;
                }

                lastNewNode = splitNode;
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

    // Public API Methods

    /**
     * Check if the given substring exists in the text
     */
    contains(substring: string): boolean {
        return this.findNode(substring) !== null;
    }

    /**
     * Find all occurrences of a substring in the text
     */
    findAllOccurrences(substring: string): number[] {
        const node = this.findNode(substring);
        if (!node) return [];

        const occurrences: number[] = [];
        this.collectLeafIndices(node, occurrences);
        return occurrences;
    }

    /**
     * Find the longest repeating substring
     */
    findLongestRepeatingSubstring(): string {
        let result = '';
        let maxLength = 0;
        
        const dfs = (node: SuffixTreeNode, currentDepth: number): number => {
            if (node.children.size === 0) {
                return 1; // leaf node
            }

            let leafCount = 0;
            for (const child of node.children.values()) {
                const edgeLength = child.getEdgeLength();
                const childLeafCount = dfs(child, currentDepth + edgeLength);
                leafCount += childLeafCount;

                if (childLeafCount > 1 && currentDepth + edgeLength > maxLength) {
                    maxLength = currentDepth + edgeLength;
                    
                    // Reconstruct the substring
                    let currentNode: SuffixTreeNode = child;
                    const path: string[] = [];
                    while (currentNode !== this.root) {
                        // Find parent
                        let parent: SuffixTreeNode | null = null;
                        for (const [char, potentialParent] of this.root.children) {
                            const found = this.findParent(potentialParent, currentNode);
                            if (found) {
                                parent = potentialParent;
                                break;
                            }
                        }
                        
                        if (parent) {
                            path.unshift(this.text.substring(parent.start, (parent.end || 0) + 1));
                            currentNode = parent;
                        } else {
                            break;
                        }
                    }
                    
                    result = path.join('');
                }
            }
            return leafCount;
        };

        dfs(this.root, 0);
        return result;
    }

    /**
     * Get all suffixes in the tree (for debugging/display)
     */
    getAllSuffixes(): string[] {
        const suffixes: string[] = [];
        
        const traverse = (node: SuffixTreeNode, currentString: string) => {
            if (node.children.size === 0) {
                suffixes.push(currentString);
                return;
            }

            for (const [char, child] of node.children) {
                const edgeString = this.text.substring(child.start, (child.end || this.size - 1) + 1);
                traverse(child, currentString + edgeString);
            }
        };

        traverse(this.root, '');
        return suffixes;
    }

    // Private helper methods

    private findNode(pattern: string): SuffixTreeNode | null {
        let currentNode = this.root;
        let patternIndex = 0;

        while (patternIndex < pattern.length) {
            const currentChar = pattern[patternIndex];
            
            if (!currentNode.children.has(currentChar)) {
                return null;
            }

            const nextNode = currentNode.children.get(currentChar)!;
            const edgeLength = Math.min(
                nextNode.getEdgeLength(),
                pattern.length - patternIndex
            );

            // Compare the pattern with the edge label
            for (let i = 0; i < edgeLength; i++) {
                if (this.text[nextNode.start + i] !== pattern[patternIndex + i]) {
                    return null;
                }
            }

            patternIndex += edgeLength;
            currentNode = nextNode;
        }

        return currentNode;
    }

    private collectLeafIndices(node: SuffixTreeNode, indices: number[]): void {
        if (node.children.size === 0) {
            indices.push(node.index);
            return;
        }

        for (const child of node.children.values()) {
            this.collectLeafIndices(child, indices);
        }
    }

    private findParent(rootNode: SuffixTreeNode, target: SuffixTreeNode): boolean {
        if (rootNode === target) return true;
        
        for (const child of rootNode.children.values()) {
            if (this.findParent(child, target)) {
                return true;
            }
        }
        
        return false;
    }
}

// Example usage and test cases
function demonstrateSuffixTree(): void {
    const text = "banana";
    const suffixTree = new SuffixTree(text);

    console.log("Text:", text);
    console.log("All suffixes:", suffixTree.getAllSuffixes());
    
    // Test substring search
    console.log("\nSubstring Search Tests:");
    const testPatterns = ["ana", "nan", "ban", "xyz", "na"];
    
    for (const pattern of testPatterns) {
        console.log(`"${pattern}": ${suffixTree.contains(pattern)}`);
        console.log(`  Occurrences: ${suffixTree.findAllOccurrences(pattern)}`);
    }

    // Test longest repeating substring
    console.log("\nLongest repeating substring:", suffixTree.findLongestRepeatingSubstring());

    // Additional test cases
    console.log("\n--- Additional Tests ---");
    
    const testCases = [
        "mississippi",
        "abracadabra",
        "abcabc"
    ];

    for (const testText of testCases) {
        const tree = new SuffixTree(testText);
        console.log(`Text: ${testText}`);
        console.log(`Longest repeating substring: "${tree.findLongestRepeatingSubstring()}"`);
        console.log(`Contains "iss": ${tree.contains("iss")}`);
        console.log(`Occurrences of "iss": ${tree.findAllOccurrences("iss")}`);
        console.log("---");
    }
}

// Run the demonstration
demonstrateSuffixTree();
// Basic usage
const tree = new SuffixTree("banana");

// Check if substring exists
console.log(tree.contains("ana")); // true
console.log(tree.contains("xyz")); // false

// Find all occurrences
console.log(tree.findAllOccurrences("na")); // [2, 4]

// Find longest repeating substring
console.log(tree.findLongestRepeatingSubstring()); // "ana"
