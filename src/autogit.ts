interface Node {
    id: string;
    children?: Node[];
    // Add any other properties you need
}

interface SearchResult {
    found: boolean;
    node?: Node;
    depth?: number;
}

class DepthLimitedSearch {
    /**
     * Iterative Depth-Limited Search implementation
     * @param root Starting node of the search
     * @param targetId ID of the node to find
     * @param maxDepth Maximum depth to search (0-based)
     * @returns Search result with found status and node if found
     */
    static iterativeDLS(root: Node, targetId: string, maxDepth: number): SearchResult {
        for (let depth = 0; depth <= maxDepth; depth++) {
            const result = this.depthLimitedSearch(root, targetId, depth);
            if (result.found) {
                return result;
            }
        }
        
        return { found: false };
    }

    /**
     * Recursive helper function for depth-limited search
     * @param node Current node being examined
     * @param targetId ID of the node to find
     * @param depthLimit Remaining depth allowed
     * @returns Search result
     */
    private static depthLimitedSearch(node: Node, targetId: string, depthLimit: number): SearchResult {
        if (node.id === targetId) {
            return { found: true, node, depth: depthLimit };
        }

        if (depthLimit === 0) {
            return { found: false };
        }

        if (node.children) {
            for (const child of node.children) {
                const result = this.depthLimitedSearch(child, targetId, depthLimit - 1);
                if (result.found) {
                    return result;
                }
            }
        }

        return { found: false };
    }
}

// Alternative: Fully Iterative Implementation (no recursion)
class IterativeDepthLimitedSearch {
    /**
     * Fully iterative depth-limited search using a stack
     * @param root Starting node
     * @param targetId ID to search for
     * @param maxDepth Maximum search depth
     * @returns Search result
     */
    static iterativeDLS(root: Node, targetId: string, maxDepth: number): SearchResult {
        // Use a stack to track nodes and their remaining depth
        const stack: { node: Node; depth: number }[] = [];
        stack.push({ node: root, depth: maxDepth });

        while (stack.length > 0) {
            const { node, depth } = stack.pop()!;

            if (node.id === targetId) {
                return { found: true, node, depth: maxDepth - depth };
            }

            // Only explore children if we haven't reached depth limit
            if (depth > 0 && node.children) {
                // Push children in reverse order to maintain original search order
                for (let i = node.children.length - 1; i >= 0; i--) {
                    stack.push({ node: node.children[i], depth: depth - 1 });
                }
            }
        }

        return { found: false };
    }
}

// Example usage and test
const exampleTree: Node = {
    id: "A",
    children: [
        {
            id: "B",
            children: [
                { id: "D" },
                { id: "E" }
            ]
        },
        {
            id: "C",
            children: [
                { id: "F", children: [{ id: "H" }] },
                { id: "G" }
            ]
        }
    ]
};

// Test the implementation
console.log("Testing Iterative DLS:");
const result1 = DepthLimitedSearch.iterativeDLS(exampleTree, "H", 3);
console.log("Found H at depth 3:", result1);

const result2 = DepthLimitedSearch.iterativeDLS(exampleTree, "H", 2);
console.log("Found H at depth 2:", result2); // Should not find it

console.log("\nTesting Fully Iterative DLS:");
const result3 = IterativeDepthLimitedSearch.iterativeDLS(exampleTree, "H", 3);
console.log("Found H at depth 3:", result3);

const result4 = IterativeDepthLimitedSearch.iterativeDLS(exampleTree, "H", 2);
console.log("Found H at depth 2:", result4); // Should not find it
// For deeper searches with unknown depth, use iterative deepening:
function findNodeWithIterativeDeepening(root: Node, targetId: string, maxDepth: number = 10) {
    for (let depth = 0; depth <= maxDepth; depth++) {
        const result = IterativeDepthLimitedSearch.iterativeDLS(root, targetId, depth);
        if (result.found) return result;
    }
    return { found: false };
}
