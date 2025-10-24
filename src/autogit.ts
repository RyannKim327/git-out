interface Edge {
    from: number;
    to: number;
    weight: number;
}

interface BellmanFordResult {
    distances: number[];
    predecessors: number[];
    hasNegativeCycle: boolean;
    negativeCycle?: number[];
}

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

    bellmanFord(start: number): BellmanFordResult {
        // Initialize distances and predecessors
        const distances: number[] = new Array(this.vertices).fill(Infinity);
        const predecessors: number[] = new Array(this.vertices).fill(-1);
        
        distances[start] = 0;

        // Relax edges repeatedly
        for (let i = 0; i < this.vertices - 1; i++) {
            let updated = false;
            
            for (const edge of this.edges) {
                if (distances[edge.from] + edge.weight < distances[edge.to]) {
                    distances[edge.to] = distances[edge.from] + edge.weight;
                    predecessors[edge.to] = edge.from;
                    updated = true;
                }
            }
            
            // Early termination if no updates
            if (!updated) break;
        }

        // Check for negative cycles
        const hasNegativeCycle = this.checkNegativeCycle(distances);
        
        let negativeCycle: number[] = [];
        if (hasNegativeCycle) {
            negativeCycle = this.findNegativeCycle(predecessors);
        }

        return {
            distances,
            predecessors,
            hasNegativeCycle,
            negativeCycle
        };
    }

    private checkNegativeCycle(distances: number[]): boolean {
        for (const edge of this.edges) {
            if (distances[edge.from] + edge.weight < distances[edge.to]) {
                return true;
            }
        }
        return false;
    }

    private findNegativeCycle(predecessors: number[]): number[] {
        // Additional step to identify the negative cycle
        // This is a simplified approach - in practice you might need a more robust method
        const visited = new Array(this.vertices).fill(false);
        const cycle: number[] = [];
        
        // Find a node that's part of a negative cycle
        for (let i = 0; i < this.vertices; i++) {
            if (!visited[i]) {
                const path = this.traverseUntilCycle(i, predecessors, visited);
                if (path.length > 0) {
                    return path;
                }
            }
        }
        
        return cycle;
    }

    private traverseUntilCycle(node: number, predecessors: number[], visited: boolean[]): number[] {
        const path: number[] = [];
        const seen = new Set<number>();
        let current = node;
        
        while (current !== -1 && !visited[current]) {
            if (seen.has(current)) {
                // Found a cycle, extract it
                const cycleStartIndex = path.indexOf(current);
                return path.slice(cycleStartIndex);
            }
            
            seen.add(current);
            path.push(current);
            visited[current] = true;
            current = predecessors[current];
        }
        
        return [];
    }

    getPath(predecessors: number[], target: number): number[] {
        const path: number[] = [];
        let current = target;
        
        while (current !== -1) {
            path.unshift(current);
            current = predecessors[current];
        }
        
        return path;
    }
}
// Example usage
function demonstrateBellmanFord(): void {
    const graph = new Graph(5);
    
    // Add edges (from, to, weight)
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

    const result = graph.bellmanFord(0);

    console.log("Distances:", result.distances);
    console.log("Has negative cycle:", result.hasNegativeCycle);
    
    if (result.hasNegativeCycle) {
        console.log("Negative cycle found:", result.negativeCycle);
    } else {
        // Show paths to all vertices
        for (let i = 0; i < 5; i++) {
            const path = graph.getPath(result.predecessors, i);
            console.log(`Path to ${i}: ${path.join(' -> ')}`);
        }
    }
}

// Run the demonstration
demonstrateBellmanFord();
class EnhancedBellmanFord {
    static run(vertices: number, edges: Edge[], start: number): BellmanFordResult {
        const distances: number[] = new Array(vertices).fill(Infinity);
        const predecessors: number[] = new Array(vertices).fill(-1);
        distances[start] = 0;

        // Relax all edges |V| - 1 times
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
        for (const edge of edges) {
            if (distances[edge.from] !== Infinity && 
                distances[edge.from] + edge.weight < distances[edge.to]) {
                // Negative cycle found
                const cycle = this.findCycle(predecessors, edge.to);
                return {
                    distances,
                    predecessors,
                    hasNegativeCycle: true,
                    negativeCycle: cycle
                };
            }
        }

        return {
            distances,
            predecessors,
            hasNegativeCycle: false
        };
    }

    private static findCycle(predecessors: number[], startNode: number): number[] {
        // Use a visited array to reconstruct the cycle
        const visited = new Array(predecessors.length).fill(false);
        let current = startNode;
        const cycle: number[] = [];

        // Find a node that leads back to itself
        while (!visited[current]) {
            visited[current] = true;
            cycle.push(current);
            current = predecessors[current];
            
            if (current === -1) break;
        }

        // Extract the cycle portion
        const cycleStart = cycle.indexOf(current);
        return cycle.slice(cycleStart);
    }
}
