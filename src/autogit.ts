// A generic state; `data` can be any shape you need.
export interface BeamState<T> {
  readonly data: T;      // the actual thing (token list, node id, etc.)
  readonly score: number; // higher is better
}

// A function that, from one state, produces zero or more candidate states.
export type Expander<T> = (state: BeamState<T>) => BeamState<T>[];

// A function that assigns a numeric score to a state.
export type Scorer<T> = (state: BeamState<T>) => number;
class MinHeap<T> {
  private data: T[] = [];
  constructor(private readonly key: (x: T) => number) {}

  private swap(i: number, j: number) {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }

  push(item: T) {
    this.data.push(item);
    this.siftUp(this.data.length - 1);
  }

  pop(): T | undefined {
    const top = this.data[0];
    const last = this.data.pop();
    if (!this.data.length || !last) return top;
    this.data[0] = last;
    this.siftDown(0);
    return top;
  }

  size() { return this.data.length; }

  private siftUp(i: number) {
    let idx = i;
    while (idx > 0) {
      const parent = (idx - 1) >> 1;
      if (this.key(this.data[idx]) >= this.key(this.data[parent])) break;
      this.swap(idx, parent);
      idx = parent;
    }
  }
  private siftDown(i: number) {
    let idx = i;
    const n = this.data.length;
    while (true) {
      const l = idx * 2 + 1;
      const r = l + 1;
      let smallest = idx;
      if (l < n && this.key(this.data[l]) < this.key(this.data[smallest])) smallest = l;
      if (r < n && this.key(this.data[r]) < this.key(this.data[smallest])) smallest = r;
      if (smallest === idx) break;
      this.swap(idx, smallest);
      idx = smallest;
    }
  }

  // For debugging / inspection
  toArray() { return [...this.data]; }
}
export class BeamSearch<T> {
  constructor(
    private readonly expander: Expander<T>,
    private readonly scorer: Scorer<T>,
    private readonly beamWidth: number
  ) {}

  /**
   * Runs beam search for a fixed number of iterations.
   * @param startState the initial state (usually empty output)
   * @param maxDepth how many expansion steps to take
   * @returns an array containing the best states after the last depth
   */
  search(startState: BeamState<T>, maxDepth: number): BeamState<T>[] {
    let current: BeamState<T>[] = [startState];

    for (let depth = 0; depth < maxDepth; depth++) {
      const candidates: BeamState<T>[] = [];
      for (const state of current) {
        const nextStates = this.expander(state);
        // We expect each expander to already return scored states,
        // but if they don't we can score them here:
        for (const ns of nextStates) {
          const s = this.scorer(ns);
          candidates.push({ ...ns, score: s });
        }
      }
      if (candidates.length === 0) break; // nothing to expand
      // Keep top `beamWidth` candidates
      const heap = new MinHeap<BeamState<T>>((s) => -s.score); // max‑heap by negative key
      for (const cand of candidates) heap.push(cand);
      current = [];
      for (let i = 0; i < this.beamWidth && heap.size() > 0; i++) {
        current.push(heap.pop()!); // `!` is safe because we checked size
      }
    }

    // Sort by score descending before returning just in case
    return current.sort((a, b) => b.score - a.score);
  }
}
