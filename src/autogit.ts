// node.ts
class Node {
    // Maps the first character of an edge label to its child node
    children: Map<string, Node>;
    // The start index in the main text of the edge label leading to this node
    start: number;
    // The end index in the main text of the edge label leading to this node
    end: number;
    // For leaf nodes: the starting index of the suffix this leaf represents in the original text.
    // For internal nodes: null.
    suffixIndex: number | null;

    constructor(start: number, end: number, suffixIndex: number | null = null) {
        this.children = new Map();
        this.start = start;
        this.end = end;
        this.suffixIndex = suffixIndex;
    }

    // Helper to get the actual string represented by the edge leading to this node
    // (Requires access to the full text)
    getEdgeString(text: string): string {
        return text.substring(this.start, this.end + 1);
    }

    isLeaf(): boolean {
        return this.children.size === 0;
    }

    // Helper to get the length of the string represented by the edge
    getEdgeLength(): number {
        return this.end - this.start + 1;
    }
}

export default Node;
// suffixTree.ts
import Node from './node';

class SuffixTree {
    private text: string; // The original text + unique terminator
    root: Node;

    constructor(originalText: string) {
        // Append a unique terminator to ensure all suffixes end at leaves
        // and no suffix is a prefix of another.
        this.text = originalText + '$';
        // The root node conceptually represents an empty string.
        // Its start/end indices are arbitrary, as it doesn't have an incoming edge label.
        this.root = new Node(0, -1, null);

        // Insert each suffix into the tree
        for (let i = 0; i < this.text.length; i++) {
            this.insertSuffix(i);
        }
    }

    /**
     * Inserts a suffix (starting at `suffixStartIndex`) into the suffix tree.
     * This method iteratively traverses the tree, splitting edges as needed
     * to insert the new suffix.
     * @param suffixStartIndex The starting index of the suffix in the full text.
     */
    private insertSuffix(suffixStartIndex: number) {
        let currentNode: Node = this.root;
        let currentTextPosInSuffix = suffixStartIndex; // Pointer into `this.text` for the *current suffix being inserted*

        // Traverse until the entire suffix is inserted
        while (currentTextPosInSuffix < this.text.length) {
            const charToMatch = this.text[currentTextPosInSuffix];
            let childNode = currentNode.children.get(charToMatch);

            if (!childNode) {
                // Case 1: No existing edge starting with `charToMatch`.
                // Create a new leaf node representing the rest of the suffix.
                const newLeaf = new Node(currentTextPosInSuffix, this.text.length - 1, suffixStartIndex);
                currentNode.children.set(charToMatch, newLeaf);
                return; // Suffix fully inserted
            }

            // Case 2: An existing edge starts with `charToMatch`.
            // Compare the remaining part of the current suffix with the edge label.
            let edgeStart = childNode.start;
            let edgeEnd = childNode.end;
            let edgeLength = edgeEnd - edgeStart + 1;
            let charsMatchedOnEdge = 0; // How many characters matched along the child's edge

            // Compare character by character along the child's edge
            while (charsMatchedOnEdge < edgeLength && currentTextPosInSuffix + charsMatchedOnEdge < this.text.length) {
                if (this.text[edgeStart + charsMatchedOnEdge] === this.text[currentTextPosInSuffix + charsMatchedOnEdge]) {
                    charsMatchedOnEdge++;
                } else {
                    break; // Mismatch encountered on the edge
                }
            }

            if (charsMatchedOnEdge === edgeLength) {
                // Case 2a: The entire existing edge matched.
                // Move to the child node and continue traversing with the rest of the suffix.
                currentNode = childNode;
                currentTextPosInSuffix += edgeLength;
            } else {
                // Case 2b: Partial match or mismatch. Need to split the existing edge.

                // 1. Create a new internal node where the split occurs.
                const splitNode = new Node(edgeStart, edgeStart + charsMatchedOnEdge - 1, null);
                currentNode.children.set(charToMatch, splitNode); // `currentNode` now points to `splitNode`

                // 2. Adjust the original `childNode` (it becomes a child of the `splitNode`).
                childNode.start = edgeStart + charsMatchedOnEdge; // Its edge label now starts after the split point
                splitNode.children.set(this.text[childNode.start], childNode);

                // 3. Insert the remaining part of the current suffix as a new leaf under the `splitNode`.
                const newLeaf = new Node(currentTextPosInSuffix + charsMatchedOnEdge, this.text.length - 1, suffixStartIndex);
                splitNode.children.set(this.text[currentTextPosInSuffix + charsMatchedOnEdge], newLeaf);
                return; // Suffix fully inserted
            }
        }
        // If we reach here, it means the suffix being inserted is already a prefix
        // of an existing suffix, and we've landed on an existing node.
        // With the '$' terminator, every suffix should end on a unique leaf,
        // so this path is usually for identical string insertions or a suffix
        // that exactly matches an internal node.
        // In a strict suffix tree, this case means the suffix is already present.
        // For our purpose of collecting all occurrences, this means the 'suffixStartIndex'
        // is already represented by the existing path.
    }


    /**
     * Helper function to traverse the tree and find the node that represents
     * the end of a given pattern.
     * @param pattern The string pattern to search for.
     * @returns The Node representing the end of the pattern if found, otherwise null.
     */
    private traverseForPattern(pattern: string): Node | null {
        let currentNode: Node = this.root;
        let charPointer = 0; // Pointer into the `pattern`

        while (charPointer < pattern.length) {
            const charToMatch = pattern[charPointer];
            let childNode = currentNode.children.get(charToMatch);

            if (!childNode) {
                return null; // No edge found for this character, pattern not in tree
            }

            let edgeStart = childNode.start;
            let edgeEnd = childNode.end;
            let edgeLength = edgeEnd - edgeStart + 1;
            let charsMatchedOnEdge = 0;

            // Compare pattern with the edge label
            while (charsMatchedOnEdge < edgeLength && charPointer + charsMatchedOnEdge < pattern.length) {
                if (this.text[edgeStart + charsMatchedOnEdge] === pattern[charPointer + charsMatchedOnEdge]) {
                    charsMatchedOnEdge++;
                } else {
                    return null; // Mismatch on edge, pattern not found
                }
            }

            if (charsMatchedOnEdge === edgeLength) {
                // Fully matched the edge, move to the child node
                currentNode = childNode;
                charPointer += edgeLength;
            } else {
                // Partial match on edge, but pattern is exhausted OR mismatch
                // If pattern ended exactly on a partial match, it's found.
                // Otherwise, it means a mismatch occurred before pattern was exhausted.
                return (charPointer + charsMatchedOnEdge === pattern.length) ? childNode : null;
            }
        }
        return currentNode; // Entire pattern matched, return the node
    }

    /**
     * Checks if a given pattern exists as a substring in the original text.
     * @param pattern The substring to check.
     * @returns true if the pattern is found, false otherwise.
     */
    hasSubstring(pattern: string): boolean {
        return this.traverseForPattern(pattern) !== null;
    }

    /**
     * Collects all suffix indices (starting positions in the original text)
     * from the subtree rooted at the given node.
     * @param node The starting node of the subtree.
     * @param results An array to store the collected suffix indices.
     */
    private collectSuffixIndexes(node: Node, results: number[]): void {
        // Only leaf nodes have a suffixIndex assigned during insertion
        if (node.suffixIndex !== null) {
            results.push(node.suffixIndex);
        }
        // Recursively collect from all children
        for (const child of node.children.values()) {
            this.collectSuffixIndexes(child, results);
        }
    }

    /**
     * Finds all starting positions of a given pattern in the original text.
     * @param pattern The pattern to search for.
     * @returns An array of starting indices where the pattern occurs. Returns an empty array if not found.
     */
    findAllOccurrences(pattern: string): number[] {
        const results: number[] = [];
        const patternNode = this.traverseForPattern(pattern);

        if (patternNode) {
            this.collectSuffixIndexes(patternNode, results);
        }
        return results;
    }

    // --- Optional: For visualization/debugging ---
    /**
     * Prints a representation of the suffix tree to the console.
     * Useful for debugging and understanding the tree structure.
     * @param node The current node to print (starts from root).
     * @param indent String for indentation.
     * @param prefixChar The character on the edge leading to this node (for display).
     */
    printTree(node: Node = this.root, indent: string = '', prefixChar: string = ''): void {
        if (node === this.root) {
            console.log("ROOT");
        } else {
            const edgeLabel = node.getEdgeString(this.text);
            const suffixInfo = node.suffixIndex !== null ? ` [SufIdx: ${node.suffixIndex}]` : '';
            console.log(`${indent}---${prefixChar}--> ${edgeLabel}${suffixInfo}`);
        }

        const childrenArray = Array.from(node.children.entries()).sort(([charA], [charB]) => charA.localeCompare(charB));
        for (let i = 0; i < childrenArray.length; i++) {
            const [char, child] = childrenArray[i];
            const newIndent = indent + (node === this.root ? '' : (i === childrenArray.length - 1 ? '    ' : '|   '));
            this.printTree(child, newIndent, char);
        }
    }
}

export default SuffixTree;
// main.ts
import SuffixTree from './suffixTree';

const text1 = "banana";
console.log(`Building Suffix Tree for: "${text1}"`);
const tree1 = new SuffixTree(text1);
tree1.printTree();

console.log("\n--- Queries for 'banana' ---");
console.log(`Has "ana": ${tree1.hasSubstring("ana")}`); // true
console.log(`Occurrences of "ana": ${tree1.findAllOccurrences("ana")}`); // [1, 3]
console.log(`Has "nan": ${tree1.hasSubstring("nan")}`); // true
console.log(`Occurrences of "nan": ${tree1.findAllOccurrences("nan")}`); // [2]
console.log(`Has "ban": ${tree1.hasSubstring("ban")}`); // true
console.log(`Occurrences of "ban": ${tree1.findAllOccurrences("ban")}`); // [0]
console.log(`Has "na": ${tree1.hasSubstring("na")}`); // true
console.log(`Occurrences of "na": ${tree1.findAllOccurrences("na")}`); // [2, 4]
console.log(`Has "band": ${tree1.hasSubstring("band")}`); // false
console.log(`Occurrences of "band": ${tree1.findAllOccurrences("band")}`); // []
console.log(`Has "a": ${tree1.hasSubstring("a")}`); // true
console.log(`Occurrences of "a": ${tree1.findAllOccurrences("a")}`); // [1, 3, 5]


const text2 = "abracadabra";
console.log(`\nBuilding Suffix Tree for: "${text2}"`);
const tree2 = new SuffixTree(text2);
tree2.printTree();

console.log("\n--- Queries for 'abracadabra' ---");
console.log(`Has "abra": ${tree2.hasSubstring("abra")}`); // true
console.log(`Occurrences of "abra": ${tree2.findAllOccurrences("abra")}`); // [0, 7]
console.log(`Has "bra": ${tree2.hasSubstring("bra")}`); // true
console.log(`Occurrences of "bra": ${tree2.findAllOccurrences("bra")}`); // [1, 8]
console.log(`Has "cad": ${tree2.hasSubstring("cad")}`); // true
console.log(`Occurrences of "cad": ${tree2.findAllOccurrences("cad")}`); // [4]
console.log(`Has "xyz": ${tree2.hasSubstring("xyz")}`); // false
console.log(`Occurrences of "xyz": ${tree2.findAllOccurrences("xyz")}`); // []
