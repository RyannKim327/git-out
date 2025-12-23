/** A generic node type.  You can adapt it to your own domain. */
export interface Node<T = any> {
  /** Unique identifier – used for the optional visited set */
  id: string | number;
  /** Payload (optional) */
  value?: T;
  /** Adjacent nodes (children) */
  children: Node<T>[];
}

/** Predicate that tells whether a node satisfies the goal condition */
export type GoalPredicate<T = any> = (node: Node<T>) => boolean;

/** Optional function that extracts a unique key for a node (defaults to node.id) */
export type KeyFn<T = any> = (node: Node<T>) => string | number;
/**
 * Iterative Depth‑Limited Search.
 *
 * @param start   Root node where the search begins.
 * @param goal    Function that returns true for the goal node.
 * @param limit   Maximum depth to explore (0 = only the start node).
 * @param options Optional: visited‑set handling and child order.
 *
 * @returns The goal node if found, otherwise `null`.
 */
export function depthLimitedSearch<T = any>(
  start: Node<T>,
  goal: GoalPredicate<T>,
  limit: number,
  options?: {
    /** If true, a visited set is kept to avoid revisiting nodes (good for graphs). */
    avoidCycles?: boolean;
    /** Function that returns a unique key for a node – defaults to node.id. */
    keyFn?: KeyFn<T>;
    /** If true, children are pushed onto the stack in reverse order so that the
     *  first child in the array is explored first (more natural DFS order). */
    preserveChildOrder?: boolean;
  }
): Node<T> | null {
  if (limit < 0) throw new Error('Depth limit must be >= 0');

  const {
    avoidCycles = false,
    keyFn = (n: Node<T>) => n.id,
    preserveChildOrder = false,
  } = options ?? {};

  // Stack holds {node, depth}
  const stack: Array<{ node: Node<T>; depth: number }> = [{ node: start, depth: 0 }];

  // Optional visited set – only used when avoidCycles === true
  const visited = avoidCycles ? new Set<string | number>() : null;

  while (stack.length > 0) {
    const { node, depth } = stack.pop()!; // non‑empty because of while condition

    // Cycle detection (if enabled)
    if (avoidCycles) {
      const key = keyFn(node);
      if (visited!.has(key)) continue; // already processed
      visited!.add(key);
    }

    // Goal test
    if (goal(node)) return node;

    // Stop expanding when we hit the depth limit
    if (depth >= limit) continue;

    // Push children onto the stack.
    // We push them in reverse order if we want the first child to be processed first.
    const children = preserveChildOrder ? [...node.children].reverse() : node.children;

    for (const child of children) {
      stack.push({ node: child, depth: depth + 1 });
    }
  }

  // Exhausted the stack without finding the goal
  return null;
}
// Build a tiny tree
const tree: Node<number> = {
  id: 'A',
  value: 1,
  children: [
    {
      id: 'B',
      value: 2,
      children: [
        { id: 'D', value: 4, children: [] },
        { id: 'E', value: 5, children: [] },
      ],
    },
    {
      id: 'C',
      value: 3,
      children: [{ id: 'F', value: 6, children: [] }],
    },
  ],
};

// Goal: find the node whose value is 5
const goal = (n: Node<number>) => n.value === 5;

// Depth limit 2 → we can reach B (depth 1) and D/E (depth 2)
const result = depthLimitedSearch(tree, goal, 2, { preserveChildOrder: true });

console.log(result?.id); // → "E"
// A ↔ B ↔ C ↔ A (cycle)
const a: Node<string> = { id: 'A', children: [] };
const b: Node<string> = { id: 'B', children: [] };
const c: Node<string> = { id: 'C', children: [] };

a.children = [b];
b.children = [c];
c.children = [a]; // back‑edge creates a cycle

// Goal: find node "C"
const goalC = (n: Node<string>) => n.id === 'C';

const found = depthLimitedSearch(a, goalC, 10, { avoidCycles: true });
console.log(found?.id); // → "C"
function iterativeDeepeningSearch<T>(
  start: Node<T>,
  goal: GoalPredicate<T>,
  maxDepth: number,
  options?: Parameters<typeof depthLimitedSearch>[3]
): Node<T> | null {
  for (let depth = 0; depth <= maxDepth; depth++) {
    const result = depthLimitedSearch(start, goal, depth, options);
    if (result) return result; // found at the shallowest depth
  }
  return null; // not found within maxDepth
}

// Example: same tree as before, but we don't know the depth in advance
const id = iterativeDeepeningSearch(tree, goal, 5, { preserveChildOrder: true })?.id;
console.log(id); // "E"
// ---------------------------------------------------------------
//  depthLimitedSearch.ts  (the implementation)
// ---------------------------------------------------------------
export interface Node<T = any> {
  id: string | number;
  value?: T;
  children: Node<T>[];
}
export type GoalPredicate<T = any> = (node: Node<T>) => boolean;
export type KeyFn<T = any> = (node: Node<T>) => string | number;

export function depthLimitedSearch<T = any>(
  start: Node<T>,
  goal: GoalPredicate<T>,
  limit: number,
  options?: {
    avoidCycles?: boolean;
    keyFn?: KeyFn<T>;
    preserveChildOrder?: boolean;
  }
): Node<T> | null {
  if (limit < 0) throw new Error('Depth limit must be >= 0');

  const {
    avoidCycles = false,
    keyFn = (n: Node<T>) => n.id,
    preserveChildOrder = false,
  } = options ?? {};

  const stack: Array<{ node: Node<T>; depth: number }> = [{ node: start, depth: 0 }];
  const visited = avoidCycles ? new Set<string | number>() : null;

  while (stack.length) {
    const { node, depth } = stack.pop()!;

    if (avoidCycles) {
      const k = keyFn(node);
      if (visited!.has(k)) continue;
      visited!.add(k);
    }

    if (goal(node)) return node;
    if (depth >= limit) continue;

    const children = preserveChildOrder ? [...node.children].reverse() : node.children;
    for (const child of children) {
      stack.push({ node: child, depth: depth + 1 });
    }
  }

  return null;
}

// ---------------------------------------------------------------
//  demo.ts  (example usage)
// ---------------------------------------------------------------
import { depthLimitedSearch, Node } from './depthLimitedSearch';

// Build a sample tree
const tree: Node<number> = {
  id: 'root',
  value: 0,
  children: [
    {
      id: 'a',
      value: 1,
      children: [
        { id: 'a1', value: 2, children: [] },
        { id: 'a2', value: 3, children: [] },
      ],
    },
    {
      id: 'b',
      value: 4,
      children: [{ id: 'b1', value: 5, children: [] }],
    },
  ],
};

const goal = (n: Node<number>) => n.value === 5;

const found = depthLimitedSearch(tree, goal, 2, { preserveChildOrder: true });
console.log('Found node:', found?.id ?? 'none'); // → "b1"
