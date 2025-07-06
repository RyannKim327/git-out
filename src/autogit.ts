interface Node {
  id: string; // or any other data you want to store
  neighbors: Node[];
}

function breadthLimitedSearch(
  startNode: Node,
  goalNodeId: string,
  maxDepth: number
): Node | null {
  // Queue will store tuples of [node, currentDepth]
  const queue: Array<[Node, number]> = [[startNode, 0]];
  const visited = new Set<string>();
  visited.add(startNode.id);

  while (queue.length > 0) {
    const [currentNode, depth] = queue.shift()!;

    // Check if we've reached the goal
    if (currentNode.id === goalNodeId) {
      return currentNode;
    }

    // If we're within the depth limit, explore neighbors
    if (depth < maxDepth) {
      for (const neighbor of currentNode.neighbors) {
        if (!visited.has(neighbor.id)) {
          visited.add(neighbor.id);
          queue.push([neighbor, depth + 1]);
        }
      }
    }
  }

  // Goal not found within depth limit
  return null;
}
// Example nodes
const nodeA: Node = { id: "A", neighbors: [] };
const nodeB: Node = { id: "B", neighbors: [] };
const nodeC: Node = { id: "C", neighbors: [] };
const nodeD: Node = { id: "D", neighbors: [] };

// Creating a simple graph
nodeA.neighbors.push(nodeB, nodeC);
nodeB.neighbors.push(nodeD);

// Search for node D starting from node A with depth limit 2
const result = breadthLimitedSearch(nodeA, "D", 2);

if (result) {
  console.log(`Found node: ${result.id}`);
} else {
  console.log("Node not found within depth limit");
}
