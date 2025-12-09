// Represents an edge in the graph
interface Edge {
    to: string;       // The node the edge points to
    weight: number;   // The weight (cost) of traversing this edge
}

// Represents the graph using an adjacency list
interface Graph {
    [node: string]: Edge[]; // A map where keys are node IDs and values are arrays of edges originating from that node
}

// Represents an item in the priority queue
interface PriorityQueueItem {
    node: string;
    distance: number;
}
class MinPriorityQueue {
    private heap: PriorityQueueItem[] = [];

    // Inserts an item into the queue
    insert(item: PriorityQueueItem): void {
        this.heap.push(item);
        this.bubbleUp(this.heap.length - 1);
    }

    // Extracts the item with the smallest distance
    extractMin(): PriorityQueueItem | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const min = this.heap[0];
        this.heap[0] = this.heap.pop()!; // Move the last element to the root
        this.bubbleDown(0);
        return min;
    }

    // Checks if the queue is empty
    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    private bubbleUp(index: number): void {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].distance < this.heap[parentIndex].distance) {
                this.swap(index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    private bubbleDown(index: number): void {
        const lastIndex = this.heap.length - 1;
        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let smallestIndex = index;

            if (leftChildIndex <= lastIndex && this.heap[leftChildIndex].distance < this.heap[smallestIndex].distance) {
                smallestIndex = leftChildIndex;
            }

            if (rightChildIndex <= lastIndex && this.heap[rightChildIndex].distance < this.heap[smallestIndex].distance) {
                smallestIndex = rightChildIndex;
            }

            if (smallestIndex !== index) {
                this.swap(index, smallestIndex);
                index = smallestIndex;
            } else {
                break;
            }
        }
    }

    private swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
}
function dijkstra(
    graph: Graph,
    startNode: string
): { distances: Map<string, number>, predecessors: Map<string, string | null> } {

    const distances = new Map<string, number>();
    const predecessors = new Map<string, string | null>();
    const pq = new MinPriorityQueue();

    // Initialize distances: all nodes to Infinity, startNode to 0
    // And add all nodes to the predecessors map, initial null
    for (const node in graph) {
        distances.set(node, Infinity);
        predecessors.set(node, null);
        // Also ensure nodes without outgoing edges are included
        for (const edge of graph[node]) {
             if (!distances.has(edge.to)) {
                 distances.set(edge.to, Infinity);
                 predecessors.set(edge.to, null);
             }
        }
    }
    distances.set(startNode, 0);
    pq.insert({ node: startNode, distance: 0 });

    while (!pq.isEmpty()) {
        const { node: currentNode, distance: currentDistance } = pq.extractMin()!;

        // If we've already found a shorter path to currentNode, skip this one
        if (currentDistance > distances.get(currentNode)!) {
            continue;
        }

        // Explore neighbors
        const neighbors = graph[currentNode] || []; // Handle nodes with no outgoing edges
        for (const edge of neighbors) {
            const neighbor = edge.to;
            const weight = edge.weight;
            const newPathDistance = currentDistance + weight;

            // Relaxation step: if a shorter path to neighbor is found
            if (newPathDistance < distances.get(neighbor)!) {
                distances.set(neighbor, newPathDistance);
                predecessors.set(neighbor, currentNode);
                pq.insert({ node: neighbor, distance: newPathDistance });
            }
        }
    }

    return { distances, predecessors };
}
function reconstructPath(
    predecessors: Map<string, string | null>,
    startNode: string,
    endNode: string
): string[] | null {
    const path: string[] = [];
    let currentNode: string | null = endNode;

    // Check if endNode exists in predecessors and if a path was found
    if (!predecessors.has(endNode) || (endNode !== startNode && predecessors.get(endNode) === null)) {
        return null; // No path found
    }

    while (currentNode !== null) {
        path.unshift(currentNode); // Add to the beginning of the path
        if (currentNode === startNode) break; // Reached the start node
        currentNode = predecessors.get(currentNode)!; // Move to the predecessor
    }

    // If the path starts with the startNode, it's valid. Otherwise, no path.
    if (path.length > 0 && path[0] === startNode) {
        return path;
    } else {
        return null;
    }
}
// Sample graph
const myGraph: Graph = {
    'A': [{ to: 'B', weight: 4 }, { to: 'C', weight: 2 }],
    'B': [{ to: 'E', weight: 3 }],
    'C': [{ to: 'B', weight: 1 }, { to: 'D', weight: 4 }],
    'D': [{ to: 'E', weight: 1 }],
    'E': [] // Node E has no outgoing edges
};

const startNode = 'A';
const endNode = 'E';

console.log("Running Dijkstra's from", startNode);
const { distances, predecessors } = dijkstra(myGraph, startNode);

console.log("\nShortest Distances:");
for (const [node, distance] of distances.entries()) {
    console.log(`  ${node}: ${distance === Infinity ? 'Infinity' : distance}`);
}

console.log("\nPredecessors:");
for (const [node, predecessor] of predecessors.entries()) {
    console.log(`  ${node}: ${predecessor === null ? 'None' : predecessor}`);
}

const path = reconstructPath(predecessors, startNode, endNode);

console.log(`\nShortest path from ${startNode} to ${endNode}:`);
if (path) {
    console.log(`  Path: ${path.join(' -> ')}`);
    console.log(`  Total distance: ${distances.get(endNode)}`);
} else {
    console.log(`  No path found from ${startNode} to ${endNode}.`);
}

// Example 2: No path scenario
const noPathGraph: Graph = {
    'X': [{to: 'Y', weight: 1}],
    'Y': [],
    'Z': [{to: 'A', weight: 1}]
};
const startX = 'X';
const endZ = 'Z';
const { distances: dist2, predecessors: pred2 } = dijkstra(noPathGraph, startX);
const path2 = reconstructPath(pred2, startX, endZ);
console.log(`\nShortest path from ${startX} to ${endZ}:`);
if (path2) {
    console.log(`  Path: ${path2.join(' -> ')}`);
    console.log(`  Total distance: ${dist2.get(endZ)}`);
} else {
    console.log(`  No path found from ${startX} to ${endZ}.`);
}
