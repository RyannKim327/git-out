interface TreeNode<T> {
    value: T;
    left?: TreeNode<T>;
    right?: TreeNode<T>;
}

class BinaryTreeDFS<T> {
    // Recursive DFS (Pre-order traversal)
    dfsRecursive(node: TreeNode<T> | undefined, result: T[] = []): T[] {
        if (!node) return result;
        
        result.push(node.value); // Visit node
        this.dfsRecursive(node.left, result); // Traverse left
        this.dfsRecursive(node.right, result); // Traverse right
        
        return result;
    }

    // Iterative DFS using stack
    dfsIterative(root: TreeNode<T>): T[] {
        const result: T[] = [];
        const stack: TreeNode<T>[] = [root];
        
        while (stack.length > 0) {
            const current = stack.pop()!;
            result.push(current.value);
            
            // Push right first so left gets processed first (LIFO)
            if (current.right) stack.push(current.right);
            if (current.left) stack.push(current.left);
        }
        
        return result;
    }
}

// Usage example
const tree: TreeNode<number> = {
    value: 1,
    left: {
        value: 2,
        left: { value: 4 },
        right: { value: 5 }
    },
    right: {
        value: 3,
        left: { value: 6 },
        right: { value: 7 }
    }
};

const dfs = new BinaryTreeDFS<number>();
console.log("Recursive:", dfs.dfsRecursive(tree)); // [1, 2, 4, 5, 3, 6, 7]
console.log("Iterative:", dfs.dfsIterative(tree)); // [1, 2, 4, 5, 3, 6, 7]
interface Graph<T> {
    [node: string]: T[];
}

class GraphDFS<T> {
    // Recursive DFS with visited tracking
    dfsRecursive(
        graph: Graph<T>,
        start: string,
        visited: Set<string> = new Set(),
        result: T[] = []
    ): T[] {
        if (visited.has(start)) return result;
        
        visited.add(start);
        result.push(start as T);
        
        for (const neighbor of graph[start] || []) {
            if (!visited.has(neighbor as string)) {
                this.dfsRecursive(graph, neighbor as string, visited, result);
            }
        }
        
        return result;
    }

    // Iterative DFS using stack
    dfsIterative(graph: Graph<T>, start: string): T[] {
        const result: T[] = [];
        const visited = new Set<string>();
        const stack: string[] = [start];
        
        while (stack.length > 0) {
            const node = stack.pop()!;
            
            if (!visited.has(node)) {
                visited.add(node);
                result.push(node as T);
                
                // Add neighbors in reverse order to maintain DFS order
                const neighbors = graph[node] || [];
                for (let i = neighbors.length - 1; i >= 0; i--) {
                    const neighbor = neighbors[i] as string;
                    if (!visited.has(neighbor)) {
                        stack.push(neighbor);
                    }
                }
            }
        }
        
        return result;
    }

    // DFS with path finding
    findPath(
        graph: Graph<T>,
        start: string,
        end: string
    ): string[] | null {
        const stack: { node: string; path: string[] }[] = [
            { node: start, path: [start] }
        ];
        const visited = new Set<string>([start]);
        
        while (stack.length > 0) {
            const { node, path } = stack.pop()!;
            
            if (node === end) return path;
            
            for (const neighbor of graph[node] || []) {
                const neighborStr = neighbor as string;
                if (!visited.has(neighborStr)) {
                    visited.add(neighborStr);
                    stack.push({
                        node: neighborStr,
                        path: [...path, neighborStr]
                    });
                }
            }
        }
        
        return null;
    }
}

// Usage example
const graph: Graph<string> = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
};

const graphDFS = new GraphDFS<string>();
console.log("Recursive:", graphDFS.dfsRecursive(graph, 'A'));
console.log("Iterative:", graphDFS.dfsIterative(graph, 'A'));
console.log("Path A->F:", graphDFS.findPath(graph, 'A', 'F'));
class GenericDFS<T> {
    // Generic DFS that works with any graph structure
    traverse(
        start: T,
        getNeighbors: (node: T) => T[],
        visited?: Set<T>
    ): T[] {
        const result: T[] = [];
        const localVisited = visited || new Set<T>();
        
        const dfs = (node: T) => {
            if (localVisited.has(node)) return;
            
            localVisited.add(node);
            result.push(node);
            
            const neighbors = getNeighbors(node);
            for (const neighbor of neighbors) {
                if (!localVisited.has(neighbor)) {
                    dfs(neighbor);
                }
            }
        };
        
        dfs(start);
        return result;
    }
}

// Usage with custom data structure
const customGraph = new Map<string, string[]>([
    ['A', ['B', 'C']],
    ['B', ['A', 'D']],
    ['C', ['A', 'E']],
    ['D', ['B']],
    ['E', ['C']]
]);

const genericDFS = new GenericDFS<string>();
const result = genericDFS.traverse(
    'A',
    (node) => customGraph.get(node) || []
);
console.log("Generic DFS:", result);
