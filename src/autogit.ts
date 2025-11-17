// Define a basic node structure for traversal
interface Node<T> {
    id: string;        // Unique identifier
    value: T;          // Node content
    children: Node<T>[]; // Child nodes
}

/**
 * Performs Depth-Limited Search
 * @param root The starting node
 * @param isGoal Predicate to check if a node is the goal
 * @param depthLimit Maximum depth to search
 * @returns True if goal is found within depth limit, false otherwise
 */
function depthLimitedSearch<T>(
    root: Node<T>,
    isGoal: (node: Node<T>) => boolean,
    depthLimit: number
): boolean {
    // Internal recursive function with depth tracking
    function dls(node: Node<T>, depth: number, visited: Set<string>): boolean {
        // Base case: found the goal
        if (isGoal(node)) return true; 
        
        // Depth limit reached
        if (depth === 0) return false; 
        
        // Track visited nodes to prevent cycles
        visited.add(node.id); 
        
        // Recur for each child node within depth limit
        for (const child of node.children) {
            if (!visited.has(child.id)) {
                if (dls(child, depth - 1, visited)) {
                    return true;
                }
            }
        }
        
        return false;
    }

    // Initial call with empty visited set
    return dls(root, depthLimit, new Set<string>());
}
// Create a simple tree structure
const tree: Node<string> = {
    id: 'A',
    value: 'Root',
    children: [
        {
            id: 'B',
            value: 'Level 1',
            children: [
                {id: 'D', value: 'Level 2 (Leaf)', children: []}
            ]
        },
        {
            id: 'C',
            value: 'Level 1',
            children: [
                {id: 'E', value: 'Target Node', children: []}
            ]
        }
    ]
};

// Search parameters
const goalFinder = (node: Node<string>) => node.value === 'Target Node';
const depthLimit = 2;

// Execute search
const found = depthLimitedSearch(tree, goalFinder, depthLimit);
console.log('Goal found:', found); // Output: Goal found: true
