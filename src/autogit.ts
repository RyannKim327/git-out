/**
 * Depth-first search utilities.
 *
 * 1. TreeDFS     – for acyclic trees (no visited set needed).
 * 2. GraphDFS    – for general graphs (with cycle detection).
 *
 * All functions are GENERIC: the payload type is up to you.
 */

export type Visitor<T> = (node: T) => void;

/* ------------------------------------------------------------------ */
/* Tree variant                                                       */
/* ------------------------------------------------------------------ */
export namespace TreeDFS {
  export interface Node<T> {
    value: T;
    children: this[];
  }

  /** Pre-order DFS (root → children) */
  export function preOrder<T>(
    root: Node<T> | null,
    visit: Visitor<T>
  ): void {
    if (!root) return;
    const stack: Node<T>[] = [root];
    while (stack.length) {
      const curr = stack.pop()!;
      visit(curr.value);
      // push children in reverse so that leftmost is processed first
      for (let i = curr.children.length - 1; i >= 0; --i) {
        stack.push(curr.children[i]);
      }
    }
  }

  /** Post-order DFS (children → root) */
  export function postOrder<T>(
    root: Node<T> | null,
    visit: Visitor<T>
  ): void {
    if (!root) return;
    const stack: Array<Node<T> | null> = [root, null]; // marker
    while (stack.length) {
      const curr = stack.pop();
      if (!curr) {
        visit(stack.pop()!.value); // popped marker ⇒ parent ready
        continue;
      }
      stack.push(curr, null); // push parent + marker
      for (let i = curr.children.length - 1; i >= 0; --i) {
        stack.push(curr.children[i]);
      }
    }
  }
}

/* ------------------------------------------------------------------ */
/* Graph variant (adjacency list)                                     */
/* ------------------------------------------------------------------ */
export namespace GraphDFS {
  export interface Graph<T> {
    nodes: T[];
    adj: Map<T, T[]>;
  }

  /** Iterative DFS with cycle detection. */
  export function traverse<T>(
    graph: Graph<T>,
    start: T,
    visit: Visitor<T>
  ): void {
    const visited = new Set<T>();
    const stack: T[] = [start];
    while (stack.length) {
      const curr = stack.pop()!;
      if (visited.has(curr)) continue;
      visited.add(curr);
      visit(curr);
      const neighbors = graph.adj.get(curr) ?? [];
      for (let i = neighbors.length - 1; i >= 0; --i) {
        const n = neighbors[i];
        if (!visited.has(n)) stack.push(n);
      }
    }
  }

  /** DFS that records finish times (useful for topological sort). */
  export function finishTimes<T>(graph: Graph<T>): Map<T, number> {
    const visited = new Set<T>();
    const times = new Map<T, number>();
    let time = 0;

    function dfs(u: T) {
      visited.add(u);
      for (const v of graph.adj.get(u) ?? []) {
        if (!visited.has(v)) dfs(v);
      }
      times.set(u, ++time);
    }

    for (const u of graph.nodes) if (!visited.has(u)) dfs(u);
    return times;
  }
}

/* ------------------------------------------------------------------ */
/* Usage examples                                                     */
/* ------------------------------------------------------------------ */
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe('TreeDFS', () => {
    const tree: TreeDFS.Node<number> = {
      value: 1,
      children: [
        { value: 2, children: [{ value: 4, children: [] }] },
        { value: 3, children: [] },
      ],
    };

    it('pre-order', () => {
      const out: number[] = [];
      TreeDFS.preOrder(tree, (v) => out.push(v));
      expect(out).toEqual([1, 2, 4, 3]);
    });

    it('post-order', () => {
      const out: number[] = [];
      TreeDFS.postOrder(tree, (v) => out.push(v));
      expect(out).toEqual([4, 2, 3, 1]);
    });
  });

  describe('GraphDFS', () => {
    const g: GraphDFS.Graph<string> = {
      nodes: ['A', 'B', 'C', 'D'],
      adj: new Map([
        ['A', ['B', 'C']],
        ['B', ['D']],
        ['C', ['D']],
        ['D', []],
      ]),
    };

    it('traverses from A', () => {
      const out: string[] = [];
      GraphDFS.traverse(g, 'A', (v) => out.push(v));
      expect(out.sort()).toEqual(['A', 'B', 'C', 'D']);
    });

    it('finish times', () => {
      const times = GraphDFS.finishTimes(g);
      // D finishes first, A last
      expect(times.get('D')! < times.get('A')!).toBe(true);
    });
  });
}
npm i -D vitest
npx vitest run
