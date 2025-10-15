type Grid = number[][]; // 0 = walkable, 1 = obstacle
type Node = { x: number; y: number; g: number; h: number; f: number; parent: Node | null };

export function aStarSearch(
    grid: Grid,
    start: { x: number; y: number },
    goal: { x: number; y: number }
): { x: number; y: number }[] | null {
    // Create start and goal nodes
    const startNode: Node = {
        x: start.x,
        y: start.y,
        g: 0,
        h: heuristic(start.x, start.y, goal.x, goal.y),
        f: 0,
        parent: null
    };
    startNode.f = startNode.g + startNode.h;

    // Initialize open and closed lists
    const openList: Node[] = [startNode];
    const closedList = new Set<string>();

    // Possible movement directions (4-way movement)
    const directions = [
        { x: 1, y: 0 },  // Right
        { x: -1, y: 0 }, // Left
        { x: 0, y: 1 },  // Down
        { x: 0, y: -1 }, // Up
    ];

    while (openList.length > 0) {
        // Get current node (node with lowest f score)
        openList.sort((a, b) => a.f - b.f);
        const currentNode = openList.shift()!;

        // Check if we've reached the goal
        if (currentNode.x === goal.x && currentNode.y === goal.y) {
            return reconstructPath(currentNode);
        }

        // Add current node to closed list
        closedList.add(`${currentNode.x},${currentNode.y}`);

        // Generate neighbors
        for (const direction of directions) {
            const neighborX = currentNode.x + direction.x;
            const neighborY = currentNode.y + direction.y;

            // Check boundaries
            if (
                neighborX < 0 || neighborX >= grid[0].length ||
                neighborY < 0 || neighborY >= grid.length
            ) {
                continue;
            }

            // Check if walkable and not closed
            if (grid[neighborY][neighborX] === 1 || closedList.has(`${neighborX},${neighborY}`)) {
                continue;
            }

            // Create neighbor node
            const neighbor: Node = {
                x: neighborX,
                y: neighborY,
                g: currentNode.g + 1,
                h: heuristic(neighborX, neighborY, goal.x, goal.y),
                f: 0,
                parent: currentNode
            };
            neighbor.f = neighbor.g + neighbor.h;

            // Check if neighbor is already in open list with better g score
            const existingNode = openList.find(n => n.x === neighborX && n.y === neighborY);
            if (!existingNode || neighbor.g < existingNode.g) {
                if (!existingNode) {
                    openList.push(neighbor);
                } else {
                    // Update existing node with better path
                    existingNode.g = neighbor.g;
                    existingNode.f = existingNode.g + existingNode.h;
                    existingNode.parent = currentNode;
                }
            }
        }
    }

    // No path found
    return null;
}

function heuristic(x1: number, y1: number, x2: number, y2: number): number {
    // Manhattan distance heuristic
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function reconstructPath(node: Node): { x: number; y: number }[] {
    const path: { x: number; y: number }[] = [];
    let currentNode: Node | null = node;
    
    while (currentNode) {
        path.unshift({ x: currentNode.x, y: currentNode.y });
        currentNode = currentNode.parent;
    }
    
    return path;
}
const grid: Grid = [
    [0, 0, 0, 0, 1],
    [1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0]
];

const start = { x: 0, y: 0 };
const goal = { x: 4, y: 4 };

const path = aStarSearch(grid, start, goal);

if (path) {
    console.log("Path found:", path);
} else {
    console.log("No path found");
}
