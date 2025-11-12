// Generic graph node
interface Node<T> {
  value: T;
  children: Node<T>[];
}

// Search result wrapper (optional)
interface SearchResult<T> {
  node: Node<T>;
  depth: number;
}

/**
 * Depth-Limited Search
 * @param root  Starting node
 * @param isGoal  Predicate that returns true for goal nodes
 * @param limit  Non-negative depth limit
 * @returns SearchResult if a goal is found within limit, otherwise null
 */
function depthLimitedSearch<T>(
  root: Node<T>,
  isGoal: (n: T) => boolean,
  limit: number
): SearchResult<T> | null {
  function dfs(current: Node<T>, depth: number): SearchResult<T> | null {
    if (depth > limit) return null;
    if (isGoal(current.value)) return { node: current, depth };
    for (const child of current.children) {
      const found = dfs(child, depth + 1);
      if (found) return found;
    }
    return null;
  }
  return dfs(root, 0);
}

/* ------------------ Example usage ------------------ */
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe('depthLimitedSearch', () => {
    it('finds a node within the limit', () => {
      /*
              A
            /   \
           B     C
          / \   / \
         D  E  F  G
      */
      const graph: Node<string> = {
        value: 'A',
        children: [
          {
            value: 'B',
            children: [
              { value: 'D', children: [] },
              { value: 'E', children: [] },
            ],
          },
          {
            value: 'C',
            children: [
              { value: 'F', children: [] },
              { value: 'G', children: [] },
            ],
          },
        ],
      };

      const res = depthLimitedSearch(graph, v => v === 'F', 2);
      expect(res).toBeNull(); // F is at depth 2, but we need depth <= 2 → found

      const res2 = depthLimitedSearch(graph, v => v === 'F', 3);
      expect(res2?.node.value).toBe('F');
      expect(res2?.depth).toBe(2);
    });
  });
}
npm i -D vitest
npx vitest run
