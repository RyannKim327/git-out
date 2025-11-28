interface Node {
    x: number;
    y: number;
    gCost: number; // Cost from start to this node
    hCost: number; // Heuristic cost from this node to end
    fCost: number; // gCost + hCost
    parent: Node | null; // To reconstruct path
    isWall: boolean; // Is this node an obstacle?
    id: string; // Unique identifier for map/set lookups (e.g., "x,y")
}
function manhattanDistance(nodeA: Node, nodeB: Node): number {
    return Math.abs(nodeA.x - nodeB.x) + Math.abs(nodeA.y - nodeB.y);
}
class PriorityQueue<T> {
    private heap: T[] = [];
    private compare: (a: T, b: T) => number; // Function to compare elements (e.g., a.fCost - b.fCost)

    constructor(compareFn: (a: T, b: T) => number) {
        this.compare = compareFn;
    }

    enqueue(item: T): void {
        this.heap.push(item);
        this.bubbleUp();
    }

    dequeue(): T | undefined {
        if (this.isEmpty()) return undefined;
        if (this.heap.length === 1) return this.heap.pop();

        const item = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.sinkDown();
        return item;
    }

    peek(): T | undefined {
        return this.heap.length > 0 ? this.heap[0] : undefined;
    }

    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    size(): number {
        return this.heap.length;
    }

    private bubbleUp(): void {
        let index = this.heap.length - 1;
        const element = this.heap[index];

        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            let parent = this.heap[parentIndex];

            if (this.compare(element, parent) >= 0) break; // If element has higher or equal priority, stop

            this.heap[parentIndex] = element;
            this.heap[index] = parent;
            index = parentIndex;
        }
    }

    private sinkDown(): void {
        let index = 0;
        const length = this.heap.length;
        const element = this.heap[0];

        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swapIndex: number | null = null;

            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (this.compare(leftChild, element) < 0) {
                    swapIndex = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swapIndex === null && this.compare(rightChild, element) < 0) ||
                    (swapIndex !== null && this.compare(rightChild, leftChild!) < 0)
                ) {
                    swapIndex = rightChildIndex;
                }
            }

            if (swapIndex === null) break;

            this.heap[index] = this.heap[swapIndex];
            this.heap[swapIndex] = element;
            index = swapIndex;
        }
    }
}
// Helper to reconstruct the path from endNode back to startNode
function reconstructPath(currentNode: Node): Node[] {
    const path: Node[] = [];
    let temp: Node | null = currentNode;
    while (temp !== null) {
        path.push(temp);
        temp = temp.parent;
    }
    return path.reverse(); // Reverse to get path from start to end
}

// Helper to get valid neighbors (4-directional for this example)
function getNeighbors(node: Node, grid: Node[][]): Node[] {
    const neighbors: Node[] = [];
    const { x, y } = node;
    const rows = grid.length;
    const cols = grid[0].length;

    // Possible moves: up, down, left, right
    const possibleMoves = [
        { dx: 0, dy: -1 }, // Up
        { dx: 0, dy: 1 },  // Down
        { dx: -1, dy: 0 }, // Left
        { dx: 1, dy: 0 }   // Right
    ];

    for (const move of possibleMoves) {
        const newX = x + move.dx;
        const newY = y + move.dy;

        // Check grid boundaries
        if (newX >= 0 && newX < rows && newY >= 0 && newY < cols) {
            neighbors.push(grid[newX][newY]);
        }
    }
    return neighbors;
}

function aStarSearch(grid: Node[][], startNode: Node, endNode: Node): Node[] | null {
    // Check if start/end are walls
    if (startNode.isWall || endNode.isWall) {
        console.error("Start or end node is a wall!");
        return null;
    }
    // Check if start/end are the same
    if (startNode.id === endNode.id) {
        return [startNode];
    }

    // Initialize costs for the start node
    startNode.gCost = 0;
    startNode.hCost = manhattanDistance(startNode, endNode);
    startNode.fCost = startNode.hCost;
    startNode.parent = null;

    // Use a PriorityQueue for the open set
    const openSet = new PriorityQueue<Node>((a, b) => a.fCost - b.fCost);
    // Use a Map to quickly check if a node is already in the open set and to update it
    const openSetMap = new Map<string, Node>();

    // Use a Set for the closed set (stores node IDs for faster lookup)
    const closedSet = new Set<string>();

    openSet.enqueue(startNode);
    openSetMap.set(startNode.id, startNode);

    while (!openSet.isEmpty()) {
        const currentNode = openSet.dequeue()!; // ! asserts it's not undefined

        // If we reached the end node, reconstruct and return the path
        if (currentNode.id === endNode.id) {
            return reconstructPath(currentNode);
        }

        // Move current node from open set to closed set
        openSetMap.delete(currentNode.id);
        closedSet.add(currentNode.id);

        const neighbors = getNeighbors(currentNode, grid);

        for (const neighbor of neighbors) {
            // Skip if neighbor is a wall or already evaluated
            if (neighbor.isWall || closedSet.has(neighbor.id)) {
                continue;
            }

            // Cost from start to neighbor through current
            // Assuming uniform cost of 1 for moving between adjacent grid cells
            const tentativeGCost = currentNode.gCost + 1;

            // If a better path to neighbor is found OR neighbor is not yet in open set
            if (tentativeGCost < neighbor.gCost || !openSetMap.has(neighbor.id)) {
                neighbor.parent = currentNode;
                neighbor.gCost = tentativeGCost;
                neighbor.hCost = manhattanDistance(neighbor, endNode);
                neighbor.fCost = neighbor.gCost + neighbor.hCost;

                if (!openSetMap.has(neighbor.id)) {
                    openSet.enqueue(neighbor);
                    openSetMap.set(neighbor.id, neighbor);
                }
                // If neighbor is already in openSet but we found a better path,
                // the original entry with a worse gCost might still be in the PQ.
                // When that old entry is dequeued later, the `closedSet.has()` check or
                // `tentativeGCost < neighbor.gCost` check for the *already updated* node
                // will correctly prevent processing the worse path.
                // A more optimized PQ could have an `updatePriority` method.
            }
        }
    }

    // No path found
    return null;
}
// Helper to create the grid and initialize nodes
function createGrid(rows: number, cols: number): Node[][] {
    const grid: Node[][] = [];
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
            grid[i][j] = {
                x: i,
                y: j,
                gCost: Infinity, // Initialize with infinity
                hCost: Infinity,
                fCost: Infinity,
                parent: null,
                isWall: false,
                id: `${i},${j}`
            };
        }
    }
    return grid;
}

// Main execution
const rows = 10;
const cols = 10;
const grid = createGrid(rows, cols);

// Set some walls
grid[2][2].isWall = true;
grid[2][3].isWall = true;
grid[2][4].isWall = true;
grid[2][5].isWall = true;
grid[3][5].isWall = true;
grid[4][5].isWall = true;
grid[5][5].isWall = true;
grid[6][5].isWall = true;
grid[7][5].isWall = true;
grid[7][4].isWall = true;
grid[7][3].isWall = true;
grid[7][2].isWall = true;

const startNode = grid[0][0];
const endNode = grid[9][9];

console.log("Starting A* search...");
const path = aStarSearch(grid, startNode, endNode);

if (path) {
    console.log("Path found!");
    console.log(path.map(node => `(${node.x},${node.y})`).join(" -> "));

    // Optional: Visualize the path
    const pathSet = new Set<string>(path.map(node => node.id));
    console.log("\nGrid Visualization:");
    for (let i = 0; i < rows; i++) {
        let rowStr = "";
        for (let j = 0; j < cols; j++) {
            if (grid[i][j].isWall) {
                rowStr += "█ "; // Wall
            } else if (grid[i][j].id === startNode.id) {
                rowStr += "S "; // Start
            } else if (grid[i][j].id === endNode.id) {
                rowStr += "E "; // End
            } else if (pathSet.has(grid[i][j].id)) {
                rowStr += "• "; // Path
            } else {
                rowStr += ". "; // Empty
            }
        }
        console.log(rowStr);
    }

} else {
    console.log("No path found!");
}
