START: push (root, depth=0) onto stack
WHILE stack not empty:
    (node, depth) = stack.pop()
    IF depth > limit: continue          // prune
    IF node is goal: return node
    FOR each child of node in reverse order:
        push (child, depth+1) onto stack
END
// ---------------------------------------------------------------------------
// 1️⃣  Types
// ---------------------------------------------------------------------------

/**
 * A minimal graph node. Feel free to embed more data.
 */
interface Node<T = unknown> {
  /** The value you care about (e.g., a string, number, custom class, …) */
  value: T;

  /** Immediate successors of this node. Empty array for a leaf. */
  children: Node[];

  /** Optional flag to mark a node as a goal. */
  isGoal?: boolean;
}

/**
 * Result of the search – the node that satisfied the goal.
 * `null` if no node was found within the depth limit.
 */
type SearchResult<T> = Node<T> | null;

// ---------------------------------------------------------------------------
// 2️⃣  The algorithm
// ---------------------------------------------------------------------------

/**
 * Iterative depth‑limited DFS.
 *
 * @param root  The root node of the search.
 * @param limit The maximum depth to visit (root has depth 0).
 * @returns The first node that reports `isGoal === true`, or null.
 */
function depthLimitedSearch<T>(
  root: Node<T>,
  limit: number
): SearchResult<T> {
  // Explicit stack: each entry is [node, currentDepth]
  const stack: Array<[Node<T>, number]> = [[root, 0]];

  while (stack.length) {
    const [node, depth] = stack.pop()!; // pop() is safe because we just checked stack.length

    // 1️⃣  Depth guard
    if (depth > limit) continue;

    // 2️⃣  Goal test
    if (node.isGoal) return node;

    // 3️⃣  Expand children (reverse order for natural DFS order)
    for (let i = node.children.length - 1; i >= 0; i--) {
      stack.push([node.children[i], depth + 1]);
    }
  }

  // Not found within the depth limit
  return null;
}

// ---------------------------------------------------------------------------
// 3️⃣  A quick demo / test
// ---------------------------------------------------------------------------

const sampleTree: Node<string> = {
  value: 'A',
  children: [
    { value: 'B', children: [], isGoal: false },
    {
      value: 'C',
      children: [
        { value: 'D', children: [], isGoal: true },
        { value: 'E', children: [] },
      ],
    },
  ],
};

const result = depthLimitedSearch(sampleTree, 2);
console.log(
  result
    ? `Found goal: ${result.value}`
    : 'No goal node found within depth limit.'
); // → Found goal: D
