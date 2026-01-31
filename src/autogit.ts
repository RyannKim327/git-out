// 1️⃣  Types ---------------------------------------------------------------

/**
 * A simple graph node.  The generic parameter `T` lets you store any
 * payload with the node (e.g., a string label, a number, an object, …).
 */
export interface Node<T> {
    id: string;          // unique key for the node
    value: T;            // whatever you want to keep with it
    neighbors: Node<T>[]; // adjacency list
}

/**
 * A helper that produces a queue with the three essential ops.
 * We keep a head index instead of shifting the array for O(1) time.
 */
class Queue<T> {
    private items: T[] = [];
    private head: number = 0;

    push(item: T) { this.items.push(item); }

    shift(): T | undefined {
        if (this.head >= this.items.length) return undefined;
        const item = this.items[this.head++];
        // Do a bit of housekeeping to keep the array from growing forever.
        if (this.head > 1000) {                                   
            this.items = this.items.slice(this.head);
            this.head = 0;
        }
        return item;
    }

    size() { return this.items.length - this.head; }

    isEmpty() { return this.size() === 0; }
}


// 2️⃣  Breadth‑First Search -----------------------------------------------

/**
 * Returns an array of nodes in the order they were visited.
 * `start` is the node to begin from.
 * Optional `getNeighbors` allows you to supply a custom adjacency function.
 */
export function bfs<T>(
    start: Node<T>,
    getNeighbors?: (node: Node<T>) => Iterable<Node<T>>
): Node<T>[] {

    const visited = new Set<string>();
    const queue = new Queue<Node<T>>();
    const order: Node<T>[] = [];

    visited.add(start.id);
    queue.push(start);

    while (!queue.isEmpty()) {
        const current = queue.shift()!;   // non‑undefined because we checked queue.isEmpty()
        order.push(current);

        const neighbors = getNeighbors
            ? getNeighbors(current)
            : current.neighbors;          // fallback to adjacency list

        for (const nb of neighbors) {
            if (!visited.has(nb.id)) {
                visited.add(nb.id);
                queue.push(nb);
            }
        }
    }

    return order;
}


// 3️⃣  Example:  undirected graph -----------------------------------------

// Helper to wire nodes together
function link<T>(a: Node<T>, b: Node<T>) {
    a.neighbors.push(b);
    b.neighbors.push(a);
}

// Create a small graph
const a = { id: 'A', value: 1, neighbors: [] } as Node<number>;
const b = { id: 'B', value: 2, neighbors: [] } as Node<number>;
const c = { id: 'C', value: 3, neighbors: [] } as Node<number>;
const d = { id: 'D', value: 4, neighbors: [] } as Node<number>;
const e = { id: 'E', value: 5, neighbors: [] } as Node<number>;

link(a, b);
link(a, c);
link(b, d);
link(c, d);
link(d, e);

// Run BFS
const bfsResult = bfs(a);          // depth‑first will visit A → B → C → D → E
console.log('BFS order:', bfsResult.map(n => n.id));

// 4️⃣  Tweaking with a custom neighbor fetch ------------------------------

/**
 * Suppose your graph data is stored in an adjacency map:
 *   { 'A': ['B', 'C'], ... }
 * You can adapt BFS by supplying a `getNeighbors` callback.
 */
const adjacency: Record<string, string[]> = {
    A: ['B', 'C'],
    B: ['A', 'D'],
    C: ['A', 'D'],
    D: ['B', 'C', 'E'],
    E: ['D']
};

const nodes = Object.fromEntries(
    Object.keys(adjacency).map(id => [id, { id, value: id, neighbors: [] } as Node<string>])
);

// Convert adjacency graph to node objects (without circular refs)
for (const [id, nbrs] of Object.entries(adjacency)) {
    const node = nodes[id]!;
    node.neighbors = nbrs.map(n => nodes[n]!);
}

// Or just keep the adjacency map and pull neighbors on the fly:
const bfsFromMap = (startId: string): string[] => {
    const startNode = nodes[startId]!;
    const path = bfs(startNode, n => adjacency[n.id].map(id => nodes[id]!));
    return path.map(n => n.id);
};

console.log('BFS from map:', bfsFromMap('A'));

// -------------------------------------------------------------------------

