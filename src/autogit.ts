class Node {
    public x: number;
    public y: number;
    public g: number; // Cost from start to this node
    public h: number; // Estimated cost from this node to goal
    public f: number; // Total cost (g + h)
    public parent: Node | null;

    constructor(x: number, y: number, g: number, h: number, parent: Node | null = null) {
        this.x = x;
        this.y = y;
        this.g = g;
        this.h = h;
        this.f = g + h;
        this.parent = parent;
    }
}
class AStar {
    private openList: Node[] = [];
    private closedList: Set<string> = new Set();

    constructor(private grid: number[][], private start: Node, private goal: Node) {}

    public findPath(): Node[] | null {
        this.openList.push(this.start);

        while (this.openList.length > 0) {
            // Sort openList by f value (lowest first)
            this.openList.sort((a, b) => a.f - b.f);

            const currentNode = this.openList.shift()!; // Get the node with the lowest f value
            
            // If we reached the goal, construct the path
            if (this.isGoal(currentNode)) {
                return this.reconstructPath(currentNode);
            }

            this.closedList.add(this.nodeKey(currentNode));

            // Get neighbors
            for (const neighbor of this.getNeighbors(currentNode)) {
                if (this.closedList.has(this.nodeKey(neighbor))) {
                    continue; // Ignore already evaluated nodes
                }

                const tentativeG = currentNode.g + this.distance(currentNode, neighbor);

                // If neighbor is not in openList, add it
                const openNode = this.openList.find(n => this.nodeKey(n) === this.nodeKey(neighbor));
                if (!openNode) {
                    neighbor.g = tentativeG;
                    neighbor.h = this.heuristic(neighbor, this.goal);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.parent = currentNode;
                    this.openList.push(neighbor);
                } else if (tentativeG < openNode.g) {
                    // Update if we found a better path
                    openNode.g = tentativeG;
                    openNode.f = openNode.g + openNode.h;
                    openNode.parent = currentNode;
                }
            }
        }

        return null; // No path found
    }

    private isGoal(node: Node): boolean {
        return node.x === this.goal.x && node.y === this.goal.y;
    }

    private reconstructPath(node: Node): Node[] {
        const path: Node[] = [];
        let current: Node | null = node;

        while (current) {
            path.push(current);
            current = current.parent;
        }

        return path.reverse(); // Return reversed path
    }

    private getNeighbors(node: Node): Node[] {
        const neighbors: Node[] = [];
        const directions = [
            { x: 0, y: -1 }, // Up
            { x: 1, y: 0 },  // Right
            { x: 0, y: 1 },  // Down
            { x: -1, y: 0 }, // Left
        ];

        for (const dir of directions) {
            const newX = node.x + dir.x;
            const newY = node.y + dir.y;

            // Check if new position is within bounds and walkable
            if (this.isValid(newX, newY)) {
                neighbors.push(new Node(newX, newY, 0, 0));
            }
        }

        return neighbors;
    }

    private isValid(x: number, y: number): boolean {
        return (
            x >= 0 &&
            y >= 0 &&
            x < this.grid.length &&
            y < this.grid[0].length &&
            this.grid[x][y] === 0 // Assuming 0 is walkable and 1 is not
        );
    }

    private heuristic(node: Node, goal: Node): number {
        // Using Manhattan distance as heuristic
        return Math.abs(node.x - goal.x) + Math.abs(node.y - goal.y);
    }

    private distance(nodeA: Node, nodeB: Node): number {
        return 1; // Assuming uniform cost for each step
    }

    private nodeKey(node: Node): string {
        return `${node.x},${node.y}`;
    }
}
const grid = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
];

const startNode = new Node(0, 0, 0, 0);
const goalNode = new Node(4, 4, 0, 0);

const aStar = new AStar(grid, startNode, goalNode);
const path = aStar.findPath();

if (path) {
    console.log("Path found:");
    path.forEach(node => console.log(`(${node.x}, ${node.y})`));
} else {
    console.log("No path found.");
}
