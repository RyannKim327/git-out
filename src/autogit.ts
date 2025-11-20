/**
 * Represents a mutable global end pointer for edges that are currently extending.
 * All edges that extend up to the current character 'i' in Ukkonen's algorithm
 * will reference this object. When 'i' increments, all these "implicit" ends
 * update automatically.
 */
interface GlobalEnd {
    value: number;
}

/**
 * Represents a node in the Suffix Tree.
 */
class SuffixTreeNode {
    // A map where the key is the first character of the edge label
    // leading to a child, and the value is the child node.
    children: Map<string, SuffixTreeNode>;
    // Reference to the suffix link node.
    // The string represented by this.suffixLink is the longest suffix
    // of the string represented by the current node.
    suffixLink: SuffixTreeNode | null;
    // The start index of the edge label leading to this node from its parent.
    // Refers to an index in the original text.
    start: number;
    // The end index of the edge label leading to this node from its parent.
    // Can be a fixed number or a reference to the global _globalEnd object
    // for edges that are currently extending.
    end: number | GlobalEnd;
    // For leaf nodes, this stores the starting index of the suffix
    // that ends at this leaf. Null for internal nodes.
    suffixIndex: number | null;
    // A unique ID for debugging/visualization purposes.
    id: number;

    static nextId: number = 0; // For unique node IDs

    constructor(start: number, end: number | GlobalEnd, suffixIndex: number | null = null) {
        this.children = new Map<string, SuffixTreeNode>();
        this.suffixLink = null;
        this.start = start;
        this.end = end;
        this.suffixIndex = suffixIndex;
        this.id = SuffixTreeNode.nextId++;
    }

    /**
     * Get the length of the edge leading to this node.
     * If `this.end` is a GlobalEnd object, use its value.
     */
    getEdgeLength(): number {
        if (typeof this.end === 'number') {
            return this.end - this.start + 1;
        } else {
            return this.end.value - this.start + 1;
        }
    }

    /**
     * Get the actual string label for the edge leading to this node.
     * @param text The original text used to build the tree.
     */
    getEdgeLabel(text: string): string {
        const endIndex = typeof this.end === 'number' ? this.end : this.end.value;
        return text.substring(this.start, endIndex + 1);
    }

    /**
     * Assigns suffix indexes to leaf nodes through a DFS traversal.
     * The suffix index is the starting position of the suffix in the original text.
     * @param text The original text.
     * @param pathLength The length of the string path from the root to the current node.
     * @param originalTextLength The length of the original text *before* adding the terminator.
     */
    setSuffixIndexes(text: string, pathLength: number, originalTextLength: number): void {
        const isLeaf = this.children.size === 0;

        if (isLeaf) {
            // Calculate the suffix index for this leaf.
            // It's the original text length minus the path length to this leaf.
            this.suffixIndex = originalTextLength - pathLength;
            return;
        }

        // If it's an internal node, recursively call for children.
        for (const child of this.children.values()) {
            child.setSuffixIndexes(text, pathLength + child.getEdgeLength(), originalTextLength);
        }
    }
}

/**
 * Implements a Suffix Tree using Ukkonen's algorithm for O(N) construction.
 */
class SuffixTree {
    private text: string;
    root: SuffixTreeNode;
    private _globalEnd: GlobalEnd; // A mutable global end pointer for current phase
    private active_node: SuffixTreeNode;
    private active_edge: number; // Index in text for the start of the active edge
    private active_length: number; // Length of path from active_node along active_edge
    private remaining_suffixes: number;
    private last_new_node: SuffixTreeNode | null;
    private originalTextLength: number; // Length of text *before* adding the terminator '$'

    /**
     * Constructs a Suffix Tree for the given text.
     * Appends a unique terminator character ('$') to the text.
     */
    constructor(text: string) {
        // Store original text length before adding terminator
        this.originalTextLength = text.length;
        // Append a unique terminator character to ensure all suffixes end at a leaf
        this.text = text + '$';

        SuffixTreeNode.nextId = 0; // Reset node IDs for new tree

        this.root = new SuffixTreeNode(-1, { value: -1 }); // Root node (virtual)
        this.root.suffixLink = this.root; // Root's suffix link points to itself
        this._globalEnd = { value: -1 }; // Initial global end for all active edges

        this.active_node = this.root;
        this.active_edge = -1; // Represents no active edge
        this.active_length = 0;
        this.remaining_suffixes = 0;
        this.last_new_node = null;

        this.buildTree();
        this.root.setSuffixIndexes(this.text, 0, this.originalTextLength);
    }

    private buildTree(): void {
        for (let i = 0; i < this.text.length; i++) {
            this._globalEnd.value = i; // Increment global end for current phase
            this.remaining_suffixes++;
            this.last_new_node = null; // Reset last_new_node for the current phase

            // Loop through remaining suffixes to add
            while (this.remaining_suffixes > 0) {
                if (this.active_length === 0) {
                    // Rule 1: No active edge, try to extend from active_node
                    this.active_edge = i; // Current character becomes the new active_edge start
                }

                const charToMatch = this.text[this.active_edge];
                const child = this.active_node.children.get(charToMatch);

                if (!child) {
                    // Rule 2: No child edge starting with charToMatch.
                    // Create a new leaf and add it as a child.
                    const newLeaf = new SuffixTreeNode(i, this._globalEnd, null);
                    this.active_node.children.set(charToMatch, newLeaf);

                    // Set suffix link for the previous internal node created, if any
                    if (this.last_new_node) {
                        this.last_new_node.suffixLink = this.active_node;
                        this.last_new_node = null; // Reset
                    }
                } else {
                    // A child exists, traverse down
                    if (this.active_length === 0) {
                        // If active_length is 0, we just set active_edge, so now we advance.
                        this.active_length++;
                        this.walkToCanonicalForm();
                        break; // Go to next phase 'i'
                    }

                    // Check if current character `text[i]` matches the character *within* the edge
                    const edgeLen = child.getEdgeLength();
                    const charInEdge = this.text[child.start + this.active_length];

                    if (charInEdge === this.text[i]) {
                        // Rule 3: Character matches. Do nothing, just extend active_length.
                        // If we created a new node earlier and this step now results in implicit extension,
                        // that means `last_new_node` should link to the `active_node` *before* extension.
                        if (this.last_new_node) {
                            this.last_new_node.suffixLink = this.active_node;
                            this.last_new_node = null;
                        }
                        this.active_length++;
                        this.walkToCanonicalForm();
                        break; // Go to next phase 'i'
                    } else {
                        // Rule 2 (split): Mismatch. Split the existing edge.
                        // Create a new internal node (splitNode)
                        const splitPointEnd = child.start + this.active_length - 1;
                        const splitNode = new SuffixTreeNode(child.start, splitPointEnd);
                        this.active_node.children.set(charToMatch, splitNode);

                        // Adjust the existing child's start
                        child.start = splitPointEnd + 1;
                        // Attach the existing child to the new internal node
                        splitNode.children.set(charInEdge, child);

                        // Create a new leaf for the current character `text[i]`
                        const newLeaf = new SuffixTreeNode(i, this._globalEnd, null);
                        splitNode.children.set(this.text[i], newLeaf);

                        // Set suffix link for the previous internal node created
                        if (this.last_new_node) {
                            this.last_new_node.suffixLink = splitNode;
                        }
                        this.last_new_node = splitNode;
                    }
                }

                this.remaining_suffixes--;

                // After each extension (whether implicit or explicit),
                // we need to update the active point using suffix links.
                if (this.active_node === this.root && this.active_length > 0) {
                    // If at root and still active_length, move active_edge to next char
                    this.active_edge++;
                    this.active_length--;
                } else if (this.active_node.suffixLink) {
                    this.active_node = this.active_node.suffixLink;
                } else {
                    // Should not happen if root's suffix link points to itself
                    this.active_node = this.root;
                }
                this.walkToCanonicalForm(); // Always re-normalize active point
            }
        }
    }

    /**
     * Walks down the tree from active_node to ensure the active_point
     * is in canonical form (active_length < length of current edge, or active_length == 0).
     */
    private walkToCanonicalForm(): void {
        if (this.active_length === 0) {
            return; // Already in canonical form
        }

        const charToMatch = this.text[this.active_edge];
        let child = this.active_node.children.get(charToMatch);

        // This `child` should always exist if active_length > 0
        while (child && this.active_length >= child.getEdgeLength()) {
            this.active_edge += child.getEdgeLength();
            this.active_length -= child.getEdgeLength();
            this.active_node = child;

            if (this.active_length > 0) {
                // Keep walking down
                child = this.active_node.children.get(this.text[this.active_edge]);
            }
        }
    }

    /**
     * Searches for a pattern in the Suffix Tree.
     * Returns an array of start indices where the pattern occurs in the original text.
     */
    search(pattern: string): number[] {
        if (!pattern || pattern.length === 0) {
            return [];
        }

        let currentNode: SuffixTreeNode = this.root;
        let patternIndex = 0;

        while (patternIndex < pattern.length) {
            const char = pattern[patternIndex];
            const child = currentNode.children.get(char);

            if (!child) {
                return []; // Pattern not found
            }

            const edgeLabel = child.getEdgeLabel(this.text);
            const matchLength = Math.min(edgeLabel.length, pattern.length - patternIndex);

            // Compare segment of pattern with edge label
            const patternSegment = pattern.substring(patternIndex, patternIndex + matchLength);
            const edgeSegment = edgeLabel.substring(0, matchLength);

            if (patternSegment !== edgeSegment) {
                return []; // Mismatch
            }

            patternIndex += matchLength;
            currentNode = child;
        }

        // If we reached here, the pattern is found. Collect all suffix indices from this node downwards.
        return this.collectSuffixIndexes(currentNode);
    }

    /**
     * Recursively collects all suffix indexes from a given node downwards.
     */
    private collectSuffixIndexes(node: SuffixTreeNode): number[] {
        const indexes: number[] = [];

        if (node.suffixIndex !== null) {
            // Only add if it's a leaf node corresponding to original text suffix
            if (node.suffixIndex < this.originalTextLength) { // Exclude terminator's suffix index
                indexes.push(node.suffixIndex);
            }
        }

        for (const child of node.children.values()) {
            indexes.push(...this.collectSuffixIndexes(child));
        }

        return indexes.sort((a, b) => a - b); // Sort for consistent output
    }


    /**
     * Counts the number of occurrences of a pattern.
     */
    countOccurrences(pattern: string): number {
        return this.search(pattern).length;
    }

    /**
     * Finds the longest repeated substring in the original text.
     * A repeated substring must appear at least twice.
     */
    longestRepeatedSubstring(): string {
        let longest = '';
        let maxLen = 0;

        const dfs = (node: SuffixTreeNode, path: string): number => {
            if (node === this.root) {
                // Don't count the root's children directly for path length, as they're prefixes
            } else {
                path += node.getEdgeLabel(this.text);
            }

            let leafCount = 0;
            if (node.children.size === 0) {
                // It's a leaf, increment leaf count.
                // Filter out the '$' suffix if it's the only one
                if (node.suffixIndex !== null && node.suffixIndex < this.originalTextLength) {
                    leafCount = 1;
                }
            } else {
                for (const child of node.children.values()) {
                    leafCount += dfs(child, path);
                }
            }

            // If an internal node has more than one leaf descendant (meaning it represents a repeated substring)
            // and its path length is greater than current maxLen, update longest.
            if (node !== this.root && leafCount > 1) {
                const currentPathLen = path.length;
                if (currentPathLen > maxLen) {
                    // Need to remove the '$' if it's part of the path being evaluated
                    const actualPath = path.endsWith('$') ? path.slice(0, -1) : path;
                    if (actualPath.length > maxLen) {
                        maxLen = actualPath.length;
                        longest = actualPath;
                    }
                }
            }
            return leafCount;
        };

        dfs(this.root, '');
        return longest;
    }

    /**
     * Prints a representation of the suffix tree to the console (for debugging).
     */
    printTree(): void {
        const queue: { node: SuffixTreeNode; depth: number }[] = [{ node: this.root, depth: 0 }];
        console.log("Suffix Tree:");

        while (queue.length > 0) {
            const { node, depth } = queue.shift()!;
            const indent = '  '.repeat(depth);
            const edgeLabel = node === this.root ? "(ROOT)" : node.getEdgeLabel(this.text);
            const suffixLinkInfo = node.suffixLink ? ` -> SL:${node.suffixLink.id}` : '';
            const suffixIndexInfo = node.suffixIndex !== null ? ` [S:${node.suffixIndex}]` : '';

            console.log(`${indent}Node ${node.id}: "${edgeLabel}"${suffixLinkInfo}${suffixIndexInfo}`);

            // Sort children keys for consistent output
            const sortedChildKeys = Array.from(node.children.keys()).sort();

            for (const key of sortedChildKeys) {
                const child = node.children.get(key)!;
                queue.push({ node: child, depth: depth + 1 });
            }
        }
    }
}

// Example Usage
console.log("--- Building Suffix Tree for 'banana' ---");
const st1 = new SuffixTree("banana");
st1.printTree();

console.log("\n--- Searching 'ana' in 'banana' ---");
console.log("Occurrences of 'ana':", st1.search("ana")); // Expected: [1, 3]
console.log("Count of 'ana':", st1.countOccurrences("ana")); // Expected: 2

console.log("\n--- Searching 'nan' in 'banana' ---");
console.log("Occurrences of 'nan':", st1.search("nan")); // Expected: [2]
console.log("Count of 'nan':", st1.countOccurrences("nan")); // Expected: 1

console.log("\n--- Searching 'ban' in 'banana' ---");
console.log("Occurrences of 'ban':", st1.search("ban")); // Expected: [0]
console.log("Count of 'ban':", st1.countOccurrences("ban")); // Expected: 1

console.log("\n--- Searching 'xyz' in 'banana' ---");
console.log("Occurrences of 'xyz':", st1.search("xyz")); // Expected: []
console.log("Count of 'xyz':", st1.countOccurrences("xyz")); // Expected: 0

console.log("\n--- Longest Repeated Substring in 'banana' ---");
console.log("LRS: ", st1.longestRepeatedSubstring()); // Expected: "ana"


console.log("\n--- Building Suffix Tree for 'abcabxabc' ---");
const st2 = new SuffixTree("abcabxabc");
st2.printTree();

console.log("\n--- Searching 'abc' in 'abcabxabc' ---");
console.log("Occurrences of 'abc':", st2.search("abc")); // Expected: [0, 6]
console.log("Count of 'abc':", st2.countOccurrences("abc")); // Expected: 2

console.log("\n--- Longest Repeated Substring in 'abcabxabc' ---");
console.log("LRS: ", st2.longestRepeatedSubstring()); // Expected: "abc"

console.log("\n--- Longest Repeated Substring in 'aaaaa' ---");
const st3 = new SuffixTree("aaaaa");
console.log("LRS: ", st3.longestRepeatedSubstring()); // Expected: "aaaa"

console.log("\n--- Longest Repeated Substring in 'abracadabra' ---");
const st4 = new SuffixTree("abracadabra");
console.log("LRS: ", st4.longestRepeatedSubstring()); // Expected: "abra"
