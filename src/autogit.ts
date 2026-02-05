// An adjacency map: node ID → list of neighbouring node IDs
type Graph = Record<string, string[]>;

// Keeps track of visited nodes and the node from which we reached them
interface VisitedMap {
  [node: string]: string | null;      // null = source node itself
}
enqueue start into frontierStart
enqueue goal  into frontierGoal
mark start as visitedFromStart (predecessor = null)
mark goal  as visitedFromGoal (predecessor = null)

while both queues not empty:
    # Expand one layer from the start side
    if expand(frontierStart, visitedFromStart, visitedFromGoal): return result

    # Expand one layer from the goal side
    if expand(frontierGoal, visitedFromGoal, visitedFromStart):   return result

return no path
/**
 * Bidirectional BFS.
 *
 * @param graph  adjacency map
 * @param start  ID of start node
 * @param goal   ID of goal node
 * @returns a list of node IDs from start to goal, or null if no path
 */
function bidirectionalBFS(graph: Graph, start: string, goal: string): string[] | null {
  if (start === goal) return [start];

  const visitedStart: VisitedMap = { [start]: null };
  const visitedGoal: VisitedMap   = { [goal] : null };

  const frontierStart: string[] = [start];
  const frontierGoal: string[]  = [goal];

  const expand = (
    frontier: string[],
    visitedThis: VisitedMap,
    visitedOther: VisitedMap
  ): string[] | null => {
    const nextLayer: string[] = [];

    for (const current of frontier) {
      for (const neighbor of graph[current] || []) {
        // Already visited from this side → skip
        if (current in visitedThis && neighbor in visitedThis) continue;

        // New node for this side
        if (!(neighbor in visitedThis)) {
          visitedThis[neighbor] = current;
          nextLayer.push(neighbor);
        }

        // If neighbour is in the opposite frontier → frontiers meet
        if (neighbor in visitedOther) {
          return reconstructPath(
            start,
            goal,
            visitedStart,
            visitedGoal,
            neighbor
          );
        }
      }
    }

    frontier.splice(0, frontier.length, ...nextLayer);
    return null;
  };

  while (frontierStart.length && frontierGoal.length) {
    const resStart = expand(frontierStart, visitedStart, visitedGoal);
    if (resStart) return resStart;

    const resGoal = expand(frontierGoal, visitedGoal, visitedStart);
    if (resGoal) return resGoal;
  }

  return null; // no path found
}

/**
 * Reconstruct the path once the frontiers have met at `meetingNode`.
 */
function reconstructPath(
  start: string,
  goal: string,
  visitedStart: VisitedMap,
  visitedGoal: VisitedMap,
  meetingNode: string
): string[] {
  const partFromStart: string[] = [meetingNode];
  let node = meetingNode;
  while (visitedStart[node]) {
    node = visitedStart[node]!;
    partFromStart.unshift(node);
  }

  const partFromGoal: string[] = [];
  node = meetingNode;
  while (visitedGoal[node]) {
    node = visitedGoal[node]!;
    partFromGoal.push(node);
  }

  // Avoid duplicating the meeting node
  return [...partFromStart, ...partFromGoal];
}
const graph: Graph = {
  a: ['b', 'c'],
  b: ['a', 'd'],
  c: ['a', 'd'],
  d: ['b', 'c', 'e'],
  e: ['d'],
};

console.log(bidirectionalBFS(graph, 'a', 'e')); // ["a", "b", "d", "e"]
