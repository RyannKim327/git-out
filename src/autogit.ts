interface Graph<T> {
    [key: string]: T[];
}

class Queue<T> {
    private elements: T[] = [];
    
    enqueue(element: T): void {
        this.elements.push(element);
    }
    
    dequeue(): T | undefined {
        return this.elements.shift();
    }
    
    isEmpty(): boolean {
        return this.elements.length === 0;
    }
    
    contains(element: T): boolean {
        return this.elements.includes(element);
    }
    
    size(): number {
        return this.elements.length;
    }
}

class BiDirectionalSearch<T> {
    private graph: Graph<T>;
    
    constructor(graph: Graph<T>) {
        this.graph = graph;
    }
    
    /**
     * Bi-directional BFS search to find shortest path between two nodes
     */
    findPath(start: T, end: T): T[] | null {
        if (start === end) return [start];
        
        // Track visited nodes from both directions
        const visitedFromStart = new Map<T, T | null>();
        const visitedFromEnd = new Map<T, T | null>();
        
        // Queues for BFS from both directions
        const queueStart = new Queue<T>();
        const queueEnd = new Queue<T>();
        
        // Initialize
        visitedFromStart.set(start, null);
        visitedFromEnd.set(end, null);
        queueStart.enqueue(start);
        queueEnd.enqueue(end);
        
        while (!queueStart.isEmpty() && !queueEnd.isEmpty()) {
            // Expand from start
            const meetingPointFromStart = this.expandSearch(
                queueStart, 
                visitedFromStart, 
                visitedFromEnd, 
                'forward'
            );
            
            if (meetingPointFromStart) {
                return this.reconstructPath(
                    meetingPointFromStart, 
                    visitedFromStart, 
                    visitedFromEnd
                );
            }
            
            // Expand from end
            const meetingPointFromEnd = this.expandSearch(
                queueEnd, 
                visitedFromEnd, 
                visitedFromStart, 
                'backward'
            );
            
            if (meetingPointFromEnd) {
                return this.reconstructPath(
                    meetingPointFromEnd, 
                    visitedFromStart, 
                    visitedFromEnd
                );
            }
        }
        
        return null; // No path found
    }
    
    private expandSearch(
        queue: Queue<T>,
        currentVisited: Map<T, T | null>,
        otherVisited: Map<T, T | null>,
        direction: 'forward' | 'backward'
    ): T | null {
        const current = queue.dequeue();
        if (!current) return null;
        
        const neighbors = this.graph[current as any] || [];
        
        for (const neighbor of neighbors) {
            if (!currentVisited.has(neighbor)) {
                currentVisited.set(neighbor, current);
                queue.enqueue(neighbor);
                
                // Check if we've met the search from the other direction
                if (otherVisited.has(neighbor)) {
                    return neighbor; // Meeting point found
                }
            }
        }
        
        return null;
    }
    
    private reconstructPath(
        meetingPoint: T,
        visitedFromStart: Map<T, T | null>,
        visitedFromEnd: Map<T, T | null>
    ): T[] {
        // Build path from start to meeting point
        const pathFromStart: T[] = [];
        let current: T | null = meetingPoint;
        
        while (current !== null) {
            pathFromStart.unshift(current);
            current = visitedFromStart.get(current) || null;
        }
        
        // Build path from meeting point to end (excluding meeting point)
        const pathFromEnd: T[] = [];
        current = visitedFromEnd.get(meetingPoint) || null;
        
        while (current !== null) {
            pathFromEnd.push(current);
            current = visitedFromEnd.get(current) || null;
        }
        
        return [...pathFromStart, ...pathFromEnd];
    }
}
// Example 1: Graph search
const graph: Graph<string> = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E', 'G'],
    'G': ['F']
};

const bidirectionalSearch = new BiDirectionalSearch<string>(graph);
const path = bidirectionalSearch.findPath('A', 'G');
console.log('Path from A to G:', path); // ['A', 'C', 'F', 'G']

// Example 2: Social network graph
const socialNetwork: Graph<string> = {
    'Alice': ['Bob', 'Charlie'],
    'Bob': ['Alice', 'David', 'Eve'],
    'Charlie': ['Alice', 'Frank'],
    'David': ['Bob'],
    'Eve': ['Bob', 'Grace'],
    'Frank': ['Charlie', 'Grace'],
    'Grace': ['Eve', 'Frank', 'Henry'],
    'Henry': ['Grace']
};

const socialSearch = new BiDirectionalSearch(socialNetwork);
const connection = socialSearch.findPath('Alice', 'Henry');
console.log('Connection path:', connection); // ['Alice', 'Charlie', 'Frank', 'Grace', 'Henry']
class BiDirectionalArraySearch {
    /**
     * Search an array from both ends simultaneously
     */
    static findElement<T>(arr: T[], target: T): number {
        let left = 0;
        let right = arr.length - 1;
        
        while (left <= right) {
            // Check from left
            if (arr[left] === target) {
                return left;
            }
            
            // Check from right
            if (arr[right] === target) {
                return right;
            }
            
            left++;
            right--;
        }
        
        return -1; // Not found
    }
    
    /**
     * Find pair that sums to target (two-pointer technique)
     */
    static findPairWithSum(arr: number[], target: number): [number, number] | null {
        let left = 0;
        let right = arr.length - 1;
        
        while (left < right) {
            const sum = arr[left] + arr[right];
            
            if (sum === target) {
                return [arr[left], arr[right]];
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        
        return null;
    }
}

// Example usage for array search
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log('Index of 5:', BiDirectionalArraySearch.findElement(numbers, 5)); // 4
console.log('Pair summing to 9:', BiDirectionalArraySearch.findPairWithSum(numbers, 9)); // [1, 8]
class GenericBiDirectionalSearch<T> {
    private getNeighbors: (node: T) => T[];
    
    constructor(getNeighbors: (node: T) => T[]) {
        this.getNeighbors = getNeighbors;
    }
    
    search(start: T, end: T): T[] | null {
        if (start === end) return [start];
        
        const visitedFromStart = new Map<T, T | null>();
        const visitedFromEnd = new Map<T, T | null>();
        
        const queueStart = new Queue<T>();
        const queueEnd = new Queue<T>();
        
        visitedFromStart.set(start, null);
        visitedFromEnd.set(end, null);
        queueStart.enqueue(start);
        queueEnd.enqueue(end);
        
        while (!queueStart.isEmpty() && !queueEnd.isEmpty()) {
            const meetingPoint = this.expandLevel(queueStart, visitedFromStart, visitedFromEnd);
            if (meetingPoint) {
                return this.buildPath(meetingPoint, visitedFromStart, visitedFromEnd);
            }
            
            const meetingPointReverse = this.expandLevel(queueEnd, visitedFromEnd, visitedFromStart);
            if (meetingPointReverse) {
                return this.buildPath(meetingPointReverse, visitedFromStart, visitedFromEnd);
            }
        }
        
        return null;
    }
    
    private expandLevel(
        queue: Queue<T>,
        currentVisited: Map<T, T | null>,
        otherVisited: Map<T, T | null>
    ): T | null {
        const size = queue.size();
        
        for (let i = 0; i < size; i++) {
            const current = queue.dequeue();
            if (!current) continue;
            
            const neighbors = this.getNeighbors(current);
            
            for (const neighbor of neighbors) {
                if (!currentVisited.has(neighbor)) {
                    currentVisited.set(neighbor, current);
                    queue.enqueue(neighbor);
                    
                    if (otherVisited.has(neighbor)) {
                        return neighbor;
                    }
                }
            }
        }
        
        return null;
    }
    
    private buildPath(
        meetingPoint: T,
        visitedFromStart: Map<T, T | null>,
        visitedFromEnd: Map<T, T | null>
    ): T[] {
        const path: T[] = [];
        
        // Build from start to meeting point
        let node: T | null = meetingPoint;
        while (node !== null) {
            path.unshift(node);
            node = visitedFromStart.get(node) || null;
        }
        
        // Build from meeting point to end
        node = visitedFromEnd.get(meetingPoint) || null;
        while (node !== null) {
            path.push(node);
            node = visitedFromEnd.get(node) || null;
        }
        
        return path;
    }
}
