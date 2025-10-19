function shellSort<T>(array: T[]): T[] {
    const n = array.length;
    let gap = Math.floor(n / 2);
    
    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            const temp = array[i];
            let j = i;
            
            // Shift elements until correct position is found
            while (j >= gap && array[j - gap] > temp) {
                array[j] = array[j - gap];
                j -= gap;
            }
            
            array[j] = temp;
        }
        
        gap = Math.floor(gap / 2);
    }
    
    return array;
}
function shellSort<T>(
    array: T[],
    gapSequence: (n: number) => number[] = defaultGapSequence
): T[] {
    const n = array.length;
    const gaps = gapSequence(n);
    
    for (const gap of gaps) {
        for (let i = gap; i < n; i++) {
            const temp = array[i];
            let j = i;
            
            while (j >= gap && array[j - gap] > temp) {
                array[j] = array[j - gap];
                j -= gap;
            }
            
            array[j] = temp;
        }
    }
    
    return array;
}

// Default gap sequence (Knuth's sequence)
function defaultGapSequence(n: number): number[] {
    const gaps: number[] = [];
    let gap = 1;
    
    while (gap < n) {
        gaps.unshift(gap);
        gap = Math.floor(gap * 3 + 1);
    }
    
    return gaps;
}

// Alternative gap sequences
const gapSequences = {
    knuth: defaultGapSequence,
    shell: (n: number) => {
        const gaps: number[] = [];
        let gap = Math.floor(n / 2);
        while (gap > 0) {
            gaps.push(gap);
            gap = Math.floor(gap / 2);
        }
        return gaps;
    }
};
function shellSort<T>(
    array: T[],
    compare: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
    const n = array.length;
    let gap = Math.floor(n / 2);
    
    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            const temp = array[i];
            let j = i;
            
            while (j >= gap && compare(array[j - gap], temp) > 0) {
                array[j] = array[j - gap];
                j -= gap;
            }
            
            array[j] = temp;
        }
        
        gap = Math.floor(gap / 2);
    }
    
    return array;
}
// Example 1: Sorting numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log('Sorted numbers:', shellSort(numbers));

// Example 2: Sorting strings
const strings = ['banana', 'apple', 'cherry', 'date'];
console.log('Sorted strings:', shellSort(strings));

// Example 3: Custom objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: 'John', age: 30 },
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 35 }
];

const sortedByAge = shellSort(people, (a, b) => a.age - b.age);
console.log('Sorted by age:', sortedByAge);

// Example 4: Using custom gap sequence
const largeArray = Array.from({ length: 1000 }, () => Math.random());
const sortedWithCustomGap = shellSort(largeArray, gapSequences.knuth);
// Time complexity: O(n^(3/2)) to O(n^(4/3)) depending on gap sequence
// Space complexity: O(1) - in-place sorting
// Unstable sort (may change order of equal elements)
// Test function
function testShellSort() {
    // Test with various data types
    const testCases = [
        [3, 1, 4, 1, 5, 9, 2, 6],
        ['z', 'a', 'c', 'b'],
        [1],
        [],
        [5, 4, 3, 2, 1]
    ];
    
    testCases.forEach(testCase => {
        const sorted = shellSort([...testCase]);
        console.log(`Input: [${testCase}]`);
        console.log(`Output: [${sorted}]`);
        console.log('---');
    });
}

testShellSort();
