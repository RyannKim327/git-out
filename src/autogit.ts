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

function depthLimitedSearch(node: Node, limit: number): Node | null {
    // Base case: if the limit is reached, return null
    if (limit < 0) {
        return null;
    }

    // Process the current node (you can modify this to suit your needs)
    console.log(`Visiting node: ${node.value}`);

    // If the node is the goal, return it (you can define your goal condition)
    if (isGoal(node)) {
        return node;
    }

    // Recur for each child
    for (const child of node.children) {
        const result = depthLimitedSearch(child, limit - 1);
        if (result !== null) {
            return result; // Return the found node
        }
    }

    return null; // Return null if the goal is not found
}

// Example goal condition (modify as needed)
function isGoal(node: Node): boolean {
    return node.value === "goal"; // Replace "goal" with your actual goal value
}

// Example usage
const root = new Node("start");
const child1 = new Node("A");
const child2 = new Node("B");
const child3 = new Node("goal");

root.addChild(child1);
root.addChild(child2);
child1.addChild(child3);

const limit = 2;
const result = depthLimitedSearch(root, limit);

if (result) {
    console.log(`Goal found: ${result.value}`);
} else {
    console.log("Goal not found within the depth limit.");
}
