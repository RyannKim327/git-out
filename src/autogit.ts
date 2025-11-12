function findSecondLargest(arr: number[]): number | null {
  if (arr.length < 2) return null;

  let largest = -Infinity;
  let secondLargest = -Infinity;

  for (const num of arr) {
    if (num > largest) {
      secondLargest = largest;
      largest = num;
    } else if (num < largest && num > secondLargest) {
      secondLargest = num;
    }
  }

  // Handle cases where all elements are the same
  return secondLargest === -Infinity ? null : secondLargest;
}
function findSecondLargestSort(arr: number[]): number | null {
  // Remove duplicates and sort descending
  const uniqueSorted = [...new Set(arr)].sort((a, b) => b - a);
  return uniqueSorted.length >= 2 ? uniqueSorted[1] : null;
}
console.log(findSecondLargest([12, 35, 1, 10, 34, 1]));  // 34
console.log(findSecondLargest([10, 10, 10]));            // null
console.log(findSecondLargest([5]));                     // null
console.log(findSecondLargest([-3, -2, -10]));           // -3
