interface Node {
    x: number;
    y: number;
}

interface AStarNode extends Node {
    f: number; // total cost
    g: number; // cost from start to this node
    h: number; // heuristic cost to goal
    parent: AStarNode | null;
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
    private heuristic(a: Node, b: Node): number {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    // Check if a position is valid
    private isValid(pos: Node): boolean {
        return pos.x >= 0 && pos.x < this.rows && 
               pos.y >= 0 && pos.y < this.cols && 
               this.grid[pos.x][pos.y] === 0; // 0 = walkable
    }

    // Get neighboring nodes
    private getNeighbors(node: Node): Node[] {
        const neighbors: Node[] = [];
        const directions = [
            { x: 0, y: 1 },   // right
            { x: 1, y: 0 },   // down
            { x: 0, y: -1 },  // left
            { x: -1, y: 0 },  // up
        ];

        for (const dir of directions) {
            const neighbor = { x: node.x + dir.x, y: node.y + dir.y };
            if (this.isValid(neighbor)) {
                neighbors.push(neighbor);
            }
        }

        return neighbors;
    }

    // Reconstruct the path from end to start
    private reconstructPath(current: AStarNode): Node[] {
        const path: Node[] = [];
        let temp: AStarNode | null = current;

        while (temp !== null) {
            path.unshift({ x: temp.x, y: temp.y });
            temp = temp.parent;
        }

        return path;
    }

    // Main A* search algorithm
    search(start: Node, goal: Node): Node[] | null {
        const openSet: AStarNode[] = [];
        const closedSet = new Set<string>();

        // Create start node
        const startNode: AStarNode = {
            ...start,
            g: 0,
            h: this.heuristic(start, goal),
            f: this.heuristic(start, goal),
            parent: null
        };

        openSet.push(startNode);

        while (openSet.length > 0) {
            // Find node with lowest f cost
            let currentIndex = 0;
            for (let i = 1; i < openSet.length; i++) {
                if (openSet[i].f < openSet[currentIndex].f) {
                    currentIndex = i;
                }
            }

            const current = openSet[currentIndex];

            // Check if we've reached the goal
            if (current.x === goal.x && current.y === goal.y) {
                return this.reconstructPath(current);
            }

            // Move current from open to closed set
            openSet.splice(currentIndex, 1);
            closedSet.add(`${current.x},${current.y}`);

            // Check neighbors
            const neighbors = this.getNeighbors(current);
            for (const neighborPos of neighbors) {
                const neighborKey = `${neighborPos.x},${neighborPos.y}`;

                // Skip if already evaluated
                if (closedSet.has(neighborKey)) continue;

                // Calculate tentative g score
                const tentativeG = current.g + 1; // Assuming each move costs 1

                // Check if neighbor is in open set
                let neighborNode = openSet.find(n => 
                    n.x === neighborPos.x && n.y === neighborPos.y
                );

                if (!neighborNode) {
                    // New node discovered
                    neighborNode = {
                        ...neighborPos,
                        g: tentativeG,
                        h: this.heuristic(neighborPos, goal),
                        f: 0,
                        parent: current
                    };
                    neighborNode.f = neighborNode.g + neighborNode.h;
                    openSet.push(neighborNode);
                } else if (tentativeG < neighborNode.g) {
                    // Found a better path to this node
                    neighborNode.g = tentativeG;
                    neighborNode.f = neighborNode.g + neighborNode.h;
                    neighborNode.parent = current;
                }
            }
        }

        // No path found
        return null;
    }
}
// Example grid (0 = walkable, 1 = obstacle)
const grid = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0]
];

const aStar = new AStar(grid);

const start = { x: 0, y: 0 };
const goal = { x: 4, y: 4 };

const path = aStar.search(start, goal);

if (path) {
    console.log("Path found:");
    path.forEach((node, index) => {
        console.log(`${index}: (${node.x}, ${node.y})`);
    });
} else {
    console.log("No path found");
}
class PriorityQueue<T> {
    private elements: { element: T, priority: number }[] = [];

    enqueue(element: T, priority: number): void {
        this.elements.push({ element, priority });
        this.elements.sort((a, b) => a.priority - b.priority);
    }

    dequeue(): T | null {
        return this.elements.shift()?.element || null;
    }

    isEmpty(): boolean {
        return this.elements.length === 0;
    }
}

// Update the search method to use priority queue
searchWithPriorityQueue(start: Node, goal: Node): Node[] | null {
    const openSet = new PriorityQueue<AStarNode>();
    const closedSet = new Set<string>();
    const gScores = new Map<string, number>();

    const startNode: AStarNode = {
        ...start,
        g: 0,
        h: this.heuristic(start, goal),
        f: this.heuristic(start, goal),
        parent: null
    };

    openSet.enqueue(startNode, startNode.f);
    gScores.set(`${start.x},${start.y}`, 0);

    while (!openSet.isEmpty()) {
        const current = openSet.dequeue();
        if (!current) break;

        if (current.x === goal.x && current.y === goal.y) {
            return this.reconstructPath(current);
        }

        closedSet.add(`${current.x},${current.y}`);

        const neighbors = this.getNeighbors(current);
        for (const neighborPos of neighbors) {
            const neighborKey = `${neighborPos.x},${neighborPos.y}`;

            if (closedSet.has(neighborKey)) continue;

            const tentativeG = current.g + 1;
            const currentGScore = gScores.get(neighborKey);

            if (currentGScore === undefined || tentativeG < currentGScore) {
                const neighborNode: AStarNode = {
                    ...neighborPos,
                    g: tentativeG,
                    h: this.heuristic(neighborPos, goal),
                    f: tentativeG + this.heuristic(neighborPos, goal),
                    parent: current
                };

                gScores.set(neighborKey, tentativeG);
                openSet.enqueue(neighborNode, neighborNode.f);
            }
        }
    }

    return null;
}
