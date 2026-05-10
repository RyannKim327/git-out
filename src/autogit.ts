/**
 * Random‑pivot QuickSort
 *
 * @param data - array of numbers to sort in place
 * @returns the sorted array
 */
function randomQuickSort(data: number[]): number[] {
  // Helper that actually does the work, using indices so the call stack is shallow.
  function sort(left: number, right: number) {
    if (left >= right) return;

    // Pick a random index between left and right (inclusive)
    const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
    // Swap pivot with the last element – easier partitioning
    [data[pivotIndex], data[right]] = [data[right], data[pivotIndex]];
    const pivot = data[right];

    let i = left - 1; // elements ≤ pivot will be to the left of i

    for (let j = left; j < right; j++) {
      if (data[j] <= pivot) {
        i++;
        [data[i], data[j]] = [data[j], data[i]];
      }
    }

    // place pivot after the last smaller element
    const finalPivotPos = i + 1;
    [data[finalPivotPos], data[right]] = [data[right], data[finalPivotPos]];

    // Recurse on each partition
    sort(left, finalPivotPos - 1);
    sort(finalPivotPos + 1, right);
  }

  sort(0, data.length - 1);
  return data;
}

/* --- demo ------------------------------------ */
const arr = [5, 2, 9, 1, 5, 6];
console.log('original:', arr);
console.log('sorted  :', randomQuickSort([...arr])); // [...arr] keeps the demo clean
