// utils.ts
/**
 * Randomly reorder the elements of an array in place.
 * Uses the Fisher‑Yates algorithm for an unbiased shuffle.
 *
 * @param arr The array to shuffle (mutated in place)
 * @returns The same array, now shuffled
 */
export function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    // Pick a remaining element…
    const j = Math.floor(Math.random() * (i + 1));

    // …and swap it with the current element.
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
import { shuffle } from "./utils";

const numbers = [1, 2, 3, 4, 5];
shuffle(numbers);          // numbers is now in a random order
console.log(numbers);

const words = ["a", "b", "c", "d"];
console.log(shuffle(words));  // prints a shuffled copy
