class TreeNode<T> {
    constructor(
        public value: T,
        public left: TreeNode<T> | null = null,
        public right: TreeNode<T> | null = null
    ) {}
}

class BinaryTree<T> {
    constructor(public root: TreeNode<T> | null = null) {}

    // Recursive DFS (Pre-order traversal)
    dfsRecursive(node: TreeNode<T> | null = this.root): T[] {
        if (!node) return [];
        
        const result: T[] = [];
        this.#dfsRecursiveHelper(node, result);
        return result;
    }

    #dfsRecursiveHelper(node: TreeNode<T>, result: T[]): void {
        result.push(node.value); // Visit node
        
        if (node.left) {
            this.#dfsRecursiveHelper(node.left, result);
        }
        
        if (node.right) {
            this.#dfsRecursiveHelper(node.right, result);
        }
    }

    // Iterative DFS using stack
    dfsIterative(): T[] {
        if (!this.root) return [];
        
        const result: T[] = [];
        const stack: TreeNode<T>[] = [this.root];
        
        while (stack.length > 0) {
            const node = stack.pop()!;
            result.push(node.value);
            
            // Push right first, then left (so left gets processed first)
            if (node.right) stack.push(node.right);
            if (node.left) stack.push(node.left);
        }
        
        return result;
    }
}

// Usage example
const tree = new BinaryTree<number>();
tree.root = new TreeNode(1);
tree.root.left = new TreeNode(2);
tree.root.right = new TreeNode(3);
tree.root.left.left = new TreeNode(4);
tree.root.left.right = new TreeNode(5);

console.log("Recursive DFS:", tree.dfsRecursive()); // [1, 2, 4, 5, 3]
console.log("Iterative DFS:", tree.dfsIterative()); // [1, 2, 4, 5, 3]
interface Graph<T> {
    [key: string]: T[];
}

class GraphDFS<T> {
    constructor(private graph: Graph<T>) {}

    // DFS for graph with cycle detection
    dfs(start: T): T[] {
        const visited = new Set<T>();
        const result: T[] = [];
        
        this.#dfsHelper(start, visited, result);
        return result;
    }

    #dfsHelper(node: T, visited: Set<T>, result: T[]): void {
        if (visited.has(node)) return;
        
        visited.add(node);
        result.push(node);
        
        const neighbors = this.graph[node as unknown as string] || [];
        for (const neighbor of neighbors) {
            this.#dfsHelper(neighbor, visited, result);
        }
    }

    // Iterative DFS for graph
    dfsIterative(start: T): T[] {
        const visited = new Set<T>();
        const result: T[] = [];
        const stack: T[] = [start];
        
        while (stack.length > 0) {
            const node = stack.pop()!;
            
            if (!visited.has(node)) {
                visited.add(node);
                result.push(node);
                
                const neighbors = this.graph[node as unknown as string] || [];
                // Push neighbors in reverse order to process in original order
                for (let i = neighbors.length - 1; i >= 0; i--) {
                    stack.push(neighbors[i]);
                }
            }
        }
        
        return result;
    }
}

// Usage example
const graph: Graph<string> = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': ['F'],
    'F': []
};

const graphDFS = new GraphDFS<string>(graph);
console.log("Graph DFS (recursive):", graphDFS.dfs('A')); // ['A', 'B', 'D', 'E', 'F', 'C']
console.log("Graph DFS (iterative):", graphDFS.dfsIterative('A')); // ['A', 'B', 'D', 'E', 'F', 'C']
interface GraphNode<T> {
    value: T;
    neighbors: GraphNode<T>[];
}

class GenericDFS<T> {
    // Generic DFS that accepts a custom visit function
    dfs(
        start: GraphNode<T>,
        visit: (node: GraphNode<T>) => void = (node) => console.log(node.value)
    ): void {
        const visited = new Set<GraphNode<T>>();
        this.#dfsHelper(start, visited, visit);
    }

    #dfsHelper(
        node: GraphNode<T>,
        visited: Set<GraphNode<T>>,
        visit: (node: GraphNode<T>) => void
    ): void {
        if (visited.has(node)) return;
        
        visited.add(node);
        visit(node);
        
        for (const neighbor of node.neighbors) {
            this.#dfsHelper(neighbor, visited, visit);
        }
    }

    // Find path between two nodes
    findPath(start: GraphNode<T>, target: T): T[] | null {
        const visited = new Set<GraphNode<T>>();
        const path: T[] = [];
        
        if (this.#findPathHelper(start, target, visited, path)) {
            return path;
        }
        
        return null;
    }

    #findPathHelper(
        node: GraphNode<T>,
        target: T,
        visited: Set<GraphNode<T>>,
        path: T[]
    ): boolean {
        if (visited.has(node)) return false;
        
        visited.add(node);
        path.push(node.value);
        
        if (node.value === target) return true;
        
        for (const neighbor of node.neighbors) {
            if (this.#findPathHelper(neighbor, target, visited, path)) {
                return true;
            }
        }
        
        path.pop();
        return false;
    }
}

// Usage example
const nodeA: GraphNode<string> = { value: 'A', neighbors: [] };
const nodeB: GraphNode<string> = { value: 'B', neighbors: [] };
const nodeC: GraphNode<string> = { value: 'C', neighbors: [] };

nodeA.neighbors = [nodeB, nodeC];
nodeB.neighbors = [nodeC];

const genericDFS = new GenericDFS<string>();
console.log("Path from A to C:", genericDFS.findPath(nodeA, 'C')); // ['A', 'B', 'C'] or ['A', 'C']
class TreeTraversal<T> {
    // Pre-order: Root -> Left -> Right
    preOrder(node: TreeNode<T> | null): T[] {
        if (!node) return [];
        return [
            node.value,
            ...this.preOrder(node.left),
            ...this.preOrder(node.right)
        ];
    }

    // In-order: Left -> Root -> Right
    inOrder(node: TreeNode<T> | null): T[] {
        if (!node) return [];
        return [
            ...this.inOrder(node.left),
            node.value,
            ...this.inOrder(node.right)
        ];
    }

    // Post-order: Left -> Right -> Root
    postOrder(node: TreeNode<T> | null): T[] {
        if (!node) return [];
        return [
            ...this.postOrder(node.left),
            ...this.postOrder(node.right),
            node.value
        ];
    }
}
