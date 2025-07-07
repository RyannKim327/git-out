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

function depthLimitedSearch(node: Node, depth: number, target: string): boolean {
    // Check if the current node is the target
    if (node.value === target) {
        return true;
    }

    // If the depth limit is reached, return false
    if (depth === 0) {
        return false;
    }

    // Recursively search in the children nodes
    for (let child of node.children) {
        if (depthLimitedSearch(child, depth - 1, target)) {
            return true;
        }
    }

    return false;
}

// Example usage
const root = new Node("A");
const child1 = new Node("B");
const child2 = new Node("C");
const child3 = new Node("D");

root.addChild(child1);
root.addChild(child2);
child1.addChild(child3);

const target = "D";
const depthLimit = 2;

const found = depthLimitedSearch(root, depthLimit, target);
console.log(`Target ${target} found: ${found}`);
