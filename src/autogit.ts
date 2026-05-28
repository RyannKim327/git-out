type HeapItem<T> = { value: T; priority: number };

class MaxHeap<T> {
  private heap: HeapItem<T>[] = [];

  get size() { return this.heap.length; }

  push(item: T, priority: number) {
    this.heap.push({ value: item, priority });
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): HeapItem<T> | undefined {
    if (!this.heap.length) return;
    const top = this.heap[0];
    const end = this.heap.pop()!;
    if (this.heap.length) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    return top;
  }

  private bubbleUp(idx: number) {
    const item = this.heap[idx];
    while (idx > 0) {
      const parentIdx = ((idx + 1) >> 1) - 1;
      const parent = this.heap[parentIdx];
      if (item.priority <= parent.priority) break;
      this.heap[idx] = parent;
      idx = parentIdx;
    }
    this.heap[idx] = item;
  }

  private sinkDown(idx: number) {
    const length = this.heap.length;
    const item = this.heap[idx];
    while (true) {
      let leftIdx = (idx << 1) + 1;
      let rightIdx = leftIdx + 1;
      let swapIdx = -1;

      if (leftIdx < length) {
        const left = this.heap[leftIdx];
        if (left.priority > item.priority) swapIdx = leftIdx;
      }
      if (rightIdx < length) {
        const right = this.heap[rightIdx];
        if (
          (swapIdx === -1 && right.priority > item.priority) ||
          (swapIdx !== -1 && right.priority > this.heap[swapIdx].priority)
        ) swapIdx = rightIdx;
      }

      if (swapIdx === -1) break;
      this.heap[idx] = this.heap[swapIdx];
      idx = swapIdx;
    }
    this.heap[idx] = item;
  }
}
/**
 * A generic beam‑search helper.
 *
 * @param initialState   The starting state.
 * @param expandFn       (state, depth) => Array<{ nextState, scoreDelta }>
 * @param beamWidth      k – how many hypotheses to keep per depth.
 * @param maxDepth       how many expansion steps to run (or until you hit an end condition).
 * @param scoreCombiner  (oldScore, delta) => newScore (typically newScore = oldScore + delta).
 */
async function beamSearch<State>(
  initialState: State,
  expandFn: (state: State, depth: number) => Promise<Array<{ nextState: State; scoreDelta: number }>>,
  beamWidth: number,
  maxDepth: number,
  scoreCombiner = (old: number, delta: number) => old + delta
): Promise<Array<{ state: State; score: number }>> {
  type BeamEntry = { state: State; score: number };

  // start with the root
  let beam: BeamEntry[] = [{ state: initialState, score: 0 }];

  for (let depth = 0; depth < maxDepth && beam.length; depth++) {
    const candidates: BeamEntry[] = [];

    // expand every element in the current beam
    for (const entry of beam) {
      const expansions = await expandFn(entry.state, depth);

      for (const { nextState, scoreDelta } of expansions) {
        const newScore = scoreCombiner(entry.score, scoreDelta);
        candidates.push({ state: nextState, score: newScore });
      }
    }

    // keep only the top k by score
    // for **higher** scores better, use descending
    // for **lower** scores better, reverse the compare
    const sorted = candidates.sort((a, b) => b.score - a.score);

    beam = sorted.slice(0, beamWidth);
  }

  return beam;
}
