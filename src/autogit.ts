// Define a type for the graph nodes
type Node = {
    value: string; // or any other type
    children: Node[];
};

// Define the depth-limited search function
function depthLimitedSearch(node: Node, depthLimit: number, target: string): boolean {
    // Check if the current node's value is the target
    if (node.value === target) {
        return true; // Target found
    }
    
    // If we've reached the depth limit, return false
    if (depthLimit <= 0) {
        return false; // Depth limit reached
    }

    // Recursively search in the children nodes
    for (const child of node.children) {
        // Call DLS on the child node with depth limit decreased by 1
        if (depthLimitedSearch(child, depthLimit - 1, target)) {
            return true; // Target found in child
        }
    }

    return false; // Target not found in this branch
}

// Example usage
const graph: Node = {
    value: "A",
    children: [
        {
            value: "B",
            children: [
                { value: "D", children: [] },
                { value: "E", children: [] }
            ]
        },
        {
            value: "C",
            children: [
                { value: "F", children: [] },
                { value: "G", children: [] }
            ]
        }
    ]
};

// Searching for a target value within a specified depth limit
const target = "E";
const depthLimit = 2;

const found = depthLimitedSearch(graph, depthLimit, target);
console.log(`Target ${target} found: ${found}`);
