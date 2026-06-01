// Simple directed graph helper
class Graph {
  private edges = new Map<string, string[]>();

  addVertex(v: string) {
    if (!this.edges.has(v)) this.edges.set(v, []);
  }

  addEdge(from: string, to: string) {
    this.addVertex(from);
    this.addVertex(to);
    this.edges.get(from)!.push(to);
  }

  neighbors(v: string): string[] {
    return this.edges.get(v) ?? [];
  }

  vertices(): string[] {
    return Array.from(this.edges.keys());
  }
}
function bfs(start: string, graph: Graph): string[] {
  const queue: string[] = [start];
  const visited = new Set<string>([start]);
  const order: string[] = [];

  while (queue.length) {
    const current = queue.shift()!; // queue never empty here
    order.push(current);

    for (const next of graph.neighbors(current)) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
    }
  }
  return order;
}
// Build a quick sample graph
const g = new Graph();
g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "D");
g.addEdge("C", "E");
g.addEdge("E", "F");

// Run BFS from A
const visitedOrder = bfs("A", g);
console.log(visitedOrder);
// → ["A", "B", "C", "D", "E", "F"]
Level 0:  A
Level 1:  B  C
Level 2:  D  E
Level 3:  F
