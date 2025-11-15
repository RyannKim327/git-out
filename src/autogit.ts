interface TreeNode<T> {
    value: T;
    children: TreeNode<T>[];
}

class TreeDFS<T> {
    // Pre-order traversal (Root -> Left -> Right)
    preOrder(root: TreeNode<T> | null): T[] {
        const result: T[] = [];
        
        const traverse = (node: TreeNode<T> | null) => {
            if (!node) return;
            
            result.push(node.value); // Process current node
            for (const child of node.children) {
                traverse(child); // Recursively traverse children
            }
        };
        
        traverse(root);
        return result;
    }
    
    // Post-order traversal (Left -> Right -> Root)
    postOrder(root: TreeNode<T> | null): T[] {
        const result: T[] = [];
        
        const traverse = (node: TreeNode<T> | null) => {
            if (!node) return;
            
            for (const child of node.children) {
                traverse(child); // Recursively traverse children first
            }
            result.push(node.value); // Process current node last
        };
        
        traverse(root);
        return result;
    }
    
    // Iterative DFS using stack
    iterativeDFS(root: TreeNode<T> | null): T[] {
        if (!root) return [];
        
        const result: T[] = [];
        const stack: TreeNode<T>[] = [root];
        
        while (stack.length > 0) {
            const node = stack.pop()!;
            result.push(node.value);
            
            // Push children in reverse order to maintain left-to-right traversal
            for (let i = node.children.length - 1; i >= 0; i--) {
                stack.push(node.children[i]);
            }
        }
        
        return result;
    }
}
interface Graph {
    [key: string]: string[];
}

class GraphDFS {
    // Recursive DFS for graphs (handles cycles)
    recursiveDFS(graph: Graph, start: string): string[] {
        const visited: Set<string> = new Set();
        const result: string[] = [];
        
        const traverse = (node: string) => {
            if (visited.has(node)) return;
            
            visited.add(node);
            result.push(node);
            
            const neighbors = graph[node] || [];
            for (const neighbor of neighbors) {
                traverse(neighbor);
            }
        };
        
        traverse(start);
        return result;
    }
    
    // Iterative DFS for graphs using stack
    iterativeDFS(graph: Graph, start: string): string[] {
        const visited: Set<string> = new Set();
        const result: string[] = [];
        const stack: string[] = [start];
        
        while (stack.length > 0) {
            const node = stack.pop()!;
            
            if (!visited.has(node)) {
                visited.add(node);
                result.push(node);
                
                const neighbors = graph[node] || [];
                // Push neighbors in reverse order to maintain order
                for (let i = neighbors.length - 1; i >= 0; i--) {
                    if (!visited.has(neighbors[i])) {
                        stack.push(neighbors[i]);
                    }
                }
            }
        }
        
        return result;
    }
    
    // DFS with path tracking
    findPath(graph: Graph, start: string, target: string): string[] | null {
        const visited: Set<string> = new Set();
        const stack: { node: string; path: string[] }[] = [{ node: start, path: [start] }];
        
        while (stack.length > 0) {
            const { node, path } = stack.pop()!;
            
            if (node === target) {
                return path;
            }
            
            if (!visited.has(node)) {
                visited.add(node);
                
                const neighbors = graph[node] || [];
                for (const neighbor of neighbors) {
                    if (!visited.has(neighbor)) {
                        stack.push({
                            node: neighbor,
                            path: [...path, neighbor]
                        });
                    }
                }
            }
        }
        
        return null; // No path found
    }
}
// Tree DFS Example
const tree: TreeNode<number> = {
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

const treeDFS = new TreeDFS<number>();
console.log('Pre-order:', treeDFS.preOrder(tree)); // [1, 2, 4, 5, 3, 6, 7]
console.log('Post-order:', treeDFS.postOrder(tree)); // [4, 5, 2, 6, 7, 3, 1]
console.log('Iterative:', treeDFS.iterativeDFS(tree)); // [1, 2, 4, 5, 3, 6, 7]

// Graph DFS Example
const graph: Graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': ['F'],
    'F': []
};

const graphDFS = new GraphDFS();
console.log('Recursive DFS:', graphDFS.recursiveDFS(graph, 'A')); // ['A', 'B', 'D', 'E', 'F', 'C']
console.log('Iterative DFS:', graphDFS.iterativeDFS(graph, 'A')); // ['A', 'B', 'D', 'E', 'F', 'C']
console.log('Path A->F:', graphDFS.findPath(graph, 'A', 'F')); // ['A', 'B', 'E', 'F']
interface GraphNode<T> {
    value: T;
    neighbors: GraphNode<T>[];
}

class GenericDFS<T> {
    // Generic DFS that works with any graph structure
    traverse(
        start: GraphNode<T>,
        visitFn: (node: GraphNode<T>) => void,
        getNeighbors: (node: GraphNode<T>) => GraphNode<T>[]
    ): void {
        const visited = new Set<GraphNode<T>>();
        const stack: GraphNode<T>[] = [start];
        
        while (stack.length > 0) {
            const node = stack.pop()!;
            
            if (!visited.has(node)) {
                visited.add(node);
                visitFn(node);
                
                const neighbors = getNeighbors(node);
                for (let i = neighbors.length - 1; i >= 0; i--) {
                    if (!visited.has(neighbors[i])) {
                        stack.push(neighbors[i]);
                    }
                }
            }
        }
    }
}
