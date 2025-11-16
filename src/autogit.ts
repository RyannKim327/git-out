/**
 * Represents a graph using an adjacency list.
 * Keys are nodes, values are arrays of neighboring nodes.
 */
type Graph<T> = Map<T, T[]>;

/**
 * Reconstructs the path from a parent map.
 * Given a parent map (child -> parent), a start node, and an end node,
 * it builds the path from start to end.
 *
 * @param parents The parent map (child -> parent).
 * @param startNode The actual start node of the segment being reconstructed.
 * @param endNode The actual end node of the segment being reconstructed.
 * @returns An array representing the path from startNode to endNode.
 */
function reconstructPathSegment<T>(
  parents: Map<T, T | undefined>,
  startNode: T, // Note: This is the 'source' for the path segment
  endNode: T    // Note: This is the 'destination' for the path segment
): T[] {
  const path: T[] = [];
  let current: T | undefined = endNode;

  while (current !== undefined) {
    path.push(current);
    // Move to the parent
    current = parents.get(current);
  }
  // The path is currently from end to start, so reverse it
  return path.reverse();
}

/**
 * Implements a bi-directional search algorithm to find the shortest path
 * between a start node and an end node in an unweighted graph.
 *
 * @param graph The graph represented as an adjacency list.
 * @param start The starting node.
 * @param end The target node.
 * @returns An array of nodes representing the shortest path, or null if no path exists.
 */
function bidirectionalSearch<T>(graph: Graph<T>, start: T, end: T): T[] | null {
  // Handle edge case: start and end are the same
  if (start === end) {
    return [start];
  }

  // --- Initialize Forward Search (from start) ---
  const queueA: T[] = [start];
  const visitedA: Set<T> = new Set();
  const parentsA: Map<T, T | undefined> = new Map(); // child -> parent
  visitedA.add(start);
  parentsA.set(start, undefined); // Start node has no parent

  // --- Initialize Backward Search (from end) ---
  const queueB: T[] = [end];
  const visitedB: Set<T> = new Set();
  const parentsB: Map<T, T | undefined> = new Map(); // child -> parent
  visitedB.add(end);
  parentsB.set(end, undefined); // End node has no parent

  let meetingNode: T | null = null;

  // Main loop: continue as long as both queues have elements
  while (queueA.length > 0 && queueB.length > 0) {

    // --- Expand from the 'start' side (queueA) ---
    const currentNodeA = queueA.shift()!; // Using ! because we checked length

    // Check if the current node from search A has been visited by search B
    if (visitedB.has(currentNodeA)) {
      meetingNode = currentNodeA;
      break; // Path found!
    }

    const neighborsA = graph.get(currentNodeA) || [];
    for (const neighbor of neighborsA) {
      if (!visitedA.has(neighbor)) {
        visitedA.add(neighbor);
        parentsA.set(neighbor, currentNodeA);
        queueA.push(neighbor);
      }
    }

    // --- Expand from the 'end' side (queueB) ---
    const currentNodeB = queueB.shift()!; // Using ! because we checked length

    // Check if the current node from search B has been visited by search A
    if (visitedA.has(currentNodeB)) {
      meetingNode = currentNodeB;
      break; // Path found!
    }

    const neighborsB = graph.get(currentNodeB) || [];
    for (const neighbor of neighborsB) {
      if (!visitedB.has(neighbor)) {
        visitedB.add(neighbor);
        parentsB.set(neighbor, currentNodeB);
        queueB.push(neighbor);
      }
    }
  }

  // If no meeting node was found, no path exists
  if (meetingNode === null) {
    return null;
  }

  // --- Path Reconstruction ---
  // The path from 'start' to 'meetingNode' using parentsA
  const pathToMeetingFromStart = reconstructPathSegment(parentsA, start, meetingNode);

  // The path from 'end' to 'meetingNode' using parentsB
  // Note: parentsB stores (child -> parent) for the backward search.
  // When we reconstruct, we're essentially going from meetingNode BACK to end.
  const pathToMeetingFromEnd = reconstructPathSegment(parentsB, end, meetingNode);
  // This path is currently [end, ..., meetingNode]. We need to reverse it to [meetingNode, ..., end].
  const pathFromMeetingToEnd = pathToMeetingFromEnd.reverse();

  // Combine the two paths.
  // pathToMeetingFromStart is [start, ..., meetingNode]
  // pathFromMeetingToEnd is [meetingNode, ..., end]
  // We need to remove the duplicate 'meetingNode' from the second path's start.
  return pathToMeetingFromStart.concat(pathFromMeetingToEnd.slice(1));
}


// --- Example Usage ---

// Create a graph (e.g., representing cities or web pages)
const cityGraph: Graph<string> = new Map();

cityGraph.set("A", ["B", "D"]);
cityGraph.set("B", ["A", "C", "E"]);
cityGraph.set("C", ["B", "F"]);
cityGraph.set("D", ["A", "E", "G"]);
cityGraph.set("E", ["B", "D", "F", "H"]);
cityGraph.set("F", ["C", "E", "I"]);
cityGraph.set("G", ["D", "H"]);
cityGraph.set("H", ["E", "G", "I"]);
cityGraph.set("I", ["F", "H"]);

console.log("Graph:");
cityGraph.forEach((neighbors, node) => console.log(`${node}: ${neighbors.join(", ")}`));
console.log("\n--- Bi-directional Search ---");

// Test Case 1: Short path
const path1 = bidirectionalSearch(cityGraph, "A", "I");
console.log("Path from A to I:", path1 ? path1.join(" -> ") : "No path found"); // Expected: A -> D -> E -> H -> I (or similar)

// Test Case 2: Direct connection
const path2 = bidirectionalSearch(cityGraph, "A", "B");
console.log("Path from A to B:", path2 ? path2.join(" -> ") : "No path found"); // Expected: A -> B

// Test Case 3: Start === End
const path3 = bidirectionalSearch(cityGraph, "C", "C");
console.log("Path from C to C:", path3 ? path3.join(" -> ") : "No path found"); // Expected: C

// Test Case 4: No path (if graph were disconnected, this would be null)
const disconnectedGraph: Graph<string> = new Map();
disconnectedGraph.set("X", ["Y"]);
disconnectedGraph.set("Y", ["X"]);
disconnectedGraph.set("Z", ["W"]);
disconnectedGraph.set("W", ["Z"]);

const path4 = bidirectionalSearch(disconnectedGraph, "X", "Z");
console.log("Path from X to Z (disconnected):", path4 ? path4.join(" -> ") : "No path found"); // Expected: No path found
