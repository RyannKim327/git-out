// A generic interface for nodes in our graph/tree
interface Node<T> {
    id: string; // Unique identifier for the node
    value: T;    // The actual data/value stored in the node
    // Potentially other properties like 'parent', 'children' etc.
}

// A helper type for items stored in our queue, including depth
interface QueueItem<T> {
    node: Node<T>;
    depth: number;
}
/**
 * Performs a Breadth-Limited Search on a graph or tree.
 *
 * @param startNode The starting node for the search.
 * @param getNeighbors A function that returns an array of neighbor nodes for a given node.
 * @param maxDepth The maximum depth to explore. Nodes at maxDepth will be checked, but their children will not be added to the queue.
 * @param isGoal An optional function to check if a node is the target goal. If provided, the search stops when the goal is found.
 *               If not provided, the function will return all reachable nodes within the depth limit.
 * @returns The goal node if `isGoal` is provided and found, otherwise null.
 *          If `isGoal` is not provided, returns an array of all visited nodes within the depth limit.
 */
function breadthLimitedSearch<T>(
    startNode: Node<T>,
    getNeighbors: (node: Node<T>) => Node<T>[],
    maxDepth: number,
    isGoal?: (node: Node<T>) => boolean
): Node<T> | null | Node<T>[] {
    const queue: QueueItem<T>[] = [{ node: startNode, depth: 0 }];
    const visited = new Set<string>(); // To keep track of visited node IDs
    const reachableNodes: Node<T>[] = []; // To store all nodes reached within limits (if no goal)

    // Add the start node to visited and (if no goal) to reachable nodes
    visited.add(startNode.id);
    if (!isGoal) {
        reachableNodes.push(startNode);
    }

    while (queue.length > 0) {
        const { node, depth } = queue.shift()!; // Dequeue the next item

        // Check if this node is the goal (if a goal condition is provided)
        if (isGoal && isGoal(node)) {
            return node; // Goal found!
        }

        // If we've reached the maximum depth, we cannot explore its children
        // We still *process* the node at maxDepth, but don't add its neighbors.
        if (depth >= maxDepth) {
            continue;
        }

        // Get neighbors and enqueue unvisited ones
        const neighbors = getNeighbors(node);
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor.id)) {
                visited.add(neighbor.id);

                // Add to reachable nodes if no specific goal
                if (!isGoal) {
                    reachableNodes.push(neighbor);
                }

                queue.push({ node: neighbor, depth: depth + 1 });
            }
        }
    }

    // If a goal was specified but not found
    if (isGoal) {
        return null;
    } else {
        // If no goal was specified, return all nodes reached within the depth limit
        return reachableNodes;
    }
}
// --- Example Data ---

// A simple graph node structure
interface GraphNode extends Node<string> {
    // No extra properties needed for this example, 'id' and 'value' suffice
}

// Represent our graph using an adjacency list
const graph: { [id: string]: string[] } = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': ['G', 'H'],
    'F': [],
    'G': [],
    'H': []
};

// Helper to create a GraphNode from an ID
function createGraphNode(id: string): GraphNode {
    return { id: id, value: `Node ${id}` };
}

// Implement getNeighbors for our graph structure
const getGraphNeighbors = (node: GraphNode): GraphNode[] => {
    const neighborIds = graph[node.id];
    if (!neighborIds) return [];
    return neighborIds.map(createGraphNode);
};

// --- Test Cases ---

console.log("--- Breadth-Limited Search Examples ---");

// Example 1: Find Node 'G' with max depth 2
console.log("\nSearching for 'G' with maxDepth = 2:");
const startNode1 = createGraphNode('A');
const goalNode1 = breadthLimitedSearch(
    startNode1,
    getGraphNeighbors,
    2, // maxDepth
    (node: GraphNode) => node.id === 'G'
);
console.log(`Goal 'G' found (maxDepth=2): ${goalNode1 ? goalNode1.id : 'Not found'}`);
// Expected: Node 'G' is at depth 3 (A->B->E->G). maxDepth 2 only explores up to C,D,E,F. So 'G' should NOT be found.
// Output: Not found


// Example 2: Find Node 'G' with max depth 3
console.log("\nSearching for 'G' with maxDepth = 3:");
const startNode2 = createGraphNode('A');
const goalNode2 = breadthLimitedSearch(
    startNode2,
    getGraphNeighbors,
    3, // maxDepth
    (node: GraphNode) => node.id === 'G'
);
console.log(`Goal 'G' found (maxDepth=3): ${goalNode2 ? goalNode2.id : 'Not found'}`);
// Expected: 'G' should be found as it's at depth 3.
// Output: G


// Example 3: Get all reachable nodes with max depth 1
console.log("\nGetting all reachable nodes with maxDepth = 1:");
const startNode3 = createGraphNode('A');
const reachableNodes1 = breadthLimitedSearch(
    startNode3,
    getGraphNeighbors,
    1 // maxDepth
) as GraphNode[]; // Cast to GraphNode[] as we know isGoal is not provided
console.log("Reachable nodes (maxDepth=1):", reachableNodes1.map(n => n.id).join(', '));
// Expected: A, B, C (Nodes A and its direct children B, C are reachable)
// Output: A, B, C


// Example 4: Get all reachable nodes with max depth 2
console.log("\nGetting all reachable nodes with maxDepth = 2:");
const startNode4 = createGraphNode('A');
const reachableNodes2 = breadthLimitedSearch(
    startNode4,
    getGraphNeighbors,
    2 // maxDepth
) as GraphNode[];
console.log("Reachable nodes (maxDepth=2):", reachableNodes2.map(n => n.id).join(', '));
// Expected: A, B, C, D, E, F (Nodes A, B, C, and their children D, E, F are reachable)
// Output: A, B, C, D, E, F

// Example 5: Start at 'B', max depth 1, find 'E'
console.log("\nSearching for 'E' starting from 'B' with maxDepth = 1:");
const startNode5 = createGraphNode('B');
const goalNode5 = breadthLimitedSearch(
    startNode5,
    getGraphNeighbors,
    1, // maxDepth
    (node: GraphNode) => node.id === 'E'
);
console.log(`Goal 'E' found (maxDepth=1, start B): ${goalNode5 ? goalNode5.id : 'Not found'}`);
// Expected: E (B is depth 0, E is depth 1)
// Output: E

