interface Graph {
  [node: string]: string[];
}

function bidirectionalSearch(
  graph: Graph,
  start: string,
  goal: string
): string[] | null {
  if (start === goal) return [start];

  // Initialize frontiers for forward and backward searches
  const forwardQueue: string[] = [start];
  const backwardQueue: string[] = [goal];

  // Visited nodes and parent maps for path reconstruction
  const visitedForward: Map<string, string | null> = new Map();
  const visitedBackward: Map<string, string | null> = new Map();

  visitedForward.set(start, null);
  visitedBackward.set(goal, null);

  while (forwardQueue.length > 0 && backwardQueue.length > 0) {
    // Expand forward frontier
    const currentForward = forwardQueue.shift()!;
    for (const neighbor of graph[currentForward]) {
      if (!visitedForward.has(neighbor)) {
        visitedForward.set(neighbor, currentForward);
        forwardQueue.push(neighbor);

        // Check if we have met the backward search
        if (visitedBackward.has(neighbor)) {
          return reconstructPath(
            neighbor,
            visitedForward,
            visitedBackward
          );
        }
      }
    }

    // Expand backward frontier
    const currentBackward = backwardQueue.shift()!;
    for (const neighbor of graph[currentBackward]) {
      if (!visitedBackward.has(neighbor)) {
        visitedBackward.set(neighbor, currentBackward);
        backwardQueue.push(neighbor);

        // Check if we have met the forward search
        if (visitedForward.has(neighbor)) {
          return reconstructPath(
            neighbor,
            visitedForward,
            visitedBackward
          );
        }
      }
    }
  }

  // No path found
  return null;
}

function reconstructPath(
  meetingNode: string,
  visitedForward: Map<string, string | null>,
  visitedBackward: Map<string, string | null>
): string[] {
  const pathForward: string[] = [];
  let node: string | null = meetingNode;
  // Reconstruct path from start to meeting node
  while (node !== null) {
    pathForward.push(node);
    node = visitedForward.get(node)!;
  }
  pathForward.reverse();

  const pathBackward: string[] = [];
  node = visitedBackward.get(meetingNode)!;
  // Reconstruct path from goal to meeting node
  while (node !== null) {
    pathBackward.push(node);
    node = visitedBackward.get(node)!;
  }

  // Combine the two paths
  // Remove the duplicate meeting node from the backward path
  pathBackward.shift();

  return [...pathForward, ...pathBackward];
}

// Example usage:
const graph: Graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E", "G"],
  G: ["F"]
};

const startNode = "A";
const goalNode = "G";

const path = bidirectionalSearch(graph, startNode, goalNode);
console.log(path); // Output: [ 'A', 'C', 'F', 'G' ]
