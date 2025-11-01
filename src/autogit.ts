// --- 1. Define Interfaces ---

/**
 * Represents a generic node in our graph.
 * T is the type of the actual data/value stored in the node.
 */
interface GraphNode<T> {
    id: string; // A unique identifier for the node (e.g., for the visited set)
    value: T;   // The actual data
    // In a real graph, you might have an array of neighbor IDs or neighbor objects
    // For this generic algorithm, we'll pass a `getNeighbors` function.
}

/**
 * An item stored in our BFS queue.
 * It contains the node itself and its depth from the start node.
 */
interface QueueItem<T> {
    node: GraphNode<T>;
    depth: number;
}

// --- 2. The Breadth-Limited Search Function ---

/**
 * Performs a Breadth-Limited Search on a graph.
 *
 * @param startNode The node to start the search from.
 * @param getNeighbors A function that takes a node and returns an array of its direct neighbors.
 * @param maxDepth The maximum depth to explore from the startNode (inclusive).
 * @param targetPredicate An optional function to check if a node is the target. If found, the search stops early.
 * @returns The target node if found and targetPredicate is provided, otherwise null.
 *          If targetPredicate is not provided, it effectively just explores up to maxDepth.
 */
function breadthLimitedSearch<T>(
    startNode: GraphNode<T>,
    getNeighbors: (node: GraphNode<T>) => GraphNode<T>[],
    maxDepth: number,
    targetPredicate?: (node: GraphNode<T>) => boolean
): GraphNode<T> | null {
    // Input validation
    if (maxDepth < 0) {
        console.warn("maxDepth cannot be negative. Setting to 0.");
        maxDepth = 0;
    }

    const queue: QueueItem<T>[] = [];
    const visited = new Set<string>(); // Stores node IDs to prevent cycles and redundant visits

    // Initialize the queue with the start node at depth 0
    queue.push({ node: startNode, depth: 0 });
    visited.add(startNode.id);

    // Check if the start node itself is the target
    if (targetPredicate && targetPredicate(startNode)) {
        return startNode;
    }

    while (queue.length > 0) {
        const { node: currentNode, depth: currentDepth } = queue.shift()!; // Dequeue

        // If we've reached the maximum depth, we don't explore its neighbors.
        // We still process the currentNode itself (e.g., check if it's the target).
        if (currentDepth >= maxDepth) {
            continue; // Stop exploring further down this path
        }

        const neighbors = getNeighbors(currentNode);

        for (const neighbor of neighbors) {
            if (!visited.has(neighbor.id)) {
                visited.add(neighbor.id);

                // If this neighbor is the target, return it immediately
                if (targetPredicate && targetPredicate(neighbor)) {
                    return neighbor;
                }

                // Enqueue the neighbor with its new depth
                queue.push({ node: neighbor, depth: currentDepth + 1 });
            }
        }
    }

    // Target not found within the specified depth limit
    return null;
}

// --- 3. Example Usage ---

// Let's create a simple graph represented by an array of nodes,
// where each node explicitly lists its connected neighbor IDs.

interface City {
    id: string;
    name: string;
    connections: string[]; // IDs of connected cities
}

const citiesData: City[] = [
    { id: "A", name: "Aliceville", connections: ["B", "C"] },
    { id: "B", name: "Bobtown", connections: ["A", "D", "E"] },
    { id: "C", name: "Charlieburg", connections: ["A", "F"] },
    { id: "D", name: "Davidville", connections: ["B", "G"] },
    { id: "E", name: "Emily City", connections: ["B", "H"] },
    { id: "F", name: "Frankfurt", connections: ["C"] },
    { id: "G", name: "Graceville", connections: ["D"] },
    { id: "H", name: "Heidi Hights", connections: ["E", "I"] },
    { id: "I", name: "Ivyville", connections: ["H", "J"] },
    { id: "J", name: "Jasper Junction", connections: ["I"] },
];

// Map for quick lookup of cities by ID
const cityMap = new Map<string, City>();
citiesData.forEach(city => cityMap.set(city.id, city));

// Adapter function to make our City data compatible with GraphNode<T>
const getCityGraphNode = (city: City): GraphNode<City> => ({
    id: city.id,
    value: city,
});

// The `getNeighbors` function required by `breadthLimitedSearch`
const getCityNeighbors = (node: GraphNode<City>): GraphNode<City>[] => {
    const city = node.value; // Get the actual City object from the GraphNode
    return city.connections
        .map(connectionId => cityMap.get(connectionId))
        .filter((c): c is City => c !== undefined) // Filter out undefined connections
        .map(getCityGraphNode); // Convert City back to GraphNode<City>
};

// --- Test Cases ---

const startCity = getCityGraphNode(cityMap.get("A")!);

console.log("--- Search for Emily City (E) ---");

// Test 1: maxDepth = 1 (Should not find 'E')
let targetCityId = "E";
let foundNode = breadthLimitedSearch(
    startCity,
    getCityNeighbors,
    1, // Max depth 1
    (node) => node.id === targetCityId
);
console.log(`Searching for ${targetCityId} from ${startCity.id} with maxDepth=1:`,
    foundNode ? foundNode.value.name : "Not Found (too deep)"
); // Expected: Not Found

// Test 2: maxDepth = 2 (Should find 'E')
foundNode = breadthLimitedSearch(
    startCity,
    getCityNeighbors,
    2, // Max depth 2
    (node) => node.id === targetCityId
);
console.log(`Searching for ${targetCityId} from ${startCity.id} with maxDepth=2:`,
    foundNode ? foundNode.value.name : "Not Found"
); // Expected: Emily City

// Test 3: Search for Jasper Junction (J) with maxDepth = 3 (Should not find 'J')
targetCityId = "J";
foundNode = breadthLimitedSearch(
    startCity,
    getCityNeighbors,
    3, // Max depth 3
    (node) => node.id === targetCityId
);
console.log(`Searching for ${targetCityId} from ${startCity.id} with maxDepth=3:`,
    foundNode ? foundNode.value.name : "Not Found (too deep)"
); // Expected: Not Found

// Test 4: Search for Jasper Junction (J) with maxDepth = 4 (Should find 'J')
foundNode = breadthLimitedSearch(
    startCity,
    getCityNeighbors,
    4, // Max depth 4
    (node) => node.id === targetCityId
);
console.log(`Searching for ${targetCityId} from ${startCity.id} with maxDepth=4:`,
    foundNode ? foundNode.value.name : "Not Found"
); // Expected: Jasper Junction

// Test 5: What if the start node is the target? (maxDepth doesn't matter much here, but still limited)
targetCityId = "A";
foundNode = breadthLimitedSearch(
    startCity,
    getCityNeighbors,
    0, // Max depth 0
    (node) => node.id === targetCityId
);
console.log(`Searching for ${targetCityId} from ${startCity.id} with maxDepth=0:`,
    foundNode ? foundNode.value.name : "Not Found"
); // Expected: Aliceville
