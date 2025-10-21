// Define a type for node IDs (can be strings or numbers)
type NodeId = string | number;

// Adjacency list representation of a graph
// key: NodeId, value: array of connected NodeIds
interface Graph {
    [nodeId: NodeId]: NodeId[];
}
/**
 * Reconstructs the path from a start node to an end node using a parent map.
 * The path is built in reverse and then reversed to get the correct order.
 *
 * @param parentMap A map where key is a node and value is its parent in the path.
 * @param startNode The original starting node for the path segment.
 * @param endNode The end node for the path segment (where the search reached).
 * @returns An array of NodeIds representing the path, or an empty array if reconstruction fails.
 */
function reconstructPath(
    parentMap: Map<NodeId, NodeId | null>,
    startNode: NodeId,
    endNode: NodeId
): NodeId[] {
    const path: NodeId[] = [];
    let currentNode: NodeId | null = endNode;

    // Traverse back from endNode to startNode using the parent map
    while (currentNode !== null) {
        path.unshift(currentNode); // Add to the beginning of the array
        currentNode = parentMap.get(currentNode);
    }

    // A simple check to ensure the path starts correctly.
    // This should ideally always pass if the parentMap is consistent.
    if (path[0] === startNode) {
        return path;
    } else {
        console.warn(`Path reconstruction issue: expected path to start with ${startNode}, but got ${path[0]}`);
        return [];
    }
}
/**
 * Implements a bi-directional search to find the shortest path between two nodes in a graph.
 *
 * @param graph The graph represented as an adjacency list.
 * @param start The starting node ID.
 * @param target The target node ID.
 * @returns An array of NodeIds representing the path from start to target, or null if no path exists.
 */
function bidirectionalSearch(graph: Graph, start: NodeId, target: NodeId): NodeId[] | null {
    // 1. Handle edge cases
    if (start === target) {
        return [start];
    }
    if (!graph[start] || !graph[target]) {
        // One or both nodes don't exist in the graph (or have no outgoing edges)
        return null;
    }

    // 2. Initialize queues and parent maps for both directions
    // Forward search (from start)
    let queue1: NodeId[] = [start];
    let parent1 = new Map<NodeId, NodeId | null>();
    parent1.set(start, null); // Start node has no parent in its own search direction

    // Backward search (from target)
    let queue2: NodeId[] = [target];
    let parent2 = new Map<NodeId, NodeId | null>();
    parent2.set(target, null); // Target node has no parent in its own search direction

    // Variable to store the node where the two searches meet
    let intersectionNode: NodeId | null = null;

    /**
     * Helper function to perform one step of a BFS.
     * It dequeues a node, explores its neighbors, and checks for an intersection.
     *
     * @param currentQueue The queue for the current search direction.
     * @param ownParentMap The parent map for the current search direction.
     * @param otherParentMap The parent map for the *other* search direction (to check for intersection).
     * @returns The node where the searches met, or null if no intersection found in this step.
     */
    const expandQueue = (
        currentQueue: NodeId[],
        ownParentMap: Map<NodeId, NodeId | null>,
        otherParentMap: Map<NodeId, NodeId | null>
    ): NodeId | null => {
        if (currentQueue.length === 0) {
            return null; // Cannot expand an empty queue
        }

        const currentNode = currentQueue.shift()!; // Dequeue the front node (we know it's not undefined)

        // Check if this node has been visited by the *other* search
        if (otherParentMap.has(currentNode)) {
            return currentNode; // Found an intersection!
        }

        // Explore neighbors
        const neighbors = graph[currentNode] || [];
        for (const neighbor of neighbors) {
            // If the neighbor hasn't been visited by *this* search direction yet
            if (!ownParentMap.has(neighbor)) {
                ownParentMap.set(neighbor, currentNode); // Set parent for this search
                currentQueue.push(neighbor);            // Enqueue neighbor
            }
        }
        return null; // No intersection found in this step
    };

    // 3. Main search loop
    // Continue as long as both queues have nodes to explore
    while (queue1.length > 0 && queue2.length > 0) {
        // Expand one step from the forward search (from 'start')
        intersectionNode = expandQueue(queue1, parent1, parent2);
        if (intersectionNode) break; // If they met, stop

        // Expand one step from the backward search (from 'target')
        // Note: parent maps are swapped here because we're checking if the backward search
        // reached a node already visited by the forward search.
        intersectionNode = expandQueue(queue2, parent2, parent1);
        if (intersectionNode) break; // If they met, stop
    }

    // 4. Reconstruct path if an intersection was found
    if (intersectionNode) {
        // Path from start to intersection node
        const pathFromStart = reconstructPath(parent1, start, intersectionNode);
        // Path from target to intersection node (this needs to be reversed later)
        const pathFromTarget = reconstructPath(parent2, target, intersectionNode);

        // Combine the paths:
        // pathFromStart: start -> ... -> parent(intersection) -> intersection
        // pathFromTarget: target -> ... -> parent(intersection) -> intersection
        // We need: start -> ... -> intersection -> ... -> target

        // Reverse pathFromTarget and remove the common intersectionNode to avoid duplication
        const fullPath = pathFromStart.concat(pathFromTarget.reverse().slice(1));
        return fullPath;
    } else {
        // No path found (queues became empty without meeting)
        return null;
    }
}
const myGraph: Graph = {
    A: ['B', 'C'],
    B: ['A', 'D', 'E'],
    C: ['A', 'F'],
    D: ['B', 'G'],
    E: ['B', 'H'],
    F: ['C', 'I'],
    G: ['D', 'J'],
    H: ['E', 'K'],
    I: ['F', 'L'],
    J: ['G', 'M', 'N'],
    K: ['H', 'O'],
    L: ['I', 'P'],
    M: ['J'],
    N: ['J'],
    O: ['K'],
    P: ['L']
};

console.log("Graph:", myGraph);

// Test cases
console.log("\n--- Test Cases ---");

// Case 1: Path exists (A -> M)
const path1 = bidirectionalSearch(myGraph, 'A', 'M');
console.log("Path A to M:", path1 ? path1.join(' -> ') : "No path found"); // Expected: A -> B -> D -> G -> J -> M

// Case 2: Path exists (C -> O)
const path2 = bidirectionalSearch(myGraph, 'C', 'O');
console.log("Path C to O:", path2 ? path2.join(' -> ') : "No path found"); // Expected: C -> A -> B -> E -> H -> K -> O

// Case 3: Start and target are the same
const path3 = bidirectionalSearch(myGraph, 'A', 'A');
console.log("Path A to A:", path3 ? path3.join(' -> ') : "No path found"); // Expected: A

// Case 4: No path (e.g., disconnected graph, or target doesn't exist)
const path4 = bidirectionalSearch(myGraph, 'A', 'X'); // 'X' does not exist
console.log("Path A to X:", path4 ? path4.join(' -> ') : "No path found"); // Expected: No path found

const isolatedGraph: Graph = {
    ...myGraph,
    Q: ['R'],
    R: ['Q']
}
const path5 = bidirectionalSearch(isolatedGraph, 'A', 'Q'); // 'Q' is disconnected from 'A'
console.log("Path A to Q (disconnected):", path5 ? path5.join(' -> ') : "No path found"); // Expected: No path found

// Case 6: Longer path
const path6 = bidirectionalSearch(myGraph, 'A', 'P');
console.log("Path A to P:", path6 ? path6.join(' -> ') : "No path found"); // Expected: A -> C -> F -> I -> L -> P

