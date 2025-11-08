function shellSort(arr: number[]): number[] {
    const n = arr.length;
    
    // Start with a large gap, then reduce the gap
    let gap = Math.floor(n / 2);
    
    while (gap > 0) {
        // Do a gapped insertion sort for this gap size
        for (let i = gap; i < n; i++) {
            // Save the current element
            const temp = arr[i];
            let j = i;
            
            // Shift earlier gap-sorted elements up until the correct location for arr[i] is found
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            
            // Put the saved element in its correct location
            arr[j] = temp;
        }
        
        // Reduce the gap
        gap = Math.floor(gap / 2);
    }
    
    return arr;
}
function shellSortGeneric<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
    const n = arr.length;
    
    // Default comparison function for numbers
    const compare = compareFn || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });
    
    let gap = Math.floor(n / 2);
    
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
// Different gap sequences for better performance
type GapSequence = 'shell' | 'hibbard' | 'knuth' | 'sedgewick';

function shellSortOptimized(
    arr: number[], 
    gapSequence: GapSequence = 'sedgewick'
): number[] {
    const n = arr.length;
    
    // Generate gap sequence based on the chosen method
    const gaps = generateGapSequence(n, gapSequence);
    
    // Start from the largest gap and work down
    for (let k = gaps.length - 1; k >= 0; k--) {
        const gap = gaps[k];
        
        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j = i;
            
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            
            arr[j] = temp;
        }
    }
    
    return arr;
}

function generateGapSequence(n: number, sequence: GapSequence): number[] {
    const gaps: number[] = [];
    
    switch (sequence) {
        case 'shell': // Original Shell sequence: n/2, n/4, ..., 1
            let gap = Math.floor(n / 2);
            while (gap > 0) {
                gaps.push(gap);
                gap = Math.floor(gap / 2);
            }
            break;
            
        case 'hibbard': // 2^k - 1
            let k = 1;
            let gapHibbard = Math.pow(2, k) - 1;
            while (gapHibbard < n) {
                gaps.push(gapHibbard);
                k++;
                gapHibbard = Math.pow(2, k) - 1;
            }
            break;
            
        case 'knuth': // (3^k - 1) / 2
            k = 1;
            let gapKnuth = (Math.pow(3, k) - 1) / 2;
            while (gapKnuth < Math.ceil(n / 3)) {
                gaps.push(gapKnuth);
                k++;
                gapKnuth = (Math.pow(3, k) - 1) / 2;
            }
            break;
            
        case 'sedgewick': // 4^k + 3 * 2^(k-1) + 1
            gaps.push(1);
            k = 1;
            while (true) {
                const gap1 = Math.pow(4, k) + 3 * Math.pow(2, k - 1) + 1;
                const gap2 = 9 * Math.pow(4, k) - 9 * Math.pow(2, k) + 1;
                
                if (gap1 < n) gaps.push(gap1);
                if (gap2 < n) gaps.push(gap2);
                
                if (gap1 >= n && gap2 >= n) break;
                k++;
            }
            gaps.sort((a, b) => a - b);
            break;
    }
    
    return gaps;
}
class ShellSort {
    static sort(arr: number[]): number[] {
        return this.basicSort([...arr]); // Return a new sorted array
    }
    
    private static basicSort(arr: number[]): number[] {
        const n = arr.length;
        let gap = Math.floor(n / 2);
        
        while (gap > 0) {
            for (let i = gap; i < n; i++) {
                const temp = arr[i];
                let j = i;
                
                while (j >= gap && arr[j - gap] > temp) {
                    arr[j] = arr[j - gap];
                    j -= gap;
                }
                
                arr[j] = temp;
            }
            
            gap = Math.floor(gap / 2);
        }
        
        return arr;
    }
    
    static sortInPlace(arr: number[]): void {
        this.basicSort(arr);
    }
    
    static measurePerformance(arr: number[]): { sortedArray: number[]; time: number } {
        const start = performance.now();
        const sorted = this.sort(arr);
        const end = performance.now();
        
        return {
            sortedArray: sorted,
            time: end - start
        };
    }
}
// Basic usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log('Original:', numbers);
console.log('Sorted:', shellSort([...numbers]));

// Generic version with strings
const strings = ['banana', 'apple', 'cherry', 'date'];
console.log('Sorted strings:', shellSortGeneric([...strings]));

// Custom objects with comparison function
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: 'John', age: 30 },
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 35 }
];

const sortedByAge = shellSortGeneric([...people], (a, b) => a.age - b.age);
console.log('Sorted by age:', sortedByAge);

// Different gap sequences
const largeArray = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
console.log('Shell sequence:', shellSortOptimized([...largeArray], 'shell'));
console.log('Sedgewick sequence:', shellSortOptimized([...largeArray], 'sedgewick'));

// Class-based usage
console.log('Class-based:', ShellSort.sort(numbers));
