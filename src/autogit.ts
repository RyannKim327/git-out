// 1. Define the Graph Structure
interface Graph<T> {
    getNeighbors(node: T): T[];
    // Optional: for better type safety if nodes are complex objects
    // getNodeId?(node: T): string | number;
}

// 2. Define the search result
interface BidirectionalSearchResult<T> {
    path: T[] | null;
    distance: number | null;
}

// Helper function to reconstruct the path
function reconstructPath<T>(
    parentMap: Map<T, T | null>,
    startNode: T,
    targetNode: T
): T[] {
    const path: T[] = [];
    let current: T | null = targetNode;

    while (current !== null) {
        path.unshift(current);
        // If current is the startNode, its parent is null, so loop will terminate
        current = parentMap.get(current);
    }

    // If the path doesn't start with the startNode, it means targetNode wasn't reachable
    // or the parentMap was incomplete for this segment.
    // For bidirectional search, this should generally be handled by the main algorithm
    // ensuring startNode is actually the start of the segment being reconstructed.
    if (path.length > 0 && path[0] === startNode) {
        return path;
    }
    return []; // Should not happen if called correctly after a meeting point is found
}

// 3. Bi-directional Search Function
function bidirectionalSearch<T>(
    graph: Graph<T>,
    startNode: T,
    endNode: T
): BidirectionalSearchResult<T> {

    // Early exit: if start and end are the same
    if (startNode === endNode) {
        return { path: [startNode], distance: 0 };
    }

    // --- Forward Search (from startNode) ---
    const queueA: T[] = [];
    const visitedA = new Set<T>();
    const parentA = new Map<T, T | null>(); // Maps child -> parent

    // --- Backward Search (from endNode) ---
    const queueB: T[] = [];
    const visitedB = new Set<T>();
    const parentB = new Map<T, T | null>(); // Maps child -> parent

    // Initialize forward search
    queueA.push(startNode);
    visitedA.add(startNode);
    parentA.set(startNode, null); // Start node has no parent

    // Initialize backward search
    queueB.push(endNode);
    visitedB.add(endNode);
    parentB.set(endNode, null); // End node has no parent

    // Keep track of the node where the two searches meet
    let meetingNode: T | null = null;

    while (queueA.length > 0 && queueB.length > 0) {
        // --- Process one step from Forward Search (queueA) ---
        let currentA = queueA.shift()!; // Using ! because we check length before
        
        // Check if currentA has been visited by the backward search
        if (visitedB.has(currentA)) {
            meetingNode = currentA;
            break; // Found the meeting point!
        }

        for (const neighborA of graph.getNeighbors(currentA)) {
            if (!visitedA.has(neighborA)) {
                visitedA.add(neighborA);
                parentA.set(neighborA, currentA);
                queueA.push(neighborA);

                // Check if this new node meets the backward search
                if (visitedB.has(neighborA)) {
                    meetingNode = neighborA;
                    break; // Found the meeting point!
                }
            }
        }
        if (meetingNode) break; // If meetingNode found in inner loop

        // --- Process one step from Backward Search (queueB) ---
        let currentB = queueB.shift()!;
        
        // Check if currentB has been visited by the forward search
        if (visitedA.has(currentB)) {
            meetingNode = currentB;
            break; // Found the meeting point!
        }

        for (const neighborB of graph.getNeighbors(currentB)) {
            if (!visitedB.has(neighborB)) {
                visitedB.add(neighborB);
                parentB.set(neighborB, currentB);
                queueB.push(neighborB);

                // Check if this new node meets the forward search
                if (visitedA.has(neighborB)) {
                    meetingNode = neighborB;
                    break; // Found the meeting point!
                }
            }
        }
        if (meetingNode) break; // If meetingNode found in inner loop
    }

    if (meetingNode === null) {
        // No path found
        return { path: null, distance: null };
    }

    // --- Reconstruct the path ---
    const pathFromStart = reconstructPath(parentA, startNode, meetingNode);
    // Path from end to meeting node needs to be reversed
    const pathFromEnd = reconstructPath(parentB, endNode, meetingNode).reverse();

    // The meetingNode will be present in both paths.
    // pathFromStart: [start, ..., meetingNode]
    // pathFromEnd:   [end, ..., meetingNode] (after reversal) -> [meetingNode, ..., end]
    // To combine, we take pathFromStart, and then pathFromEnd *excluding* its first element (the duplicate meetingNode).
    const fullPath = pathFromStart.concat(pathFromEnd.slice(1));

    return { path: fullPath, distance: fullPath.length - 1 };
}

// Define a simple adjacency list graph
type Node = string; // For simplicity, our nodes are strings

class AdjacencyListGraph implements Graph<Node> {
    private adj: Map<Node, Node[]> = new Map();

    addNode(node: Node): void {
        if (!this.adj.has(node)) {
            this.adj.set(node, []);
        }
    }

    addEdge(from: Node, to: Node, bidirectional: boolean = true): void {
        this.addNode(from);
        this.addNode(to);
        this.adj.get(from)!.push(to);
        if (bidirectional) {
            this.adj.get(to)!.push(from);
        }
    }

    getNeighbors(node: Node): Node[] {
        return this.adj.get(node) || [];
    }
}

// Create a graph instance
const graph = new AdjacencyListGraph();

// Add nodes and edges to form a sample graph
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'E');
graph.addEdge('D', 'F');
graph.addEdge('E', 'F');
graph.addEdge('F', 'G');
graph.addEdge('G', 'H');
graph.addEdge('H', 'I');
graph.addEdge('I', 'J');
graph.addEdge('F', 'X'); // Another path
graph.addEdge('X', 'Y');
graph.addEdge('Y', 'J');


// Test cases
console.log("--- Test Case 1: A to J ---");
const result1 = bidirectionalSearch(graph, 'A', 'J');
if (result1.path) {
    console.log("Path:", result1.path.join(' -> ')); // Expected: A -> B -> D -> F -> G -> H -> I -> J (or similar via E)
    console.log("Distance:", result1.distance); // Expected: 8
} else {
    console.log("No path found.");
}

console.log("\n--- Test Case 2: A to G ---");
const result2 = bidirectionalSearch(graph, 'A', 'G');
if (result2.path) {
    console.log("Path:", result2.path.join(' -> ')); // Expected: A -> B -> D -> F -> G (or via E)
    console.log("Distance:", result2.distance); // Expected: 4
} else {
    console.log("No path found.");
}

console.log("\n--- Test Case 3: A to A (start = end) ---");
const result3 = bidirectionalSearch(graph, 'A', 'A');
if (result3.path) {
    console.log("Path:", result3.path.join(' -> ')); // Expected: A
    console.log("Distance:", result3.distance); // Expected: 0
} else {
    console.log("No path found.");
}

console.log("\n--- Test Case 4: A to Z (non-existent node) ---");
const result4 = bidirectionalSearch(graph, 'A', 'Z');
if (result4.path) {
    console.log("Path:", result4.path.join(' -> '));
    console.log("Distance:", result4.distance);
} else {
    console.log("No path found."); // Expected: No path found.
}

console.log("\n--- Test Case 5: A to J (via X, Y) ---");
const graph2 = new AdjacencyListGraph();
graph2.addEdge('A', 'B');
graph2.addEdge('B', 'C');
graph2.addEdge('C', 'D');
graph2.addEdge('D', 'E');
graph2.addEdge('E', 'F');
graph2.addEdge('F', 'G');
graph2.addEdge('G', 'H');
graph2.addEdge('H', 'I');
graph2.addEdge('I', 'J'); // Path 1: A->J length 9

graph2.addEdge('A', 'X');
graph2.addEdge('X', 'Y');
graph2.addEdge('Y', 'Z');
graph2.addEdge('Z', 'J'); // Path 2: A->J length 4
const result5 = bidirectionalSearch(graph2, 'A', 'J');
if (result5.path) {
    console.log("Path:", result5.path.join(' -> ')); // Expected: A -> X -> Y -> Z -> J
    console.log("Distance:", result5.distance); // Expected: 4
} else {
    console.log("No path found.");
}

