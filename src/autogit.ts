class Node {
    value: string;
    children: Node[];

    constructor(value: string) {
        this.value = value;
        this.children = [];
    }

    addChild(child: Node) {
        this.children.push(child);
    }
}
function breadthLimitedSearch(root: Node, target: string, maxDepth: number): Node | null {
    if (maxDepth < 0) {
        return null; // Invalid depth
    }

    const queue: { node: Node; depth: number }[] = [{ node: root, depth: 0 }];
    
    while (queue.length > 0) {
        const { node, depth } = queue.shift()!; // Get the first element in the queue

        // Check if the current node is the target
        if (node.value === target) {
            return node; // Target found
        }

        // If we haven't reached the maximum depth, add children to the queue
        if (depth < maxDepth) {
            for (const child of node.children) {
                queue.push({ node: child, depth: depth + 1 });
            }
        }
    }

    return null; // Target not found within the depth limit
}
// Create a sample tree
const root = new Node("A");
const child1 = new Node("B");
const child2 = new Node("C");
const child3 = new Node("D");
const child4 = new Node("E");

root.addChild(child1);
root.addChild(child2);
child1.addChild(child3);
child1.addChild(child4);

// Perform a breadth-limited search
const targetValue = "D";
const maxDepth = 2;
const result = breadthLimitedSearch(root, targetValue, maxDepth);

if (result) {
    console.log(`Found: ${result.value}`);
} else {
    console.log("Not found within the depth limit.");
}
