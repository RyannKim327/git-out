interface GraphNode {
    id: string;
    children?: GraphNode[];
    // Add any additional properties your nodes need
}

class DepthLimitedSearch {
    private visited: Set<string> = new Set();
    
    /**
     * Perform depth-limited search
     * @param startNode - The starting node
     * @param targetId - The ID of the node to search for
     * @param depthLimit - Maximum depth to search
     * @returns The target node if found, null otherwise
     */
    search(
        startNode: GraphNode, 
        targetId: string, 
        depthLimit: number
    ): GraphNode | null {
        this.visited.clear();
        return this.dlsRecursive(startNode, targetId, depthLimit, 0);
    }
    
    private dlsRecursive(
        currentNode: GraphNode,
        targetId: string,
        depthLimit: number,
        currentDepth: number
    ): GraphNode | null {
        // Mark node as visited
        this.visited.add(currentNode.id);
        
        // Check if current node is the target
        if (currentNode.id === targetId) {
            return currentNode;
        }
        
        // Check depth limit
        if (currentDepth >= depthLimit) {
            return null;
        }
        
        // Search children
        if (currentNode.children) {
            for (const child of currentNode.children) {
                // Skip already visited nodes to avoid cycles
                if (!this.visited.has(child.id)) {
                    const result = this.dlsRecursive(child, targetId, depthLimit, currentDepth + 1);
                    if (result !== null) {
                        return result;
                    }
                }
            }
        }
        
        return null;
    }
}
interface SearchResult {
    node: GraphNode | null;
    path: string[];
}

class EnhancedDepthLimitedSearch {
    /**
     * Perform depth-limited search with path tracking
     */
    searchWithPath(
        startNode: GraphNode,
        targetId: string,
        depthLimit: number
    ): SearchResult {
        const visited: Set<string> = new Set();
        return this.dlsWithPath(startNode, targetId, depthLimit, 0, [], visited);
    }
    
    private dlsWithPath(
        currentNode: GraphNode,
        targetId: string,
        depthLimit: number,
        currentDepth: number,
        currentPath: string[],
        visited: Set<string>
    ): SearchResult {
        visited.add(currentNode.id);
        const newPath = [...currentPath, currentNode.id];
        
        // Check if current node is the target
        if (currentNode.id === targetId) {
            return { node: currentNode, path: newPath };
        }
        
        // Check depth limit
        if (currentDepth >= depthLimit) {
            return { node: null, path: newPath };
        }
        
        // Search children
        if (currentNode.children) {
            for (const child of currentNode.children) {
                if (!visited.has(child.id)) {
                    const result = this.dlsWithPath(
                        child, 
                        targetId, 
                        depthLimit, 
                        currentDepth + 1, 
                        newPath, 
                        visited
                    );
                    if (result.node !== null) {
                        return result;
                    }
                }
            }
        }
        
        return { node: null, path: newPath };
    }
}
// Example graph structure
const graph: GraphNode = {
    id: 'A',
    children: [
        {
            id: 'B',
            children: [
                { id: 'D', children: [{ id: 'G' }] },
                { id: 'E' }
            ]
        },
        {
            id: 'C',
            children: [
                { id: 'F', children: [{ id: 'H' }, { id: 'I' }] }
            ]
        }
    ]
};

// Using the DLS algorithm
const dls = new DepthLimitedSearch();

// Search for node 'H' with depth limit 3
const result1 = dls.search(graph, 'H', 3);
console.log('Found node:', result1?.id); // Output: H

// Search for node 'I' with depth limit 2 (should fail)
const result2 = dls.search(graph, 'I', 2);
console.log('Found node:', result2?.id); // Output: null

// Using enhanced version with path tracking
const enhancedDls = new EnhancedDepthLimitedSearch();
const result3 = enhancedDls.searchWithPath(graph, 'G', 3);
console.log('Found node:', result3.node?.id); // Output: G
console.log('Path:', result3.path); // Output: ['A', 'B', 'D', 'G']
interface SearchableNode<T> {
    id: string;
    getNeighbors(): SearchableNode<T>[];
    data?: T;
}

class GenericDepthLimitedSearch<T> {
    search(
        startNode: SearchableNode<T>,
        targetId: string,
        depthLimit: number
    ): SearchableNode<T> | null {
        const visited: Set<string> = new Set();
        return this.dlsRecursive(startNode, targetId, depthLimit, 0, visited);
    }
    
    private dlsRecursive(
        currentNode: SearchableNode<T>,
        targetId: string,
        depthLimit: number,
        currentDepth: number,
        visited: Set<string>
    ): SearchableNode<T> | null {
        visited.add(currentNode.id);
        
        if (currentNode.id === targetId) {
            return currentNode;
        }
        
        if (currentDepth >= depthLimit) {
            return null;
        }
        
        const neighbors = currentNode.getNeighbors();
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor.id)) {
                const result = this.dlsRecursive(
                    neighbor, 
                    targetId, 
                    depthLimit, 
                    currentDepth + 1, 
                    visited
                );
                if (result !== null) {
                    return result;
                }
            }
        }
        
        return null;
    }
}
