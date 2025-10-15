type NodeId = string; // or number, depending on your graph

interface QueueItem {
  node: NodeId;
  depth: number;
}

function breadthLimitedSearch(
  startNode: NodeId,
  getNeighbors: (node: NodeId) => NodeId[],
  maxDepth: number
): NodeId[] {
  const visited = new Set<NodeId>();
  const result: NodeId[] = [];

  const queue: QueueItem[] = [{ node: startNode, depth: 0 }];

  visited.add(startNode);

  while (queue.length > 0) {
    const { node, depth } = queue.shift()!; // get the front of the queue

    result.push(node);

    if (depth < maxDepth) {
      const neighbors = getNeighbors(node);

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push({ node: neighbor, depth: depth + 1 });
        }
      }
    }
  }

  return result;
}
const graph: Record<NodeId, NodeId[]> = {
  A: ["B", "C"],
  B: ["D", "E"],
  C: ["F"],
  D: [],
  E: ["F"],
  F: []
};

const nodesReached = breadthLimitedSearch("A", node => graph[node] || [], 2);
console.log(nodesReached); // should show nodes within depth 2 of A
