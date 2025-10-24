export interface BiSearchOptions<S> {
    start: S;
    goal: S;
    neighbours: (s: S) => S[];
    maxDepth?: number;          // safety break, defaults 50
    onIterate?: () => void;       // optional progress callback
}
export function biBFS<S>(opts: BiSearchOptions<S>): S[] | null;
type Node<S> = { state: S; parent: string | null };

export function biBFS<S>(opts: BiSearchOptions<S>): S[] | null {
    const { start, goal, neighbours, maxDepth = 50, onIterate } = opts;

    if (deepEqual(start, goal)) return [start];

    // ---- queues ----
    const qStart = new Queue<Node<S>>();
    const qGoal  = new Queue<Node<S>>();
    // ---- visited tables ----
    const visitedStart = new Map<string, Node<S>>(); // key -> node
    const visitedGoal  = new Map<string, Node<S>>();

    const key = (s: S) => JSON.stringify(s);

    const rootStart: Node<S> = { state: start, parent: null };
    const rootGoal : Node<S> = { state: goal,  parent: null };

    qStart.enqueue(rootStart);
    qGoal .enqueue(rootGoal);
    visitedStart.set(key(start), rootStart);
    visitedGoal .set(key(goal),  rootGoal);

    let depth = 0;

    while (!qStart.isEmpty() && !qGoal.isEmpty()) {
        if (onIterate) onIterate();
        if (++depth > maxDepth) return null;

        // expand the smaller frontier (balanced search)
        const expandStart = qStart.size <= qGoal.size;

        const currentQueue   = expandStart ? qStart : qGoal;
        const currentVisited = expandStart ? visitedStart : visitedGoal;
        const otherVisited   = expandStart ? visitedGoal  : visitedStart;

        const size = currentQueue.size;
        for (let i = 0; i < size; i++) {
            const node = currentQueue.dequeue()!;
            const k = key(node.state);

            for (const n of neighbours(node.state)) {
                const nk = key(n);
                if (currentVisited.has(nk)) continue; // already seen

                const child: Node<S> = { state: n, parent: k };
                currentVisited.set(nk, child);
                currentQueue.enqueue(child);

                // ----- collision? -----
                if (otherVisited.has(nk)) {
                    // we met in the middle; reconstruct full path
                    const path = expandStart
                        ? buildPath(child, otherVisited.get(nk)!, visitedStart, visitedGoal)
                        : buildPath(otherVisited.get(nk)!, child, visitedStart, visitedGoal);
                    return path;
                }
            }
        }
    }
    return null; // exhausted
}

/* ---------- helpers ---------- */
function buildPath<S>(
    meetStart: Node<S>,
    meetGoal: Node<S>,
    visitedStart: Map<string, Node<S>>,
    visitedGoal : Map<string, Node<S>>
): S[] {
    const left: S[] = [];
    let curr: Node<S> | null = meetStart;
    while (curr) {
        left.push(curr.state);
        curr = curr.parent ? visitedStart.get(curr.parent) ?? null : null;
    }
    left.reverse();

    const right: S[] = [];
    curr = meetGoal;
    while (curr) {
        right.push(curr.state);
        curr = curr.parent ? visitedGoal.get(curr.parent) ?? null : null;
    }
    return left.concat(right.slice(1));
}

/* tiny deep-equal for plain JSON data */
function deepEqual(a: any, b: any): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
}

/* minimal queue */
class Queue<T> {
    private arr: T[] = [];
    get size() { return this.arr.length; }
    enqueue = (t: T) => this.arr.push(t);
    dequeue = () => this.arr.shift();
    isEmpty = () => this.arr.length === 0;
}
interface Pos { x: number; y: number }

const dirs = [{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1}];

function neighbours(p: Pos): Pos[] {
    const out: Pos[] = [];
    for (const d of dirs) {
        const nx = p.x + d.x;
        const ny = p.y + d.y;
        if (nx >= 0 && ny >= 0 && nx < 20 && ny < 20) out.push({x:nx, y:ny});
    }
    return out;
}

const path = biBFS({
    start: {x:0, y:0},
    goal : {x:19,y:19},
    neighbours
});
console.log(path?.length ?? 'No path');
