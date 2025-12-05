type Graph = Record<string, Record<string, number>>;
type DistanceMap = Record<string, number>;
type PreviousMap = Record<string, string | null>;

function dijkstra(
    graph: Graph,
    startNode: string,
    endNode?: string
): { distances: DistanceMap; path: string[] } {
    // Initialize distances with Infinity and previous nodes with null
    const distances: DistanceMap = {};
    const previous: PreviousMap = {};
    const priorityQueue: [string, number][] = [];

    // Set initial distances and add nodes to priority queue
    for (const node in graph) {
        distances[node] = node === startNode ? 0 : Infinity;
        previous[node] = null;
        priorityQueue.push([node, distances[node]]);
    }

    while (priorityQueue.length > 0) {
        // Sort queue by distance and get the node with smallest distance
        priorityQueue.sort((a, b) => a[1] - b[1]);
        const [currentNode] = priorityQueue.shift()!;

        // Early exit if we've reached the target node
        if (endNode && currentNode === endNode) break;

        // Explore neighbors
        for (const neighbor in graph[currentNode]) {
            const edgeWeight = graph[currentNode][neighbor];
            const tentativeDistance = distances[currentNode] + edgeWeight;

            if (tentativeDistance < distances[neighbor]) {
                // Update distance and previous node
                distances[neighbor] = tentativeDistance;
                previous[neighbor] = currentNode;
                
                // Add updated node to queue (inefficient but simple)
                priorityQueue.push([neighbor, tentativeDistance]);
            }
        }
    }

    return {
        distances,
        path: endNode ? reconstructPath(previous, endNode) : []
    };
}

function reconstructPath(previous: PreviousMap, endNode: string): string[] {
    const path: string[] = [];
    let currentNode: string | null = endNode;

    if (previous[currentNode] === null && currentNode !== startNode) {
        return []; // No path exists
    }

    while (currentNode !== null) {
        path.unshift(currentNode);
        currentNode = previous[currentNode];
    }

    return path;
}

// Example usage:
const graph: Graph = {
    A: { B: 1, C: 4 },
    B: { A: 1, C: 2, D: 5 },
    C: { A: 4, B: 2, D: 1 },
    D: { B: 5, C: 1 },
};

const startNode = 'A';
const endNode = 'D';

const result = dijkstra(graph, startNode, endNode);
console.log('Shortest distances:', result.distances);
console.log('Shortest path:', result.path);
Shortest distances: { A: 0, B: 1, C: 3, D: 4 }
Shortest path: [ 'A', 'B', 'C', 'D' ]
class PriorityQueue<T> {
    private heap: T[];
    private compare: (a: T, b: T) => number;

    constructor(comparator = (a: T, b: T) => a > b) {
        this.heap = [];
        this.compare = (a, b) => comparator(a, b);
    }

    enqueue(item: T) {
        this.heap.push(item);
        this.bubbleUp();
    }

    dequeue(): T | undefined {
        const first = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0 && last !== undefined) {
            this.heap[0] = last;
            this.sinkDown();
        }
        return first;
    }

    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    private bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.compare(this.heap[parent], this.heap[index])) break;
            [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
            index = parent;
        }
    }

    private sinkDown() {
        let index = 0;
        while (true) {
            const left = 2 * index + 1;
            const right = 2 * index + 2;
            let largest = index;
            
            if (left < this.heap.length && !this.compare(this.heap[largest], this.heap[left])) {
                largest = left;
            }
            
            if (right < this.heap.length && !this.compare(this.heap[largest], this.heap[right])) {
                largest = right;
            }
            
            if (index === largest) break;
            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            index = largest;
        }
    }
}
