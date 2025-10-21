interface TreeNode {
    value: number;
    children: TreeNode[];
}

function dfsTree(node: TreeNode | null): number[] {
    const result: number[] = [];
    
    function traverse(current: TreeNode): void {
        if (!current) return;
        
        // Pre-order traversal (root -> left -> right)
        result.push(current.value);
        
        for (const child of current.children) {
            traverse(child);
        }
    }
    
    if (node) traverse(node);
    return result;
}

// Alternative iterative implementation
function dfsTreeIterative(root: TreeNode | null): number[] {
    const result: number[] = [];
    const stack: TreeNode[] = [];
    
    if (root) stack.push(root);
    
    while (stack.length > 0) {
        const current = stack.pop()!;
        result.push(current.value);
        
        // Push children in reverse order for DFS
        for (let i = current.children.length - 1; i >= 0; i--) {
            stack.push(current.children[i]);
        }
    }
    
    return result;
}
interface Graph {
    adjacencyList: Map<number, number[]>;
}

function dfsGraph(graph: Graph, start: number): number[] {
    const visited: Set<number> = new Set();
    const result: number[] = [];
    
    function dfs(node: number): void {
        if (visited.has(node)) return;
        
        visited.add(node);
        result.push(node);
        
        const neighbors = graph.adjacencyList.get(node) || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                dfs(neighbor);
            }
        }
    }
    
    dfs(start);
    return result;
}

// Alternative iterative implementation
function dfsGraphIterative(graph: Graph, start: number): number[] {
    const visited: Set<number> = new Set();
    const result: number[] = [];
    const stack: number[] = [start];
    
    while (stack.length > 0) {
        const node = stack.pop()!;
        
        if (!visited.has(node)) {
            visited.add(node);
            result.push(node);
            
            const neighbors = graph.adjacencyList.get(node) || [];
            // Push neighbors in reverse order for DFS
            for (let i = neighbors.length - 1; i >= 0; i--) {
                if (!visited.has(neighbors[i])) {
                    stack.push(neighbors[i]);
                }
            }
        }
    }
    
    return result;
}
// Tree example
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
                { value: 6, children: [] },
                { value: 7, children: [] }
            ]
        }
    ]
};

console.log('Tree DFS (recursive):', dfsTree(tree));
console.log('Tree DFS (iterative):', dfsTreeIterative(tree));

// Graph example
const graph: Graph = {
    adjacencyList: new Map([
        [1, [2, 3]],
        [2, [4, 5]],
        [3, [6, 7]],
        [4, []],
        [5, []],
        [6, []],
        [7, []]
    ])
};

console.log('Graph DFS (recursive):', dfsGraph(graph, 1));
console.log('Graph DFS (iterative):', dfsGraphIterative(graph, 1));
function dfsGeneric<T>(
    start: T,
    getNeighbors: (node: T) => T[],
    visitedKey?: (node: T) => string
): T[] {
    const visited = new Set<string>();
    const result: T[] = [];
    
    function dfs(node: T): void {
        const key = visitedKey ? visitedKey(node) : JSON.stringify(node);
        
        if (visited.has(key)) return;
        
        visited.add(key);
        result.push(node);
        
        const neighbors = getNeighbors(node);
        for (const neighbor of neighbors) {
            dfs(neighbor);
        }
    }
    
    dfs(start);
    return result;
}

// Usage example
const neighbors = (node: number) => graph.adjacencyList.get(node) || [];
console.log('Generic DFS:', dfsGeneric(1, neighbors));
