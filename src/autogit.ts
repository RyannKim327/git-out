// A graph is represented as an adjacency list.
//   keys  – node identifiers (strings, numbers, etc.)
//   values – array of keys this node points to
type Graph = Record<string, string[]>

export function topologicalSortKahn(g: Graph): string[] {
  // Compute indegree for every node
  const indegree = new Map<string, number>()
  const nodes = new Set<string>(Object.keys(g))

  // initialise all counts to 0
  for (const v of nodes) indegree.set(v, 0)

  // For each edge u → v, bump indegree of v
  for (const u of Object.keys(g)) {
    for (const v of g[u]) {
      // if the neighbour isn't in `nodes` create an entry,
      // this covers edges to nodes that have no outgoing edges
      if (!indegree.has(v)) indegree.set(v, 0)
      indegree.set(v, (indegree.get(v) ?? 0) + 1)
      nodes.add(v)          // ensure isolated nodes are recorded
    }
  }

  // enqueue all nodes that have indegree 0
  const queue: string[] = [...indegree].filter(([_, d]) => d === 0).map(([n]) => n)
  const result: string[] = []

  while (queue.length) {
    const n = queue.shift()!
    result.push(n)

    // For each outgoing edge n → m
    for (const m of g[n] ?? []) {
      indegree.set(m, (indegree.get(m) ?? 0) - 1)
      if (indegree.get(m) === 0) queue.push(m)
    }
  }

  if (result.length !== nodes.size) {
    throw new Error('Graph has at least one cycle – topological sort impossible')
  }
  return result
}
export function topologicalSortDFS(g: Graph): string[] {
  const result: string[] = []          // hold the ordering (reverse order)
  const visited = new Set<string>()    // permanently visited nodes
  const temp    = new Set<string>()    // nodes that are on the current recursion stack

  const visit = (node: string) => {
    if (temp.has(node)) {
      throw new Error(`Cycle detected – node '${node}' revisited on the same path`)
    }
    if (!visited.has(node)) {
      temp.add(node)

      // Recurse on all neighbours
      for (const m of g[node] ?? []) {
        visit(m)
      }

      temp.delete(node)
      visited.add(node)
      result.push(node)               // push after visiting all descendants
    }
  }

  // A graph can have disjoint components – start from every node.
  for (const node of Object.keys(g)) {
    if (!visited.has(node)) visit(node)
  }

  // `result` is built in reverse; flip it to get a valid topological order
  return result.reverse()
}
const example: Graph = {
  a: ['b', 'c'],
  b: ['d'],
  c: ['d'],
  d: []
}

console.log('Kahn   →', topologicalSortKahn(example))
console.log('DFS    →', topologicalSortDFS(example))
Kahn   → [ 'a', 'b', 'c', 'd' ]
DFS    → [ 'a', 'b', 'c', 'd' ]
