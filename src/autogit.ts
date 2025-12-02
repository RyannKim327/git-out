/**
 * Performs topological sort on a directed acyclic graph (DAG) using Kahn's algorithm.
 * @param graph A Map representing the adjacency list where keys are nodes and values are their outgoing edges.
 * @returns An array of nodes in topological order.
 * @throws If the graph contains a cycle.
 */
function topologicalSort<T>(graph: Map<T, T[]>): T[] {
    // Collect all nodes from graph keys and their adjacency lists
    const nodes = new Set<T>();
    graph.forEach((neighbors, node) => {
        nodes.add(node);
        neighbors.forEach(neighbor => nodes.add(neighbor));
    });

    // Calculate in-degrees for each node
    const inDegree = new Map<T, number>();
    nodes.forEach(node => inDegree.set(node, 0)); // Initialize to 0
    
    graph.forEach(neighbors => {
        neighbors.forEach(neighbor => {
            inDegree.set(neighbor, (inDegree.get(neighbor) || 0) + 1);
        });
    });

    // Initialize queue with nodes having 0 in-degree
    const queue: T[] = [];
    inDegree.forEach((degree, node) => {
        if (degree === 0) queue.push(node);
    });

    const sorted: T[] = [];

