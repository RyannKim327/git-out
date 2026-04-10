/**
 * Simple graph type
 */
type Node = string;                                  // or number, UUID, etc.
type AdjList = Map<Node, Node[]>;                    // adjacency list

/**
 * Bidirectional BFS – returns the length of the shortest path
 * or null if no path exists.
 *
 * @param graph      adjacency list of the graph
 * @param start      source node
 * @param target     destination node
 */
export function biBfs(
  graph: AdjList,
  start: Node,
  target: Node
): number | null {
  if (start === target) return 0;

  // queues for each direction
  const qStart = [start];
  const qTarget = [target];

  // distances from each end
  const distStart = new Map<Node, number>();
  const distTarget = new Map<Node, number>();
  distStart.set(start, 0);
  distTarget.set(target, 0);

  while (qStart.length && qTarget.length) {
    // Expand the frontier that is currently smaller
    // (helps keep the branching factor balanced)
    if (qStart.length <= qTarget.length) {
      const step = expandFrontier(
        qStart,
        distStart,
        distTarget,
        graph
      );
      if (step !== null) return step;
    } else {
      const step = expandFrontier(
        qTarget,
        distTarget,
        distStart,
        graph
      );
      if (step !== null) return step;
    }
  }

  return null;   // no connection
}

/**
 * Helper that walks one layer of BFS.
 * Returns the total distance when the two explored sets touch.
 */
function expandFrontier(
  queue: Node[],
  distThis: Map<Node, number>,
  distOther: Map<Node, number>,
  graph: AdjList
): number | null {
  const layerSize = queue.length;

  for (let i = 0; i < layerSize; ++i) {
    const current = queue.shift() as Node;
    const neighbours = graph.get(current) ?? [];

    for (const neighbour of neighbours) {
      // Already visited from this side – skip
      if (distThis.has(neighbour)) continue;

      // Visited from the other side → path found
      if (distOther.has(neighbour)) {
        return (
          distThis.get(current)! + 1 +
          distOther.get(neighbour)!
        );
      }

      // Push next layer
      distThis.set(neighbour, distThis.get(current)! + 1);
      queue.push(neighbour);
    }
  }

  return null;
}
// const graph: AdjList = new Map([
//   ['A', ['B', 'C']],
//   ['B', ['A', 'D']],
//   ['C', ['A', 'D']],
//   ['D', ['B', 'C', 'E']],
//   ['E', ['D']]
// ]);
// console.log(biBfs(graph, 'A', 'E')); // 3
