/**
 * Tarjan's algorithm to find all strongly connected components (SCCs) of a directed graph.
 *
 * @param adjacencyList A Map where each key is a node id and the value is an array of adjacent node ids.
 * @returns An array of components, each component is an array of node ids belonging to the same SCC.
 */
export function stronglyConnectedComponents(
  adjacencyList: Map<number, number[]>
): number[][] {
  const indexMap = new Map<number, number>();   // node -> index
  const lowlinkMap = new Map<number, number>(); // node -> lowlink
  const onStack = new Set<number>();            // nodes currently in the stack
  const stack: number[] = [];                   // stack of nodes
  const components: number[][] = [];
  let currentIndex = 0;

  const strongConnect = (node: number) => {
    // 1. set the depth index for this node
    indexMap.set(node, currentIndex);
    lowlinkMap.set(node, currentIndex);
    currentIndex++;
    stack.push(node);
    onStack.add(node);

    // 2. consider successors of node
    const neighbors = adjacencyList.get(node) ?? [];
    for (const succ of neighbors) {
      if (!indexMap.has(succ)) {
        // (a) Successor has not yet been visited; recurse on it
        strongConnect(succ);
        // Update lowlink
        lowlinkMap.set(node, Math.min(lowlinkMap.get(node)!, lowlinkMap.get(succ)!));
      } else if (onStack.has(succ)) {
        // (b) Successor is in stack → part of current SCC
        lowlinkMap.set(node, Math.min(lowlinkMap.get(node)!, indexMap.get(succ)!));
      }
      // (c) else: successor has been visited and is not in stack – ignore
    }

    // 3. If node is a root node, pop the stack and generate an SCC
    if (lowlinkMap.get(node) === indexMap.get(node)) {
      const component: number[] = [];
      let w: number | undefined;
      do {
        w = stack.pop();
        onStack.delete(w!);
        component.push(w!);
      } while (w !== node);
      components.push(component);
    }
  };

  // Run strongConnect on every node that has not yet been visited
  for (const node of adjacencyList.keys()) {
    if (!indexMap.has(node)) {
      strongConnect(node);
    }
  }

  return components;
}
import { stronglyConnectedComponents } from './tarjan';

const graph = new Map<number, number[]>();
graph.set(0, [1]);
graph.set(1, [2, 3]);
graph.set(2, [0, 3]);
graph.set(3, [4]);
graph.set(4, [5]);
graph.set(5, [3]);

const sccs = stronglyConnectedComponents(graph);
console.log(sccs);
// → [ [ 4, 5, 3 ], [ 0, 1, 2 ] ]
// (order may vary)
