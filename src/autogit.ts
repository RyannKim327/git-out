const numbers = [4, 8, 15, 16, 23, 42];
const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
console.log(mean); // 18
/**
 * Calculates the arithmetic mean (average) of an array of numbers.
 *
 * @param values - An array of numbers. Empty arrays return `NaN`.
 * @param options - Optional configuration.
 *   - `ignoreNaN` (default: true) – If true, NaN values are filtered out before the calculation.
 *
 * @returns The mean of the supplied numbers, or `NaN` if the array (after filtering) is empty.
 *
 * @example
 *   mean([1, 2, 3, 4]);               // → 2.5
 *   mean([1, 2, NaN, 4]);             // → 2.333...
 *   mean([], { ignoreNaN: false });   // → NaN
 */
export function mean(
  values: readonly number[],
  { ignoreNaN = true }: { ignoreNaN?: boolean } = {}
): number {
  // Fast‑path for empty input
  if (values.length === 0) return NaN;

  // Optionally drop NaN entries
  const filtered = ignoreNaN ? values.filter(v => Number.isFinite(v)) : values;

  // If everything was filtered out, we have no data left.
  if (filtered.length === 0) return NaN;

  // Sum using a simple loop – faster than reduce for large arrays.
  let sum = 0;
  for (let i = 0; i < filtered.length; i++) {
    sum += filtered[i];
  }

  return sum / filtered.length;
}
import { mean } from "./mean";

console.log(mean([10, 20, 30]));                     // 20
console.log(mean([5, 10, NaN, 15]));                 // 10 (NaN ignored)
console.log(mean([5, 10, NaN, 15], { ignoreNaN: false })); // NaN
console.log(mean([]));                               // NaN
/**
 * Mean for an array of bigint values.
 * Returns a bigint rounded toward zero (the default integer division behavior).
 */
export function bigintMean(values: readonly bigint[]): bigint {
  if (values.length === 0) throw new Error("Cannot compute mean of an empty array.");

  let sum = 0n;
  for (const v of values) sum += v;

  return sum / BigInt(values.length); // integer division
}

// Example
const bigValues = [10n, 20n, 30n];
console.log(bigintMean(bigValues)); // 20n
function fastMean(values: Float64Array): number {
  const n = values.length;
  if (n === 0) return NaN;

  let sum = 0;
  for (let i = 0; i < n; i++) {
    const v = values[i];
    if (!Number.isFinite(v)) return NaN; // propagate NaN/Infinity
    sum += v;
  }
  return sum / n;
}
src/
├─ utils/
│  └─ mean.ts          // contains `mean` and `bigintMean`
├─ index.ts            // demo usage
└─ tsconfig.json
export function mean(/* … as above … */) { /* implementation */ }
export function bigintMean(/* … as above … */) { /* implementation */ }
import { mean, bigintMean } from "./utils/mean";

const data = [12, 15, 22, 9];
console.log("Mean:", mean(data));

const bigData = [100n, 200n, 300n];
console.log("BigInt mean:", bigintMean(bigData));
// 1️⃣ Simple one‑liner
const avg = arr.reduce((a, b) => a + b, 0) / arr.length;

// 2️⃣ Reusable function (ignores NaN by default)
function mean(values: readonly number[], { ignoreNaN = true } = {}): number {
  const filtered = ignoreNaN ? values.filter(Number.isFinite) : values;
  if (filtered.length === 0) return NaN;
  let sum = 0;
  for (const v of filtered) sum += v;
  return sum / filtered.length;
}

// 3️⃣ BigInt version
function bigintMean(values: readonly bigint[]): bigint {
  if (values.length === 0) throw new Error("empty");
  let sum = 0n;
  for (const v of values) sum += v;
  return sum / BigInt(values.length);
}
