type Node = string;                     // or number, or any keyable type
type Edge = [Node, Node];               // (from, to)

interface Graph {
    nodes: Set<Node>;
    edges: Edge[];
}
function topologicalSortKahn(graph: Graph): Node[] | null {
    const indeg = new Map<Node, number>();
    const adj   = new Map<Node, Node[]>();

    // init
    graph.nodes.forEach(v => {
        indeg.set(v, 0);
        adj.set(v, []);
    });

    // build adjacency + indegree
    for (const [u, v] of graph.edges) {
        adj.get(u)!.push(v);
        indeg.set(v, indeg.get(v)! + 1);
    }

    // queue of nodes with indegree 0
    const q: Node[] = [];
    indeg.forEach((cnt, node) => { if (cnt === 0) q.push(node); });

    const order: Node[] = [];

    while (q.length) {
        const v = q.shift()!;
        order.push(v);

        for (const w of adj.get(v)!) {
            const newCnt = indeg.get(w)! - 1;
            indeg.set(w, newCnt);
            if (newCnt === 0) q.push(w);
        }
    }

    // If we processed every node → DAG; else cycle present
    return order.length === graph.nodes.size ? order : null;
}
function topologicalSortDFS(graph: Graph): Node[] | null {
    const adj = new Map<Node, Node[]>();
    graph.nodes.forEach(v => adj.set(v, []));

    for (const [u, v] of graph.edges) {
        adj.get(u)!.push(v);
    }

    const visited = new Set<Node>();
    const onStack = new Set<Node>();   // for cycle detection
    const order: Node[] = [];

    function dfs(v: Node): boolean {
        visited.add(v);
        onStack.add(v);

        for (const w of adj.get(v)!) {
            if (!visited.has(w)) {
                if (!dfs(w)) return false;           // cycle deeper down
            } else if (onStack.has(w)) {
                return false;                       // back edge → cycle
            }
        }

        onStack.delete(v);
        order.push(v);                     // add after exploring all children
        return true;
    }

    for (const node of graph.nodes) {
        if (!visited.has(node) && !dfs(node))
            return null;                   // cycle found
    }

    return order.reverse();               // reverse to get finish order
}
const g: Graph = {
    nodes: new Set(['A','B','C','D','E']),
    edges: [
        ['A', 'B'],
        ['A', 'C'],
        ['B', 'D'],
        ['C', 'D'],
        ['D', 'E'],
    ]
};

console.log('Kahn:', topologicalSortKahn(g)); // e.g. A,B,C,D,E or A,C,B,D,E
console.log('DFS :', topologicalSortDFS(g));
