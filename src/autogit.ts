type Node = {
  id:          string;   // whatever uniquely identifies a node
  children?:   Node[];   // adjacency list – change to whatever your graph uses
};

interface StackItem {
  node:  Node;
  depth: number;
}

/**
 * Iterative DFS that stops at a given depth limit.
 * Returns true if the target is found, otherwise false.
 */
function depthLimitedDFS(
  root:   Node,
  targetId: string,
  maxDepth: number
): boolean {
  const stack: StackItem[] = [{ node: root, depth: 0 }];

  while (stack.length) {
    const { node, depth } = stack.pop()!;      // pop from the end

    if (node.id === targetId) return true;     // hit

    if (depth < maxDepth) {                   // still room to descend
      const children = node.children ?? [];
      // push children in reverse order if you want particular visit order
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push({ node: children[i], depth: depth + 1 });
      }
    }
  }
  return false;
}
function depthLimitedBFS(
  root:   Node,
  targetId: string,
  maxDepth: number
): boolean {
  const queue: StackItem[] = [{ node: root, depth: 0 }];

  while (queue.length) {
    const { node, depth } = queue.shift()!;  // shift from the front

    if (node.id === targetId) return true;

    if (depth < maxDepth) {
      for (const child of node.children ?? []) {
        queue.push({ node: child, depth: depth + 1 });
      }
    }
  }
  return false;
}
const tree: Node = {
  id: 'root',
  children: [
    { id: 'a', children: [{ id: 'c' }, { id: 'd' }] },
    { id: 'b', children: [{ id: 'e' }] }
  ]
};

console.log(depthLimitedDFS(tree, 'd', 2)); // true
console.log(depthLimitedDFS(tree, 'e', 1)); // false  (not deep enough)
console.log(depthLimitedBFS(tree, 'e', 1)); // true
