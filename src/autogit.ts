// grid-node.ts
export class GridNode {
    x: number;
    y: number;
    isWall: boolean; // true if this node is an obstacle

    // A* specific properties (will be set by the algorithm)
    g: number = Infinity; // Cost from start to this node
    h: number = Infinity; // Estimated cost from this node to end
    f: number = Infinity; // g + h
    parent: GridNode | null = null; // To reconstruct the path

    constructor(x: number, y: number, isWall: boolean = false) {
        this.x = x;
        this.y = y;
        this.isWall = isWall;
    }

    // Unique ID for map keys
    get id(): string {
        return `${this.x},${this.y}`;
    }

    // Check if two nodes are the same position
    equals(other: GridNode): boolean {
        return this.x === other.x && this.y === other.y;
    }
}
// priority-queue.ts
export class PriorityQueue<T> {
    private elements: { item: T; priority: number }[] = [];

    enqueue(item: T, priority: number): void {
        this.elements.push({ item, priority });
        this.elements.sort((a, b) => a.priority - b.priority); // Keep it sorted
    }

    dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.elements.shift()!.item; // Remove and return the lowest priority item
    }

    isEmpty(): boolean {
        return this.elements.length === 0;
    }

    // Helper to check if an item is already in the queue (by ID/equality)
    // Note: This is O(N) and could be optimized with a Map for large queues
    contains(item: T, idAccessor: (item: T) => string): boolean {
        return this.elements.some(element => idAccessor(element.item) === idAccessor(item));
    }
}
// heuristics.ts
import { GridNode } from './grid-node';

export function manhattanDistance(nodeA: GridNode, nodeB: GridNode): number {
    return Math.abs(nodeA.x - nodeB.x) + Math.abs(nodeA.y - nodeB.y);
}
// a-star.ts
import { GridNode } from './grid-node';
import { PriorityQueue } from './priority-queue';
import { manhattanDistance } from './heuristics';

/**
 * Finds the shortest path between two nodes in a grid using A* search.
 * @param grid The 2D array representing the grid.
 * @param startNode The starting GridNode.
 * @param endNode The target GridNode.
 * @returns An array of GridNodes representing the path, or null if no path is found.
 */
export function findPath(grid: GridNode[][], startNode: GridNode, endNode: GridNode): GridNode[] | null {
    const openSet = new PriorityQueue<GridNode>();

    // Initialize scores for all nodes
    // Using Maps for gScore and fScore allows us to easily update values
    // and query by node ID without iterating through objects.
    const gScore = new Map<string, number>(); // Actual cost from start to current node
    const fScore = new Map<string, number>(); // Estimated total cost from start to end through current node

    // Initialize all nodes with infinite scores
    grid.forEach(row => row.forEach(node => {
        gScore.set(node.id, Infinity);
        fScore.set(node.id, Infinity);
    }));

    // For the start node:
    gScore.set(startNode.id, 0);
    fScore.set(startNode.id, manhattanDistance(startNode, endNode));
    openSet.enqueue(startNode, fScore.get(startNode.id)!);

    while (!openSet.isEmpty()) {
        const current = openSet.dequeue()!; // Node with the lowest fScore

        // If we reached the end node, reconstruct and return the path
        if (current.equals(endNode)) {
            return reconstructPath(current);
        }

        // Get neighbors (cardinal directions only for Manhattan distance)
        const neighbors = getNeighbors(grid, current);

        for (const neighbor of neighbors) {
            // Calculate tentative gScore for the neighbor
            // Assuming a cost of 1 to move to an adjacent square
            const tentative_gScore = gScore.get(current.id)! + 1;

            if (tentative_gScore < (gScore.get(neighbor.id) ?? Infinity)) {
                // This path to neighbor is better than any previous one.
                // Record it!
                neighbor.parent = current;
                gScore.set(neighbor.id, tentative_gScore);
                fScore.set(neighbor.id, tentative_gScore + manhattanDistance(neighbor, endNode));

                // If neighbor is not in openSet, add it.
                // If it is, its priority will be updated naturally if a better path is found,
                // or the old entry will eventually be dequeued and discarded because its gScore is higher.
                if (!openSet.contains(neighbor, node => node.id)) {
                    openSet.enqueue(neighbor, fScore.get(neighbor.id)!);
                }
            }
        }
    }

    // Open set is empty but end node was never reached
    return null;
}

/**
 * Helper function to get valid cardinal neighbors of a given node.
 */
function getNeighbors(grid: GridNode[][], node: GridNode): GridNode[] {
    const neighbors: GridNode[] = [];
    const rows = grid.length;
    const cols = grid[0].length;

    const dx = [-1, 1, 0, 0]; // Left, Right, Up, Down
    const dy = [0, 0, -1, 1];

    for (let i = 0; i < 4; i++) {
        const nx = node.x + dx[i];
        const ny = node.y + dy[i];

        // Check bounds
        if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
            const neighbor = grid[ny][nx];
            // Check if it's not a wall
            if (!neighbor.isWall) {
                neighbors.push(neighbor);
            }
        }
    }
    return neighbors;
}

/**
 * Reconstructs the path from the end node back to the start node using parent pointers.
 */
function reconstructPath(current: GridNode): GridNode[] {
    const path: GridNode[] = [];
    let temp: GridNode | null = current;
    while (temp !== null) {
        path.unshift(temp); // Add to the beginning of the array
        temp = temp.parent;
    }
    return path;
}
// main.ts
import { GridNode } from './grid-node';
import { findPath } from './a-star';

// Define grid dimensions
const GRID_ROWS = 10;
const GRID_COLS = 10;

// Create the grid
const grid: GridNode[][] = [];
for (let y = 0; y < GRID_ROWS; y++) {
    const row: GridNode[] = [];
    for (let x = 0; x < GRID_COLS; x++) {
        row.push(new GridNode(x, y));
    }
    grid.push(row);
}

// Set some walls (obstacles)
grid[1][5].isWall = true;
grid[2][5].isWall = true;
grid[3][5].isWall = true;
grid[4][5].isWall = true;
grid[5][5].isWall = true;
grid[6][5].isWall = true;
grid[7][5].isWall = true;
grid[7][6].isWall = true;
grid[7][7].isWall = true;
grid[7][8].isWall = true;
grid[7][9].isWall = true; // This will block the path entirely if start/end are on different sides!

// Example: Create a diagonal wall to test
for(let i = 1; i < 8; i++) {
    if (i < 5) grid[i][i+1].isWall = true;
    else grid[i][i-1].isWall = true;
}


// Define start and end nodes
const startNode = grid[0][0];
const endNode = grid[9][9];

console.log('Searching for path from', startNode.id, 'to', endNode.id);

// Find the path
const path = findPath(grid, startNode, endNode);

if (path) {
    console.log('Path found!');
    console.log(path.map(node => `(${node.x},${node.y})`).join(' -> '));

    // Visualize the path on the grid
    console.log('\n--- Grid Visualization ---');
    for (let y = 0; y < GRID_ROWS; y++) {
        let rowStr = '';
        for (let x = 0; x < GRID_COLS; x++) {
            const node = grid[y][x];
            if (node.equals(startNode)) {
                rowStr += 'S ';
            } else if (node.equals(endNode)) {
                rowStr += 'E ';
            } else if (node.isWall) {
                rowStr += 'X '; // Wall
            } else if (path.some(pNode => pNode.equals(node))) {
                rowStr += '* '; // Path
            } else {
                rowStr += '. '; // Empty
            }
        }
        console.log(rowStr);
    }

} else {
    console.log('No path found!');
}
