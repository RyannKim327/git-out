interface Node {
    id: string;
    children?: Node[];
    // Add any other properties you need
}

interface SearchResult {
    found: boolean;
    node?: Node;
    depth: number;
}

class DepthLimitedSearch {
    /**
     * Iterative Depth-Limited Search implementation
     * @param root Starting node
     * @param targetId ID of the node to find
     * @param maxDepth Maximum depth to search
     * @returns Search result with found status and node if found
     */
    static iterativeDLS(root: Node, targetId: string, maxDepth: number): SearchResult {
        const stack: { node: Node; depth: number }[] = [];
        stack.push({ node: root, depth: 0 });

        while (stack.length > 0) {
            const { node, depth } = stack.pop()!;

            // Check if current node is the target
            if (node.id === targetId) {
                return { found: true, node, depth };
            }

            // Only explore children if we haven't reached max depth
            if (depth < maxDepth && node.children) {
                // Push children in reverse order for DFS behavior
                for (let i = node.children.length - 1; i >= 0; i--) {
                    stack.push({ node: node.children[i], depth: depth + 1 });
                }
            }
        }

        return { found: false, depth: -1 };
    }
}
interface EnhancedNode {
    id: string;
    value?: any;
    children?: EnhancedNode[];
}

interface SearchResultWithPath {
    found: boolean;
    node?: EnhancedNode;
    path: string[];
    depth: number;
    cost?: number;
}

class EnhancedDepthLimitedSearch {
    /**
     * Enhanced iterative DLS with path tracking and cost
     */
    static iterativeDLSWithPath(
        root: EnhancedNode,
        targetId: string,
        maxDepth: number
    ): SearchResultWithPath {
        const stack: { 
            node: EnhancedNode; 
            depth: number; 
            path: string[]; 
            cost: number 
        }[] = [];
        
        stack.push({ node: root, depth: 0, path: [root.id], cost: 0 });

        while (stack.length > 0) {
            const { node, depth, path, cost } = stack.pop()!;

            if (node.id === targetId) {
                return { 
                    found: true, 
                    node, 
                    path, 
                    depth, 
                    cost 
                };
            }

            if (depth < maxDepth && node.children) {
                for (let i = node.children.length - 1; i >= 0; i--) {
                    const child = node.children[i];
                    const newPath = [...path, child.id];
                    const newCost = cost + 1; // Assuming uniform cost, modify as needed
                    
                    stack.push({
                        node: child,
                        depth: depth + 1,
                        path: newPath,
                        cost: newCost
                    });
                }
            }
        }

        return { found: false, path: [], depth: -1, cost: -1 };
    }

    /**
     * Depth-limited search with custom node evaluation
     */
    static iterativeDLSWithEvaluation<T extends Node>(
        root: T,
        isTarget: (node: T) => boolean,
        maxDepth: number,
        getChildren: (node: T) => T[]
    ): { found: boolean; node?: T; depth: number } {
        
        const stack: { node: T; depth: number }[] = [];
        stack.push({ node: root, depth: 0 });

        while (stack.length > 0) {
            const { node, depth } = stack.pop()!;

            if (isTarget(node)) {
                return { found: true, node, depth };
            }

            if (depth < maxDepth) {
                const children = getChildren(node);
                for (let i = children.length - 1; i >= 0; i--) {
                    stack.push({ node: children[i], depth: depth + 1 });
                }
            }
        }

        return { found: false, depth: -1 };
    }
}
// Example tree structure
const exampleTree: Node = {
    id: 'A',
    children: [
        {
            id: 'B',
            children: [
                { id: 'D' },
                { id: 'E' }
            ]
        },
        {
            id: 'C',
            children: [
                { id: 'F' },
                { id: 'G' }
            ]
        }
    ]
};

// Example usage
const result1 = DepthLimitedSearch.iterativeDLS(exampleTree, 'G', 3);
console.log('Found:', result1.found, 'at depth:', result1.depth);

const result2 = EnhancedDepthLimitedSearch.iterativeDLSWithPath(
    exampleTree as EnhancedNode, 
    'G', 
    3
);
console.log('Path:', result2.path);

// Custom evaluation example
const customResult = EnhancedDepthLimitedSearch.iterativeDLSWithEvaluation(
    exampleTree,
    (node) => node.id === 'G',
    3,
    (node) => node.children || []
);
console.log('Custom search result:', customResult);
class SafeDepthLimitedSearch {
    /**
     * Safe implementation with input validation
     */
    static safeIterativeDLS(
        root: Node, 
        targetId: string, 
        maxDepth: number
    ): SearchResult {
        // Input validation
        if (!root) {
            throw new Error('Root node cannot be null or undefined');
        }
        
        if (maxDepth < 0) {
            throw new Error('Max depth cannot be negative');
        }

        if (typeof targetId !== 'string') {
            throw new Error('Target ID must be a string');
        }

        const stack: { node: Node; depth: number }[] = [];
        const visited = new Set<string>(); // Prevent cycles
        
        stack.push({ node: root, depth: 0 });
        visited.add(root.id);

        while (stack.length > 0) {
            const { node, depth } = stack.pop()!;

            if (node.id === targetId) {
                return { found: true, node, depth };
            }

            if (depth < maxDepth && node.children) {
                for (let i = node.children.length - 1; i >= 0; i--) {
                    const child = node.children[i];
                    if (!visited.has(child.id)) {
                        visited.add(child.id);
                        stack.push({ node: child, depth: depth + 1 });
                    }
                }
            }
        }

        return { found: false, depth: -1 };
    }
}

// Usage with error handling
try {
    const result = SafeDepthLimitedSearch.safeIterativeDLS(exampleTree, 'G', 3);
    console.log('Safe search result:', result);
} catch (error) {
    console.error('Search error:', error.message);
}
