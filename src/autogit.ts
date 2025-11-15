// 1. Define Graph Structures

/**
 * Represents an edge in the graph.
 */
interface Edge {
    to: string;
    weight: number;
}

/**
 * Represents the graph using an adjacency list.
 * Key: Node name (string)
 * Value: Array of edges originating from that node.
 */
type Graph = Map<string, Edge[]>;

// 2. Implement a Priority Queue (Min-Heap)

/**
 * Represents an item in the priority queue.
 * [nodeName, distance]
 */
type PriorityQueueItem = [string, number];

/**
 * A basic Min-Priority Queue implementation using an array to simulate a binary heap.
 * It stores items as [nodeName, distance] and prioritizes by the smallest distance.
 * This specific implementation uses "lazy deletion" for Dijkstra:
 * when a node's distance is updated, a new entry is simply added to the queue.
 * The Dijkstra algorithm will then check if a dequeued item is "stale"
 * (i.e., a shorter path has already been found for that node).
 */
class PriorityQueue {
    private heap: PriorityQueueItem[] = [];

    /**
     * Returns the number of items in the queue.
     */
    size(): number {
        return this.heap.length;
    }

    /**
     * Checks if the queue is empty.
     */
    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    /**
     * Adds an item to the priority queue.
     * @param node The name of the node.
     * @param priority The priority (distance) of the node.
     */
    enqueue(node: string, priority: number): void {
        this.heap.push([node, priority]);
        this.bubbleUp(this.heap.length - 1);
    }

    /**
     * Removes and returns the item with the highest priority (lowest distance).
     * @returns The item with the highest priority, or undefined if the queue is empty.
     */
    dequeue(): PriorityQueueItem | undefined {
        if (this.isEmpty()) return undefined;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop()!; // Move last element to root
        this.sinkDown(0);
        return min;
    }

    /**
     * Maintains the heap property by moving an element up the heap.
     * @param index The index of the element to bubble up.
     */
    private bubbleUp(index: number): void {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index][1] < this.heap[parentIndex][1]) {
                this.swap(index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    /**
     * Maintains the heap property by moving an element down the heap.
     * @param index The index of the element to sink down.
     */
    private sinkDown(index: number): void {
        const length = this.heap.length;
        const element = this.heap[index];

        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let leftChildPriority = Infinity;
            let rightChildPriority = Infinity;
            let swapIndex: number | null = null;

            if (leftChildIndex < length) {
                leftChildPriority = this.heap[leftChildIndex][1];
                if (leftChildPriority < element[1]) {
                    swapIndex = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                rightChildPriority = this.heap[rightChildIndex][1];
                if (
                    (swapIndex === null && rightChildPriority < element[1]) ||
                    (swapIndex !== null && rightChildPriority < leftChildPriority)
                ) {
                    swapIndex = rightChildIndex;
                }
            }

            if (swapIndex === null) break;

            this.swap(index, swapIndex);
            index = swapIndex;
        }
    }

    /**
     * Swaps two elements in the heap array.
     * @param i Index of the first element.
     * @param j Index of the second element.
     */
    private swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
}

// 3. Implement Dijkstra's Algorithm

/**
 * Runs Dijkstra's algorithm on a graph to find the shortest paths from a start node.
 * @param graph The graph represented as an adjacency list.
 * @param startNode The starting node for the algorithm.
 * @returns An object containing:
 *          - distances: A Map where keys are node names and values are their shortest distances from the start node.
 *          - paths: A Map where keys are node names and values are the preceding node in the shortest path,
 *                   or null for the start node.
 */
function dijkstra(graph: Graph, startNode: string): { distances: Map<string, number>, paths: Map<string, string | null> } {
    const distances = new Map<string, number>();
    const paths = new Map<string, string | null>();
    const pq = new PriorityQueue();

    // Initialize distances: all to Infinity, startNode to 0
    // And add all nodes to paths map with null initially
    for (const node of graph.keys()) {
        distances.set(node, Infinity);
        paths.set(node, null);
    }
    // Also consider nodes that are only destinations, not sources
    graph.forEach(edges => {
        edges.forEach(edge => {
            if (!distances.has(edge.to)) {
                distances.set(edge.to, Infinity);
                paths.set(edge.to, null);
            }
        });
    });


    distances.set(startNode, 0);
    pq.enqueue(startNode, 0);

    while (!pq.isEmpty()) {
        const [currentNode, currentDistance] = pq.dequeue()!;

        // Lazy deletion: If we've already found a shorter path to this node, skip this stale entry.
        if (currentDistance > distances.get(currentNode)!) {
            continue;
        }

        // Explore neighbors
        const neighbors = graph.get(currentNode) || []; // Get neighbors, or empty array if node has no outgoing edges
        for (const edge of neighbors) {
            const neighbor = edge.to;
            const weight = edge.weight;
            const distanceThroughCurrent = currentDistance + weight;

            // Relaxation step: If a shorter path to 'neighbor' is found through 'currentNode'
            if (distanceThroughCurrent < distances.get(neighbor)!) {
                distances.set(neighbor, distanceThroughCurrent);
                paths.set(neighbor, currentNode);
                pq.enqueue(neighbor, distanceThroughCurrent);
            }
        }
    }

    return { distances, paths };
}

// 4. Helper to Reconstruct Path

/**
 * Reconstructs the shortest path from the start node to the end node.
 * @param startNode The original start node of Dijkstra's algorithm.
 * @param endNode The target node to reconstruct the path to.
 * @param paths The map of preceding nodes returned by Dijkstra's.
 * @returns An array of node names representing the path, or null if no path exists.
 */
function reconstructPath(startNode: string, endNode: string, paths: Map<string, string | null>): string[] | null {
    const path: string[] = [];
    let currentNode: string | null = endNode;

    // Check if the endNode was ever reached
    if (paths.get(endNode) === null && endNode !== startNode) {
        return null; // No path exists
    }

    while (currentNode !== null) {
        path.unshift(currentNode); // Add to the beginning of the array
        if (currentNode === startNode) {
            break; // Reached the start
        }
        currentNode = paths.get(currentNode) || null; // Move to the predecessor
        if (currentNode === undefined) { // This handles cases where a node is in paths but not reachable from start
             return null;
        }
    }

    // If the path doesn't start with the startNode, it means endNode was unreachable
    return path[0] === startNode ? path : null;
}


// 5. Example Usage

function main() {
    // Define a sample graph
    const graph: Graph = new Map();
    graph.set('A', [{ to: 'B', weight: 4 }, { to: 'C', weight: 2 }]);
    graph.set('B', [{ to: 'E', weight: 3 }]);
    graph.set('C', [{ to: 'D', weight: 2 }, { to: 'F', weight: 4 }]);
    graph.set('D', [{ to: 'E', weight: 3 }]);
    graph.set('E', [{ to: 'G', weight: 1 }]);
    graph.set('F', [{ to: 'D', weight: 1 }, { to: 'G', weight: 2 }]);
    graph.set('G', []); // Node G has no outgoing edges
    graph.set('H', [{ to: 'I', weight: 10 }]); // Disconnected part of the graph
    graph.set('I', []);

    const startNode = 'A';
    console.log(`Running Dijkstra from node: ${startNode}`);

    const { distances, paths } = dijkstra(graph, startNode);

    console.log('\nShortest Distances from ' + startNode + ':');
    distances.forEach((dist, node) => {
        const displayDist = dist === Infinity ? 'Infinity' : dist;
        console.log(`  ${node}: ${displayDist}`);
    });

    console.log('\nShortest Paths (Predecessors) from ' + startNode + ':');
    paths.forEach((prevNode, node) => {
        console.log(`  ${node}: ${prevNode === null ? 'Start/Unreachable' : prevNode}`);
    });

    // Reconstruct specific paths
    console.log('\nReconstructed Paths:');
    const target1 = 'G';
    const path1 = reconstructPath(startNode, target1, paths);
    console.log(`  Path from ${startNode} to ${target1}: ${path1 ? path1.join(' -> ') : 'No path'}`);
    // Expected: A -> C -> D -> E -> G (Total weight: 2+2+3+1=8)
    // A -> B -> E -> G (Total weight: 4+3+1=8)
    // A -> C -> F -> G (Total weight: 2+4+2=8)
    // The specific path depends on tie-breaking in the PQ, but the distance should be 8.

    const target2 = 'E';
    const path2 = reconstructPath(startNode, target2, paths);
    console.log(`  Path from ${startNode} to ${target2}: ${path2 ? path2.join(' -> ') : 'No path'}`);
    // Expected: A -> C -> D -> E (2+2+3=7) or A -> B -> E (4+3=7)

    const target3 = 'A';
    const path3 = reconstructPath(startNode, target3, paths);
    console.log(`  Path from ${startNode} to ${target3}: ${path3 ? path3.join(' -> ') : 'No path'}`);
    // Expected: A

    const target4 = 'H'; // Unreachable from 'A'
    const path4 = reconstructPath(startNode, target4, paths);
    console.log(`  Path from ${startNode} to ${target4}: ${path4 ? path4.join(' -> ') : 'No path'}`);
    // Expected: No path

    const target5 = 'X'; // Non-existent node
    const path5 = reconstructPath(startNode, target5, paths);
    console.log(`  Path from ${startNode} to ${target5}: ${path5 ? path5.join(' -> ') : 'No path'}`);
    // Expected: No path
}

main();
