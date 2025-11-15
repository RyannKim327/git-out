function selectionSort(arr: number[]): number[] {
  let n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    // Find the minimum element in unsorted portion
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    // Swap the found minimum element with the first element
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  
  return arr;
}

// Example usage:
const nums = [64, 25, 12, 22, 11];
console.log(selectionSort(nums)); // Output: [11, 12, 22, 25, 64]
