interface GraphNode<T> {
    id: string;
    data: T;
    neighbors: string[];
}

interface Graph<T> {
    nodes: Map<string, GraphNode<T>>;
}

interface SearchResult<T> {
    path: string[];
    node: GraphNode<T> | null;
    depthReached: boolean;
}
class DepthLimitedSearch<T> {
    private graph: Graph<T>;

    constructor(graph: Graph<T>) {
        this.graph = graph;
    }

    /**
     * Iterative Depth-Limited Search implementation
     * @param startNodeId - Starting node ID
     * @param targetNodeId - Target node ID to find
     * @param maxDepth - Maximum depth to search
     * @returns Search result with path and found node
     */
    search(startNodeId: string, targetNodeId: string, maxDepth: number): SearchResult<T> {
        // Early exit if start or target node doesn't exist
        if (!this.graph.nodes.has(startNodeId) || !this.graph.nodes.has(targetNodeId)) {
            return { path: [], node: null, depthReached: false };
        }

        // Stack for iterative DFS: [currentNodeId, currentDepth, pathSoFar]
        const stack: [string, number, string[]][] = [];
        const visited = new Set<string>();
        
        // Start with the initial node
        stack.push([startNodeId, 0, [startNodeId]]);
        visited.add(startNodeId);

        while (stack.length > 0) {
            const [currentNodeId, currentDepth, currentPath] = stack.pop()!;

            // Check if we found the target
            if (currentNodeId === targetNodeId) {
                return {
                    path: currentPath,
                    node: this.graph.nodes.get(currentNodeId)!,
                    depthReached: false
                };
            }

            // Only explore neighbors if we haven't reached max depth
            if (currentDepth < maxDepth) {
                const currentNode = this.graph.nodes.get(currentNodeId);
                if (!currentNode) continue;

                // Process neighbors in reverse order for DFS behavior
                for (let i = currentNode.neighbors.length - 1; i >= 0; i--) {
                    const neighborId = currentNode.neighbors[i];
                    
                    if (!visited.has(neighborId)) {
                        visited.add(neighborId);
                        stack.push([
                            neighborId,
                            currentDepth + 1,
                            [...currentPath, neighborId]
                        ]);
                    }
                }
            }
        }

        return { path: [], node: null, depthReached: true };
    }

    /**
     * Alternative implementation using iterative deepening depth-limited search
     * Continually increases depth limit until solution is found
     */
    iterativeDeepeningSearch(startNodeId: string, targetNodeId: string, maxIterations: number = 100): SearchResult<T> {
        for (let depth = 0; depth <= maxIterations; depth++) {
            const result = this.search(startNodeId, targetNodeId, depth);
            
            if (result.node !== null) {
                return result;
            }
            
            if (!result.depthReached) {
                break; // No solution exists within reasonable depth
            }
        }
        
        return { path: [], node: null, depthReached: false };
    }
}
// Helper function to create a graph
function createGraph<T>(nodes: GraphNode<T>[]): Graph<T> {
    const nodeMap = new Map<string, GraphNode<T>>();
    nodes.forEach(node => nodeMap.set(node.id, node));
    return { nodes: nodeMap };
}

// Example usage
const exampleNodes: GraphNode<string>[] = [
    { id: 'A', data: 'Node A', neighbors: ['B', 'C'] },
    { id: 'B', data: 'Node B', neighbors: ['D', 'E'] },
    { id: 'C', data: 'Node C', neighbors: ['F'] },
    { id: 'D', data: 'Node D', neighbors: [] },
    { id: 'E', data: 'Node E', neighbors: ['G'] },
    { id: 'F', data: 'Node F', neighbors: [] },
    { id: 'G', data: 'Node G', neighbors: [] }
];

// Create and use the search
const graph = createGraph(exampleNodes);
const dls = new DepthLimitedSearch(graph);

// Example 1: Depth-limited search
const result1 = dls.search('A', 'G', 3);
console.log('DLS Result:', result1);

// Example 2: Iterative deepening search
const result2 = dls.iterativeDeepeningSearch('A', 'G');
console.log('IDS Result:', result2);

// Example 3: Search with insufficient depth
const result3 = dls.search('A', 'G', 2);
console.log('Limited Depth Result:', result3);
class DepthLimitedSearch<T> {
    // ... previous code ...

    /**
     * Find all nodes reachable within a certain depth
     */
    findAllWithinDepth(startNodeId: string, maxDepth: number): Set<string> {
        const reachable = new Set<string>();
        if (!this.graph.nodes.has(startNodeId)) return reachable;

        const stack: [string, number][] = [[startNodeId, 0]];
        reachable.add(startNodeId);

        while (stack.length > 0) {
            const [currentNodeId, currentDepth] = stack.pop()!;

            if (currentDepth < maxDepth) {
                const currentNode = this.graph.nodes.get(currentNodeId);
                if (!currentNode) continue;

                currentNode.neighbors.forEach(neighborId => {
                    if (!reachable.has(neighborId)) {
                        reachable.add(neighborId);
                        stack.push([neighborId, currentDepth + 1]);
                    }
                });
            }
        }

        return reachable;
    }

    /**
     * Check if path exists within depth limit
     */
    pathExists(startNodeId: string, targetNodeId: string, maxDepth: number): boolean {
        return this.search(startNodeId, targetNodeId, maxDepth).node !== null;
    }
}
