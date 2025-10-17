// Define a generic type for nodes in our graph
type GraphNode<T> = T;

class Graph<T> {
    // An adjacency list where keys are nodes and values are arrays of their neighbors
    private adjList: Map<GraphNode<T>, GraphNode<T>[]>;

    constructor() {
        this.adjList = new Map();
    }

    /**
     * Adds a node to the graph.
     * @param node The node to add.
     */
    addNode(node: GraphNode<T>): void {
        if (!this.adjList.has(node)) {
            this.adjList.set(node, []);
        }
    }

    /**
     * Adds an edge between two nodes. Assumes an undirected graph.
     * @param node1 The first node.
     * @param node2 The second node.
     */
    addEdge(node1: GraphNode<T>, node2: GraphNode<T>): void {
        // Ensure both nodes exist in the graph
        this.addNode(node1);
        this.addNode(node2);

        // Add edge in both directions for an undirected graph
        this.adjList.get(node1)?.push(node2);
        this.adjList.get(node2)?.push(node1);
    }

    /**
     * Retrieves the neighbors of a given node.
     * @param node The node whose neighbors are to be retrieved.
     * @returns An array of neighbors.
     */
    getNeighbors(node: GraphNode<T>): GraphNode<T>[] {
        return this.adjList.get(node) || [];
    }

    /**
     * Prints the graph's adjacency list.
     */
    printGraph(): void {
        console.log("Graph Adjacency List:");
        for (const [node, neighbors] of this.adjList.entries()) {
            console.log(`${node} -> ${neighbors.join(', ')}`);
        }
    }

    // --- DFS Implementations will go here ---
}
// Add this method inside the Graph<T> class

    /**
     * Performs a Depth-First Search (DFS) starting from a given node using recursion.
     * @param startNode The node to start the DFS from.
     * @param callback An optional function to execute on each visited node.
     * @returns An array of nodes in the order they were visited.
     */
    dfsRecursive(startNode: GraphNode<T>, callback?: (node: GraphNode<T>) => void): GraphNode<T>[] {
        const visited = new Set<GraphNode<T>>();
        const traversalOrder: GraphNode<T>[] = [];

        // Helper function for the recursive traversal
        const dfsHelper = (currentNode: GraphNode<T>): void => {
            visited.add(currentNode);
            traversalOrder.push(currentNode);
            callback?.(currentNode); // Execute callback if provided

            for (const neighbor of this.getNeighbors(currentNode)) {
                if (!visited.has(neighbor)) {
                    dfsHelper(neighbor);
                }
            }
        };

        // Check if the startNode exists in the graph
        if (!this.adjList.has(startNode)) {
            console.warn(`Start node '${startNode}' not found in graph.`);
            return [];
        }

        dfsHelper(startNode);
        return traversalOrder;
    }
// Add this method inside the Graph<T> class

    /**
     * Performs a Depth-First Search (DFS) starting from a given node using an explicit stack.
     * @param startNode The node to start the DFS from.
     * @param callback An optional function to execute on each visited node.
     * @returns An array of nodes in the order they were visited.
     */
    dfsIterative(startNode: GraphNode<T>, callback?: (node: GraphNode<T>) => void): GraphNode<T>[] {
        const visited = new Set<GraphNode<T>>();
        const stack: GraphNode<T>[] = []; // Explicit stack
        const traversalOrder: GraphNode<T>[] = [];

        // Check if the startNode exists in the graph
        if (!this.adjList.has(startNode)) {
            console.warn(`Start node '${startNode}' not found in graph.`);
            return [];
        }

        stack.push(startNode); // Start by pushing the initial node onto the stack

        while (stack.length > 0) {
            const currentNode = stack.pop()!; // Get the top node from the stack

            // Only process if not visited yet
            if (!visited.has(currentNode)) {
                visited.add(currentNode);
                traversalOrder.push(currentNode);
                callback?.(currentNode);

                // Add neighbors to the stack. Important: push in reverse order
                // to mimic the recursive DFS output (if neighbors are ordered).
                // If getNeighbors returns [A, B, C], pushing C, then B, then A
                // means A will be popped next, then B, then C, maintaining "left-to-right" exploration.
                const neighbors = this.getNeighbors(currentNode);
                for (let i = neighbors.length - 1; i >= 0; i--) {
                    const neighbor = neighbors[i];
                    if (!visited.has(neighbor)) { // Only push unvisited neighbors
                        stack.push(neighbor);
                    }
                }
                // Alternative (simpler, but might not match recursive output order if neighbors are ordered):
                // for (const neighbor of this.getNeighbors(currentNode)) {
                //     if (!visited.has(neighbor)) {
                //         stack.push(neighbor);
                //     }
                // }
            }
        }
        return traversalOrder;
    }
// Create a new graph
const myGraph = new Graph<string>();

// Add nodes
myGraph.addNode("A");
myGraph.addNode("B");
myGraph.addNode("C");
myGraph.addNode("D");
myGraph.addNode("E");
myGraph.addNode("F");

// Add edges
myGraph.addEdge("A", "B");
myGraph.addEdge("A", "C");
myGraph.addEdge("B", "D");
myGraph.addEdge("C", "E");
myGraph.addEdge("D", "E");
myGraph.addEdge("D", "F");
myGraph.addEdge("E", "F");

myGraph.printGraph();

console.log("\n--- Recursive DFS from 'A' ---");
const recursiveTraversal = myGraph.dfsRecursive("A", (node) => console.log(`Visited (recursive): ${node}`));
console.log("Recursive DFS Traversal Order:", recursiveTraversal.join(" -> "));

console.log("\n--- Iterative DFS from 'A' ---");
const iterativeTraversal = myGraph.dfsIterative("A", (node) => console.log(`Visited (iterative): ${node}`));
console.log("Iterative DFS Traversal Order:", iterativeTraversal.join(" -> "));

// Example for a disconnected graph component
myGraph.addNode("G");
myGraph.addNode("H");
myGraph.addEdge("G", "H");

console.log("\n--- Recursive DFS from 'G' (disconnected component) ---");
const disconnectedTraversal = myGraph.dfsRecursive("G");
console.log("Disconnected DFS Traversal Order:", disconnectedTraversal.join(" -> "));

// Example of what happens if starting node doesn't exist
console.log("\n--- Recursive DFS from 'Z' (non-existent node) ---");
myGraph.dfsRecursive("Z");
Graph Adjacency List:
A -> B, C
B -> A, D
C -> A, E
D -> B, E, F
E -> C, D, F
F -> D, E
G -> H
H -> G

--- Recursive DFS from 'A' ---
Visited (recursive): A
Visited (recursive): B
Visited (recursive): D
Visited (recursive): E
Visited (recursive): C
Visited (recursive): F
Recursive DFS Traversal Order: A -> B -> D -> E -> C -> F

--- Iterative DFS from 'A' ---
Visited (iterative): A
Visited (iterative): C
Visited (iterative): E
Visited (iterative): F
Visited (iterative): D
Visited (iterative): B
Iterative DFS Traversal Order: A -> C -> E -> F -> D -> B

--- Recursive DFS from 'G' (disconnected component) ---
Disconnected DFS Traversal Order: G -> H

--- Recursive DFS from 'Z' (non-existent node) ---
Start node 'Z' not found in graph.
