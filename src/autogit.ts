expand(root):
    frontier = [root]               // first beam
    while frontier not empty:
        nextFrontier = []            // expanded children
        for state in frontier:
            children = expand(state) // domain‑specific
            for child in children:
                nextFrontier.push( child )
        // keep only the best k
        nextFrontier.sort(by heuristic) // ascending or descending depending on reward
        frontier = nextFrontier.slice(0, k)
        if any frontier element is a goal:
            return that element
    return null   // no goal found
// beam-search.ts

/**
 * Type of a node in the search tree.
 * Replace the fields with whatever fits your problem.
 */
export interface Node<Data = any> {
  /**
   * Represents the search state (e.g., board edges, current path).
   * It must be something you can compare heuristically.
   */
  data: Data

  /** The cost of reaching this node from the root. */
  costFromRoot: number

  /** Predicted total cost to reach the goal. Typically cost + heuristic. */
  totalEstimatedCost: number // for D* type f = g + h
}

/**
 * Heuristic function that takes a node and returns a number
 * (the lower, the better – think “expected remaining cost”).
 */
export type HeuristicFn<Data> = (node: Node<Data>) => number

/**
 * Expansion function – given a node, return its children.
 */
export type ExpandFn<Data> = (node: Node<Data>) => Node<Data>[]

/**
 * Optional: function to test if a node is a goal.
 */
export type IsGoalFn<Data> = (node: Node<Data>) => boolean

/**
 * Beam search implementation.
 *
 * @param root      The initial node.
 * @param beamWidth The number `k` of nodes to keep per level.
 * @param expand    Expansion function, domain‑specific.
 * @param heuristic Optional heuristic; if omitted, plain cost is used.
 * @param isGoal    Optional goal‑test; if omitted, you can supply an empty predicate.
 * @returns Best goal node found, or null if none within breadth.
 */
export function beamSearch<Data>(
  root: Node<Data>,
  beamWidth: number,
  expand: ExpandFn<Data>,
  heuristic?: HeuristicFn<Data>,
  isGoal?: IsGoalFn<Data>
): Node<Data> | null {
  // if no heuristic is given, use costFromRoot as the estimate
  const getScore = heuristic
    ? (node: Node<Data>) => node.totalEstimatedCost
    : (node: Node<Data>) => node.costFromRoot

  // Frontier is our beam for the current depth.
  let frontier: Node<Data>[] = [root]

  while (frontier.length > 0) {
    // Check for goal state *before* expansion to catch the root too.
    for (const node of frontier) {
      if (isGoal && isGoal(node)) return node
    }

    // Expand all nodes in the current beam
    const nextFrontier: Node<Data>[] = []

    for (const node of frontier) {
      const children = expand(node)

      // Attach heuristics (problem‑specific)
      for (const child of children) {
        child.totalEstimatedCost =
          child.costFromRoot + (heuristic ? heuristic(child) : 0)
        nextFrontier.push(child)
      }
    }

    // Sort by estimated total cost ascending (lower is better)
    nextFrontier.sort((a, b) => a.totalEstimatedCost - b.totalEstimatedCost)

    // Trim to beam width
    frontier = nextFrontier.slice(0, beamWidth)
  }

  // Nothing found
  return null
}
// toy-graph.ts
interface GraphNode {
  id: string
  neighbors: Record<string, number> // neighbor id -> edge weight

