interface Node {
    id: string;
    neighbors: string[];
}

interface PathResult {
    path: string[];
    found: boolean;
}

class BidirectionalSearch {
    private graph: Map<string, Node>;
    
    constructor(graph: Map<string, Node>) {
        this.graph = graph;
    }
    
    /**
     * Performs bidirectional search between start and goal nodes
     */
    search(startId: string, goalId: string): PathResult {
        // Check if start or goal nodes exist
        if (!this.graph.has(startId) || !this.graph.has(goalId)) {
            return { path: [], found: false };
        }
        
        // If start and goal are the same
        if (startId === goalId) {
            return { path: [startId], found: true };
        }
        
        // Initialize queues and visited sets for both directions
        const queueForward: string[] = [startId];
        const queueBackward: string[] = [goalId];
        
        const visitedForward: Map<string, string> = new Map(); // child -> parent
        const visitedBackward: Map<string, string> = new Map(); // child -> parent
        
        visitedForward.set(startId, startId);
        visitedBackward.set(goalId, goalId);
        
        while (queueForward.length > 0 && queueBackward.length > 0) {
            // Search from forward direction
            const meetingNode = this.bfsStep(queueForward, visitedForward, visitedBackward, false);
            if (meetingNode) {
                return this.constructPath(meetingNode, visitedForward, visitedBackward);
            }
            
            // Search from backward direction
            const meetingNodeBack = this.bfsStep(queueBackward, visitedBackward, visitedForward, true);
            if (meetingNodeBack) {
                return this.constructPath(meetingNodeBack, visitedForward, visitedBackward);
            }
        }
        
        return { path: [], found: false };
    }
    
    /**
     * Performs one step of BFS in the specified direction
     */
    private bfsStep(
        queue: string[],
        visitedThisDirection: Map<string, string>,
        visitedOtherDirection: Map<string, string>,
        isBackward: boolean
    ): string | null {
        if (queue.length === 0) return null;
        
        const current = queue.shift()!;
        const currentNode = this.graph.get(current);
        
        if (!currentNode) return null;
        
        for (const neighborId of currentNode.neighbors) {
            // Skip if already visited in this direction
            if (visitedThisDirection.has(neighborId)) {
                continue;
            }
            
            // Check if this node has been visited from the other direction
            if (visitedOtherDirection.has(neighborId)) {
                return neighborId; // Meeting point found
            }
            
            // Mark as visited and add to queue
            visitedThisDirection.set(neighborId, current);
            queue.push(neighborId);
        }
        
        return null;
    }
    
    /**
     * Constructs the complete path from start to goal
     */
    private constructPath(
        meetingNode: string,
        visitedForward: Map<string, string>,
        visitedBackward: Map<string, string>
    ): PathResult {
        // Construct path from start to meeting node
        const forwardPath: string[] = [];
        let current: string | undefined = meetingNode;
        
        while (current && current !== visitedForward.get(current)) {
            forwardPath.unshift(current);
            current = visitedForward.get(current);
        }
        forwardPath.unshift(current!);
        
        // Construct path from meeting node to goal
        const backwardPath: string[] = [];
        current = visitedBackward.get(meetingNode);
        
        while (current && current !== visitedBackward.get(current)) {
            backwardPath.push(current);
            current = visitedBackward.get(current);
        }
        
        // Combine paths (remove duplicate meeting node)
        const fullPath = [...forwardPath, ...backwardPath];
        
        return { path: fullPath, found: true };
    }
}

// Example usage and test
function createTestGraph(): Map<string, Node> {
    const graph = new Map<string, Node>();
    
    // Create a sample graph
    graph.set('A', { id: 'A', neighbors: ['B', 'C'] });
    graph.set('B', { id: 'B', neighbors: ['A', 'D', 'E'] });
    graph.set('C', { id: 'C', neighbors: ['A', 'F'] });
    graph.set('D', { id: 'D', neighbors: ['B'] });
    graph.set('E', { id: 'E', neighbors: ['B', 'F'] });
    graph.set('F', { id: 'F', neighbors: ['C', 'E', 'G'] });
    graph.set('G', { id: 'G', neighbors: ['F'] });
    
    return graph;
}

// Test the implementation
function testBidirectionalSearch() {
    const graph = createTestGraph();
    const bfs = new BidirectionalSearch(graph);
    
    // Test cases
    const testCases = [
        { start: 'A', goal: 'G', expected: ['A', 'C', 'F', 'G'] },
        { start: 'A', goal: 'D', expected: ['A', 'B', 'D'] },
        { start: 'D', goal: 'G', expected: ['D', 'B', 'E', 'F', 'G'] },
        { start: 'X', goal: 'A', expected: [] }, // Non-existent node
    ];
    
    console.log('Testing Bidirectional Search:');
    console.log('============================');
    
    testCases.forEach((testCase, index) => {
        const result = bfs.search(testCase.start, testCase.goal);
        
        console.log(`Test ${index + 1}: ${testCase.start} -> ${testCase.goal}`);
        console.log(`Expected: ${testCase.expected.join(' -> ')}`);
        console.log(`Actual: ${result.path.join(' -> ')}`);
        console.log(`Found: ${result.found}`);
        console.log('---');
    });
}

// Run the test
testBidirectionalSearch();
interface GraphNode {
    id: string;
    neighbors: string[];
    // You can add more properties like weight, position, etc.
}

interface SearchResult {
    path: string[];
    nodesVisited: number;
    executionTime: number;
    found: boolean;
}

class EnhancedBidirectionalSearch {
    private graph: Map<string, GraphNode>;
    
    constructor(graph: Map<string, GraphNode>) {
        this.graph = graph;
    }
    
    /**
     * Enhanced bidirectional search with performance tracking
     */
    searchEnhanced(startId: string, goalId: string): SearchResult {
        const startTime = performance.now();
        let nodesVisited = 0;
        
        if (!this.graph.has(startId) || !this.graph.has(goalId)) {
            return {
                path: [],
                nodesVisited: 0,
                executionTime: performance.now() - startTime,
                found: false
            };
        }
        
        if (startId === goalId) {
            return {
                path: [startId],
                nodesVisited: 1,
                executionTime: performance.now() - startTime,
                found: true
            };
        }
        
        const queueForward: string[] = [startId];
        const queueBackward: string[] = [goalId];
        
        const visitedForward: Map<string, string> = new Map();
        const visitedBackward: Map<string, string> = new Map();
        
        visitedForward.set(startId, startId);
        visitedBackward.set(goalId, goalId);
        nodesVisited += 2;
        
        while (queueForward.length > 0 && queueBackward.length > 0) {
            // Search forward
            const forwardResult = this.bfsStepEnhanced(
                queueForward, 
                visitedForward, 
                visitedBackward, 
                false
            );
            nodesVisited += forwardResult.nodesProcessed;
            
            if (forwardResult.meetingNode) {
                return {
                    path: this.constructPathEnhanced(
                        forwardResult.meetingNode, 
                        visitedForward, 
                        visitedBackward
                    ),
                    nodesVisited,
                    executionTime: performance.now() - startTime,
                    found: true
                };
            }
            
            // Search backward
            const backwardResult = this.bfsStepEnhanced(
                queueBackward, 
                visitedBackward, 
                visitedForward, 
                true
            );
            nodesVisited += backwardResult.nodesProcessed;
            
            if (backwardResult.meetingNode) {
                return {
                    path: this.constructPathEnhanced(
                        backwardResult.meetingNode, 
                        visitedForward, 
                        visitedBackward
                    ),
                    nodesVisited,
                    executionTime: performance.now() - startTime,
                    found: true
                };
            }
        }
        
        return {
            path: [],
            nodesVisited,
            executionTime: performance.now() - startTime,
            found: false
        };
    }
    
    private bfsStepEnhanced(
        queue: string[],
        visitedThisDirection: Map<string, string>,
        visitedOtherDirection: Map<string, string>,
        isBackward: boolean
    ): { meetingNode: string | null; nodesProcessed: number } {
        if (queue.length === 0) {
            return { meetingNode: null, nodesProcessed: 0 };
        }
        
        let nodesProcessed = 0;
        const current = queue.shift()!;
        const currentNode = this.graph.get(current);
        
        if (!currentNode) {
            return { meetingNode: null, nodesProcessed: 0 };
        }
        
        for (const neighborId of currentNode.neighbors) {
            nodesProcessed++;
            
            if (visitedThisDirection.has(neighborId)) {
                continue;
            }
            
            if (visitedOtherDirection.has(neighborId)) {
                return { meetingNode: neighborId, nodesProcessed };
            }
            
            visitedThisDirection.set(neighborId, current);
            queue.push(neighborId);
        }
        
        return { meetingNode: null, nodesProcessed };
    }
    
    private constructPathEnhanced(
        meetingNode: string,
        visitedForward: Map<string, string>,
        visitedBackward: Map<string, string>
    ): string[] {
        // Build path from start to meeting node
        const forwardPath: string[] = [];
        let current: string | undefined = meetingNode;
        
        while (current && current !== visitedForward.get(current)) {
            forwardPath.unshift(current);
            current = visitedForward.get(current);
        }
        if (current) forwardPath.unshift(current);
        
        // Build path from meeting node to goal
        const backwardPath: string[] = [];
        current = visitedBackward.get(meetingNode);
        
        while (current && current !== visitedBackward.get(current)) {
            backwardPath.push(current);
            current = visitedBackward.get(current);
        }
        
        return [...forwardPath, ...backwardPath];
    }
    
    /**
     * Utility method to visualize the search process
     */
    visualizeSearch(startId: string, goalId: string): void {
        const result = this.searchEnhanced(startId, goalId);
        
        console.log(`Search: ${startId} -> ${goalId}`);
        console.log(`Path: ${result.path.join(' -> ')}`);
        console.log(`Nodes visited: ${result.nodesVisited}`);
        console.log(`Execution time: ${result.executionTime.toFixed(2)}ms`);
        console.log(`Found: ${result.found}`);
        console.log('---');
    }
}

// Usage example
const graph = createTestGraph();
const enhancedBFS = new EnhancedBidirectionalSearch(graph);

// Test various paths
enhancedBFS.visualizeSearch('A', 'G');
enhancedBFS.visualizeSearch('D', 'C');
enhancedBFS.visualizeSearch('A', 'X'); // Non-existent node
