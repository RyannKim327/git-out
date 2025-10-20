// Define types for our implementation
interface Position {
    x: number;
    y: number;
}

interface Node {
    position: Position;
    f: number; // Total cost (g + h)
    g: number; // Cost from start to current node
    h: number; // Heuristic cost from current to end
    parent?: Node; // For reconstructing the path
}

class AStar {
    private grid: number[][];
    private rows: number;
    private cols: number;

    constructor(grid: number[][]) {
        this.grid = grid;
        this.rows = grid.length;
        this.cols = grid[0].length;
    }

    // Heuristic function (Manhattan distance)
    private heuristic(a: Position, b: Position): number {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    // Check if position is valid
    private isValid(position: Position): boolean {
        return position.x >= 0 && position.x < this.rows &&
               position.y >= 0 && position.y < this.cols &&
               this.grid[position.x][position.y] === 0; // 0 represents walkable
    }

    // Get neighboring nodes
    private getNeighbors(node: Node): Position[] {
        const { x, y } = node.position;
        const neighbors: Position[] = [];
        const directions = [
            { x: 0, y: -1 }, // Up
            { x: 1, y: 0 },  // Right
            { x: 0, y: 1 },  // Down
            { x: -1, y: 0 }  // Left
        ];

        for (const dir of directions) {
            const newPos = { x: x + dir.x, y: y + dir.y };
            if (this.isValid(newPos)) {
                neighbors.push(newPos);
            }
        }

        return neighbors;
    }

    // Find path using A* algorithm
    public findPath(start: Position, end: Position): Position[] | null {
        // Initialize open and closed lists
        const openList: Node[] = [];
        const closedList: Set<string> = new Set();

        // Create start node
        const startNode: Node = {
            position: start,
            f: 0,
            g: 0,
            h: this.heuristic(start, end)
        };

        openList.push(startNode);

        while (openList.length > 0) {
            // Get node with lowest f cost
            let currentNode = openList[0];
            let currentIndex = 0;

            for (let i = 1; i < openList.length; i++) {
                if (openList[i].f < currentNode.f) {
                    currentNode = openList[i];
                    currentIndex = i;
                }
            }

            // Remove current node from open list
            openList.splice(currentIndex, 1);
            
            // Add current node to closed list
            closedList.add(`${currentNode.position.x},${currentNode.position.y}`);

            // Check if we reached the goal
            if (currentNode.position.x === end.x && currentNode.position.y === end.y) {
                return this.reconstructPath(currentNode);
            }

            // Get neighbors
            const neighbors = this.getNeighbors(currentNode);
            
            for (const neighborPos of neighbors) {
                const key = `${neighborPos.x},${neighborPos.y}`;
                
                // Skip if in closed list
                if (closedList.has(key)) continue;

                // Calculate costs
                const g = currentNode.g + 1; // Assuming uniform cost of 1 for each step
                const h = this.heuristic(neighborPos, end);
                const f = g + h;

                // Check if neighbor is already in open list with better g score
                const existingNode = openList.find(n => 
                    n.position.x === neighborPos.x && n.position.y === neighborPos.y
                );

                if (!existingNode) {
                    // Add new node to open list
                    openList.push({
                        position: neighborPos,
                        f,
                        g,
                        h,
                        parent: currentNode
                    });
                } else if (g < existingNode.g) {
                    // Update existing node if this path is better
                    existingNode.g = g;
                    existingNode.f = f;
                    existingNode.parent = currentNode;
                }
            }

            // Sort open list by f score for efficiency
            openList.sort((a, b) => a.f - b.f);
        }

        // No path found
        return null;
    }

    // Reconstruct the path from end to start
    private reconstructPath(node: Node): Position[] {
        const path: Position[] = [];
        let current: Node | undefined = node;

        while (current) {
            path.unshift(current.position);
            current = current.parent;
        }

        return path;
    }
}

// Example usage
const grid = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0], // 1 represents obstacles
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0]
];

const aStar = new AStar(grid);
const start = { x: 0, y: 0 };
const end = { x: 4, y: 4 };

const path = aStar.findPath(start, end);

if (path) {
    console.log("Path found:");
    console.log(path.map(pos => `(${pos.x},${pos.y})`).join(" -> "));
} else {
    console.log("No path found");
}

// Additional utility function to visualize the grid with path
function visualizeGrid(grid: number[][], path: Position[]): void {
    const visualGrid = grid.map(row => [...row]);
    
    // Mark path on grid (use 2 to represent path)
    path.forEach(pos => {
        visualGrid[pos.x][pos.y] = 2;
    });

    console.log("Grid visualization:");
    for (const row of visualGrid) {
        console.log(row.map(cell => {
            if (cell === 0) return '.';
            if (cell === 1) return '█'; // Obstacle
            if (cell === 2) return '●'; // Path
            return cell;
        }).join(' '));
    }
}

if (path) {
    visualizeGrid(grid, path);
}
// To use different movement costs (diagonal, etc.)
private getNeighbors(node: Node): {position: Position, cost: number}[] {
    // Return positions with associated movement costs
}

// To use different heuristics
private euclideanHeuristic(a: Position, b: Position): number {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

// For diagonal movement
private getNeighborsWithDiagonals(node: Node): Position[] {
    const directions = [
        { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
        { x: -1, y: 0 },                   { x: 1, y: 0 },
        { x: -1, y: 1 },  { x: 0, y: 1 },  { x: 1, y: 1 }
    ];
    // ...
}
