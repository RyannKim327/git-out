interface Node {
    id: string;
    children?: Node[];
    // Add any additional properties for your specific use case
}

class BreadthLimitedSearch<T> {
    private visited: Set<string> = new Set();
    
    search(
        startNode: T,
        getChildren: (node: T) => T[],
        getId: (node: T) => string,
        depthLimit: number,
        isGoal?: (node: T) => boolean
    ): T | null {
        this.visited.clear();
        
        if (depthLimit < 0) {
            throw new Error("Depth limit must be non-negative");
        }
        
        const queue: { node: T; depth: number }[] = [];
        queue.push({ node: startNode, depth: 0 });
        this.visited.add(getId(startNode));
        
        while (queue.length > 0) {
            const { node, depth } = queue.shift()!;
            
            // Check if this is the goal node
            if (isGoal && isGoal(node)) {
                return node;
            }
            
            // Stop expanding if we've reached the depth limit
            if (depth >= depthLimit) {
                continue;
            }
            
            // Explore children
            const children = getChildren(node);
            for (const child of children) {
                const childId = getId(child);
                if (!this.visited.has(childId)) {
                    this.visited.add(childId);
                    queue.push({ node: child, depth: depth + 1 });
                }
            }
        }
        
        return null; // Goal not found within depth limit
    }
    
    // Method to get all nodes within depth limit
    getAllNodesWithinDepth(
        startNode: T,
        getChildren: (node: T) => T[],
        getId: (node: T) => string,
        depthLimit: number
    ): T[] {
        this.visited.clear();
        const result: T[] = [];
        
        const queue: { node: T; depth: number }[] = [];
        queue.push({ node: startNode, depth: 0 });
        this.visited.add(getId(startNode));
        result.push(startNode);
        
        while (queue.length > 0) {
            const { node, depth } = queue.shift()!;
            
            if (depth >= depthLimit) {
                continue;
            }
            
            const children = getChildren(node);
            for (const child of children) {
                const childId = getId(child);
                if (!this.visited.has(childId)) {
                    this.visited.add(childId);
                    queue.push({ node: child, depth: depth + 1 });
                    result.push(child);
                }
            }
        }
        
        return result;
    }
}
// Define a tree node interface
interface TreeNode {
    id: string;
    value: number;
    children?: TreeNode[];
}

// Create a sample tree
const tree: TreeNode = {
    id: 'A',
    value: 1,
    children: [
        {
            id: 'B',
            value: 2,
            children: [
                { id: 'D', value: 4 },
                { id: 'E', value: 5 }
            ]
        },
        {
            id: 'C',
            value: 3,
            children: [
                { id: 'F', value: 6 },
                { 
                    id: 'G', 
                    value: 7,
                    children: [
                        { id: 'H', value: 8 }
                    ]
                }
            ]
        }
    ]
};

// Create search instance
const bfs = new BreadthLimitedSearch<TreeNode>();

// Example 1: Find a specific node within depth limit
const goalNode = bfs.search(
    tree,
    (node) => node.children || [],
    (node) => node.id,
    2, // Depth limit
    (node) => node.value === 6 // Goal condition
);

console.log('Found node:', goalNode?.id); // Output: Found node: F

// Example 2: Get all nodes within depth 2
const allNodes = bfs.getAllNodesWithinDepth(
    tree,
    (node) => node.children || [],
    (node) => node.id,
    2
);

console.log('Nodes within depth 2:', allNodes.map(n => n.id));
// Output: Nodes within depth 2: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
class BreadthLimitedSearchWithPath<T> {
    searchWithPath(
        startNode: T,
        getChildren: (node: T) => T[],
        getId: (node: T) => string,
        depthLimit: number,
        isGoal: (node: T) => boolean
    ): T[] | null {
        const visited: Set<string> = new Set();
        const queue: { node: T; depth: number; path: T[] }[] = [];
        
        queue.push({ node: startNode, depth: 0, path: [startNode] });
        visited.add(getId(startNode));
        
        while (queue.length > 0) {
            const { node, depth, path } = queue.shift()!;
            
            if (isGoal(node)) {
                return path;
            }
            
            if (depth >= depthLimit) {
                continue;
            }
            
            const children = getChildren(node);
            for (const child of children) {
                const childId = getId(child);
                if (!visited.has(childId)) {
                    visited.add(childId);
                    queue.push({ 
                        node: child, 
                        depth: depth + 1, 
                        path: [...path, child] 
                    });
                }
            }
        }
        
        return null;
    }
}

// Example usage with path tracking
const bfsWithPath = new BreadthLimitedSearchWithPath<TreeNode>();

const path = bfsWithPath.searchWithPath(
    tree,
    (node) => node.children || [],
    (node) => node.id,
    3,
    (node) => node.value === 8
);

console.log('Path to node H:', path?.map(n => n.id));
// Output: Path to node H: ['A', 'C', 'G', 'H']
// For graph structures (where nodes can have multiple parents)
interface GraphNode {
    id: string;
    neighbors: string[]; // IDs of neighboring nodes
}

class GraphBFS<T extends { id: string; neighbors: string[] }> {
    search(
        startNode: T,
        getNodeById: (id: string) => T | undefined,
        depthLimit: number,
        isGoal: (node: T) => boolean
    ): T | null {
        const visited: Set<string> = new Set();
        const queue: { node: T; depth: number }[] = [];
        
        queue.push({ node: startNode, depth: 0 });
        visited.add(startNode.id);
        
        while (queue.length > 0) {
            const { node, depth } = queue.shift()!;
            
            if (isGoal(node)) {
                return node;
            }
            
            if (depth >= depthLimit) {
                continue;
            }
            
            for (const neighborId of node.neighbors) {
                if (!visited.has(neighborId)) {
                    const neighbor = getNodeById(neighborId);
                    if (neighbor) {
                        visited.add(neighborId);
                        queue.push({ node: neighbor, depth: depth + 1 });
                    }
                }
            }
        }
        
        return null;
    }
}
