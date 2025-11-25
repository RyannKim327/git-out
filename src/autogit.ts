interface TreeNode<T> {
    value: T;
    children: TreeNode<T>[];
}

function breadthLimitedTreeSearch<T>(
    root: TreeNode<T>,
    maxDepth: number,
    targetValue: T
): TreeNode<T> | null {
    if (maxDepth < 0) return null;
    
    const queue: { node: TreeNode<T>; depth: number }[] = [];
    queue.push({ node: root, depth: 0 });

    while (queue.length > 0) {
        const { node, depth } = queue.shift()!;
        
        // Check if current node is the target
        if (node.value === targetValue) {
            return node;
        }

        // Only process children if we haven't reached max depth
        if (depth < maxDepth) {
            for (const child of node.children) {
                queue.push({ node: child, depth: depth + 1 });
            }
        }
    }

    return null;
}
interface GraphNode<T> {
    value: T;
    neighbors: GraphNode<T>[];
}

function breadthLimitedGraphSearch<T>(
    start: GraphNode<T>,
    maxDepth: number,
    targetValue: T,
    isDirected: boolean = false
): GraphNode<T> | null {
    if (maxDepth < 0) return null;
    
    const queue: { node: GraphNode<T>; depth: number }[] = [];
    const visited = new Set<GraphNode<T>>();
    
    queue.push({ node: start, depth: 0 });
    visited.add(start);

    while (queue.length > 0) {
        const { node, depth } = queue.shift()!;
        
        if (node.value === targetValue) {
            return node;
        }

        if (depth < maxDepth) {
            for (const neighbor of node.neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push({ node: neighbor, depth: depth + 1 });
                }
            }
        }
    }

    return null;
}
interface SearchResult<T> {
    node: TreeNode<T> | GraphNode<T>;
    depth: number;
    path: T[];
}

function breadthLimitedSearchWithPath<T>(
    start: TreeNode<T> | GraphNode<T>,
    maxDepth: number,
    targetValue: T,
    isGraph: boolean = false
): SearchResult<T> | null {
    if (maxDepth < 0) return null;
    
    const visited = isGraph ? new Set<GraphNode<T>>() : undefined;
    const queue: { 
        node: TreeNode<T> | GraphNode<T>; 
        depth: number; 
        path: T[] 
    }[] = [];
    
    queue.push({ node: start, depth: 0, path: [start.value] });
    if (isGraph) visited!.add(start as GraphNode<T>);

    while (queue.length > 0) {
        const { node, depth, path } = queue.shift()!;
        
        if (node.value === targetValue) {
            return { node, depth, path };
        }

        if (depth < maxDepth) {
            const neighbors = isGraph 
                ? (node as GraphNode<T>).neighbors 
                : (node as TreeNode<T>).children;
            
            for (const neighbor of neighbors) {
                // For graphs, check if already visited
                if (isGraph && visited!.has(neighbor as GraphNode<T>)) {
                    continue;
                }
                
                const newPath = [...path, neighbor.value];
                queue.push({ 
                    node: neighbor, 
                    depth: depth + 1, 
                    path: newPath 
                });
                
                if (isGraph) {
                    visited!.add(neighbor as GraphNode<T>);
                }
            }
        }
    }

    return null;
}
// Example 1: Tree Search
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

const result1 = breadthLimitedTreeSearch(tree, 2, 5);
console.log(result1?.value); // 5

// Example 2: Graph Search
const nodeA: GraphNode<string> = { value: 'A', neighbors: [] };
const nodeB: GraphNode<string> = { value: 'B', neighbors: [] };
const nodeC: GraphNode<string> = { value: 'C', neighbors: [] };

nodeA.neighbors = [nodeB, nodeC];
nodeB.neighbors = [nodeA];
nodeC.neighbors = [nodeA];

const result2 = breadthLimitedGraphSearch(nodeA, 2, 'C');
console.log(result2?.value); // 'C'

// Example 3: With Path Tracking
const result3 = breadthLimitedSearchWithPath(tree, 2, 5, false);
console.log(result3?.path); // [1, 2, 5]
class BreadthLimitedSearch<T> {
    constructor(private maxDepth: number) {}
    
    searchTree(
        root: TreeNode<T>,
        targetValue: T,
        predicate?: (node: TreeNode<T>) => boolean
    ): TreeNode<T> | null {
        const queue: { node: TreeNode<T>; depth: number }[] = [];
        queue.push({ node: root, depth: 0 });

        while (queue.length > 0) {
            const { node, depth } = queue.shift()!;
            
            const matches = predicate ? predicate(node) : node.value === targetValue;
            if (matches) {
                return node;
            }

            if (depth < this.maxDepth) {
                for (const child of node.children) {
                    queue.push({ node: child, depth: depth + 1 });
                }
            }
        }

        return null;
    }
}

// Usage
const searcher = new BreadthLimitedSearch<number>(3);
const result = searcher.searchTree(tree, 7);
console.log(result?.value); // 7
