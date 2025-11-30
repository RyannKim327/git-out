interface TreeNode {
    value: number;
    children: TreeNode[];
}

function dfsRecursive(node: TreeNode | null): void {
    if (!node) return;
    
    console.log(node.value); // Process node
    
    for (const child of node.children) {
        dfsRecursive(child);
    }
}

// Example usage:
const tree: TreeNode = {
    value: 1,
    children: [
        {
            value: 2,
            children: [
                { value: 4, children: [] },
                { value: 5, children: [] }
            ]
        },
        {
            value: 3,
            children: [
                { value: 6, children: [] }
            ]
        }
    ]
};

dfsRecursive(tree);
interface Graph {
    [key: number]: number[];
}

function dfsIterative(graph: Graph, start: number): void {
    const visited: Set<number> = new Set();
    const stack: number[] = [start];
    
    visited.add(start);
    
    while (stack.length > 0) {
        const current = stack.pop()!;
        console.log(current); // Process node
        
        for (const neighbor of graph[current]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                stack.push(neighbor);
            }
        }
    }
}

// Example usage:
const graph: Graph = {
    1: [2, 3],
    2: [4, 5],
    3: [6],
    4: [],
    5: [],
    6: []
};

dfsIterative(graph, 1);
function dfsWithPath<T>(
    graph: Map<T, T[]>,
    start: T,
    processNode: (node: T, path: T[]) => void
): void {
    const visited: Set<T> = new Set();
    const stack: { node: T; path: T[] }[] = [{ node: start, path: [start] }];
    
    visited.add(start);
    
    while (stack.length > 0) {
        const { node, path } = stack.pop()!;
        processNode(node, path);
        
        for (const neighbor of graph.get(node) || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                stack.push({
                    node: neighbor,
                    path: [...path, neighbor]
                });
            }
        }
    }
}

// Example usage:
const graphMap = new Map<number, number[]>([
    [1, [2, 3]],
    [2, [4, 5]],
    [3, [6]],
    [4, []],
    [5, []],
    [6, []]
]);

dfsWithPath(graphMap, 1, (node, path) => {
    console.log(`Node: ${node}, Path: ${path.join(' → ')}`);
});
class DFS<T> {
    constructor(private graph: Map<T, T[]>) {}
    
    // Pre-order traversal
    traverse(start: T, callback: (node: T) => void): void {
        const visited = new Set<T>();
        this.#dfsRecursive(start, visited, callback);
    }
    
    #dfsRecursive(node: T, visited: Set<T>, callback: (node: T) => void): void {
        if (visited.has(node)) return;
        
        visited.add(node);
        callback(node);
        
        for (const neighbor of this.graph.get(node) || []) {
            this.#dfsRecursive(neighbor, visited, callback);
        }
    }
    
    // Find path between two nodes
    findPath(start: T, end: T): T[] | null {
        const visited = new Set<T>();
        return this.#findPathRecursive(start, end, visited, [start]);
    }
    
    #findPathRecursive(
        current: T,
        end: T,
        visited: Set<T>,
        path: T[]
    ): T[] | null {
        if (current === end) return path;
        
        visited.add(current);
        
        for (const neighbor of this.graph.get(current) || []) {
            if (!visited.has(neighbor)) {
                const newPath = this.#findPathRecursive(
                    neighbor,
                    end,
                    visited,
                    [...path, neighbor]
                );
                if (newPath) return newPath;
            }
        }
        
        return null;
    }
}

// Example usage:
const graph = new Map<number, number[]>([
    [1, [2, 3]],
    [2, [4, 5]],
    [3, [6]],
    [4, [7]],
    [5, []],
    [6, []],
    [7, []]
]);

const dfs = new DFS(graph);
dfs.traverse(1, node => console.log(node));

const path = dfs.findPath(1, 7);
console.log('Path to 7:', path);
interface BinaryTreeNode {
    value: number;
    left: BinaryTreeNode | null;
    right: BinaryTreeNode | null;
}

function dfsBinaryTree(
    node: BinaryTreeNode | null,
    order: 'preorder' | 'inorder' | 'postorder' = 'preorder'
): void {
    if (!node) return;
    
    if (order === 'preorder') console.log(node.value);
    
    dfsBinaryTree(node.left, order);
    
    if (order === 'inorder') console.log(node.value);
    
    dfsBinaryTree(node.right, order);
    
    if (order === 'postorder') console.log(node.value);
}

// Example usage:
const binaryTree: BinaryTreeNode = {
    value: 1,
    left: {
        value: 2,
        left: { value: 4, left: null, right: null },
        right: { value: 5, left: null, right: null }
    },
    right: {
        value: 3,
        left: { value: 6, left: null, right: null },
        right: null
    }
};

console.log('Pre-order:');
dfsBinaryTree(binaryTree, 'preorder');

console.log('In-order:');
dfsBinaryTree(binaryTree, 'inorder');

console.log('Post-order:');
dfsBinaryTree(binaryTree, 'postorder');
