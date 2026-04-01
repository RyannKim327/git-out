/**
 * Shuffle an array in place using Fisher–Yates algorithm
 */
function shuffle<T>(arr: T[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/**
 * Check whether an array of numbers is sorted ascending
 */
function isSorted(arr: number[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) {
      return false;
    }
  }
  return true;
}

/**
 * Bogosort: shuffle until the array is sorted
 */
function bogosort(arr: number[]): Promise<{
  sortedArray: number[];
  iterations: number;
  shuffles: number;
}> {
  return new Promise((resolve) => {
    let iterations = 0;
    const attempt = () => {
      iterations++;
      if (isSorted(arr)) {
        resolve({ sortedArray: arr, iterations, shuffles: iterations });
      } else {
        shuffle(arr);
        // This recursion is intentionally "random"; adding a tiny async
        // delay keeps the UI responsive if called in a browser context.
        setTimeout(attempt, 0);
      }
    };
    attempt();
  });
}

// Example usage:
const data = [5, 2, 9, 1, 5, 6];
bogosort(data).then(({ sortedArray, iterations, shuffles }) => {
  console.log(`Sorted array: ${sortedArray}`);
  console.log(`Iterations taken: ${iterations}`);
});
