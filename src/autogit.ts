// Generic node type: anything that has children
export interface ISearchNode<T> {
  value: T;
  children(): Iterable<ISearchNode<T>>;
}

// Optional: helper to build a simple tree
export class TreeNode<T> implements ISearchNode<T> {
  constructor(public value: T, private _kids: TreeNode<T>[] = []) {}
  *children(): Iterable<TreeNode<T>> {
    yield* this._kids;
  }
}

/**
 * Depth-Limited Search
 * @param start   root node
 * @param isGoal  predicate that returns true for goal values
 * @param maxDepth  non-negative depth limit
 * @returns first goal node found within depth limit, or null
 */
export function depthLimitedSearch<T>(
  start: ISearchNode<T>,
  isGoal: (value: T) => boolean,
  maxDepth: number
): ISearchNode<T> | null {
  const visited = new Set<ISearchNode<T>>(); // cycle guard for graphs

  function dls(node: ISearchNode<T>, depth: number): ISearchNode<T> | null {
    if (isGoal(node.value)) return node;
    if (depth >= maxDepth) return null;

    visited.add(node);
    for (const child of node.children()) {
      if (!visited.has(child)) {
        const found = dls(child, depth + 1);
        if (found) return found;
      }
    }
    return null;
  }

  return dls(start, 0);
}

/* ----------------- usage example ----------------- */
if (require.main === module) {
  /*
          A
        / | \
       B  C  D
      / \   / \
     E   F G   H
  */
  const root =
    new TreeNode('A', [
      new TreeNode('B', [
        new TreeNode('E'),
        new TreeNode('F')
      ]),
      new TreeNode('C'),
      new TreeNode('D', [
        new TreeNode('G'),
        new TreeNode('H')
      ])
    ]);

  const goal = depthLimitedSearch(root, v => v === 'G', 3);
  console.log(goal ? `Found: ${goal.value}` : 'Not found'); // → Found: G
}
tsc dls.ts && node dls.js
