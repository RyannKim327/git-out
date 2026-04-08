const arr = [1, 2, 3, 4, 5];

// In‑place reversal
arr.reverse();          // arr becomes [5, 4, 3, 2, 1]

// If you need a new array instead of mutating the original
const reversed = [...arr].reverse();   // [5, 4, 3, 2, 1]

// Or do it manually (e.g., for learning or if you want a custom logic)
function reverse<T>(src: T[]): T[] {
  const out: T[] = [];
  for (let i = src.length - 1; i >= 0; i--) {
    out.push(src[i]);
  }
  return out;
}

const manualReversed = reverse([10, 20, 30]); // [30, 20, 10]
