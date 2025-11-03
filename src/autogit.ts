interface GraphNode {
    id: string;
    value: any;
    neighbors: string[];
}

class BreadthLimitedSearch<T> {
    private graph: Map<string, GraphNode>;
    private visited: Set<string>;

    constructor(graph: Map<string, GraphNode>) {
        this.graph = graph;
        this.visited = new Set();
    }

    search(startId: string, targetId: string, maxDepth: number): GraphNode | null {
        this.visited.clear();
        
        if (!this.graph.has(startId) || !this.graph.has(targetId)) {
            return null;
        }

        const queue: { node: GraphNode; depth: number }[] = [];
        queue.push({ node: this.graph.get(startId)!, depth: 0 });
        this.visited.add(startId);

        while (queue.length > 0) {
            const { node, depth } = queue.shift()!;

            if (node.id === targetId) {
                return node;
            }

            if (depth >= maxDepth) {
                continue;
            }

            for (const neighborId of node.neighbors) {
                if (!this.visited.has(neighborId) && this.graph.has(neighborId)) {
                    this.visited.add(neighborId);
                    queue.push({ 
                        node: this.graph.get(neighborId)!, 
                        depth: depth + 1 
                    });
                }
            }
        }

        return null;
    }

    // Find all nodes within depth limit
    findAllWithinDepth(startId: string, maxDepth: number): GraphNode[] {
        this.visited.clear();
        const result: GraphNode[] = [];

        if (!this.graph.has(startId)) {
            return result;
        }

        const queue: { node: GraphNode; depth: number }[] = [];
        queue.push({ node: this.graph.get(startId)!, depth: 0 });
        this.visited.add(startId);

        while (queue.length > 0) {
            const { node, depth } = queue.shift()!;
            result.push(node);

            if (depth >= maxDepth) {
                continue;
            }

            for (const neighborId of node.neighbors) {
                if (!this.visited.has(neighborId) && this.graph.has(neighborId)) {
                    this.visited.add(neighborId);
                    queue.push({ 
                        node: this.graph.get(neighborId)!, 
                        depth: depth + 1 
                    });
                }
            }
        }

        return result;
    }
}
interface TreeNode<T> {
    value: T;
    children: TreeNode<T>[];
}

class TreeBreadthLimitedSearch<T> {
    search(root: TreeNode<T>, targetValue: T, maxDepth: number): TreeNode<T> | null {
        const queue: { node: TreeNode<T>; depth: number }[] = [];
        queue.push({ node: root, depth: 0 });

        while (queue.length > 0) {
            const { node, depth } = queue.shift()!;

            if (node.value === targetValue) {
                return node;
            }

            if (depth >= maxDepth) {
                continue;
            }

            for (const child of node.children) {
                queue.push({ node: child, depth: depth + 1 });
            }
        }

        return null;
    }

    // Find all nodes within depth limit
    findAllWithinDepth(root: TreeNode<T>, maxDepth: number): TreeNode<T>[] {
        const result: TreeNode<T>[] = [];
        const queue: { node: TreeNode<T>; depth: number }[] = [];
        queue.push({ node: root, depth: 0 });

        while (queue.length > 0) {
            const { node, depth } = queue.shift()!;
            result.push(node);

            if (depth >= maxDepth) {
                continue;
            }

            for (const child of node.children) {
                queue.push({ node: child, depth: depth + 1 });
            }
        }

        return result;
    }
}
// Example usage with graph
const graph = new Map<string, GraphNode>();
graph.set('A', { id: 'A', value: 'Apple', neighbors: ['B', 'C'] });
graph.set('B', { id: 'B', value: 'Banana', neighbors: ['A', 'D', 'E'] });
graph.set('C', { id: 'C', value: 'Cherry', neighbors: ['A', 'F'] });
graph.set('D', { id: 'D', value: 'Date', neighbors: ['B'] });
graph.set('E', { id: 'E', value: 'Elderberry', neighbors: ['B'] });
graph.set('F', { id: 'F', value: 'Fig', neighbors: ['C'] });

const bfs = new BreadthLimitedSearch<string>(graph);
const result = bfs.search('A', 'F', 2); // Max depth: 2
console.log(result); // Returns node F

// Example usage with tree
const tree: TreeNode<string> = {
    value: 'Root',
    children: [
        {
            value: 'Child1',
            children: [
                { value: 'Grandchild1', children: [] },
                { value: 'Grandchild2', children: [] }
            ]
        },
        {
            value: 'Child2',
            children: [
                { value: 'Grandchild3', children: [] }
            ]
        }
    ]
};

const treeSearch = new TreeBreadthLimitedSearch<string>();
const treeResult = treeSearch.search(tree, 'Grandchild3', 2);
console.log(treeResult); // Returns Grandchild3 node
class GenericBreadthLimitedSearch<T> {
    search(
        start: T,
        getNeighbors: (node: T) => T[],
        isTarget: (node: T) => boolean,
        maxDepth: number
    ): T | null {
        const visited = new Set<T>();
        const queue: { node: T; depth: number }[] = [];
        
        queue.push({ node: start, depth: 0 });
        visited.add(start);

        while (queue.length > 0) {
            const { node, depth } = queue.shift()!;

            if (isTarget(node)) {
                return node;
            }

            if (depth >= maxDepth) {
                continue;
            }

            const neighbors = getNeighbors(node);
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push({ node: neighbor, depth: depth + 1 });
                }
            }
        }

        return null;
    }
}
