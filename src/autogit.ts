function shellSort<T>(array: T[]): T[] {
    // Create a copy to avoid mutating the original array
    const sortedArray = [...array];
    const n = sortedArray.length;
    
    // Start with a large gap and reduce it
    let gap = Math.floor(n / 2);
    
    while (gap > 0) {
        // Perform gapped insertion sort for this gap size
        for (let i = gap; i < n; i++) {
            const temp = sortedArray[i];
            let j = i;
            
            // Shift earlier gap-sorted elements up until the correct location is found
            while (j >= gap && sortedArray[j - gap] > temp) {
                sortedArray[j] = sortedArray[j - gap];
                j -= gap;
            }
            
            // Put temp in its correct location
            sortedArray[j] = temp;
        }
        
        // Reduce the gap for the next iteration
        gap = Math.floor(gap / 2);
    }
    
    return sortedArray;
}
// Different gap sequences can be used
enum GapSequence {
    SHELL,      // Original: n/2, n/4, ..., 1
    KNUTH,      // 1, 4, 13, 40, ... (3k + 1)
    SEDGEWICK   // 1, 8, 23, 77, 281, ...
}

function shellSortEnhanced<T>(
    array: T[], 
    comparator: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0,
    gapSequence: GapSequence = GapSequence.SHELL
): T[] {
    const sortedArray = [...array];
    const n = sortedArray.length;
    
    // Generate gap sequence based on selected method
    const gaps = generateGapSequence(n, gapSequence);
    
    for (let g = gaps.length - 1; g >= 0; g--) {
        const gap = gaps[g];
        
        for (let i = gap; i < n; i++) {
            const temp = sortedArray[i];
            let j = i;
            
            while (j >= gap && comparator(sortedArray[j - gap], temp) > 0) {
                sortedArray[j] = sortedArray[j - gap];
                j -= gap;
            }
            
            sortedArray[j] = temp;
        }
    }
    
    return sortedArray;
}

function generateGapSequence(n: number, sequence: GapSequence): number[] {
    const gaps: number[] = [];
    
    switch (sequence) {
        case GapSequence.SHELL:
            let gap = Math.floor(n / 2);
            while (gap > 0) {
                gaps.push(gap);
                gap = Math.floor(gap / 2);
            }
            break;
            
        case GapSequence.KNUTH:
            let k = 1;
            while (k <= n) {
                gaps.push(k);
                k = 3 * k + 1;
            }
            break;
            
        case GapSequence.SEDGEWICK:
            let i = 0;
            let gap = 1;
            while (gap < n) {
                gaps.push(gap);
                if (i % 2 === 0) {
                    gap = 9 * Math.pow(4, i) - 9 * Math.pow(2, i) + 1;
                } else {
                    gap = Math.pow(4, i + 1) - 3 * Math.pow(2, i + 1) + 1;
                }
                i++;
            }
            break;
    }
    
    return gaps;
}
// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90, 5];
const strings = ["banana", "apple", "cherry", "date"];

console.log("Original numbers:", numbers);
console.log("Shell sorted:", shellSort(numbers));
console.log("Knuth sequence:", shellSortEnhanced(numbers, undefined, GapSequence.KNUTH));

console.log("Original strings:", strings);
console.log("Shell sorted strings:", shellSort(strings));

// Custom comparator for objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];

const sortedByAge = shellSortEnhanced(people, (a, b) => a.age - b.age);
console.log("People sorted by age:", sortedByAge);
class ShellSortAnalyzer {
    static analyze<T>(array: T[]): { comparisons: number; swaps: number; time: number } {
        const sortedArray = [...array];
        const n = sortedArray.length;
        let comparisons = 0;
        let swaps = 0;
        
        const startTime = performance.now();
        let gap = Math.floor(n / 2);
        
        while (gap > 0) {
            for (let i = gap; i < n; i++) {
                const temp = sortedArray[i];
                let j = i;
                
                while (j >= gap) {
                    comparisons++;
                    if (sortedArray[j - gap] <= temp) break;
                    
                    sortedArray[j] = sortedArray[j - gap];
                    swaps++;
                    j -= gap;
                }
                
                sortedArray[j] = temp;
                if (j !== i) swaps++;
            }
            
            gap = Math.floor(gap / 2);
        }
        
        const endTime = performance.now();
        
        return {
            comparisons,
            swaps,
            time: endTime - startTime
        };
    }
}

// Usage example
const largeArray = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
const analysis = ShellSortAnalyzer.analyze(largeArray);
console.log("Performance analysis:", analysis);
