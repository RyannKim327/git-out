// Type alias for a node identifier (can be string, number, or even an object if you handle equality)
type NodeIdentifier = string | number;

// Represents the graph as an adjacency list
// Map<NodeIdentifier, NodeIdentifier[]> means:
// Key: A node identifier (e.g., 'A', 1)
// Value: An array of node identifiers that are direct neighbors of the key node
type AdjacencyList<T extends NodeIdentifier> = Map<T, T[]>;
/**
 * Performs a Breadth-First Search (BFS) on a graph.
 *
 * @param graph The graph represented as an adjacency list.
 * @param startNode The identifier of the node to start the BFS from.
 * @returns An array containing the identifiers of nodes in the order they were visited.
 */
function bfs<T extends NodeIdentifier>(
  graph: AdjacencyList<T>,
  startNode: T
): T[] {
  // 1. Initialize a queue and a set for visited nodes
  const queue: T[] = [];
  const visited = new Set<T>();
  const traversalOrder: T[] = []; // Stores the order of visited nodes

  // 2. Add the start node to the queue and mark it as visited
  queue.push(startNode);
  visited.add(startNode);

  // 3. Process nodes from the queue until it's empty
  while (queue.length > 0) {
    // Dequeue the first node (TypeScript's Array.shift() removes and returns the first element)
    // The '!' is a non-null assertion operator, telling TypeScript we know it won't be undefined.
    const currentNode = queue.shift()!;

    // "Visit" the current node (e.g., add to traversal order, print it, process its data)
    traversalOrder.push(currentNode);
    // console.log(`Visiting node: ${currentNode}`); // For demonstration

    // Get all neighbors of the current node
    const neighbors = graph.get(currentNode) || []; // Use || [] to handle nodes with no neighbors

    // For each neighbor
    for (const neighbor of neighbors) {
      // If the neighbor has not been visited yet
      if (!visited.has(neighbor)) {
        // Mark it as visited and add it to the queue
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return traversalOrder;
}
// --- Create a sample graph ---
const myGraph: AdjacencyList<string> = new Map();

myGraph.set('A', ['B', 'C']);
myGraph.set('B', ['A', 'D', 'E']);
myGraph.set('C', ['A', 'F']);
myGraph.set('D', ['B']);
myGraph.set('E', ['B', 'F']);
myGraph.set('F', ['C', 'E']);
myGraph.set('G', []); // A disconnected node

console.log("Graph Structure:");
myGraph.forEach((neighbors, node) => {
  console.log(`${node} -> [${neighbors.join(', ')}]`);
});

// --- Run BFS ---
const startNode = 'A';
const visitedOrder = bfs(myGraph, startNode);
console.log(`\nBFS Traversal Order from '${startNode}':`, visitedOrder.join(' -> '));
// Expected output: A -> B -> C -> D -> E -> F (order within levels can vary)

const startNodeB = 'B';
const visitedOrderB = bfs(myGraph, startNodeB);
console.log(`BFS Traversal Order from '${startNodeB}':`, visitedOrderB.join(' -> '));
// Expected output: B -> A -> D -> E -> C -> F

const startNodeG = 'G';
const visitedOrderG = bfs(myGraph, startNodeG);
console.log(`BFS Traversal Order from '${startNodeG}':`, visitedOrderG.join(' -> '));
// Expected output: G
/**
 * Performs BFS to find the shortest path from a start node to a target node.
 *
 * @param graph The graph.
 * @param startNode The starting node.
 * @param targetNode The node to find a path to.
 * @returns An array representing the shortest path, or null if no path exists.
 */
function bfsShortestPath<T extends NodeIdentifier>(
  graph: AdjacencyList<T>,
  startNode: T,
  targetNode: T
): T[] | null {
  const queue: T[] = [];
  const visited = new Set<T>();
  // Map to store parent pointers for path reconstruction
  const parents = new Map<T, T | null>(); // Node -> ParentNode

  queue.push(startNode);
  visited.add(startNode);
  parents.set(startNode, null); // Start node has no parent

  while (queue.length > 0) {
    const currentNode = queue.shift()!;

    if (currentNode === targetNode) {
      // Target found, reconstruct path
      const path: T[] = [];
      let pathNode: T | null = targetNode;
      while (pathNode !== null) {
        path.unshift(pathNode); // Add to the beginning to get correct order
        pathNode = parents.get(pathNode) || null; // Move to parent
      }
      return path;
    }

    const neighbors = graph.get(currentNode) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        parents.set(neighbor, currentNode); // Store parent
      }
    }
  }

  return null; // No path found
}

// --- Test Shortest Path ---
console.log('\n--- Shortest Path Examples ---');
const pathABF = bfsShortestPath(myGraph, 'A', 'F');
console.log(`Shortest path from 'A' to 'F':`, pathABF ? pathABF.join(' -> ') : 'No path'); // Expected: A -> C -> F or A -> B -> E -> F

const pathAG = bfsShortestPath(myGraph, 'A', 'G');
console.log(`Shortest path from 'A' to 'G':`, pathAG ? pathAG.join(' -> ') : 'No path'); // Expected: No path

const pathBA = bfsShortestPath(myGraph, 'B', 'A');
console.log(`Shortest path from 'B' to 'A':`, pathBA ? pathBA.join(' -> ') : 'No path'); // Expected: B -> A
/**
 * Performs BFS on all connected components of a graph.
 *
 * @param graph The graph.
 * @returns An array of arrays, where each inner array is a traversal order for a connected component.
 */
function bfsAllComponents<T extends NodeIdentifier>(
  graph: AdjacencyList<T>
): T[][] {
  const allTraversalOrders: T[][] = [];
  const visited = new Set<T>();

  // Iterate over all nodes in the graph
  for (const startNode of graph.keys()) {
    if (!visited.has(startNode)) {
      // If the node hasn't been visited, start a new BFS from it
      const componentTraversal: T[] = [];
      const queue: T[] = [];

      queue.push(startNode);
      visited.add(startNode);
      componentTraversal.push(startNode);

      while (queue.length > 0) {
        const currentNode = queue.shift()!;
        const neighbors = graph.get(currentNode) || [];

        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
            componentTraversal.push(neighbor);
          }
        }
      }
      allTraversalOrders.push(componentTraversal);
    }
  }
  return allTraversalOrders;
}

// --- Test Disconnected Components ---
console.log('\n--- Disconnected Components Example ---');
const allComponents = bfsAllComponents(myGraph);
console.log('All connected components traversed:', allComponents.map(c => c.join(' -> ')));
// Expected: [ [ 'A', 'B', 'C', 'D', 'E', 'F' ], [ 'G' ] ] (order within components can vary)
