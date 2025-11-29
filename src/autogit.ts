interface Edge {
    from: number;
    to: number;
    weight: number;
}

interface Graph {
    vertices: number;
    edges: Edge[];
}

interface ShortestPathResult {
    distances: number[];
    predecessors: number[];
    hasNegativeCycle: boolean;
}

class BellmanFord {
    static findShortestPaths(graph: Graph, source: number): ShortestPathResult {
        const { vertices, edges } = graph;
        
        // Initialize distances and predecessors
        const distances: number[] = new Array(vertices).fill(Infinity);
        const predecessors: number[] = new Array(vertices).fill(-1);
        
        // Set source distance to 0
        distances[source] = 0;
        
        // Relax edges repeatedly
        for (let i = 0; i < vertices - 1; i++) {
            for (const edge of edges) {
                if (distances[edge.from] !== Infinity && 
                    distances[edge.from] + edge.weight < distances[edge.to]) {
                    distances[edge.to] = distances[edge.from] + edge.weight;
                    predecessors[edge.to] = edge.from;
                }
            }
        }
        
        // Check for negative cycles
        let hasNegativeCycle = false;
        for (const edge of edges) {
            if (distances[edge.from] !== Infinity && 
                distances[edge.from] + edge.weight < distances[edge.to]) {
                hasNegativeCycle = true;
                break;
            }
        }
        
        return { distances, predecessors, hasNegativeCycle };
    }
    
    // Utility method to reconstruct paths
    static getPath(predecessors: number[], target: number): number[] {
        const path: number[] = [];
        let current = target;
        
        while (current !== -1) {
            path.unshift(current);
            current = predecessors[current];
        }
        
        return path;
    }
}

// Example usage and test
function exampleUsage() {
    // Create a graph with 5 vertices
    const graph: Graph = {
        vertices: 5,
        edges: [
            { from: 0, to: 1, weight: 6 },
            { from: 0, to: 2, weight: 7 },
            { from: 1, to: 2, weight: 8 },
            { from: 1, to: 3, weight: 5 },
            { from: 1, to: 4, weight: -4 },
            { from: 2, to: 3, weight: -3 },
            { from: 2, to: 4, weight: 9 },
            { from: 3, to: 1, weight: -2 },
            { from: 4, to: 0, weight: 2 },
            { from: 4, to: 3, weight: 7 }
        ]
    };
    
    const source = 0;
    const result = BellmanFord.findShortestPaths(graph, source);
    
    console.log("Shortest distances from vertex", source);
    console.log(result.distances);
    
    console.log("\nPredecessors array:");
    console.log(result.predecessors);
    
    console.log("\nNegative cycle detected:", result.hasNegativeCycle);
    
    // Show paths to all vertices
    for (let i = 0; i < graph.vertices; i++) {
        const path = BellmanFord.getPath(result.predecessors, i);
        console.log(`Path to ${i}:`, path.join(" → "));
    }
}

// Run the example
exampleUsage();
class Graph {
    private vertices: number;
    private edges: Edge[];
    
    constructor(vertices: number) {
        this.vertices = vertices;
        this.edges = [];
    }
    
    addEdge(from: number, to: number, weight: number): void {
        this.edges.push({ from, to, weight });
    }
    
    findShortestPaths(source: number): ShortestPathResult {
        return BellmanFord.findShortestPaths({
            vertices: this.vertices,
            edges: this.edges
        }, source);
    }
}

// Usage example with class-based approach
function classBasedExample() {
    const graph = new Graph(5);
    
    graph.addEdge(0, 1, 6);
    graph.addEdge(0, 2, 7);
    graph.addEdge(1, 2, 8);
    graph.addEdge(1, 3, 5);
    graph.addEdge(1, 4, -4);
    graph.addEdge(2, 3, -3);
    graph.addEdge(2, 4, 9);
    graph.addEdge(3, 1, -2);
    graph.addEdge(4, 0, 2);
    graph.addEdge(4, 3, 7);
    
    const result = graph.findShortestPaths(0);
    console.log("Distances:", result.distances);
}
