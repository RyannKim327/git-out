type Graph = Record<string, string[]>;
type ParentMap = Map<string, string | null>;

enum Direction {
    FORWARD = 'FORWARD',
    BACKWARD = 'BACKWARD',
}

/**
 * Performs a bidirectional BFS to find the shortest path between start and end.
 * @param start - Starting node
 * @param end - Target node
 * @param graph - Graph represented as an adjacency list
 * @returns Shortest path as an array of nodes, or null if no path exists
 */
function bidirectionalBFS(
    start: string,
    end: string,
    graph: Graph
): string[] | null {
    if (start === end) return [start];

    // Initialize queues and visited maps for both directions
    let forwardQueue: string[] = [start];
    let backwardQueue: string[] = [end];
    let forwardVisited = new Map<string, string | null>([[start, null]]);
    let backwardVisited = new Map<string, string | null>([[end, null]]);

    while (forwardQueue.length && backwardQueue.length) {
        // Alternate between forward and backward BFS
        let result = expandLevel(forwardQueue, forwardVisited, backwardVisited, graph, Direction.FORWARD);
        if (result) return result;

        result = expandLevel(backwardQueue, backwardVisited, forwardVisited, graph, Direction.BACKWARD);
        if (result) return result;
    }

    return null; // No path exists
}

/**
 * Expands one level of BFS and checks for collisions with the opposite search
 * @param queue - Current queue (will be modified)
 * @param currentVisited - Visited map for current direction
 * @param oppositeVisited - Visited map for opposite direction
 * @param graph - Graph represented as an adjacency list
 * @param direction - Search direction (FORWARD/BACKWARD)
 * @returns Combined path if collision found, otherwise null
 */
function expandLevel(
    queue: string[],
    currentVisited: ParentMap,
    oppositeVisited: ParentMap,
    graph: Graph,
    direction: Direction
): string[] | null {
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
        const currentNode = queue.shift()!;

        for (const neighbor of graph[currentNode] || []) {
            if (currentVisited.has(neighbor)) continue;

            currentVisited.set(neighbor, currentNode);
            queue.push(neighbor);

            // Check if neighbor has been visited by opposite search
            if (oppositeVisited.has(neighbor)) {
                return constructPath(
                    direction === Direction.FORWARD ? neighbor : oppositeVisited.get(neighbor)!,
                    direction === Direction.FORWARD ? oppositeVisited.get(neighbor)! : neighbor,
                    currentVisited,
                    oppositeVisited,
                    direction
                );
            }
        }
    }
    return null;
}

/**
 * Constructs the full path by merging both search directions
 * @param meetingNodeForward - Meeting node from forward search perspective
 * @param meetingNodeBackward - Meeting node from backward search perspective
 * @param forwardParents - Parent map for forward search
 * @param backwardParents - Parent map for backward search
 * @param direction - Which search discovered the collision
 * @returns Complete path from start to end
 */
function constructPath(
    meetingNodeForward: string,
    meetingNodeBackward: string,
    forwardParents: ParentMap,
    backwardParents: ParentMap,
    direction: Direction
): string[] {
    // Build forward path (start -> meeting point)
    const forwardPath = getPath(meetingNodeForward, forwardParents);

    // Build backward path (end -> meeting point) and reverse it
    const backwardPath = getPath(meetingNodeBackward, backwardParents).reverse();

    // Handle special case when paths meet exactly at one node
    if (meetingNodeForward === meetingNodeBackward) {
        return direction === Direction.FORWARD 
            ? [...forwardPath, ...backwardPath.slice(1)]
            : [...backwardPath, ...forwardPath.slice(1)];
    }

    // Merge paths based on discovery direction
    return direction === Direction.FORWARD
        ? [...forwardPath, ...backwardPath]
        : [...backwardPath, ...forwardPath];
}

/**
 * Builds path using parent pointers
 * @param node - Node to start backtracking from
 * @param parents - Map containing parent-child relationships
 * @returns Path from origin to specified node
 */
function getPath(node: string, parents: ParentMap): string[] {
    const path: string[] = [];
    let current: string | null | undefined = node;
    while (current) {
        path.unshift(current);
        current = parents.get(current);
    }
    return path;
}
// Create a sample graph
const graph: Graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
};

// Find path from 'A' to 'F'
const path = bidirectionalBFS('A', 'F', graph);
console.log(path); // Output: ['A', 'C', 'F'] or ['A', 'B', 'E', 'F']
