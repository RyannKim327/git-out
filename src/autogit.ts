// 1. Helper Function: Get the maximum value in an array
//    Used to determine the number of passes (digits) needed.
function getMax(arr: number[]): number {
    if (arr.length === 0) {
        return 0; // Or throw an error, depending on desired behavior for empty array
    }
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

// 2. Helper Function: Counting Sort for a specific digit place
//    This is a stable sort required by Radix Sort.
function countingSort(arr: number[], exp: number): void {
    const n = arr.length;
    const output = new Array<number>(n); // The output array that will hold the sorted elements
    const count = new Array<number>(10).fill(0); // Count array for digits 0-9

    // Store count of occurrences in count[]
    // For a given 'exp' (e.g., 1, 10, 100), this extracts the relevant digit.
    // Example: For num=170, exp=1: (170/1)%10 = 0
    //          For num=170, exp=10: (170/10)%10 = 7
    //          For num=170, exp=100: (170/100)%10 = 1
    for (let i = 0; i < n; i++) {
        count[Math.floor(arr[i] / exp) % 10]++;
    }

    // Change count[i] so that count[i] now contains the actual
    // position of this digit in output[] (cumulative sum)
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array.
    // We iterate backwards to ensure stability (elements with the same digit
    // maintain their relative order from the previous pass).
    for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        // The correct position for arr[i] in the output array is count[digit] - 1
        // because count stores cumulative sums and is 1-indexed for counts.
        output[count[digit] - 1] = arr[i];
        count[digit]--; // Decrement count for this digit
    }

    // Copy the output array to arr[], so that arr[] now
    // contains sorted numbers according to the current digit
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

// 3. Main Function: Radix Sort
function radixSort(arr: number[]): number[] {
    const n = arr.length;

    if (n <= 1) {
        return arr; // Already sorted or nothing to sort
    }

    // --- Handle Negative Numbers ---
    const negatives: number[] = [];
    const positives: number[] = [];
    const zeros: number[] = []; // Store zeros separately to maintain their position

    for (const num of arr) {
        if (num < 0) {
            negatives.push(num);
        } else if (num > 0) {
            positives.push(num);
        } else {
            zeros.push(num);
        }
    }

    // Sort positive numbers
    if (positives.length > 0) {
        let maxPos = getMax(positives);
        // exp is 1 for units place, 10 for tens, 100 for hundreds, etc.
        for (let exp = 1; Math.floor(maxPos / exp) > 0; exp *= 10) {
            countingSort(positives, exp);
        }
    }

    // Sort negative numbers by their absolute values
    if (negatives.length > 0) {
        const absNegatives = negatives.map(num => Math.abs(num));
        let maxAbsNeg = getMax(absNegatives);

        for (let exp = 1; Math.floor(maxAbsNeg / exp) > 0; exp *= 10) {
            countingSort(absNegatives, exp);
        }

        // Revert to original negative numbers and reverse their order.
        // When we sort absolute values (e.g., -90, -45 -> 45, 90),
        // the smallest absolute value comes first.
        // To get the correct sorted order for negatives (e.g., -90, -45),
        // we need to reverse the sorted absolute values and make them negative again.
        for (let i = 0; i < negatives.length; i++) {
            negatives[i] = -absNegatives[negatives.length - 1 - i];
        }
    }

    // Combine sorted negatives, zeros, and positives
    return [...negatives, ...zeros, ...positives];
}

// --- Example Usage ---

// Test case 1: Positive numbers
const numbers1 = [170, 45, 75, 90, 802, 24, 2, 66];
console.log("Original array 1:", numbers1);
console.log("Sorted array 1:", radixSort(numbers1));
// Expected: [2, 24, 45, 66, 75, 90, 170, 802]

// Test case 2: Mixed positive, negative, and zero
const numbers2 = [170, -45, 75, -90, 802, -24, 2, -66, 0, 10];
console.log("\nOriginal array 2:", numbers2);
console.log("Sorted array 2:", radixSort(numbers2));
// Expected: [-90, -66, -45, -24, 0, 2, 10, 75, 170, 802]

// Test case 3: All negative numbers
const numbers3 = [-170, -45, -75, -90, -802, -24, -2, -66];
console.log("\nOriginal array 3:", numbers3);
console.log("Sorted array 3:", radixSort(numbers3));
// Expected: [-802, -170, -90, -75, -66, -45, -24, -2]

// Test case 4: Single element array
const singleElement = [42];
console.log("\nOriginal single element array:", singleElement);
console.log("Sorted single element array:", radixSort(singleElement));
// Expected: [42]

// Test case 5: Empty array
const emptyArray: number[] = [];
console.log("\nOriginal empty array:", emptyArray);
console.log("Sorted empty array:", radixSort(emptyArray));
// Expected: []

// Test case 6: Array with zeros only
const zerosOnly = [0, 0, 0];
console.log("\nOriginal zeros only array:", zerosOnly);
console.log("Sorted zeros only array:", radixSort(zerosOnly));
// Expected: [0, 0, 0]

// Test case 7: Large numbers
const largeNumbers = [98765, 12345, 54321, 100000, 1];
console.log("\nOriginal large numbers:", largeNumbers);
console.log("Sorted large numbers:", radixSort(largeNumbers));
// Expected: [1, 12345, 54321, 98765, 100000]
