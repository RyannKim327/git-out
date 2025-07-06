function findSecondLargest(arr: number[]): number | null {
    // Remove duplicates by converting the array to a Set and back to an array
    const uniqueArr = Array.from(new Set(arr));

    // If there are less than 2 unique elements, return null
    if (uniqueArr.length < 2) {
        return null;
    }

    // Sort the array in descending order
    uniqueArr.sort((a, b) => b - a);

    // Return the second largest element
    return uniqueArr[1];
}

// Example usage:
const numbers = [3, 5, 1, 4, 5, 2];
const secondLargest = findSecondLargest(numbers);
console.log(secondLargest); // Output: 4
