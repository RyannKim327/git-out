function insertionSort(arr: number[]): number[] {
  // Start from the second element (index 1)
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i]; // Current element to be inserted
    let j = i - 1; // Start comparing with previous element

    // Move elements of arr[0..i-1] that are greater than current
    // to one position ahead of their current position
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j]; // Shift element to the right
      j--;
    }

    // Insert current element at correct position
    arr[j + 1] = current;
  }
  
  return arr;
}
// Test the function
const unsortedArray = [9, 5, 1, 4, 3];
console.log('Original array:', unsortedArray);
console.log('Sorted array:', insertionSort(unsortedArray));

// Output:
// Original array: [9, 5, 1, 4, 3]
// Sorted array: [1, 3, 4, 5, 9]
function insertionSortNonMutating(arr: number[]): number[] {
  const sorted = [...arr];
  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    let j = i - 1;
    
    while (j >= 0 && sorted[j] > current) {
      sorted[j + 1] = sorted[j];
      j--;
    }
    sorted[j + 1] = current;
  }
  return sorted;
}
