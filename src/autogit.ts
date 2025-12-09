type Graph<T> = Map<T, T[]>;

function topologicalSort<T>(graph: Graph<T>): T[] | null {
    // Step 1: Collect all unique nodes from graph
    const nodes = new Set<T>();
    graph.forEach((neighbors, node) => {
        nodes.add(node);
        neighbors.forEach(neighbor => nodes.add(neighbor));
    });

    // Step 2: Calculate indegree for each node
    const indegree = new Map<T, number>();
    nodes.forEach(node => indegree.set(node, 0));

    graph.forEach((neighbors) => {
        neighbors.forEach(neighbor => {
            indegree.set(neighbor, indegree.get(neighbor)! + 1);
        });
    });

    // Step 3: Initialize queue with nodes of indegree 0
    const queue: T[] = [];
    indegree.forEach((degree, node) => {
        if (degree === 0) queue.push(node);
    });

    // Step 4: Process the queue
    const sorted: T[] = [];
    while (queue.length > 0) {
        const current = queue.shift()!;
        sorted.push(current);

        // Decrement indegree for neighbors
        const neighbors = graph.get(current) || [];
        neighbors.forEach(neighbor => {
            const newDegree = indegree.get(neighbor)! - 1;
            indegree.set(neighbor, newDegree);
            if (newDegree === 0) queue.push(neighbor);
        });
    }

    // Step 5: Check for cycles
    if (sorted.length !== nodes.size) {
        return null; // Graph contains a cycle
    }

    return sorted;
}
// Acyclic graph example
const acyclicGraph = new Map<string, string[]>([
    ['A', ['B', 'C']],
    ['B', ['C']],
    ['C', ['D']],
    ['D', []]
]);

console.log(topologicalSort(acyclicGraph)); 
// Output: ['A', 'B', 'C', 'D'] (order may vary between A,B,C nodes)

// Cyclic graph example
const cyclicGraph = new Map<string, string[]>([
    ['A', ['B']],
    ['B', ['A']]
]);

console.log(topologicalSort(cyclicGraph)); 
// Output: null (cycle detected)
