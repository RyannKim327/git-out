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
            result.push(node.value);
            node.children.forEach(child => traverse(child));
        };
        
        traverse(root);
        return result;
    }

    // Post-order traversal (Left -> Right -> Root)
    postOrder(root: TreeNode<T> | null): T[] {
        const result: T[] = [];
        
        const traverse = (node: TreeNode<T> | null) => {
            if (!node) return;
            node.children.forEach(child => traverse(child));
            result.push(node.value);
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
            
            // Push children in reverse order for pre-order traversal
            for (let i = node.children.length - 1; i >= 0; i--) {
                stack.push(node.children[i]);
            }
        }
        
        return result;
    }
}
interface Graph {
    [node: string]: string[];
}

class GraphDFS {
    // Recursive DFS for graph
    recursiveDFS(graph: Graph, start: string): string[] {
        const result: string[] = [];
        const visited: Set<string> = new Set();
        
        const dfs = (node: string) => {
            if (visited.has(node)) return;
            
            visited.add(node);
            result.push(node);
            
            for (const neighbor of graph[node] || []) {
                dfs(neighbor);
            }
        };
        
        dfs(start);
        return result;
    }

    // Iterative DFS for graph using stack
    iterativeDFS(graph: Graph, start: string): string[] {
        const result: string[] = [];
        const visited: Set<string> = new Set();
        const stack: string[] = [start];
        
        while (stack.length > 0) {
            const node = stack.pop()!;
            
            if (!visited.has(node)) {
                visited.add(node);
                result.push(node);
                
                // Add neighbors in reverse order
                const neighbors = graph[node] || [];
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
    findPath(graph: Graph, start: string, end: string): string[] | null {
        const stack: { node: string; path: string[] }[] = [{ node: start, path: [start] }];
        const visited: Set<string> = new Set([start]);
        
        while (stack.length > 0) {
            const { node, path } = stack.pop()!;
            
            if (node === end) {
                return path;
            }
            
            for (const neighbor of graph[node] || []) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    stack.push({
                        node: neighbor,
                        path: [...path, neighbor]
                    });
                }
            }
        }
        
        return null;
    }
}
// Tree example
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
console.log('Iterative:', treeDFS.iterativeDFS(tree)); // [1, 3, 7, 6, 2, 5, 4]

// Graph example
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
console.log('Iterative DFS:', graphDFS.iterativeDFS(graph, 'A')); // ['A', 'C', 'F', 'B', 'E', 'D']
console.log('Path A->F:', graphDFS.findPath(graph, 'A', 'F')); // ['A', 'C', 'F']
class GenericDFS<T> {
    // Generic DFS with callback functions
    traverse(
        start: T,
        getNeighbors: (node: T) => T[],
        onVisit?: (node: T) => void,
        onComplete?: () => void
    ): void {
        const visited: Set<T> = new Set();
        
        const dfs = (node: T) => {
            if (visited.has(node)) return;
            
            visited.add(node);
            onVisit?.(node);
            
            const neighbors = getNeighbors(node);
            for (const neighbor of neighbors) {
                dfs(neighbor);
            }
        };
        
        dfs(start);
        onComplete?.();
    }

    // DFS that returns all visited nodes
    getAllNodes(start: T, getNeighbors: (node: T) => T[]): T[] {
        const result: T[] = [];
        
        this.traverse(
            start,
            getNeighbors,
            (node) => result.push(node)
        );
        
        return result;
    }
}

// Usage example
const genericDFS = new GenericDFS<string>();
const nodes = genericDFS.getAllNodes(
    'A',
    (node) => graph[node] || []
);
console.log('All nodes:', nodes);
