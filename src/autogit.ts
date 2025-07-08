// Define a Node interface
interface Node {
  value: any;
  neighbors: Node[]; // Array of neighbors
}

// Function to perform breadth-limited search
function breadthLimitedSearch(root: Node, goal: any, maxDepth: number): Node | null {
  if (maxDepth < 0) {
    throw new Error("maxDepth must be 0 or greater");
  }

  // Queue for BFS
  let queue: { node: Node; depth: number }[] = [{ node: root, depth: 0 }];
  const visited = new Set<Node>(); // Keep track of visited nodes

  while (queue.length > 0) {
    const { node, depth } = queue.shift()!;

    // Check if the current node is the goal
    if (node.value === goal) {
      return node; // Return the found node
    }

    // If we haven't reached the maximum depth, explore neighbors
    if (depth < maxDepth) {
      for (const neighbor of node.neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push({ node: neighbor, depth: depth + 1 });
        }
      }
    }
  }

  return null; // Return null if the goal was not found
}

// Example usage:
const nodeA: Node = { value: 'A', neighbors: [] };
const nodeB: Node = { value: 'B', neighbors: [] };
const nodeC: Node = { value: 'C', neighbors: [] };
const nodeD: Node = { value: 'D', neighbors: [] };

// Setting up connections/edges
nodeA.neighbors.push(nodeB, nodeC);
nodeB.neighbors.push(nodeD);
nodeC.neighbors.push(nodeD);

// Searching for 'D' with a max depth of 2
const result = breadthLimitedSearch(nodeA, 'D', 2);
console.log(result ? result.value : 'Goal not found'); // Outputs: 'Goal not found'
