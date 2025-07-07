// Define the structure of a node
class Node {
    value: string;
    children: Node[];

    constructor(value: string) {
        this.value = value;
        this.children = [];
    }

    // Add a child to the node
    addChild(child: Node) {
        this.children.push(child);
    }
}

// Breadth-Limited Search function
function breadthLimitedSearch(root: Node, goal: string, depthLimit: number): Node | null {
    // Queue for BFS
    const queue: { node: Node, depth: number }[] = [];
    // Start with the root node at depth 0
    queue.push({ node: root, depth: 0 });
    
    while (queue.length > 0) {
        // Dequeue the front node
        const { node, depth } = queue.shift()!;
        
        // Check if we found the goal
        if (node.value === goal) {
            return node; // Return the found node
        }
        
        // If we haven't reached the depth limit
        if (depth < depthLimit) {
            // Enqueue all children with incremented depth
            for (const child of node.children) {
                queue.push({ node: child, depth: depth + 1 });
            }
        }
    }
    
    // If we exhaust the queue without finding the goal
    return null;
}

// Example Usage
const root = new Node("A");
const childB = new Node("B");
const childC = new Node("C");
const childD = new Node("D");
const childE = new Node("E");

root.addChild(childB);
root.addChild(childC);
childB.addChild(childD);
childC.addChild(childE);

const result = breadthLimitedSearch(root, "D", 2);
if (result) {
    console.log(`Found: ${result.value}`);
} else {
    console.log("Goal not found within depth limit");
}
