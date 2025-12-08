// --- 1. Node Types ---
type Node = string; // Using "x,y" string format for grid nodes

// --- 2. Grid Type ---
// A 2D array where `true` means walkable, `false` means obstacle
type Grid = boolean[][];

// --- 3. Helper Functions for Node manipulation ---
function parseNode(node: Node): { x: number; y: number } {
    const [x, y] = node.split(',').map(Number);
    return { x, y };
}

function createNode(x: number, y: number): Node {
    return `${x},${y}`;
}

// --- 4. Heuristic Function (Manhattan Distance for grid) ---
// Estimates the cost from node `a` to node `b`
function manhattanDistance(a: Node, b: Node): number {
    const { x: x1, y: y1 } = parseNode(a);
    const { x: x2, y: y2 } = parseNode(b);
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

// --- 5. Get Neighbors Function (4-directional movement) ---
// Returns an array of valid, walkable neighbors for a given node
function getNeighbors(node: Node, grid: Grid): Node[] {
    const { x, y } = parseNode(node);
    const neighbors: Node[] = [];
    const rows = grid.length;
    const cols = grid[0].length;

    // Define possible movements (up, down, left, right)
    const movements = [
        { dx: 0, dy: 1 },  // Down
        { dx: 0, dy: -1 }, // Up
        { dx: 1, dy: 0 },  // Right
        { dx: -1, dy: 0 }, // Left
    ];

    for (const move of movements) {
        const nx = x + move.dx;
        const ny = y + move.dy;

        // Check bounds and walkability
        if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && grid[ny][nx]) {
            neighbors.push(createNode(nx, ny));
        }
    }
    return neighbors;
}

// --- 6. Distance between two adjacent nodes ---
// For a grid, this is typically 1 for adjacent walkable cells.
function getDistance(a: Node, b: Node): number {
    // In a simple grid, assume 1 unit distance between adjacent cells
    // If diagonal movement were allowed, this could be sqrt(2) for diagonals.
    return 1;
}

// --- 7. Reconstruct Path ---
// Traces back from the goal using the `cameFrom` map
function reconstructPath(cameFrom: Map<Node, Node>, current: Node): Node[] {
    const path: Node[] = [current];
    while (cameFrom.has(current)) {
        current = cameFrom.get(current)!;
        path.unshift(current); // Add to the beginning of the path
    }
    return path;
}
// --- 8. Priority Queue Implementation (Min-Heap) ---
// Stores items with a numeric priority, always dequeues the item with the lowest priority.
class PriorityQueue<T> {
    private _heap: [T, number][] = []; // [item, priority] tuples

    enqueue(item: T, priority: number): void {
        this._heap.push([item, priority]);
        this._bubbleUp(this._heap.length - 1);
    }

    dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        const min = this._heap[0];
        const last = this._heap.pop(); // Remove the last element
        if (this._heap.length > 0 && last) {
            this._heap[0] = last; // Move the last element to the root
            this._sinkDown(0);
        }
        return min ? min[0] : undefined;
    }

    isEmpty(): boolean {
        return this._heap.length === 0;
    }

    peek(): T | undefined {
        return this._heap.length > 0 ? this._heap[0][0] : undefined;
    }

    private _getParentIndex(i: number): number {
        return Math.floor((i - 1) / 2);
    }

    private _getLeftChildIndex(i: number): number {
        return 2 * i + 1;
    }

    private _getRightChildIndex(i: number): number {
        return 2 * i + 2;
    }

    private _swap(i: number, j: number): void {
        [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
    }

    private _bubbleUp(index: number): void {
        while (index > 0) {
            const parentIndex = this._getParentIndex(index);
            if (this._heap[index][1] < this._heap[parentIndex][1]) {
                this._swap(index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    private _sinkDown(index: number): void {
        const len = this._heap.length;
        const elementPriority = this._heap[index][1];

        while (true) {
            let leftChildIndex = this._getLeftChildIndex(index);
            let rightChildIndex = this._getRightChildIndex(index);
            let smallestIndex = index;

            // Check if left child exists and has a smaller priority
            if (
                leftChildIndex < len &&
                this._heap[leftChildIndex][1] < this._heap[smallestIndex][1]
            ) {
                smallestIndex = leftChildIndex;
            }

            // Check if right child exists and has an even smaller priority
            if (
                rightChildIndex < len &&
                this._heap[rightChildIndex][1] < this._heap[smallestIndex][1]
            ) {
                smallestIndex = rightChildIndex;
            }

            // If the current element is the smallest, we're done
            if (smallestIndex === index) {
                break;
            }

            // Swap with the smallest child and continue sinking down
            this._swap(index, smallestIndex);
            index = smallestIndex;
        }
    }
}
// --- 9. A* Search Algorithm ---
function aStar(
    start: Node,
    goal: Node,
    grid: Grid,
    heuristic: (a: Node, b: Node) => number,
    getNeighborsFunc: (node: Node, grid: Grid) => Node[],
    getDistanceFunc: (a: Node, b: Node) => number
): Node[] | null {
    // The set of discovered nodes that may need to be (re-)evaluated.
    // Initially, only the start node is known.
    const openSet = new PriorityQueue<Node>();
    openSet.enqueue(start, 0); // fScore of start is h(start, goal) which is 0 from start

    // For node n, cameFrom[n] is the node immediately preceding it on the cheapest path from start
    // currently known.
    const cameFrom = new Map<Node, Node>();

    // For node n, gScore[n] is the cost of the cheapest path from start to n currently known.
    const gScore = new Map<Node, number>();
    gScore.set(start, 0);

    // For node n, fScore[n] = gScore[n] + h(n). fScore[n] represents our current best guess as to
    // how cheap a path from start to finish can be if it goes through n.
    const fScore = new Map<Node, number>();
    fScore.set(start, heuristic(start, goal));

    while (!openSet.isEmpty()) {
        const current = openSet.dequeue(); // Node in openSet with the lowest fScore[current]
        if (!current) continue; // Should not happen if openSet is not empty

        if (current === goal) {
            return reconstructPath(cameFrom, current);
        }

        const currentGScore = gScore.get(current) || Infinity;

        for (const neighbor of getNeighborsFunc(current, grid)) {
            // d(current, neighbor) is the weight of the edge from current to neighbor
            // in a grid, this is usually 1 for adjacent cells
            const tentative_gScore = currentGScore + getDistanceFunc(current, neighbor);

            // If a cheaper path to neighbor is found
            if (tentative_gScore < (gScore.get(neighbor) || Infinity)) {
                cameFrom.set(neighbor, current);
                gScore.set(neighbor, tentative_gScore);
                fScore.set(neighbor, tentative_gScore + heuristic(neighbor, goal));
                
                // Add neighbor to openSet. If it's already there, the PriorityQueue
                // will just handle the new, potentially lower-fScore version first.
                // A more optimized PQ might have a "decrease-key" operation.
                openSet.enqueue(neighbor, fScore.get(neighbor)!);
            }
        }
    }

    // Open set is empty but goal was never reached
    return null;
}
// --- 10. Example Usage ---

// Define a sample grid (true = walkable, false = obstacle)
// Y-axis is row, X-axis is column
const grid: Grid = [
    [true, true, true, true, true],
    [true, false, true, false, true],
    [true, false, true, true, true],
    [true, false, false, false, true],
    [true, true, true, true, true],
];

const startNode: Node = createNode(0, 0); // Top-left corner
const goalNode: Node = createNode(4, 4); // Bottom-right corner

console.log('Searching path from', startNode, 'to', goalNode);

const path = aStar(
    startNode,
    goalNode,
    grid,
    manhattanDistance,
    getNeighbors,
    getDistance
);

if (path) {
    console.log('Path found:', path.join(' -> '));

    // Optional: Visualize the path on the grid
    console.log('\nGrid with Path:');
    const pathSet = new Set(path);
    for (let y = 0; y < grid.length; y++) {
        let rowStr = '';
        for (let x = 0; x < grid[y].length; x++) {
            const node = createNode(x, y);
            if (node === startNode) {
                rowStr += 'S ';
            } else if (node === goalNode) {
                rowStr += 'G ';
            } else if (pathSet.has(node)) {
                rowStr += '* '; // Path
            } else if (!grid[y][x]) {
                rowStr += '# '; // Obstacle
            } else {
                rowStr += '. '; // Empty
            }
        }
        console.log(rowStr);
    }
} else {
    console.log('No path found!');
}

// Example with no path
const noPathGrid: Grid = [
    [true, true, true],
    [true, false, true],
    [true, false, true],
    [true, true, true],
];
const noPathStart = createNode(0,0);
const noPathGoal = createNode(2,2);
console.log('\nSearching path from', noPathStart, 'to', noPathGoal, ' (expected no path)');
const noPathResult = aStar(noPathStart, noPathGoal, noPathGrid, manhattanDistance, getNeighbors, getDistance);
console.log(noPathResult ? 'Path found (unexpected)' : 'No path found (expected)');
