// Node.ts
export interface Node<T> {
  state: T;
  parent: Node<T> | null;
  depth: number;
}

// utils.ts
export function node<T>(
  state: T,
  parent: Node<T> | null = null,
  depth: number = 0
): Node<T> {
  return { state, parent, depth };
}

export function reconstructPath<T>(n: Node<T>): T[] {
  const path: T[] = [];
  let curr: Node<T> | null = n;
  while (curr) {
    path.push(curr.state);
    curr = curr.parent;
  }
  return path.reverse();
}

// dls.ts
export interface Problem<T> {
  initialState: T;
  isGoal: (s: T) => boolean;
  expand: (s: T) => T[];
}

export function depthLimitedSearch<T>(
  problem: Problem<T>,
  limit: number
): Node<T> | null {
  function recursiveDLS(current: Node<T>, remaining: number): Node<T> | null {
    if (problem.isGoal(current.state)) return current;
    if (remaining <= 0) return null; // depth limit reached

    for (const nextState of problem.expand(current.state)) {
      const nextNode = node(nextState, current, current.depth + 1);
      const found = recursiveDLS(nextNode, remaining - 1);
      if (found) return found; // propagate success
    }
    return null; // failure
  }

  return recursiveDLS(node(problem.initialState), limit);
}
import { Problem, depthLimitedSearch, reconstructPath } from "./dls";

type Vertex = "A" | "B" | "C" | "D" | "E";

const graph: Record<Vertex, Vertex[]> = {
  A: ["B", "C"],
  B: ["D", "E"],
  C: ["A"],
  D: [],
  E: [],
};

const problem: Problem<Vertex> = {
  initialState: "A",
  isGoal: (v) => v === "E",
  expand: (v) => graph[v],
};

const limit = 3;
const solutionNode = depthLimitedSearch(problem, limit);

if (solutionNode) {
  console.log("Found path:", reconstructPath(solutionNode)); // ["A","B","E"]
} else {
  console.log("No solution within depth", limit);
}
export function iterativeDeepening<T>(problem: Problem<T>): T[] | null {
  for (let d = 0; ; ++d) {
    const node = depthLimitedSearch(problem, d);
    if (node) return reconstructPath(node);
  }
}
