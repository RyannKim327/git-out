// ---------- types ----------
type Vertex = string;
type EdgeList = Record<Vertex, Vertex[]>;

interface VisitedEntry {
  distance: number;
  parent: Vertex | null;
}

interface SearchState {
  queue: Queue<Vertex>;
  visited: Map<Vertex, VisitedEntry>;
}

class Queue<T> {
  private data: T[] = [];
  push(item: T) { this.data.push(item); }
  shift(): T | undefined { return this.data.shift(); }
  get length() { return this.data.length; }
}

// ---------- bi-directional BFS ----------
function biBFS(
  adj: EdgeList,
  start: Vertex,
  goal: Vertex
): Vertex[] | null {
  if (start === goal) return [start];

  // initialise forward and backward search states
  const fwd: SearchState = {
    queue: new Queue<Vertex>(),
    visited: new Map<Vertex, VisitedEntry>(),
  };
  const rev: SearchState = {
    queue: new Queue<Vertex>(),
    visited: new Map<Vertex, VisitedEntry>(),
  };

  fwd.queue.push(start);
  fwd.visited.set(start, { distance: 0, parent: null });

  rev.queue.push(goal);
  rev.visited.set(goal, { distance: 0, parent: null });

  // helper to expand one level
  function expand(from: SearchState, to: SearchState): Vertex | null {
    const cur = from.queue.shift()!;
    const curDist = from.visited.get(cur)!.distance;

    for (const n of adj[cur] || []) {
      if (!from.visited.has(n)) {
        from.visited.set(n, { distance: curDist + 1, parent: cur });
        from.queue.push(n);
      }

      // collision detection
      if (to.visited.has(n)) return n;
    }
    return null;
  }

  // main loop
  while (fwd.queue.length && rev.queue.length) {
    // expand the smaller frontier
    const meet =
      fwd.queue.length <= rev.queue.length
        ? expand(fwd, rev)
        : expand(rev, fwd);

    if (meet !== null) {
      // reconstruct path
      const left = buildPath(fwd.visited, meet);
      const right = buildPath(rev.visited, meet).reverse();
      return left.concat(right.slice(1)); // avoid duplicate meeting point
    }
  }

  return null; // no path
}

// ---------- path reconstruction ----------
function buildPath(visited: Map<Vertex, VisitedEntry>, tip: Vertex): Vertex[] {
  const path: Vertex[] = [];
  let v: Vertex | null = tip;
  while (v !== null) {
    path.unshift(v);
    v = visited.get(v)!.parent;
  }
  return path;
}

// ---------- small demo ----------
if (import.meta.url.endsWith(process.argv[1])) {
  const g: EdgeList = {
    A: ["B", "C"],
    B: ["A", "D", "E"],
    C: ["A", "F"],
    D: ["B"],
    E: ["B", "F"],
    F: ["C", "E", "G"],
    G: ["F"],
  };

  console.log(biBFS(g, "A", "G")); // → [ 'A', 'C', 'F', 'G' ]
}
