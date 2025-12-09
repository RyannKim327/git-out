type Graph = Record<string, string[]>;

function bfs(graph: Graph, startNode: string): string[] {
    const visited: Set<string> = new Set();
    const result: string[] = [];
    const queue: string[] = [startNode];

    visited.add(startNode);

    while (queue.length > 0) {
        const currentNode = queue.shift()!;
        result.push(currentNode);

        for (const neighbor of graph[currentNode] || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }

    return result;
}

// Example usage
const graph: Graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
};

console.log(bfs(graph, 'A')); // Output: ["A", "B", "C", "D", "E", "F"]
function bfsShortestPath(graph: Graph, start: string, target: string): string[] | null {
    const previous: Record<string, string | null> = { [start]: null };
    const queue: string[] = [start];

    while (queue.length > 0) {
        const current = queue.shift()!;
        if (current === target) break;

        for (const neighbor of graph[current] || []) {
            if (!(neighbor in previous)) {
                previous[neighbor] = current;
                queue.push(neighbor);
            }
        }
    }

    if (!(target in previous)) return null;

    const path: string[] = [];
    let current: string | null = target;
    while (current) {
        path.unshift(current);
        current = previous[current];
    }
    return path;
}

// Usage
console.log(bfsShortestPath(graph, 'A', 'F')); // Output: ["A", "C", "F"]
