/**
 * Generic comparison, returns true if a should come before b.
 * Default is for a number array (so it's an ascending sort).
 */
type Comparator<T> = (a: T, b: T) => boolean;

function heapSort<T>(arr: T[], compare: Comparator<T> = (a, b) => a < b): void {
  const n = arr.length;

  /* 1️⃣ Build a max‑heap (or max‑based on compare) */
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) siftDown(arr, i, n, compare);

  /* 2️⃣ Extract elements one by one */
  for (let end = n - 1; end > 0; end--) {
    // swap max element (root) with the last element of the heap
    [arr[0], arr[end]] = [arr[end], arr[0]];
    // heap size shrinks by one; restore heap property for the new root
    siftDown(arr, 0, end, compare);
  }
}

/**
 * Moves the element at `start` down the heap until the heap
 * property is restored.  The heap is the sub‑array `[0, size)`.
 */
function siftDown<T>(arr: T[], start: number, size: number, compare: Comparator<T>): void {
  let root = start;

  while (true) {
    const left = 2 * root + 1;   // left child index
    const right = left + 1;      // right child index
    let swapIdx = root;

    // if left child exists and is greater (or “comes first” by compare)
    if (left < size && compare(arr[swapIdx], arr[left])) {
      swapIdx = left;
    }

    // do the same for the right child
    if (right < size && compare(arr[swapIdx], arr[right])) {
      swapIdx = right;
    }

    // if root holds the max element, we are done
    if (swapIdx === root) return;

    // swap root with the larger child and continue
    [arr[root], arr[swapIdx]] = [arr[swapIdx], arr[root]];
    root = swapIdx;
  }
}

/* --------------------  Example usage  -------------------- */

const nums = [5, 1, 4, 2, 8, 0, 3];
heapSort(nums);     // nums is now [0, 1, 2, 3, 4, 5, 8]

/* --------------------  Sorting strings  -------------------- */
const strs = ["delta", "alpha", "charlie", "bravo"];
heapSort(strs, (a, b) => a > b);   // descending order
// strs => ["delta", "charlie", "bravo", "alpha"]
