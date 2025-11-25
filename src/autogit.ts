type Graph<T> = Map<T, T[]>;

function bfs<T>(graph: Graph<T>, start: T, target: T): boolean {
    // Check if start node exists in the graph
    if (!graph.has(start)) {
        return false;
    }

    const visited = new Set<T>();
    const queue: T[] = [start];
    visited.add(start);

    while (queue.length > 0) {
        // Dequeue the front node
        const currentNode = queue.shift()!;

        // Check if current node is the target
        if (currentNode === target) {
            return true;
        }

        // Get all adjacent nodes of the current node
        const neighbors = graph.get(currentNode) || [];

        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }

    // Target node not found
    return false;
}

// Example Usage:
const graph = new Map<number, number[]>();
graph.set(0, [1, 2]);
graph.set(1, [2]);
graph.set(2, [0, 3]);
graph.set(3, [3]); // Self-loop

console.log(bfs(graph, 0, 3)); // true
console.log(bfs(graph, 3, 0)); // false (no reverse path)
console.log(bfs(graph, 1, 4)); // false (non-existent node)
function bfsShortestPath<T>(graph: Graph<T>, start: T, target: T): number {
    if (!graph.has(start)) return -1;

    const visited = new Map<T, number>(); // Stores node -> distance
    const queue: T[] = [start];
    visited.set(start, 0);

    while (queue.length > 0) {
        const currentNode = queue.shift()!;
        const currentDistance = visited.get(currentNode)!;

        if (currentNode === target) {
            return currentDistance;
        }

        const neighbors = graph.get(currentNode) || [];
        
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.set(neighbor, currentDistance + 1);
                queue.push(neighbor);
            }
        }
    }
    
    return -1; // Target unreachable
}
// String-based graph example
const wordGraph = new Map<string, string[]>([
    ['apple', ['orange', 'banana']],
    ['orange', ['grape']],
    ['banana', ['pear']]
]);

console.log(bfs(wordGraph, 'apple', 'grape')); // true
