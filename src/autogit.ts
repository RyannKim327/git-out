type Graph = Record<string, string[]>;

/**
 * Performs BFS to find the shortest path between two nodes in an unweighted graph
 * @param graph - Adjacency list representation of the graph
 * @param start - Starting node
 * @param target - Target node to find
 * @returns Shortest path as array of nodes or null if no path exists
 */
function bfs(graph: Graph, start: string, target: string): string[] | null {
    // Check if start or target nodes exist in the graph
    if (!(start in graph)) throw new Error('Start node not in graph');
    if (!(target in graph)) throw new Error('Target node not in graph');
    
    const queue: string[] = [start];
    const visited = new Set<string>([start]);
    const predecessors: Record<string, string | null> = { [start]: null };

    while (queue.length > 0) {
        const current = queue.shift()!; // Dequeue the first node

        // Early exit if we find the target
        if (current === target) {
            return reconstructPath(predecessors, target);
        }

        // Process all neighbors
        for (const neighbor of graph[current]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                predecessors[neighbor] = current;
                queue.push(neighbor);
            }
        }
    }

    return null; // No path exists
}

// Helper function to reconstruct the path from predecessors
function reconstructPath(predecessors: Record<string, string | null>, target: string): string[] {
    const path: string[] = [];
    let current: string | null = target;
    
    while (current !== null) {
        path.unshift(current);
        current = predecessors[current];
    }
    
    return path;
}
// Example graph (undirected)
const graph: Graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
};

// Find shortest path from A to F
const path = bfs(graph, 'A', 'F');
console.log(path); // Output: ['A', 'C', 'F']

// Test case where no path exists
const disconnectedGraph: Graph = {
    'A': ['B'],
    'B': ['A'],
    'C': ['D'],
    'D': ['C']
};
console.log(bfs(disconnectedGraph, 'A', 'D')); // Output: null
