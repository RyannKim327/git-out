/**
 * Represents a node in the Suffix Tree.
 */
class SuffixTreeNode {
    // A map where keys are the first character of an outgoing edge label
    // and values are the child nodes.
    children: Map<string, SuffixTreeNode>;

    // The start index of the substring label on the edge leading to this node from its parent.
    // For the root node, these will be -1.
    startIndex: number;

    // The end index of the substring label on the edge leading to this node from its parent.
    // For the root node, these will be -1.
    endIndex: number;

    // If this node is a leaf, this stores the starting index of the suffix
    // in the original text that this leaf represents. Undefined for internal nodes.
    suffixIndex?: number;

    constructor(startIndex: number, endIndex: number, suffixIndex?: number) {
        this.children = new Map();
        this.startIndex = startIndex;
        this.endIndex = endIndex;
        this.suffixIndex = suffixIndex;
    }

    /**
     * Calculates the length of the edge label leading to this node.
     * @returns The length of the edge label.
     */
    getEdgeLength(): number {
        // Handle the root node case where startIndex and endIndex are -1
        if (this.startIndex === -1 && this.endIndex === -1) {
            return 0;
        }
        return this.endIndex - this.startIndex + 1;
    }

    /**
     * Checks if this node is a leaf node.
     * In this naive implementation, a leaf is usually identified by having a suffixIndex
     * and no children, but the suffixIndex is the more definitive marker of a suffix end.
     * @returns True if the node is a leaf, false otherwise.
     */
    isLeaf(): boolean {
        return this.suffixIndex !== undefined;
    }
}
/**
 * Implements a Suffix Tree data structure using naive O(N^2) construction.
 */
class SuffixTree {
    root: SuffixTreeNode;
    text: string;
    readonly TERMINATOR: string = '$'; // A special character to ensure all suffixes end at a leaf

    constructor(input: string) {
        // Append a unique terminator to ensure every suffix ends at a leaf node
        // and that no suffix is a prefix of another (except for the terminator itself).
        this.text = input + this.TERMINATOR;
        this.root = new SuffixTreeNode(-1, -1); // Root node has no incoming edge label
        this.buildTree();
    }

    /**
     * Extracts the substring corresponding to a node's incoming edge label.
     * @param node The SuffixTreeNode.
     * @returns The string label of the edge leading to this node.
     */
    private getEdgeLabel(node: SuffixTreeNode): string {
        if (node.startIndex === -1 && node.endIndex === -1) { // Root
            return "";
        }
        // Slice uses (start, end+1) for exclusive end
        return this.text.substring(node.startIndex, node.endIndex + 1);
    }

    /**
     * Builds the suffix tree by iteratively adding all suffixes of the text.
     * This is the O(N^2) naive construction method.
     */
    private buildTree(): void {
        for (let i = 0; i < this.text.length; i++) {
            this.addSuffix(i);
        }
    }

    /**
     * Adds a single suffix (starting at originalSuffixIndex) to the tree.
     * This method handles traversing, splitting edges, and adding new leaf nodes.
     * @param originalSuffixIndex The starting index of the suffix in the original (terminated) text.
     */
    private addSuffix(originalSuffixIndex: number): void {
        let currentNode = this.root;
        let currentTextIndex = originalSuffixIndex; // Pointer into the *original* text for the current suffix segment

        // Loop while there are still characters to add from the current suffix
        while (currentTextIndex < this.text.length) {
            const charToMatch = this.text[currentTextIndex];
            let childNode = currentNode.children.get(charToMatch);

            if (childNode) {
                // There's an edge starting with charToMatch. Try to traverse it.
                const edgeLength = childNode.getEdgeLength();
                let charsMatchedOnEdge = 0;

                // Match characters along the edge
                while (charsMatchedOnEdge < edgeLength &&
                       currentTextIndex + charsMatchedOnEdge < this.text.length &&
                       this.text[childNode.startIndex + charsMatchedOnEdge] === this.text[currentTextIndex + charsMatchedOnEdge]) {
                    charsMatchedOnEdge++;
                }

                if (charsMatchedOnEdge === edgeLength) {
                    // Fully traversed the edge. Move to the child node.
                    currentNode = childNode;
                    currentTextIndex += charsMatchedOnEdge;
                } else {
                    // Partial match on the edge. Need to split the node.
                    // 1. Create a new internal node (split point)
                    const splitNode = new SuffixTreeNode(childNode.startIndex, childNode.startIndex + charsMatchedOnEdge - 1);
                    currentNode.children.set(charToMatch, splitNode); // Parent points to splitNode

                    // 2. Adjust the original child node to be a child of the split node
                    childNode.startIndex += charsMatchedOnEdge; // Update its edge label
                    splitNode.children.set(this.text[childNode.startIndex], childNode);

                    // 3. Add the remaining part of the current suffix as a new leaf from the split node
                    const newLeaf = new SuffixTreeNode(currentTextIndex + charsMatchedOnEdge, this.text.length - 1, originalSuffixIndex);
                    splitNode.children.set(this.text[currentTextIndex + charsMatchedOnEdge], newLeaf);
                    return; // Suffix added
                }
            } else {
                // No existing edge from currentNode starting with charToMatch.
                // Add the rest of the suffix as a new leaf.
                const newLeaf = new SuffixTreeNode(currentTextIndex, this.text.length - 1, originalSuffixIndex);
                currentNode.children.set(charToMatch, newLeaf);
                return; // Suffix added
            }
        }
        // If we reached here, it means the entire suffix was matched and its path already exists.
        // This implies the suffix we tried to add is identical to an existing suffix path,
        // which should only happen if originalSuffixIndex is the same for an existing leaf.
        // For distinct suffixes (due to the '$' terminator), this typically means we reached an existing leaf.
        // We ensure a `suffixIndex` is present.
        if (currentNode.suffixIndex === undefined) {
            currentNode.suffixIndex = originalSuffixIndex;
        }
    }

    /**
     * Recursively collects all suffix indices from the subtree rooted at 'node'.
     * These indices represent starting positions in the original text.
     * @param node The current node to start collecting from.
     * @param results An array to store the collected suffix indices.
     */
    private collectSuffixIndices(node: SuffixTreeNode, results: number[]): void {
        if (node.isLeaf()) {
            // Only add if it's a valid suffix index from the original string, not just the terminator itself
            if (node.suffixIndex !== undefined && node.suffixIndex < this.text.length - 1) {
                results.push(node.suffixIndex);
            }
        } else {
            for (const child of node.children.values()) {
                this.collectSuffixIndices(child, results);
            }
        }
    }

    /**
     * Searches for all occurrences of a pattern in the original text.
     * @param pattern The pattern string to search for.
     * @returns An array of starting indices where the pattern is found.
     */
    find(pattern: string): number[] {
        if (pattern.length === 0) {
            return []; // An empty pattern matches everywhere, but we typically want specific occurrences.
        }

        let currentNode = this.root;
        let patternPointer = 0; // Current index in the pattern

        // Traverse the tree based on the pattern
        while (patternPointer < pattern.length) {
            const charToMatch = pattern[patternPointer];
            const childNode = currentNode.children.get(charToMatch);

            if (!childNode) {
                return []; // Pattern not found
            }

            const edgeLength = childNode.getEdgeLength();
            let charsMatchedOnEdge = 0;

            // Match characters along the edge with the remaining pattern
            while (charsMatchedOnEdge < edgeLength &&
                   patternPointer + charsMatchedOnEdge < pattern.length &&
                   this.text[childNode.startIndex + charsMatchedOnEdge] === pattern[patternPointer + charsMatchedOnEdge]) {
                charsMatchedOnEdge++;
            }

            if (charsMatchedOnEdge === edgeLength) {
                // Fully traversed the edge. Move to the child node.
                currentNode = childNode;
                patternPointer += charsMatchedOnEdge;
            } else if (patternPointer + charsMatchedOnEdge === pattern.length) {
                // Partial match, but the pattern ends exactly within this edge.
                // This means the pattern is a prefix of some suffix path.
                // All suffixes descending from this childNode contain the pattern.
                const results: number[] = [];
                this.collectSuffixIndices(childNode, results);
                return results;
            } else {
                // Mismatch or pattern is longer than the edge and doesn't match
                return []; // Pattern not found
            }
        }

        // If we reach here, the entire pattern has been matched.
        // `currentNode` is the node where the pattern ends.
        const results: number[] = [];
        this.collectSuffixIndices(currentNode, results);
        return results;
    }

    /**
     * Checks if the tree contains the given pattern.
     * @param pattern The pattern string to check.
     * @returns True if the pattern exists in the text, false otherwise.
     */
    contains(pattern: string): boolean {
        return this.find(pattern).length > 0;
    }

    // --- Utility for visualization/debugging (optional) ---
    private printNode(node: SuffixTreeNode, indent: string, treeText: string): void {
        const edgeLabel = this.getEdgeLabel(node);
        const nodeType = node.isLeaf() ? `(Leaf: ${node.suffixIndex})` : "(Internal)";
        console.log(`${indent}|-- ${edgeLabel} ${nodeType}`);

        for (const childChar of Array.from(node.children.keys()).sort()) {
            const child = node.children.get(childChar)!;
            this.printNode(child, indent + "    ", treeText);
        }
    }

    /**
     * Prints a textual representation of the suffix tree to the console.
     * Useful for debugging smaller trees.
     */
    printTree(): void {
        console.log("Suffix Tree for:", this.text.slice(0, -1));
        console.log("Root");
        for (const childChar of Array.from(this.root.children.keys()).sort()) {
            const child = this.root.children.get(childChar)!;
            this.printNode(child, "    ", this.text);
        }
    }
}
// Example Usage:
const text1 = "banana";
const suffixTree1 = new SuffixTree(text1);

console.log(`\n--- Suffix Tree for "${text1}" ---`);
// suffixTree1.printTree(); // Uncomment to see the tree structure

console.log("Find 'ana':", suffixTree1.find("ana"));     // Expected: [1, 3]
console.log("Find 'na':", suffixTree1.find("na"));       // Expected: [2, 4]
console.log("Find 'ban':", suffixTree1.find("ban"));     // Expected: [0]
console.log("Find 'a':", suffixTree1.find("a"));         // Expected: [1, 3, 5]
console.log("Find 'ran':", suffixTree1.find("ran"));     // Expected: []
console.log("Contains 'nan':", suffixTree1.contains("nan")); // Expected: true
console.log("Contains 'apple':", suffixTree1.contains("apple")); // Expected: false

const text2 = "abracadabra";
const suffixTree2 = new SuffixTree(text2);
console.log(`\n--- Suffix Tree for "${text2}" ---`);
console.log("Find 'abra':", suffixTree2.find("abra"));   // Expected: [0, 7]
console.log("Find 'b':", suffixTree2.find("b"));         // Expected: [1, 8]
console.log("Find 'ra':", suffixTree2.find("ra"));       // Expected: [2, 9]
console.log("Find 'cad':", suffixTree2.find("cad"));     // Expected: [4]
