const original = [1, 2, 3, 4, 5];

// This mutates the array in place
const reversed = original.reverse();  // reversed === [5, 4, 3, 2, 1]
const original = [1, 2, 3, 4, 5];

// Keeps `original` intact
const reversed = [...original].reverse(); // or: original.slice().reverse();
function reverseArr<T>(arr: T[]): T[] {
  const copy = [...arr];
  let left = 0;
  let right = copy.length - 1;
  while (left < right) {
    [copy[left], copy[right]] = [copy[right], copy[left]];
    left++;
    right--;
  }
  return copy;
}
