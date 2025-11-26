/**
 * Shell Sort algorithm implementation in TypeScript
 * 
 * Shell Sort is an optimization of Insertion Sort that allows the exchange of items 
 * that are far apart. It works by comparing elements separated by a gap of several positions.
 * 
 * Time Complexity: O(n^2) worst-case, but can be better with optimal gap sequences
 * Space Complexity: O(1)
 */
function shellSort<T>(array: T[], compareFn?: (a: T, b: T) => number): T[] {
    // Create a copy to avoid mutating the original array
    const sortedArray = [...array];
    const n = sortedArray.length;
    
    // Default comparison function if not provided
    const compare = compareFn || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    // Start with a large gap, then reduce the gap
    let gap = Math.floor(n / 2);
    
    while (gap > 0) {
        // Do a gapped insertion sort for this gap size
        for (let i = gap; i < n; i++) {
            // Save the current element
            const temp = sortedArray[i];
            let j = i;
            
            // Shift earlier gap-sorted elements up until the correct location for a[i] is found
            while (j >= gap && compare(sortedArray[j - gap], temp) > 0) {
                sortedArray[j] = sortedArray[j - gap];
                j -= gap;
            }
            
            // Put temp (the original a[i]) in its correct location
            sortedArray[j] = temp;
        }
        
        // Reduce the gap for the next iteration
        gap = Math.floor(gap / 2);
    }
    
    return sortedArray;
}

// Alternative implementation with optimized gap sequence (Knuth's sequence)
function shellSortOptimized<T>(array: T[], compareFn?: (a: T, b: T) => number): T[] {
    const sortedArray = [...array];
    const n = sortedArray.length;
    
    const compare = compareFn || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    // Generate Knuth's gap sequence: 1, 4, 13, 40, 121, ...
    let gap = 1;
    const gaps: number[] = [];
    while (gap < n) {
        gaps.push(gap);
        gap = gap * 3 + 1;
    }
    
    // Use gaps in reverse order (largest to smallest)
    for (let g = gaps.length - 1; g >= 0; g--) {
        const currentGap = gaps[g];
        
        for (let i = currentGap; i < n; i++) {
            const temp = sortedArray[i];
            let j = i;
            
            while (j >= currentGap && compare(sortedArray[j - currentGap], temp) > 0) {
                sortedArray[j] = sortedArray[j - currentGap];
                j -= currentGap;
            }
            
            sortedArray[j] = temp;
        }
    }
    
    return sortedArray;
}
// Example 1: Sorting numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log('Original:', numbers);
console.log('Sorted:', shellSort(numbers));
console.log('Optimized:', shellSortOptimized(numbers));

// Example 2: Sorting strings
const strings = ['banana', 'apple', 'cherry', 'date'];
console.log('Original:', strings);
console.log('Sorted:', shellSort(strings));

// Example 3: Custom comparison function
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
    { name: 'Bob', age: 35 }
];

const sortedByAge = shellSort(people, (a, b) => a.age - b.age);
console.log('Sorted by age:', sortedByAge);

const sortedByName = shellSort(people, (a, b) => a.name.localeCompare(b.name));
console.log('Sorted by name:', sortedByName);

// Example 4: Performance comparison
const largeArray = Array.from({ length: 10000 }, () => Math.random());
console.time('Standard Shell Sort');
shellSort(largeArray);
console.timeEnd('Standard Shell Sort');

console.time('Optimized Shell Sort');
shellSortOptimized(largeArray);
console.timeEnd('Optimized Shell Sort');
// Test function to verify sorting works correctly
function testShellSort() {
    const testCases = [
        [5, 2, 8, 1, 9],
        [1, 2, 3, 4, 5], // already sorted
        [5, 4, 3, 2, 1], // reverse sorted
        [3, 3, 3, 3, 3], // all equal
        [1], // single element
        []   // empty array
    ];

    testCases.forEach((testCase, index) => {
        const sorted = shellSort(testCase);
        const expected = [...testCase].sort((a, b) => a - b);
        const isCorrect = JSON.stringify(sorted) === JSON.stringify(expected);
        
        console.log(`Test ${index + 1}: ${isCorrect ? 'PASS' : 'FAIL'}`);
        if (!isCorrect) {
            console.log('Expected:', expected);
            console.log('Got:', sorted);
        }
    });
}

testShellSort();
