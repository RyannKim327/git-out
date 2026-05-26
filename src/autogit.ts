/*--------------------------------------------------
  1. The “state” that the algorithm operates on
--------------------------------------------------*/
export interface Node {
  /** Every node needs a unique identifier for cycle handling */
  id: string;               // could be number|string | etc.
  /** Return the directly reachable successors */
  getChildren(): Node[];
}

/*--------------------------------------------------
  2. The breadth‑limited search itself
--------------------------------------------------*/
export type SearchResult<T = Node> = {
  /* The node that satisfied the goal predicate,
     or undefined if none found within depth limit. */
  found: T | undefined;
  /* How many nodes were expanded in total */
  expanded: number;
};

/**
 * Breadth‑limited search (BFS with depth limit)
 *
 * @param start  The entry point of the search
 * @param goal   A predicate that must be satisfied by the target node
 * @param depthLimit  The maximum depth (0 → only the start node)
 *
 * @returns SearchResult containing the target node (if it was found)
 *          and the number of nodes that were expanded.
 */
export function breadthLimitedSearch<T extends Node>(
  start: T,
  goal: (node: T) => boolean,
  depthLimit: number
): SearchResult<T> {
  if (depthLimit < 0)
    throw new Error("depthLimit must be >= 0");

  // queue entry holds the node *and* its depth from start
  type QueueEntry = { node: T; depth: number };

  const frontier: QueueEntry[] = [{ node: start, depth: 0 }];
  const visited = new Set<string>();

  let expanded = 0;

  while (frontier.length > 0) {
    const { node, depth } = frontier.shift()!; // FIFO

    if (visited.has(node.id)) continue;   // ignore already‑seen nodes
    visited.add(node.id);

    expanded++;

    if (goal(node)) return { found: node, expanded };

    // If we haven't hit the depth limit, expand successors
    if (depth < depthLimit) {
      const children = node.getChildren();
      // Add children to the *back* of the queue – usual BFS order
      for (const child of children) {
        // Avoid duplicates in the same frontier level
        if (!visited.has(child.id)) {
          frontier.push({ node: child, depth: depth + 1 });
        }
      }
    }
  }

  // Search exhausted without finding a goal
  return { found: undefined, expanded };
}
class TreeNode implements Node {
  constructor(public id: string, public children: TreeNode[] = []) {}
  getChildren() { return this.children; }
}

const leafA  = new TreeNode("leafA");
const leafB  = new TreeNode("leafB");
const leafC  = new TreeNode("leafC");
const node1  = new TreeNode("node1", [leafA, leafB]);
const node2  = new TreeNode("node2", [leafC]);
const root   = new TreeNode("root", [node1, node2]);
const result = breadthLimitedSearch(
  root,
  n => n.id === "leafC",   // goal predicate
  2                        // depth limit
);

if (result.found) {
  console.log("Found:", result.found.id);
} else {
  console.log("Not found within depth limit");
}
console.log("Nodes expanded:", result.expanded);
Found: leafC
Nodes expanded: 3   // root -> node1 -> node2
export type SearchResult<T> = {
  found: T | undefined;
  expanded: number;
  path: T[]; // optional: the actual path from the root
};

export function breadthLimitedSearchCustom<T extends {}>(
  start: T,
  getChildren: (node: T) => T[],
  goal: (node: T) => boolean,
  depthLimit: number
) { /* similar to above, but works with any shape */ }
