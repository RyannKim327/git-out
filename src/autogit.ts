const numbers = [4, 8, 15, 16, 23, 42];
const mean = numbers.reduce((sum, n) => sum + n, 0) / numbers.length;

console.log(mean); // 18
/**
 * Returns the arithmetic mean of a numeric array.
 *
 * @param values - An array of numbers.
 * @returns The mean value.
 * @throws If the array is empty.
 */
export function mean(values: readonly number[]): number {
  if (values.length === 0) {
    throw new Error('Cannot compute the mean of an empty array.');
  }

  // Using a typed accumulator to avoid accidental `any` inference.
  const sum = values.reduce((acc: number, cur: number) => acc + cur, 0);
  return sum / values.length;
}
import { mean } from './math-utils';

const data = [10, 20, 30, 40];
console.log(mean(data)); // 25
/**
 * Compute the mean of a numeric property extracted by `selector`.
 *
 * @param items   - Array of any type.
 * @param selector - Function that extracts a number from each item.
 * @returns The arithmetic mean.
 * @throws If the array is empty or selector returns NaN.
 */
export function meanBy<T>(items: readonly T[], selector: (item: T) => number): number {
  if (items.length === 0) {
    throw new Error('Cannot compute the mean of an empty array.');
  }

  const sum = items.reduce((acc, item) => {
    const value = selector(item);
    if (!Number.isFinite(value)) {
      throw new Error(`Selector returned a non‑finite number: ${value}`);
    }
    return acc + value;
  }, 0);

  return sum / items.length;
}
interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: 'Alice', age: 28 },
  { name: 'Bob',   age: 34 },
  { name: 'Cara',  age: 22 },
];

const averageAge = meanBy(people, p => p.age);
console.log(averageAge); // 28
export function meanBigInt(values: readonly bigint[]): bigint {
  if (values.length === 0) {
    throw new Error('Cannot compute the mean of an empty array.');
  }

  const sum = values.reduce((acc, cur) => acc + cur, 0n);
  return sum / BigInt(values.length); // integer division
}
// src/utils/math.ts
export function mean(values: readonly number[]): number {
  if (values.length === 0) {
    throw new Error('Cannot compute the mean of an empty array.');
  }
  const sum = values.reduce((a, b) => a + b, 0);
  return sum / values.length;
}

export function meanBy<T>(items: readonly T[], selector: (item: T) => number): number {
  if (items.length === 0) {
    throw new Error('Cannot compute the mean of an empty array.');
  }
  const sum = items.reduce((a, item) => {
    const v = selector(item);
    if (!Number.isFinite(v)) {
      throw new Error(`Selector returned a non‑finite number: ${v}`);
    }
    return a + v;
  }, 0);
  return sum / items.length;
}

export function meanBigInt(values: readonly bigint[]): bigint {
  if (values.length === 0) {
    throw new Error('Cannot compute the mean of an empty array.');
  }
  const sum = values.reduce((a, b) => a + b, 0n);
  return sum / BigInt(values.length);
}
import { mean, meanBy, meanBigInt } from '@/utils/math';

console.log(mean([1, 2, 3]));               // 2
console.log(meanBy([{v: 5}, {v: 15}], x => x.v)); // 10
console.log(meanBigInt([10n, 20n, 30n]));   // 20n
export function mean(nums: readonly number[]): number {
  if (nums.length === 0) throw new Error('Empty array');
  return nums.reduce((s, n) => s + n, 0) / nums.length;
}
const avg = mean([2, 4, 6, 8]); // 5
