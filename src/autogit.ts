interface Graph {
    [node: string]: string[]; // Adjacency list representation
}

function bidirectionalBFS(graph: Graph, start: string, target: string): string[] | null {
    if (start === target) return [start];

    // Initialize forward search (from start)
    const forwardQueue: string[] = [start];
    const forwardVisited: { [key: string]: string | null } = { [start]: null };

    // Initialize backward search (from target)
    const backwardQueue: string[] = [target];
    const backwardVisited: { [key: string]: string | null } = { [target]: null };

    while (forwardQueue.length > 0 && backwardQueue.length > 0) {
        // Expand forward search
        const forwardMeeting = expandLevel(graph, forwardQueue, forwardVisited, backwardVisited);
        if (forwardMeeting) {
            return mergePaths(forwardVisited, backwardVisited, forwardMeeting);
        }

        // Expand backward search
        const backwardMeeting = expandLevel(graph, backwardQueue, backwardVisited, forwardVisited);
        if (backwardMeeting) {
            return mergePaths(forwardVisited, backwardVisited, backwardMeeting);
        }
    }

    return null; // No path exists
}

function expandLevel(
    graph: Graph,
    queue: string[],
    currentVisited: { [key: string]: string | null },
    oppositeVisited: { [key: string]: string | null }
): string | null {
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
        const currentNode = queue.shift()!;
        
        for (const neighbor of graph[currentNode]) {
            if (!(neighbor in currentVisited)) {
                currentVisited[neighbor] = currentNode;
                queue.push(neighbor);
                
                // Check if this node exists in the opposite search
                if (neighbor in oppositeVisited) {
                    return neighbor; // Found meeting point
                }
            }
        }
    }
    return null; // No meeting point in this expansion
}

function mergePaths(
    forwardVisited: { [key: string]:
