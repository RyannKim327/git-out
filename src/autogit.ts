// A simple adjacency‑list representation.
// The keys are vertex identifiers (strings or numbers).
type AdjList<T = string | number> = Map<T, T[]>;

// Helper to create a graph from an edge list.
function buildGraph<T = string | number>(edges: [T, T][], directed = false): AdjList<T> {
    const graph: AdjList<T> = new Map();

    const addEdge = (from: T, to: T) => {
        if (!graph.has(from)) graph.set(from, []);
        graph.get(from)!.push(to);
    };

    for (const [u, v] of edges) {
        addEdge(u, v);
        if (!directed) addEdge(v, u);
    }

    return graph;
}
/**
 * Depth‑First Search (recursive)
 *
 * @param graph   adjacency list
 * @param start   vertex where the search begins
 * @param visited (internal) set of already‑seen vertices
 * @param order   (internal) array that records the visitation order
 * @returns       array of vertices in the order they were visited
 */
function dfsRecursive<T>(
    graph: AdjList<T>,
    start: T,
    visited: Set<T> = new Set(),
    order: T[] = []
): T[] {
    // 1️⃣ Mark the current node as visited
    visited.add(start);
    order.push(start);

    // 2️⃣ Recurse on each neighbour that hasn't been visited yet
    const neighbours = graph.get(start) ?? [];
    for (const next of neighbours) {
        if (!visited.has(next)) {
            dfsRecursive(graph, next, visited, order);
        }
    }

    // 3️⃣ When the recursion unwinds, `order` already contains the full traversal
    return order;
}
// Example graph (undirected)
const edges = [
    ['A', 'B'],
    ['A', 'C'],
    ['B', 'D'],
    ['B', 'E'],
    ['C', 'F'],
    ['E', 'F'],
] as const;

const graph = buildGraph(edges); // undirected by default

const visitedOrder = dfsRecursive(graph, 'A');
console.log('DFS (recursive) order:', visitedOrder);
// Possible output: [ 'A', 'B', 'D', 'E', 'F', 'C' ]
/**
 * Depth‑First Search (iterative)
 *
 * @param graph   adjacency list
 * @param start   start vertex
 * @returns       array of vertices in visitation order
 */
function dfsIterative<T>(graph: AdjList<T>, start: T): T[] {
    const visited = new Set<T>();
    const stack: T[] = [start];
    const order: T[] = [];

    while (stack.length) {
        const node = stack.pop()!; // non‑null because we checked length

        if (visited.has(node)) continue; // skip already processed nodes

        visited.add(node);
        order.push(node);

        // Push neighbours onto the stack.
        // We push them in reverse order so that the left‑most neighbour
        // (the first in the adjacency array) is processed first,
        // mimicking the recursive version.
        const neighbours = graph.get(node) ?? [];
        for (let i = neighbours.length - 1; i >= 0; i--) {
            const nxt = neighbours[i];
            if (!visited.has(nxt)) stack.push(nxt);
        }
    }

    return order;
}
const visitedIter = dfsIterative(graph, 'A');
console.log('DFS (iterative) order:', visitedIter);
// Output will match the recursive version if neighbour order is the same.
function dfsRecursiveFind<T>(
    graph: AdjList<T>,
    start: T,
    target: T,
    visited: Set<T> = new Set(),
    path: T[] = []
): T[] | null {
    visited.add(start);
    path.push(start);

    if (start === target) return [...path]; // found!

    for (const nxt of graph.get(start) ?? []) {
        if (!visited.has(nxt)) {
            const result = dfsRecursiveFind(graph, nxt, target, visited, path);
            if (result) return result; // bubble up the successful path
        }
    }

    path.pop(); // backtrack
    return null; // not found in this branch
}
function dfsIterativeParents<T>(graph: AdjList<T>, start: T): Map<T, T | null> {
    const parent = new Map<T, T | null>();
    const visited = new Set<T>();
    const stack: T[] = [start];
    parent.set(start, null);

    while (stack.length) {
        const node = stack.pop()!;
        if (visited.has(node)) continue;
        visited.add(node);

        for (const nxt of graph.get(node) ?? []) {
            if (!visited.has(nxt)) {
                parent.set(nxt, node);
                stack.push(nxt);
            }
        }
    }

    return parent;
}
// dfs.ts --------------------------------------------------------------
type AdjList<T = string | number> = Map<T, T[]>;

function buildGraph<T>(edges: [T, T][], directed = false): AdjList<T> {
    const g: AdjList<T> = new Map();
    const add = (a: T, b: T) => {
        if (!g.has(a)) g.set(a, []);
        g.get(a)!.push(b);
    };
    for (const [u, v] of edges) {
        add(u, v);
        if (!directed) add(v, u);
    }
    return g;
}

// ---------- Recursive ----------
function dfsRecursive<T>(g: AdjList<T>, start: T, visited = new Set<T>(), order: T[] = []): T[] {
    visited.add(start);
    order.push(start);
    for (const nb of g.get(start) ?? []) {
        if (!visited.has(nb)) dfsRecursive(g, nb, visited, order);
    }
    return order;
}

// ---------- Iterative ----------
function dfsIterative<T>(g: AdjList<T>, start: T): T[] {
    const visited = new Set<T>();
    const stack: T[] = [start];
    const order: T[] = [];

    while (stack.length) {
        const v = stack.pop()!;
        if (visited.has(v)) continue;
        visited.add(v);
        order.push(v);
        const neigh = g.get(v) ?? [];
        for (let i = neigh.length - 1; i >= 0; i--) {
            const n = neigh[i];
            if (!visited.has(n)) stack.push(n);
        }
    }
    return order;
}

// ---------- Demo ----------
if (require.main === module) {
    const edges: [string, string][] = [
        ['A', 'B'],
        ['A', 'C'],
        ['B', 'D'],
        ['B', 'E'],
        ['C', 'F'],
        ['E', 'F'],
    ];
    const graph = buildGraph(edges);
    console.log('Recursive:', dfsRecursive(graph, 'A'));
    console.log('Iterative:', dfsIterative(graph, 'A'));
}
ts-node dfs.ts
