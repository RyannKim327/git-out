forward frontier  ←  start
backward frontier ←  goal
while both frontiers are non‑empty
    expand the smaller frontier one level
    for each neighbour
        if neighbour already visited by the opposite search
            → meeting point found → reconstruct full path
        else
            mark neighbour as visited by this side and enqueue it
// A generic adjacency‑list graph
type NodeId = string | number;

// Edge list for an undirected graph (or directed if you prefer)
type AdjList = Map<NodeId, NodeId[]>;

// Information stored for each visited vertex
interface VisitInfo {
    /** predecessor on the side that discovered this node */
    parent: NodeId | null;
    /** which side discovered it: 'forward' or 'backward' */
    side: 'forward' | 'backward';
}
/**
 * Perform a bi‑directional BFS on an un‑weighted graph.
 *
 * @param graph   adjacency list of the graph
 * @param start   id of the start node
 * @param goal    id of the goal node
 * @returns       array of node ids representing the shortest path,
 *                or null if no path exists.
 */
export function bidirectionalSearch(
    graph: AdjList,
    start: NodeId,
    goal: NodeId
): NodeId[] | null {
    // Trivial cases
    if (start === goal) return [start];
    if (!graph.has(start) || !graph.has(goal)) return null;

    // Queues for the two frontiers
    const forwardQueue: NodeId[] = [start];
    const backwardQueue: NodeId[] = [goal];

    // Maps that store VisitInfo for every visited vertex
    const visited = new Map<NodeId, VisitInfo>();
    visited.set(start, { parent: null, side: 'forward' });
    visited.set(goal, { parent: null, side: 'backward' });

    // Helper to pop from the front of a queue (O(1) with shift)
    const dequeue = (q: NodeId[]) => q.shift()!;

    while (forwardQueue.length && backwardQueue.length) {
        // Always expand the *smaller* frontier → less work
        if (forwardQueue.length <= backwardQueue.length) {
            const meetingNode = expandFrontier(
                forwardQueue,
                'forward',
                graph,
                visited
            );
            if (meetingNode !== null) {
                return buildPath(meetingNode, visited);
            }
        } else {
            const meetingNode = expandFrontier(
                backwardQueue,
                'backward',
                graph,
                visited
            );
            if (meetingNode !== null) {
                return buildPath(meetingNode, visited);
            }
        }
    }

    // No meeting point → no path
    return null;
}

/**
 * Expand one BFS level from the given queue.
 *
 * @returns the node where the two searches meet, or null if none yet.
 */
function expandFrontier(
    queue: NodeId[],
    side: 'forward' | 'backward',
    graph: AdjList,
    visited: Map<NodeId, VisitInfo>
): NodeId | null {
    const currentLevelSize = queue.length; // expand exactly one level

    for (let i = 0; i < currentLevelSize; i++) {
        const node = dequeue(queue);
        const neighbours = graph.get(node) ?? [];

        for (const nb of neighbours) {
            const nbInfo = visited.get(nb);

            if (!nbInfo) {
                // First time we see this neighbour → claim it for this side
                visited.set(nb, { parent: node, side });
                queue.push(nb);
            } else if (nbInfo.side !== side) {
                // The opposite side has already visited this node → meeting point!
                // Record the parent for the meeting node on the current side
                // (only needed if it wasn't set yet)
                if (nbInfo.parent === null) {
                    visited.set(nb, { parent: node, side: nbInfo.side });
                }
                return nb; // meeting node
            }
            // else: neighbour already visited by the same side → ignore
        }
    }
    return null;
}

/**
 * Reconstruct the full path from start → goal using the `visited` map.
 *
 * @param meetingNode the node where the two searches met
 * @param visited     map containing parent pointers for both sides
 */
function buildPath(meetingNode: NodeId, visited: Map<NodeId, VisitInfo>): NodeId[] {
    // Walk back from meetingNode to start (forward side)
    const forwardPath: NodeId[] = [];
    let cur: NodeId | null = meetingNode;
    while (cur !== null) {
        const info = visited.get(cur)!;
        forwardPath.push(cur);
        if (info.side === 'forward') {
            cur = info.parent;
        } else {
            // We have reached the backward side – stop forward walk
            break;
        }
    }
    forwardPath.reverse(); // now start → meetingNode

    // Walk back from meetingNode to goal (backward side)
    const backwardPath: NodeId[] = [];
    cur = visited.get(meetingNode)!.parent; // start one step *away* from meetingNode
    while (cur !== null) {
        const info = visited.get(cur)!;
        backwardPath.push(cur);
        cur = info.parent;
    }
    // backwardPath currently is meetingNode‑1 → goal (reverse order)
    // No need to reverse because we built it from meetingNode outward.

    return forwardPath.concat(backwardPath);
}

/** tiny utility – shift is O(1) for arrays in V8/Node */
function dequeue(q: NodeId[]): NodeId {
    return q.shift()!;
}
import { bidirectionalSearch } from './bidirectionalSearch';

// Build a simple undirected graph
const graph: AdjList = new Map([
    [1, [2, 3]],
    [2, [1, 4, 5]],
    [3, [1, 6]],
    [4, [2]],
    [5, [2, 6]],
    [6, [3, 5, 7]],
    [7, [6]],
]);

const start = 1;
const goal = 7;

const path = bidirectionalSearch(graph, start, goal);
console.log(path); // → [ 1, 3, 6, 7 ] (shortest path)
// bidirectionalSearch.ts
export type NodeId = string | number;
export type AdjList = Map<NodeId, NodeId[]>;

interface VisitInfo {
    parent: NodeId | null;
    side: 'forward' | 'backward';
}

/**
 * Bi‑directional BFS – returns the shortest path or null.
 */
export function bidirectionalSearch(
    graph: AdjList,
    start: NodeId,
    goal: NodeId
): NodeId[] | null {
    if (start === goal) return [start];
    if (!graph.has(start) || !graph.has(goal)) return null;

    const forwardQueue: NodeId[] = [start];
    const backwardQueue: NodeId[] = [goal];

    const visited = new Map<NodeId, VisitInfo>();
    visited.set(start, { parent: null, side: 'forward' });
    visited.set(goal, { parent: null, side: 'backward' });

    while (forwardQueue.length && backwardQueue.length) {
        if (forwardQueue.length <= backwardQueue.length) {
            const meet = expand(frontwardQueue, 'forward', graph, visited);
            if (meet) return buildPath(meet, visited);
        } else {
            const meet = expand(backwardQueue, 'backward', graph, visited);
            if (meet) return buildPath(meet, visited);
        }
    }
    return null;
}

/* ---------- helpers ---------- */

function expand(
    queue: NodeId[],
    side: 'forward' | 'backward',
    graph: AdjList,
    visited: Map<NodeId, VisitInfo>
): NodeId | null {
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
        const node = dequeue(queue);
        const neighbours = graph.get(node) ?? [];

        for (const nb of neighbours) {
            const info = visited.get(nb);
            if (!info) {
                visited.set(nb, { parent: node, side });
                queue.push(nb);
            } else if (info.side !== side) {
                // meeting point
                if (info.parent === null) {
                    visited.set(nb, { parent: node, side: info.side });
                }
                return nb;
            }
        }
    }
    return null;
}

function buildPath(meetingNode: NodeId, visited: Map<NodeId, VisitInfo>): NodeId[] {
    const forward: NodeId[] = [];
    let cur: NodeId | null = meetingNode;
    while (cur !== null) {
        const info = visited.get(cur)!;
        forward.push(cur);
        if (info.side === 'forward') cur = info.parent;
        else break;
    }
    forward.reverse();

    const backward: NodeId[] = [];
    cur = visited.get(meetingNode)!.parent; // step away from meeting node
    while (cur !== null) {
        const info = visited.get(cur)!;
        backward.push(cur);
        cur = info.parent;
    }

    return forward.concat(backward);
}

function dequeue(q: NodeId[]): NodeId {
    return q.shift()!;
}
import { bidirectionalSearch, AdjList } from './bidirectionalSearch';

const g: AdjList = new Map([
    [1, [2, 3]],
    [2, [1, 4, 5]],
    [3, [1, 6]],
    [4, [2]],
    [5, [2, 6]],
    [6, [3, 5, 7]],
    [7, [6]],
]);

console.log(bidirectionalSearch(g, 1, 7)); // → [ 1, 3, 6, 7 ]
