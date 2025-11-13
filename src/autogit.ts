function findSecondLargest(arr: number[]): number | null {
    if (arr.length < 2) {
        return null;
    }

    let largest = -Infinity;
    let secondLargest = -Infinity;

    for (const num of arr) {
        if (num > largest) {
            secondLargest = largest;
            largest = num;
        } else if (num > secondLargest) {
            secondLargest = num;
        }
    }

    return secondLargest;
}
console.log(findSecondLargest([12, 3, 5, 7, 19]));   // Output: 12
console.log(findSecondLargest([5, 5, 5]));           // Output: 5
console.log(findSecondLargest([-3, -2, -1]));        // Output: -2
console.log(findSecondLargest([42]));                // Output: null
