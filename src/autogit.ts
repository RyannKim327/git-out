function shellSort(arr: number[]): number[] {
    const n = arr.length;
    
    // Start with a big gap, then reduce the gap
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        // Do a gapped insertion sort for this gap size
        for (let i = gap; i < n; i++) {
            // Save current element and initialize j
            const temp = arr[i];
            let j = i;
            
            // Shift earlier gap-sorted elements until correct position is found
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            
            // Put temp in its correct position
            arr[j] = temp;
        }
    }
    
    return arr;
}
// Different gap sequences for optimization
type GapSequence = 'original' | 'knuth' | 'ciura';

function shellSortEnhanced(
    arr: number[], 
    gapSequence: GapSequence = 'ciura'
): number[] {
    const n = arr.length;
    let gaps: number[];
    
    // Select gap sequence
    switch (gapSequence) {
        case 'knuth':
            // Knuth sequence: (3^k - 1) / 2, not greater than n/3
            gaps = [];
            let k = 1;
            while (true) {
                const gap = Math.floor((Math.pow(3, k) - 1) / 2);
                if (gap > Math.ceil(n / 3)) break;
                gaps.unshift(gap);
                k++;
            }
            break;
            
        case 'ciura':
            // Ciura sequence (known to be efficient)
            const ciuraGaps = [701, 301, 132, 57, 23, 10, 4, 1];
            gaps = ciuraGaps.filter(gap => gap <= n);
            break;
            
        case 'original':
        default:
            // Original Shell sequence: n/2, n/4, n/8, ..., 1
            gaps = [];
            for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
                gaps.push(gap);
            }
            break;
    }
    
    // Perform Shell Sort with selected gap sequence
    for (const gap of gaps) {
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
function shellSortGeneric<T>(
    arr: T[],
    compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
    const n = arr.length;
    
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j = i;
            
            while (j >= gap && compareFn(arr[j - gap], temp) > 0) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            
            arr[j] = temp;
        }
    }
    
    return arr;
}
// Basic usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log('Original:', numbers);
console.log('Sorted:', shellSort([...numbers]));

// With different gap sequences
console.log('Ciura sequence:', shellSortEnhanced([...numbers], 'ciura'));
console.log('Knuth sequence:', shellSortEnhanced([...numbers], 'knuth'));

// Generic version with strings
const strings = ['banana', 'apple', 'cherry', 'date'];
console.log('Sorted strings:', shellSortGeneric([...strings]));

// Generic version with custom objects
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
function testShellSort(): void {
    const testCases = [
        [5, 2, 4, 6, 1, 3],
        [1],
        [],
        [3, 3, 3],
        [9, 8, 7, 6, 5, 4, 3, 2, 1],
        [1, 2, 3, 4, 5]
    ];
    
    testCases.forEach((testCase, index) => {
        const original = [...testCase];
        const sorted = shellSort([...testCase]);
        const expected = [...testCase].sort((a, b) => a - b);
        
        console.log(`Test ${index + 1}:`);
        console.log(`  Input:    [${original}]`);
        console.log(`  Output:   [${sorted}]`);
        console.log(`  Expected: [${expected}]`);
        console.log(`  Pass:     ${JSON.stringify(sorted) === JSON.stringify(expected)}`);
        console.log('---');
    });
}

// Run tests
testShellSort();
function benchmarkShellSort(): void {
    const sizes = [100, 1000, 5000, 10000];
    
    sizes.forEach(size => {
        // Generate random array
        const arr = Array.from({ length: size }, () => 
            Math.floor(Math.random() * 1000)
        );
        
        const startTime = performance.now();
        shellSort([...arr]);
        const endTime = performance.now();
        
        console.log(`Size: ${size}, Time: ${(endTime - startTime).toFixed(2)}ms`);
    });
}

// benchmarkShellSort();
