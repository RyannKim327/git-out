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
        
        if (currentNode.left) {
            queue.push(currentNode.left);
        }
        if (currentNode.right) {
            queue.push(currentNode.right);
        }
    }
    
    return result;
}
type Graph = Map<number, number[]>;

function bfsGraph(
    graph: Graph, 
    startNode: number
): { traversal: number[]; distances: Map<number, number> } {
    
    const visited = new Set<number>();
    const distances = new Map<number, number>();
    const traversal: number[] = [];
    const queue: number[] = [startNode];
    
    visited.add(startNode);
    distances.set(startNode, 0);
    
    while (queue.length > 0) {
        const currentNode = queue.shift()!;
        traversal.push(currentNode);
        
        const neighbors = graph.get(currentNode) || [];
        
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                distances.set(neighbor, distances.get(currentNode)! + 1);
                queue.push(neighbor);
            }
        }
    }
    
    return { traversal, distances };
}
function bfsWithPath(
    graph: Graph,
    startNode: number,
    targetNode: number
): number[] | null {
    
    const visited = new Set<number>();
    const queue: number[] = [startNode];
    const parent = new Map<number, number>();
    
    visited.add(startNode);
    parent.set(startNode, -1); // Start node has no parent
    
    while (queue.length > 0) {
        const currentNode = queue.shift()!;
        
        if (currentNode === targetNode) {
            return reconstructPath(parent, startNode, targetNode);
        }
        
        const neighbors = graph.get(currentNode) || [];
        
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                parent.set(neighbor, currentNode);
                queue.push(neighbor);
            }
        }
    }
    
    return null; // No path found
}

function reconstructPath(
    parent: Map<number, number>,
    start: number,
    target: number
): number[] {
    const path: number[] = [];
    let current: number = target;
    
    while (current !== -1) {
        path.unshift(current);
        current = parent.get(current)!;
    }
    
    return path[0] === start ? path : [];
}
interface BFSNode<T> {
    value: T;
    neighbors: T[];
}

function bfsGeneric<T>(
    startNode: T,
    getNeighbors: (node: T) => T[],
    visitedCallback?: (node: T) => void
): T[] {
    
    const visited = new Set<T>();
    const result: T[] = [];
    const queue: T[] = [startNode];
    
    visited.add(startNode);
    
    while (queue.length > 0) {
        const currentNode = queue.shift()!;
        result.push(currentNode);
        
        if (visitedCallback) {
            visitedCallback(currentNode);
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
// Example 1: Tree BFS
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

console.log("Tree BFS:", bfsTree(tree)); // [1, 2, 3, 4, 5, 6, 7]

// Example 2: Graph BFS
const graph: Graph = new Map([
    [0, [1, 2]],
    [1, [0, 3, 4]],
    [2, [0, 5]],
    [3, [1]],
    [4, [1]],
    [5, [2]]
]);

const graphResult = bfsGraph(graph, 0);
console.log("Graph BFS Traversal:", graphResult.traversal); // [0, 1, 2, 3, 4, 5]
console.log("Distances:", graphResult.distances);

// Example 3: Path finding
const path = bfsWithPath(graph, 0, 5);
console.log("Path from 0 to 5:", path); // [0, 2, 5]

// Example 4: Generic BFS
const cities = new Map<string, string[]>([
    ['NYC', ['Boston', 'Philly']],
    ['Boston', ['NYC', 'Chicago']],
    ['Philly', ['NYC', 'DC']],
    ['Chicago', ['Boston']],
    ['DC', ['Philly']]
]);

const cityTraversal = bfsGeneric(
    'NYC',
    (city) => cities.get(city) || []
);
console.log("City traversal:", cityTraversal);
