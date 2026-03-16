low  = 0
high = length–1

while low ≤ high and target ∈ [arr[low], arr[high]]:
    // Edge cases
    if arr[low] == arr[high]:
        return (arr[low] == target) ? low : -1

    // Interpolated index
    pos = low + ((target – arr[low]) * (high – low))
          / (arr[high] – arr[low])

    // Clamp to array bounds
    pos = Math.round(pos)

    if arr[pos] == target:
        return pos
    else if arr[pos] < target:
        low = pos + 1
    else:
        high = pos – 1

return –1   // not found
/**
 * Interpolation search for a strictly sorted numeric array.
 * @param arr   - Sorted numbers (ascending)
 * @param target - Number to find
 * @returns Index of target, or -1 if not found
 */
export function interpolationSearch(
  arr: readonly number[],
  target: number
): number {
  if (arr.length === 0) return -1;

  let low = 0;
  let high = arr.length - 1;

  // Keep going while target is inside the current window
  while (low <= high && target >= arr[low] && target <= arr[high]) {
    // All remaining values equal – either hit or miss.
    if (arr[low] === arr[high]) {
      return arr[low] === target ? low : -1;
    }

    // Linear interpolation to guess position.
    const pos =
      low +
      Math.round(
        ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
      );

    // Just in case rounding pushes us outside: clamp bounds.
    const index = Math.min(Math.max(pos, low), high);

    const value = arr[index];
    if (value === target) {
      return index;
    }
    if (value < target) {
      low = index + 1;
    } else {
      high = index - 1;
    }
  }

  return -1; // Not found
}
const sorted = [3, 7, 13, 19, 23, 29, 31, 47, 53, 59];
const target = 23;

const idx = interpolationSearch(sorted, target);
console.log(idx); // → 4
console.log(interpolationSearch(sorted, 22)); // → -1
const idx = interpolationSearch(sortedArray, key);
if (idx !== -1) console.log(`Found at ${idx}`);
else console.log('Not there');
