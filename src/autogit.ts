function shellSort(arr: number[]): number[] {
    const n = arr.length;
    
    // Start with a large gap, then reduce the gap
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        // Do a gapped insertion sort for this gap size
        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j: number;
            
            // Shift earlier gap-sorted elements up until the correct location for arr[i] is found
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            
            // Put temp (the original arr[i]) in its correct location
            arr[j] = temp;
        }
    }
    
    return arr;
}
// Different gap sequences for Shell Sort
enum GapSequence {
    SHELL = 'shell',        // Original: n/2, n/4, n/8...
    KNUTH = 'knuth',        // (3^k - 1)/2
    SEDGEWICK = 'sedgewick' // 4^k + 3*2^(k-1) + 1
}

function shellSortAdvanced(
    arr: number[], 
    gapSequence: GapSequence = GapSequence.SHELL
): number[] {
    const n = arr.length;
    
    // Generate gap sequence based on the chosen method
    const gaps = generateGaps(n, gapSequence);
    
    // Sort using the generated gaps
    for (const gap of gaps) {
        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j: number;
            
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            
            arr[j] = temp;
        }
    }
    
    return arr;
}

function generateGaps(n: number, sequence: GapSequence): number[] {
    const gaps: number[] = [];
    
    switch (sequence) {
        case GapSequence.SHELL:
            // Original Shell sequence: n/2, n/4, n/8...
            for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
                gaps.push(gap);
            }
            break;
            
        case GapSequence.KNUTH:
            // Knuth sequence: (3^k - 1)/2
            let k = 1;
            let gap = 1;
            while (gap < n) {
                gaps.unshift(gap); // Store in reverse order (largest first)
                gap = Math.floor((Math.pow(3, k) - 1) / 2);
                k++;
            }
            break;
            
        case GapSequence.SEDGEWICK:
            // Sedgewick sequence: 4^k + 3*2^(k-1) + 1
            k = 0;
            gap = 1;
            while (gap < n) {
                gaps.unshift(gap);
                if (k === 0) {
                    gap = 5;
                } else {
                    gap = Math.pow(4, k) + 3 * Math.pow(2, k - 1) + 1;
                }
                k++;
            }
            break;
    }
    
    return gaps;
}
function shellSortGeneric<T>(
    arr: T[], 
    compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
    const n = arr.length;
    
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j: number;
            
            for (j = i; j >= gap && compareFn(arr[j - gap], temp) > 0; j -= gap) {
                arr[j] = arr[j - gap];
            }
            
            arr[j] = temp;
        }
    }
    
    return arr;
}
// Basic usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", numbers);
console.log("Sorted:", shellSort([...numbers]));

// Advanced usage with different gap sequences
console.log("Knuth sequence:", shellSortAdvanced([...numbers], GapSequence.KNUTH));
console.log("Sedgewick sequence:", shellSortAdvanced([...numbers], GapSequence.SEDGEWICK));

// Generic version with custom objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];

const sortedByAge = shellSortGeneric([...people], (a, b) => a.age - b.age);
console.log("Sorted by age:", sortedByAge);

// Generic version with strings
const names = ["Charlie", "Alice", "Bob"];
const sortedNames = shellSortGeneric([...names]);
console.log("Sorted names:", sortedNames);
