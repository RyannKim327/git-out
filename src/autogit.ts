// Define a type for our graph where keys are node identifiers (strings)
// and values are arrays of their connected neighbors (also strings).
type Graph = Record<string, string[]>;

// Example Graph:
// A -- B
// |    | \
// C -- D  E
//      |
//      F
const graph: Graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'D'],
    'D': ['B', 'C', 'F'],
    'E': ['B'],
    'F': ['D']
};

// For directed graphs, the connections would only go one way:
const directedGraph: Graph = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['D'],
    'D': ['E'],
    'E': ['F'],
    'F': []
};
type Graph = Record<string, string[]>;

const graph: Graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': ['F'],
    'F': []
};

function dfsRecursive(
    graph: Graph,
    node: string,
    visited: Set<string>,
    result: string[] // To store the traversal order
): void {
    // 1. Mark the current node as visited
    visited.add(node);
    result.push(node); // "Process" the node (e.g., add to a list, print it)
    console.log(`Visiting (Recursive): ${node}`);

    // 2. Get all neighbors of the current node
    const neighbors = graph[node] || []; // Handle cases where a node might not have entries (e.g., a leaf node not listed as a key)

    // 3. For each neighbor:
    for (const neighbor of neighbors) {
        // If the neighbor hasn't been visited yet,
        // recursively call DFS on it.
        if (!visited.has(neighbor)) {
            dfsRecursive(graph, neighbor, visited, result);
        }
    }
    // 4. (Implicit Backtracking): When the loop finishes, all reachable nodes from the current 'node'
    //    have been explored. The function returns, and the call stack unwinds to the previous node.
}

// --- Usage Example ---
const startNodeRecursive = 'A';
const visitedNodesRecursive = new Set<string>();
const traversalOrderRecursive: string[] = [];

console.log("--- Recursive DFS Traversal ---");
dfsRecursive(graph, startNodeRecursive, visitedNodesRecursive, traversalOrderRecursive);
console.log("Recursive DFS Traversal Order:", traversalOrderRecursive);
// Expected Output: A, B, D, E, F, C (or similar, depending on neighbor order)
type Graph = Record<string, string[]>;

const graph: Graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': ['F'],
    'F': []
};

function dfsIterative(graph: Graph, startNode: string): string[] {
    const stack: string[] = [startNode]; // Initialize stack with the starting node
    const visited = new Set<string>();
    const result: string[] = [];

    // Continue as long as there are nodes in the stack to visit
    while (stack.length > 0) {
        // 1. Pop a node from the stack. This is the "current" node we are exploring.
        const node = stack.pop()!; // '!' asserts that pop() will not return undefined

        // 2. If the node hasn't been visited yet:
        if (!visited.has(node)) {
            visited.add(node); // Mark it as visited
            result.push(node); // "Process" the node
            console.log(`Visiting (Iterative): ${node}`);

            // 3. Get all neighbors of the current node
            const neighbors = graph[node] || [];

            // 4. Push all unvisited neighbors onto the stack.
            // IMPORTANT: To maintain a similar traversal order to recursive DFS (e.g., left-to-right in adjacency list),
            // you should push neighbors in reverse order. This ensures the "first" neighbor
            // in the adjacency list is processed first (because it's the last one pushed, so first one popped).
            for (let i = neighbors.length - 1; i >= 0; i--) {
                const neighbor = neighbors[i];
                if (!visited.has(neighbor)) {
                    stack.push(neighbor);
                }
            }
            // If you push neighbors in natural order (for-of loop), it will explore right-to-left
            // relative to the adjacency list. Both are valid DFS, just different traversal orders.
        }
    }
    return result;
}

// --- Usage Example ---
const startNodeIterative = 'A';
console.log("\n--- Iterative DFS Traversal ---");
const traversalOrderIterative = dfsIterative(graph, startNodeIterative);
console.log("Iterative DFS Traversal Order:", traversalOrderIterative);
// Expected Output: A, C, F, B, E, D (or similar, depending on neighbor push order)
type Graph = Record<string, string[]>;

const disconnectedGraph: Graph = {
    'A': ['B'],
    'B': ['A'],
    'C': ['D'],
    'D': ['C']
    // Imagine other nodes not listed as keys but as values, e.g., 'E' if it was ['A', 'E']
};

function findAllNodes(graph: Graph): Set<string> {
    const nodes = new Set<string>();
    for (const node of Object.keys(graph)) {
        nodes.add(node);
        for (const neighbor of graph[node]) {
            nodes.add(neighbor);
        }
    }
    return nodes;
}

function dfsAllComponents(graph: Graph): string[] {
    const visited = new Set<string>();
    const traversalOrder: string[] = [];
    const allGraphNodes = findAllNodes(graph); // Get all unique nodes in the graph

    for (const node of Array.from(allGraphNodes)) {
        if (!visited.has(node)) {
            // Start a new DFS traversal for this component
            console.log(`\nStarting DFS for a new component with root: ${node}`);
            // You can choose either recursive or iterative here:
            // dfsRecursive(graph, node, visited, traversalOrder);
            
            // To use the iterative version for components, you need to slightly adapt it
            // to update a shared 'visited' set and 'traversalOrder' array.
            const componentTraversal = dfsIterativeComponent(graph, node, visited);
            traversalOrder.push(...componentTraversal);
        }
    }
    return traversalOrder;
}

// Helper for iterative DFS within a component, updating a shared visited set
function dfsIterativeComponent(graph: Graph, startNode: string, visited: Set<string>): string[] {
    const stack: string[] = [startNode];
    const componentResult: string[] = [];

    while (stack.length > 0) {
        const node = stack.pop()!;

        if (!visited.has(node)) {
            visited.add(node);
            componentResult.push(node);
            console.log(`Visiting (Component DFS): ${node}`);

            const neighbors = graph[node] || [];
            for (let i = neighbors.length - 1; i >= 0; i--) {
                const neighbor = neighbors[i];
                if (!visited.has(neighbor)) {
                    stack.push(neighbor);
                }
            }
        }
    }
    return componentResult;
}

// --- Usage Example ---
console.log("\n--- DFS All Components Traversal ---");
const fullTraversalOrder = dfsAllComponents(disconnectedGraph);
console.log("Full DFS Traversal Order (all components):", fullTraversalOrder);
// Expected Output: A, B, C, D (order within components depends on implementation)
