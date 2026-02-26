// 1️⃣  Basic node interface – replace / extend it to fit your model
export interface TreeNode<T> {
  value: T;                 // the payload stored in the node
  children?: TreeNode<T>[]>; // can be unset (leaf) or an empty array for a leaf
}

// 2️⃣  The actual algorithm
export function depthLimitedSearch<T>(
  root: TreeNode<T>,           // root of the tree
  target: T,                   // value we’re looking for
  depthLimit: number,          // how far the search may go (0 = only the root)
  equals: (a: T, b: T) => boolean = (a, b) => a === b
): TreeNode<T> | null {
  if (depthLimit < 0) return null; // sanity check

  // stack holds {node, depth}
  const stack: Array<{ node: TreeNode<T>; depth: number }> = [
    { node: root, depth: 0 },
  ];

  while (stack.length) {
    const { node, depth } = stack.pop()!; // pop from top of stack

    // 3️⃣  Stop expanding when the depth limit is reached
    if (depth > depthLimit) {
      continue;
    }

    // 4️⃣  Check the current node
    if (equals(node.value, target)) {
      return node;
    }

    // 5️⃣  Push children (DFS) – children that are undefined are skipped
    if (node.children) {
      // depth + 1 because we’ll go down one edge
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push({ node: node.children[i], depth: depth + 1 });
      }
    }
  }

  return null; // nothing found within the depth limit
}
const tree: TreeNode<string> = {
  value: "A",
  children: [
    { value: "B", children: [{ value: "D" }, { value: "E" }] },
    { value: "C", children: [{ value: "F" }, { value: "G" }] },
  ],
};

console.log(depthLimitedSearch(tree, "F", 1)); // null (needs depth 2)
console.log(depthLimitedSearch(tree, "F", 2)); // node with value "F"
