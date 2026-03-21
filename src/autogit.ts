// A node identifier can be any string or number
export type Vertex = string | number;

// Directed edge with a non‑negative weight
export interface Edge {
    to: Vertex;
    cost: number;
}

// Adjacency list representation
export type Graph = Map<Vertex, Edge[]>;

// Result of dijkstra: distance to each node, and the shortest‑path tree
export interface DijkstraResult {
    distances: Map<Vertex, number>;
    previous: Map<Vertex, Vertex | null>;
}
class MinHeap {
    private data: [number, Vertex][] = [];

    isEmpty() {
        return this.data.length === 0;
    }

    push(item: [number, Vertex]) {
        this.data.push(item);
        this.bubbleUp(this.data.length - 1);
    }

    pop(): [number, Vertex] | undefined {
        if (this.isEmpty()) return undefined;
        const root = this.data[0];
        const last = this.data.pop()!;
        if (!this.isEmpty()) {
            this.data[0] = last;
            this.bubbleDown(0);
        }
        return root;
    }

    private bubbleUp(i: number) {
        while (i > 0) {
            const parent = (i - 1) >> 1;
            if (this.data[parent][0] <= this.data[i][0]) break;
            [this.data[parent], this.data[i]] = [this.data[i], this.data[parent]];
            i = parent;
        }
    }

    private bubbleDown(i: number) {
        const n = this.data.length;
        while (true) {
            const left = (i << 1) + 1;
            const right = left + 1;
            let smallest = i;

            if (left < n && this.data[left][0] < this.data[smallest][0]) smallest = left;
            if (right < n && this.data[right][0] < this.data[smallest][0]) smallest = right;

            if (smallest === i) break;

            [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
            i = smallest;
        }
    }
}
export function dijkstra(
    graph: Graph,
    source: Vertex
): DijkstraResult {
    const distances = new Map<Vertex, number>();
    const previous = new Map<Vertex, Vertex | null>();

    // init
    graph.forEach((_, v) => {
        distances.set(v, Infinity);
        previous.set(v, null);
    });
    distances.set(source, 0);

    const pq = new MinHeap();
    pq.push([0, source]);

    while (!pq.isEmpty()) {
        const [distU, u] = pq.pop()!;

        // (optional) skip stale queue entries
        if (distU > distances.get(u)!) continue;

        const edges = graph.get(u) ?? [];
        for (const { to: v, cost: w } of edges) {
            const alt = distU + w;
            if (alt < distances.get(v)!) {
                distances.set(v, alt);
                previous.set(v, u);
                pq.push([alt, v]);
            }
        }
    }

    return { distances, previous };
}
const g: Graph = new Map([
    ['A', [{ to: 'B', cost: 5 }, { to: 'C', cost: 10 }]],
    ['B', [{ to: 'C', cost: 3 }, { to: 'D', cost: 2 }]],
    ['C', [{ to: 'D', cost: 1 }]],
    ['D', []]
]);

const { distances, previous } = dijkstra(g, 'A');
console.log('Distances:', distances);
console.log('Previous:', previous);

// Reconstruct path A → D
function buildPath(prev: Map<Vertex, Vertex | null>, target: Vertex) {
    const path: Vertex[] = [];
    for (let v = target; v !== null; v = prev.get(v)!) path.unshift(v);
    return path;
}

console.log('Path A → D:', buildPath(previous, 'D'));
Distances: Map { 'A' => 0, 'B' => 5, 'C' => 7, 'D' => 8 }
Previous: Map { 'A' => null, 'B' => 'A', 'C' => 'B', 'D' => 'C' }
Path A → D: ['A', 'B', 'C', 'D']
