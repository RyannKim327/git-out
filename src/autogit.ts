function shellSort(arr: number[]): number[] {
    const n = arr.length;
    let gap = Math.floor(n / 2);
    
    // Start with a large gap and reduce it
    while (gap > 0) {
        // Perform insertion sort for elements at gap intervals
        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j = i;
            
            // Shift elements that are greater than temp to the right
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            
            arr[j] = temp;
        }
        
        // Reduce the gap
        gap = Math.floor(gap / 2);
    }
    
    return arr;
}
function shellSortGeneric<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
    const n = arr.length;
    let gap = Math.floor(n / 2);
    
    // Default comparison function for numbers
    const compare = compareFn || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });
    
    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j = i;
            
            while (j >= gap && compare(arr[j - gap], temp) > 0) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            
            arr[j] = temp;
        }
        
        gap = Math.floor(gap / 2);
    }
    
    return arr;
}
class ShellSort {
    // Common gap sequences
    static readonly GAP_SEQUENCES = {
        SHELL: (n: number) => Math.floor(n / 2),
        KNUTH: (n: number) => Math.floor((3 ** Math.floor(Math.log(2 * n + 1) / Math.log(3)) - 1) / 2),
        SEDGEWICK: (n: number) => {
            const gaps = [];
            let i = 0;
            let gap = 1;
            
            while (gap < n) {
                gaps.push(gap);
                gap = i % 2 === 0 
                    ? 9 * (2 ** i - 2 ** (i / 2)) + 1 
                    : 8 * 2 ** i - 6 * 2 ** ((i + 1) / 2) + 1;
                i++;
            }
            
            return gaps.reverse();
        }
    };
    
    static sort<T>(
        arr: T[], 
        compareFn?: (a: T, b: T) => number,
        gapSequence: 'SHELL' | 'KNUTH' | 'SEDGEWICK' = 'SHELL'
    ): T[] {
        const n = arr.length;
        const compare = compareFn || this.defaultCompare;
        
        let gaps: number[];
        
        // Generate gap sequence
        if (gapSequence === 'SEDGEWICK') {
            gaps = this.GAP_SEQUENCES.SEDGEWICK(n);
        } else {
            gaps = [];
            let gap = gapSequence === 'SHELL' 
                ? this.GAP_SEQUENCES.SHELL(n)
                : this.GAP_SEQUENCES.KNUTH(n);
            
            while (gap > 0) {
                gaps.push(gap);
                gap = gapSequence === 'SHELL' 
                    ? Math.floor(gap / 2)
                    : Math.floor(gap / 3);
            }
        }
        
        // Perform shell sort with the selected gap sequence
        for (const gap of gaps) {
            for (let i = gap; i < n; i++) {
                const temp = arr[i];
                let j = i;
                
                while (j >= gap && compare(arr[j - gap], temp) > 0) {
                    arr[j] = arr[j - gap];
                    j -= gap;
                }
                
                arr[j] = temp;
            }
        }
        
        return arr;
    }
    
    private static defaultCompare<T>(a: T, b: T): number {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }
}
// Basic usage with numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log('Original:', numbers);
console.log('Sorted:', shellSort([...numbers]));

// Generic usage with strings
const strings = ['banana', 'apple', 'cherry', 'date'];
console.log('Original strings:', strings);
console.log('Sorted strings:', shellSortGeneric([...strings]));

// With custom comparison function
const people = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
    { name: 'Bob', age: 35 }
];

const sortedByAge = shellSortGeneric([...people], (a, b) => a.age - b.age);
console.log('People sorted by age:', sortedByAge);

// Using the advanced class
const advancedNumbers = [64, 34, 25, 12, 22, 11, 90, 5, 77, 88];

console.log('Knuth sequence:', ShellSort.sort([...advancedNumbers], undefined, 'KNUTH'));
console.log('Sedgewick sequence:', ShellSort.sort([...advancedNumbers], undefined, 'SEDGEWICK'));

// Sorting in descending order
const descending = ShellSort.sort([...advancedNumbers], (a, b) => b - a);
console.log('Descending order:', descending);
function analyzePerformance<T>(arr: T[], sortFn: (arr: T[]) => T[]): void {
    const startTime = performance.now();
    const sorted = sortFn([...arr]);
    const endTime = performance.now();
    
    console.log(`Array size: ${arr.length}`);
    console.log(`Time taken: ${(endTime - startTime).toFixed(2)}ms`);
    console.log('Sorted array (first 10 elements):', sorted.slice(0, 10));
}

// Performance comparison
const largeArray = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));

console.log('=== Performance Analysis ===');
analyzePerformance(largeArray, shellSort);
