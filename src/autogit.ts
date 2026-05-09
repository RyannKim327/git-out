function kthSmallest<T>(arr: T[], k: number, cmp = (a: T, b: T) => a < b ? -1 : a > b ? 1 : 0): T | undefined {
  if (k < 1 || k > arr.length) return undefined;

  // make a shallow copy so the caller's array stays untouched
  const copy = [...arr];
  copy.sort(cmp);
  return copy[k - 1];
}
/**
 * Returns the k-th smallest element (1‑indexed) in `arr`.
 * Modifies the array in place (no extra array allocation).
 */
function quickSelect<T>(arr: T[], k: number, cmp = (a: T, b: T) => a < b ? -1 : a > b ? 1 : 0): T | undefined {
  if (k < 1 || k > arr.length) return undefined;
  return select(arr, 0, arr.length - 1, k - 1);

  function partition(lo: number, hi: number): number {
    const pivotIdx = Math.floor((lo + hi) / 2);
    const pivot = arr[pivotIdx];
    // move pivot to the end
    [arr[pivotIdx], arr[hi]] = [arr[hi], arr[pivotIdx]];

    let store = lo;
    for (let i = lo; i < hi; i++) {
      if (cmp(arr[i], pivot) < 0) {
        [arr[i], arr[store]] = [arr[store], arr[i]];
        store++;
      }
    }
    // put pivot back in its final place
    [arr[store], arr[hi]] = [arr[hi], arr[store]];
    return store;
  }

  function select(lo: number, hi: number, targetIdx: number): T {
    if (lo === hi) return arr[lo];
    const pivotIdx = partition(lo, hi);
    if (pivotIdx === targetIdx) {
      return arr[pivotIdx];
    } else if (pivotIdx > targetIdx) {
      return select(lo, pivotIdx - 1, targetIdx);
    } else {
      return select(pivotIdx + 1, hi, targetIdx);
    }
  }
}
class BinaryHeap<T> {
  constructor(private cmp: (a: T | null, b: T | null) => number) {}
  private heap: (T | null)[] = [null];          // 1‑indexed

  get size() { return this.heap.length - 1; }

  push(val: T) {
    this.heap.push(val);
    this.bubbleUp(this.size);
  }

  pop(): T | null {
    if (this.size === 0) return null;
    const ret = this.heap[1];
    this.heap[1] = this.heap.pop()!;
    this.bubbleDown(1);
    return ret;
  }

  peek(): T | null {
    return this.size ? this.heap[1] : null;
  }

  private bubbleUp(i: number) {
    while (i > 1) {
      const p = Math.floor(i / 2);
      if (this.cmp(this.heap[i]!, this.heap[p]!) < 0) {
        [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
        i = p;
      } else break;
    }
  }

  private bubbleDown(i: number) {
    while (true) {
      const l = i * 2, r = l + 1;
      let smallest = i;
      if (l <= this.size && this.cmp(this.heap[l]!, this.heap[smallest]!) < 0) smallest = l;
      if (r <= this.size && this.cmp(this.heap[r]!, this.heap[smallest]!) < 0) smallest = r;
      if (smallest !== i) {
        [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
        i = smallest;
      } else break;
    }
  }
}

function kthSmallestHeap<T>(arr: T[], k: number, cmp = (a: T, b: T) => a < b ? -1 : a > b ? 1 : 0): T | undefined {
  if (k < 1 || k > arr.length) return undefined;
  const heap = new BinaryHeap<T>((a, b) => cmp(a, b));
  for (const v of arr) heap.push(v);
  // pop k-1 times to discard smaller elements
  for (let i = 0; i < k - 1; i++) heap.pop();
  return heap.peek() as T;
}
