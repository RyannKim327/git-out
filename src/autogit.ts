interface Graph<T> {
    [key: string]: T[];
}

class BFS<T> {
    private graph: Graph<T>;
    
    constructor(graph: Graph<T>) {
        this.graph = graph;
    }
    
    /**
     * Perform BFS starting from a given node
     * @param startNode The starting node for BFS
     * @returns Array of nodes in BFS order
     */
    search(startNode: string): T[] {
        const visited: Set<string> = new Set();
        const queue: string[] = [startNode];
        const result: T[] = [];
        
        visited.add(startNode);
        
        while (queue.length > 0) {
            const currentNode = queue.shift()!;
            result.push(currentNode as unknown as T);
            
            const neighbors = this.graph[currentNode] || [];
            
            for (const neighbor of neighbors) {
                const neighborKey = String(neighbor);
                if (!visited.has(neighborKey)) {
                    visited.add(neighborKey);
                    queue.push(neighborKey);
                }
            }
        }
        
        return result;
    }
    
    /**
     * Find shortest path between two nodes using BFS
     * @param startNode Starting node
     * @param targetNode Target node
     * @returns Array representing the shortest path or empty array if no path exists
     */
    findShortestPath(startNode: string, targetNode: string): string[] {
        const visited: Set<string> = new Set();
        const queue: { node: string; path: string[] }[] = [{ node: startNode, path: [startNode] }];
        
        visited.add(startNode);
        
        while (queue.length > 0) {
            const { node, path } = queue.shift()!;
            
            if (node === targetNode) {
                return path;
            }
            
            const neighbors = this.graph[node] || [];
            
            for (const neighbor of neighbors) {
                const neighborKey = String(neighbor);
                if (!visited.has(neighborKey)) {
                    visited.add(neighborKey);
                    queue.push({ 
                        node: neighborKey, 
                        path: [...path, neighborKey] 
                    });
                }
            }
        }
        
        return []; // No path found
    }
}
// Example 1: Number-based graph
const numberGraph: Graph<number> = {
    '1': [2, 3],
    '2': [4, 5],
    '3': [6],
    '4': [],
    '5': [7],
    '6': [],
    '7': []
};

const bfs = new BFS<number>(numberGraph);

// Perform BFS
console.log('BFS Traversal:', bfs.search('1')); 
// Output: [1, 2, 3, 4, 5, 6, 7]

// Find shortest path
console.log('Shortest path from 1 to 7:', bfs.findShortestPath('1', '7'));
// Output: [1, 2, 5, 7]

// Example 2: String-based graph
const stringGraph: Graph<string> = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': ['G'],
    'F': [],
    'G': []
};

const stringBFS = new BFS<string>(stringGraph);
console.log('BFS Traversal:', stringBFS.search('A'));
// Output: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
interface Node {
    id: string;
    // Add other properties as needed
}

class GenericBFS<T extends Node> {
    private adjacencyList: Map<string, T[]>;
    
    constructor() {
        this.adjacencyList = new Map();
    }
    
    addNode(node: T): void {
        if (!this.adjacencyList.has(node.id)) {
            this.adjacencyList.set(node.id, []);
        }
    }
    
    addEdge(from: T, to: T): void {
        if (!this.adjacencyList.has(from.id)) {
            this.addNode(from);
        }
        if (!this.adjacencyList.has(to.id)) {
            this.addNode(to);
        }
        
        this.adjacencyList.get(from.id)!.push(to);
    }
    
    bfs(startNodeId: string): T[] {
        const visited: Set<string> = new Set();
        const queue: string[] = [startNodeId];
        const result: T[] = [];
        
        visited.add(startNodeId);
        
        while (queue.length > 0) {
            const currentNodeId = queue.shift()!;
            
            // Find the node object (you might want to store nodes separately)
            const neighbors = this.adjacencyList.get(currentNodeId) || [];
            
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor.id)) {
                    visited.add(neighbor.id);
                    queue.push(neighbor.id);
                    result.push(neighbor);
                }
            }
        }
        
        return result;
    }
}

// Usage with custom node type
interface City extends Node {
    name: string;
    population: number;
}

const cityBFS = new GenericBFS<City>();

const cities: City[] = [
    { id: 'NYC', name: 'New York', population: 8500000 },
    { id: 'LA', name: 'Los Angeles', population: 4000000 },
    { id: 'CHI', name: 'Chicago', population: 2700000 },
];

cities.forEach(city => cityBFS.addNode(city));
cityBFS.addEdge(cities[0], cities[1]);
cityBFS.addEdge(cities[0], cities[2]);

console.log('BFS result:', cityBFS.bfs('NYC'));
