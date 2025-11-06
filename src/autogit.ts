function findSecondLargest(arr: number[]): number | null {
    if (arr.length < 2) return null; // Edge case: Not enough elements

    let first = -Infinity;
    let second = -Infinity;

    for (const num of arr) {
        if (num > first) {
            second = first; // Previous first becomes second
            first = num;    // Update first to the new max
        } else if (num > second && num < first) {
            second = num;   // Update second if num is between first and current second
        }
    }

    // Handle cases where all elements are identical or second wasn't updated
    return second !== -Infinity ? second : null;
}
function findSecondLargest(arr: number[]): number | null {
    if (arr.length < 2) return null;

    // Sort descending and use a Set to remove duplicates (optional)
    const sortedUnique = [...new Set(arr)].sort((a, b) => b - a);
    
    // Check if there's a valid second element
    return sortedUnique.length >= 2 ? sortedUnique[1] : null;
}
console.log(findSecondLargest([12, 5, 7, 17, 8])); // 12
console.log(findSecondLargest([5, 5, 5]));         // null
console.log(findSecondLargest([-3, -5, -2]));      // -3
console.log(findSecondLargest([42]));              // null
