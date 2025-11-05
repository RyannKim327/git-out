function radixSort(arr: number[]): number[] {
    if (arr.length < 2) return [...arr];

    // Separate negatives and positives
    const negatives = arr.filter(x => x < 0).map(x => -x);
    const positives = arr.filter(x => x >= 0);

    // Sort negatives and positives separately
    const sortedNegatives = sortPositives(negatives).reverse().map(x => -x);
    const sortedPositives = sortPositives(positives);

    return [...sortedNegatives, ...sortedPositives];
}

function sortPositives(arr: number[]): number[] {
    if (arr.length === 0) return [];

    // Get maximum number to determine digit count
    const max = Math.max(...arr);

    // LSD Radix Sort implementation
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        const buckets: number[][] = Array.from({ length: 10 }, () => []);
        
        // Distribute numbers into buckets
        for (const num of arr) {
            const digit = Math.floor(num / exp) % 10;
            buckets[digit].push(num);
        }
        
        // Collect numbers from buckets
        arr = buckets.flat();
    }
    
    return arr;
}

// Example usage:
const unsortedArray = [-5, 3, -10, 42, 8, -15, 100, 0, -1];
const sortedArray = radixSort(unsortedArray);
console.log(sortedArray); 
// Output: [-15, -10, -5, -1, 0, 3, 8, 42, 100]
