/**
 * Interface defining the parameters needed for depth-limited search
 */
interface DepthLimitedSearchParams<T> {
    startNode: T;
    isGoal: (node: T) => boolean;
    getChildren: (node: T) => T[];
    depthLimit: number;
}

/**
 * Depth-Limited Search implementation
 * @returns True if goal is found within depth limit, false otherwise
 */
function depthLimitedSearch<T>(params: DepthLimitedSearchParams<T>): boolean {
    const { startNode, isGoal, getChildren, depthLimit } = params;

    // Internal recursive function with current depth tracking
    function dls(node: T, depth: number): boolean {
        console.log(`Visiting node: ${node} at depth: ${depth}`); // Optional logging
        
        // Found the goal node
        if (isGoal(node)) {
            return true;
        }

        // Reached depth limit - stop searching deeper
        if (depth === 0) {
            return false;
        }

        // Recursively search children with reduced depth limit
        for (const child of getChildren(node)) {
            if (dls(child, depth - 1)) {
                return true;
            }
        }

        return false;
    }

    return dls(startNode, depthLimit);
}

// Example Usage: Tree Search
interface TreeNode {
    id: string;
    children: TreeNode[];
}

// Example tree structure
const tree: TreeNode = {
    id: 'A',
    children: [
        {
            id: 'B',
            children: [
                { id: 'D', children: [] },
                { id: 'E', children: [] },
            ],
        },
        {
            id: 'C',
            children: [
                { id: 'F', children: [] },
                { id: 'G', children: [] },
            ],
        },
    ],
};

// Search parameters
const result = depthLimitedSearch<TreeNode>({
    startNode: tree,
    isGoal: (node) => node.id === 'G',
    getChildren: (node) => node.children,
    depthLimit: 3,
});

console.log('Goal found:', result); // Output: Goal found: true
function depthLimitedSearchWithVisited<T>(params: DepthLimitedSearchParams<T> & { 
    visited?: Set<T> 
}): boolean {
    // ... existing code with visited check ...
    const visited = params.visited || new Set<T>();
    
    if (visited.has(node)) return false;
    visited.add(node);

    // ... rest of the dls function ...
}
