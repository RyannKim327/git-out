/* ------------------------------------------------------------------
   Interface that a node must support for the search.
   ------------------------------------------------------------------ */
export interface Searchable<Node> {
  // Return an array (or any iterable) of child nodes.
  getChildren(): Iterable<Node>;

  // Optional: a quick way to decide if this node is the goal.
  // If omitted, the caller supplies a separate predicate below.
  isGoal?(): boolean;
}

/* ------------------------------------------------------------------
   Breadth‑Limited Search

   Parameters
     start   : node to begin the search
     maxDepth: maximum depth (root is depth 0)
     goal   : optional predicate; if the node has `isGoal`, that
              method is used instead

   Returns
     The found node, or `undefined` if nothing was discovered within
     the depth limit.
   ------------------------------------------------------------------ */
export function breadthLimitedSearch<Node extends Searchable<Node>>(
  start: Node,
  maxDepth: number,
  goal?: (node: Node) => boolean
): Node | undefined {

  // Queue entries store the node and its depth
  interface QueueEntry {
    node: Node;
    depth: number;
  }

  const queue: QueueEntry[] = [{ node: start, depth: 0 }];
  const seen = new Set<Node>();

  while (queue.length) {
    const { node, depth } = queue.shift()!;

    // Skip any repeated nodes – this protects against cycles
    if (seen.has(node)) continue;
    seen.add(node);

    // Goal test – prefer the node’s own method if present
    const isGoal =
      goal ? goal(node) : node.isGoal ? node.isGoal() : false;
    if (isGoal) return node;

    // Stop expanding deeper than maxDepth
    if (depth < maxDepth) {
      for (const child of node.getChildren()) {
        queue.push({ node: child, depth: depth + 1 });
      }
    }
  }

  // Nothing matched within the limit
  return undefined;
}
// 1. A concrete node type
class TreeNode implements Searchable<TreeNode> {
  constructor(
    public value: number,
    private children: TreeNode[] = []
  ) {}

  getChildren(): TreeNode[] {
    return this.children;
  }

  // Optional helper that the search will call first
  isGoal(): boolean {
    return this.value === 42;
  }

  add(child: TreeNode) {
    this.children.push(child);
  }
}

// 2. Build a little tree
const root = new TreeNode(1);
const a = new TreeNode(2);
const b = new TreeNode(3);
root.add(a); root.add(b);
a.add(new TreeNode(4));
b.add(new TreeNode(42)); // the goal

// 3. Run the search
const found = breadthLimitedSearch(root, 3);
console.log(found?.value ?? 'not found'); // prints 42
