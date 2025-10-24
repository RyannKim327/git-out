interface TreeNode<T> {
    value: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
}

function bfsTree<T>(root: TreeNode<T> | null): T[] {
    if (!root) return [];
    
    const result: T[] = [];
    const queue: TreeNode<T>[] = [root];
    
    while (queue.length > 0) {
        const currentNode = queue.shift()!;
        result.push(currentNode.value);
        
        if (currentNode.left) queue.push(currentNode.left);
        if (currentNode.right) queue.push(currentNode.right);
    }
    
    return result;
}

// Usage example
const tree: TreeNode<number> = {
    value: 1,
    left: {
        value: 2,
        left: { value: 4, left: null, right: null },
        right: { value: 5, left: null, right: null }
    },
    right: {
        value: 3,
        left: { value: 6, left: null, right: null },
        right: { value: 7, left: null, right: null }
    }
};

console.log(bfsTree(tree)); // [1, 2, 3, 4, 5, 6, 7]
interface Graph {
    [key: string]: string[];
}

function bfsGraph(graph: Graph, startNode: string): string[] {
    const visited: Set<string> = new Set();
    const result: string[] = [];
    const queue: string[] = [startNode];
    visited.add(startNode);
    
    while (queue.length > 0) {
        const currentNode = queue.shift()!;
        result.push(currentNode);
        
        for (const neighbor of graph[currentNode]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    
    return result;
}

// Usage example
const graph: Graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
};

console.log(bfsGraph(graph, 'A')); // ['A', 'B', 'C', 'D', 'E', 'F']
function bfsGeneric<T>(
    startNode: T,
    getNeighbors: (node: T) => T[],
    processNode?: (node: T) => void
): T[] {
    const visited: Set<T> = new Set();
    const result: T[] = [];
    const queue: T[] = [startNode];
    visited.add(startNode);
    
    while (queue.length > 0) {
        const currentNode = queue.shift()!;
        result.push(currentNode);
        
        // Optional callback for processing
        if (processNode) {
            processNode(currentNode);
        }
        
        const neighbors = getNeighbors(currentNode);
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    
    return result;
}

// Usage example
const graphNodes = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'E'],
    'D': ['B'],
    'E': ['C']
};

const getNeighbors = (node: string) => graphNodes[node] || [];
console.log(bfsGeneric('A', getNeighbors)); // ['A', 'B', 'C', 'D', 'E']
function bfsShortestPath<T>(
    graph: Map<T, T[]>,
    start: T,
    end: T
): T[] | null {
    const visited: Set<T> = new Set();
    const queue: T[][] = [[start]];
    visited.add(start);
    
    while (queue.length > 0) {
        const path = queue.shift()!;
        const node = path[path.length - 1];
        
        if (node === end) return path;
        
        const neighbors = graph.get(node) || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                const newPath = [...path, neighbor];
                queue.push(newPath);
            }
        }
    }
    
    return null;
}

// Usage example
const graphMap = new Map<string, string[]>([
    ['A', ['B', 'C']],
    ['B', ['A', 'D', 'E']],
    ['C', ['A', 'F']],
    ['D', ['B']],
    ['E', ['B', 'F']],
    ['F', ['C', 'E']]
]);

console.log(bfsShortestPath(graphMap, 'A', 'F')); // ['A', 'C', 'F']
