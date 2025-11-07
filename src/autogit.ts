// Define a type for node IDs (e.g., string or number)
type NodeId = string;

// Define the adjacency list type
type AdjacencyList = Map<NodeId, NodeId[]>;

// Example Graph:
// A --- B
// |     |
// C --- D --- E
//       |
//       F
const graph: AdjacencyList = new Map();
graph.set('A', ['B', 'C']);
graph.set('B', ['A', 'D']);
graph.set('C', ['A', 'D']);
graph.set('D', ['B', 'C', 'E', 'F']);
graph.set('E', ['D']);
graph.set('F', ['D']);
// Add an isolated node for testing disconnected graphs
graph.set('G', []);
function dfsRecursive(graph: AdjacencyList, startNode: NodeId): NodeId[] {
    const visited = new Set<NodeId>();
    const traversalOrder: NodeId[] = [];

    /**
     * Helper function to perform the recursive exploration.
     * @param node The current node being visited.
     */
    function explore(node: NodeId) {
        // Base case: if the node has already been visited, stop exploring this path.
        if (visited.has(node)) {
            return;
        }

        // Mark the current node as visited.
        visited.add(node);
        // Add it to our traversal order (this is where you'd typically process the node).
        traversalOrder.push(node);
        console.log(`Visiting (recursive): ${node}`); // For demonstration

        // Get the neighbors of the current node. If none, default to an empty array.
        const neighbors = graph.get(node) || [];

        // Recursively visit each unvisited neighbor.
        for (const neighbor of neighbors) {
            explore(neighbor);
        }
    }

    // Start the exploration from the given startNode.
    explore(startNode);

    return traversalOrder;
}

console.log("--- Recursive DFS from 'A' ---");
const recursiveResult = dfsRecursive(graph, 'A');
console.log("Recursive DFS Traversal Order:", recursiveResult);
// Expected: A, B, D, C, E, F (order can vary slightly based on neighbor iteration)

console.log("\n--- Recursive DFS from 'G' (isolated node) ---");
const recursiveResultG = dfsRecursive(graph, 'G');
console.log("Recursive DFS Traversal Order (G):", recursiveResultG);
// Expected: G
function dfsIterative(graph: AdjacencyList, startNode: NodeId): NodeId[] {
    const stack: NodeId[] = []; // Explicit stack for DFS
    const visited = new Set<NodeId>();
    const traversalOrder: NodeId[] = [];

    // Push the starting node onto the stack.
    stack.push(startNode);

    // Continue as long as there are nodes in the stack to visit.
    while (stack.length > 0) {
        // Pop the top node from the stack.
        // The '!' is a non-null assertion operator, telling TypeScript that we know
        // `stack.pop()` will not be undefined here because we checked `stack.length`.
        const currentNode = stack.pop()!;

        // If the current node has already been visited, skip it.
        if (visited.has(currentNode)) {
            continue;
        }

        // Mark the current node as visited.
        visited.add(currentNode);
        // Add it to our traversal order (this is where you'd typically process the node).
        traversalOrder.push(currentNode);
        console.log(`Visiting (iterative): ${currentNode}`); // For demonstration

        // Get the neighbors of the current node. If none, default to an empty array.
        const neighbors = graph.get(currentNode) || [];

        // Push unvisited neighbors onto the stack.
        // We push them in reverse order so that the "first" neighbor
        // (e.g., the one at index 0 in the `neighbors` array) is processed first,
        // mimicking the recursive behavior.
        for (let i = neighbors.length - 1; i >= 0; i--) {
            const neighbor = neighbors[i];
            if (!visited.has(neighbor)) {
                stack.push(neighbor);
            }
        }
    }

    return traversalOrder;
}

console.log("\n--- Iterative DFS from 'A' ---");
const iterativeResult = dfsIterative(graph, 'A');
console.log("Iterative DFS Traversal Order:", iterativeResult);
// Expected: A, C, D, F, E, B (order can vary slightly based on neighbor iteration)

console.log("\n--- Iterative DFS from 'G' (isolated node) ---");
const iterativeResultG = dfsIterative(graph, 'G');
console.log("Iterative DFS Traversal Order (G):", iterativeResultG);
// Expected: G
function dfsAllComponents(graph: AdjacencyList): NodeId[] {
    const allVisited = new Set<NodeId>();
    const fullTraversalOrder: NodeId[] = [];

    for (const nodeId of graph.keys()) { // Iterate over all known nodes in the graph
        if (!allVisited.has(nodeId)) {
            // Start a new DFS from this unvisited node
            // Note: We can reuse either dfsRecursive or dfsIterative here,
            // but we need to pass a new `visited` set to ensure
            // the inner DFS starts fresh for its component,
            // and then merge its results into `allVisited` and `fullTraversalOrder`.
            // For simplicity, let's just make a modified inner function.

            const componentTraversal: NodeId[] = [];
            const componentStack: NodeId[] = [nodeId];

            while (componentStack.length > 0) {
                const currentNode = componentStack.pop()!;
                if (allVisited.has(currentNode)) {
                    continue;
                }
                allVisited.add(currentNode);
                fullTraversalOrder.push(currentNode);
                componentTraversal.push(currentNode); // For component-specific order if needed

                const neighbors = graph.get(currentNode) || [];
                for (let i = neighbors.length - 1; i >= 0; i--) {
                    const neighbor = neighbors[i];
                    if (!allVisited.has(neighbor)) {
                        componentStack.push(neighbor);
                    }
                }
            }
            console.log(`Visited component starting with ${nodeId}:`, componentTraversal);
        }
    }
    return fullTraversalOrder;
}

console.log("\n--- DFS All Components ---");
const allNodesTraversal = dfsAllComponents(graph);
console.log("Full Graph Traversal Order:", allNodesTraversal);
// Expected: All nodes (A, B, C, D, E, F, G) in some DFS order.
