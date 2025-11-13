type Graph<T> = Map<T, T[]>; // Generic graph representation

/**
 * Performs BFS traversal starting from a given node
 * @param graph - Graph represented as adjacency list (Map)
 * @param startNode - Starting node for traversal
 * @returns Array of nodes in BFS order
 */
function bfs<T>(graph: Graph<T>, startNode: T): T[] {
    const visited = new Set<T>(); // Track visited nodes
    const result: T[] = []; // Store traversal order
    const queue: T[] = [startNode]; // Initialize queue with start node

    visited.add(startNode);

    while (queue.length > 0) {
        const currentNode = queue.shift()!; // Dequeue front node
        result.push(currentNode);

        // Get neighbors or empty array if none exist
        const neighbors = graph.get(currentNode) || []; 

        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor); // Enqueue unvisited neighbor
            }
        }
    }

    return result;
}
// Create a sample graph
const graph = new Map<string, string[]>([
    ['A', ['B', 'C']],
    ['B', ['D']],
    ['C', ['E']],
    ['D', ['F']],
    ['E', []],
    ['F', []]
]);

// Perform BFS starting from 'A'
const traversalOrder = bfs(graph, 'A');
console.log(traversalOrder); // Output: ['A', 'B', 'C', 'D', 'E', 'F']
// Version with callback for node processing
function bfsWithCallback<T>(
    graph: Graph<T>,
    startNode: T,
    visit: (node: T) => void
): void {
    const visited = new Set<T>();
    const queue = [startNode];
    visited.add(startNode);

    while (queue.length > 0) {
        const currentNode = queue.shift()!;
        visit(currentNode); // Process node via callback

        (graph.get(currentNode) || []).forEach(neighbor => {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        });
    }
}

// Usage with callback
bfsWithCallback(graph, 'A', node => console.log(`Visited: ${node}`));
function bfsDisconnected<T>(graph: Graph<T>): T[][] {
    const components: T[][] = [];
    const visited = new Set<T>();

    for (const node of graph.keys()) {
        if (!visited.has(node)) {
            const component = bfs(graph, node);
            component.forEach(node => visited.add(node));
            components.push(component);
        }
    }

    return components;
}
