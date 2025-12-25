function shellSort<T>(array: T[]): T[] {
    const n = array.length;
    
    // Start with a large gap, then reduce it
    let gap = Math.floor(n / 2);
    
    while (gap > 0) {
        // Perform insertion sort for this gap size
        for (let i = gap; i < n; i++) {
            const temp = array[i];
            let j = i;
            
            // Shift earlier gap-sorted elements up until the correct location for array[i] is found
            while (j >= gap && array[j - gap] > temp) {
                array[j] = array[j - gap];
                j -= gap;
            }
            
            // Put temp (the original array[i]) in its correct location
            array[j] = temp;
        }
        
        // Reduce the gap for the next iteration
        gap = Math.floor(gap / 2);
    }
    
    return array;
}
function shellSort<T>(
    array: T[], 
    comparator: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
    const n = array.length;
    let gap = Math.floor(n / 2);
    
    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            const temp = array[i];
            let j = i;
            
            while (j >= gap && comparator(array[j - gap], temp) > 0) {
                array[j] = array[j - gap];
                j -= gap;
            }
            
            array[j] = temp;
        }
        
        gap = Math.floor(gap / 2);
    }
    
    return array;
}
// Test with numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", numbers);
console.log("Sorted:", shellSort(numbers));

// Test with strings
const strings = ["banana", "apple", "cherry", "date"];
console.log("Original:", strings);
console.log("Sorted:", shellSort(strings));

// Test with custom objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];

// Sort by age
const sortedByAge = shellSort(people, (a, b) => a.age - b.age);
console.log("Sorted by age:", sortedByAge);

// Sort by name
const sortedByName = shellSort(people, (a, b) => a.name.localeCompare(b.name));
console.log("Sorted by name:", sortedByName);
type GapSequence = 'shell' | 'hibbard' | 'sedgewick';

function shellSortEnhanced<T>(
    array: T[], 
    sequence: GapSequence = 'shell',
    comparator: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
    const n = array.length;
    
    // Generate gap sequence based on the chosen method
    const gaps = generateGapSequence(n, sequence);
    
    for (let g = 0; g < gaps.length; g++) {
        const gap = gaps[g];
        
        for (let i = gap; i < n; i++) {
            const temp = array[i];
            let j = i;
            
            while (j >= gap && comparator(array[j - gap], temp) > 0) {
                array[j] = array[j - gap];
                j -= gap;
            }
            
            array[j] = temp;
        }
    }
    
    return array;
}

function generateGapSequence(n: number, sequence: GapSequence): number[] {
    const gaps: number[] = [];
    
    switch (sequence) {
        case 'shell':
            // Original Shell sequence: n/2, n/4, n/8, ..., 1
            let gap = Math.floor(n / 2);
            while (gap > 0) {
                gaps.push(gap);
                gap = Math.floor(gap / 2);
            }
            break;
            
        case 'hibbard':
            // Hibbard's sequence: 2^k - 1
            let k = 1;
            let hibbardGap = Math.pow(2, k) - 1;
            while (hibbardGap < n) {
                gaps.unshift(hibbardGap); // Store in reverse order
                k++;
                hibbardGap = Math.pow(2, k) - 1;
            }
            break;
            
        case 'sedgewick':
            // Sedgewick's sequence: 4^k + 3*2^(k-1) + 1
            let sedgewickGaps = [1];
            k = 1;
            while (true) {
                const gap1 = Math.pow(4, k) + 3 * Math.pow(2, k - 1) + 1;
                if (gap1 >= n) break;
                sedgewickGaps.push(gap1);
                k++;
            }
            gaps.push(...sedgewickGaps.reverse());
            break;
    }
    
    return gaps;
}
