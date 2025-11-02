type Node = {
    value: string;       // Unique identifier for the node
    children: Node[];    // Array of child nodes
};

function depthLimitedSearch(
    currentNode: Node,
    targetValue: string,
    limit: number,
    visited: Set<string> = new Set()
): Node | null {
    // Base case: target found
    if (currentNode.value === targetValue) {
        return currentNode;
    }

    // Depth limit reached - stop searching deeper
    if (limit <= 0) {
        return null;
    }

    visited.add(currentNode.value);  // Mark current node as visited

    // Search through children recursively
    for (const child of currentNode.children) {
        if (!visited.has(child.value)) {
            const result = depthLimitedSearch(child, targetValue, limit - 1, visited);
            if (result) return result;
        }
    }

    return null;  // Target not found in this subtree
}

// Example Usage:
const G: Node = { value: 'G', children: [] };
const D: Node = { value: 'D', children: [G] };
const E: Node = { value: 'E', children: [] };
const B: Node = { value: 'B', children: [D, E] };
const F: Node = { value: 'F', children: [] };
const C: Node = { value: 'C', children: [F] };
const root: Node = { value: 'A', children: [B, C] };

// Search for 'G' with depth limit 3
const result = depthLimitedSearch(root, 'G', 3);
console.log(result?.value);  // Output: "G" (found within depth limit)

// Search for 'G' with depth limit 2
const result2 = depthLimitedSearch(root, 'G', 2);
console.log(result2?.value);  // Output: undefined (not found - deeper than limit)
