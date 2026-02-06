// ------------------------------------------------------------------
// 1) Basic types – tweak these to match your own representation.
// ------------------------------------------------------------------
interface Node<T> {
  /** Value that identifies the node – can be an id, a name, … */
  id: string;
  /** Children (or neighbours) – the graph may be directed or undirected. */
  children?: Array<Node<T>>;
}

// A very simple match predicate. Replace it with whatever checks your
// problem needs (e.g. `node.id === targetId`).
type MatchFn<T> = (node: Node<T>) => boolean;

// ------------------------------------------------------------------
// 2) Depth‑limited search – iterative (uses an explicit stack).
// ------------------------------------------------------------------
export function depthLimitedSearch<T>(
  start: Node<T>,          // The root (or any arbitrary start node)
  match: MatchFn<T>,      // Predicate to decide if the node is a goal
  limit: number            // Maximum depth that may be explored
): Node<T> | null {

  // Stack holds tuples  : [current node, current depth]
  const stack: Array<[Node<T>, number]> = [[start, 0]];

  while (stack.length > 0) {
    const [node, depth] = stack.pop()!;   // `!` is safe – we just checked length

    // 1️⃣  Goal check
    if (match(node)) {
      return node;
    }

    // 2️⃣  Depth test – we only enqueue children if we still have room
    if (depth < limit && node.children) {
      // Push children onto stack – last child examined first (DFS order)
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push([node.children[i], depth + 1]);
      }
    }
  }

  // No goal found within the depth budget
  return null;
}
const tree: Node<number> = {
  id: 'root',
  children: [
    { id: 'a', children: [{ id: 'a1' }, { id: 'a2' }] },
    { id: 'b', children: [{ id: 'b1' }, { id: 'b2' }] },
  ],
};

const found = depthLimitedSearch(tree, node => node.id === 'a2', /* limit */ 2);
console.log(found?.id ?? 'not found'); // → a2
