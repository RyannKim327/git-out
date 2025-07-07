interface Graph {
    [key: string]: string[];
}

interface SearchResult {
    path: string[];
    found: boolean;
}

function bidirectionalSearch(graph: Graph, start: string, target: string): SearchResult {
    if (start === target) {
        return { path: [start], found: true };
    }

    // Initialize the forward and backward searches
    const forwardQueue: string[] = [start];
    const backwardQueue: string[] = [target];
    const forwardVisited: Set<string> = new Set([start]);
    const backwardVisited: Set<string> = new Set([target]);
    const forwardParent: Map<string, string | null> = new Map([[start, null]]);
    const backwardParent: Map<string, string | null> = new Map([[target, null]]);

    while (forwardQueue.length > 0 && backwardQueue.length > 0) {
        // Expand one node from the forward search
        const forwardResult = expandNode(graph, forwardQueue, forwardVisited, forwardParent);
        if (forwardResult) {
            const meetNode = forwardResult;
            if (backwardVisited.has(meetNode)) {
                return reconstructPath(meetNode, forwardParent, backwardParent);
            }
        }

        // Expand one node from the backward search
        const backwardResult = expandNode(graph, backwardQueue, backwardVisited, backwardParent);
        if (backwardResult) {
            const meetNode = backwardResult;
            if (forwardVisited.has(meetNode)) {
                return reconstructPath(meetNode, forwardParent, backwardParent);
            }
        }
    }

    return { path: [], found: false }; // No path found
}

function expandNode(
    graph: Graph, 
    queue: string[], 
    visited: Set<string>, 
    parent: Map<string, string | null>
): string | null {
    const currentNode = queue.shift();
    if (!currentNode) return null;

    for (const neighbor of graph[currentNode] || []) {
        if (!visited.has(neighbor)) {
            visited.add(neighbor);
            parent.set(neighbor, currentNode);
            queue.push(neighbor);
        }
    }

    return currentNode; // Return the current node for meeting point check
}

function reconstructPath(
    meetNode: string,
    forwardParent: Map<string, string | null>,
    backwardParent: Map<string, string | null>
): SearchResult {
    const path: string[] = [];
    let node: string | null = meetNode;

    // Reconstruct path from start to meetNode
    while (node !== null) {
        path.push(node);
        node = forwardParent.get(node) || null;
    }

    path.reverse(); // Reverse to get start to meetNode

    // Reconstruct path from target to meetNode
    node = backwardParent.get(meetNode);
    while (node !== null) {
        path.push(node);
        node = backwardParent.get(node) || null;
    }

    return { path, found: true };
}

// Example usage:
const graph: Graph = {
    A: ['B', 'C'],
    B: ['A', 'D', 'E'],
    C: ['A', 'F'],
    D: ['B'],
    E: ['B', 'F'],
    F: ['C', 'E'],
};

const result = bidirectionalSearch(graph, 'A', 'F');
console.log(result); // Outputs the path found, e.g., { path: ['A', 'C', 'F'], found: true }
