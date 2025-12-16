function shellSort(arr: number[]): number[] {
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

// Usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", numbers);
console.log("Sorted:", shellSort([...numbers]));
function shellSortGeneric<T extends number | string>(arr: T[]): T[] {
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

// Usage
const numbersGeneric = [64, 34, 25, 12, 22, 11, 90];
const strings = ["banana", "apple", "cherry", "date"];
console.log("Numbers:", shellSortGeneric([...numbersGeneric]));
console.log("Strings:", shellSortGeneric([...strings]));
function shellSortWithGapSequence(arr: number[], gapSequence: number[] = []): number[] {
    const n = arr.length;
    
    // Use provided gap sequence or generate default (Knuth's sequence)
    let gaps = gapSequence.length > 0 ? gapSequence : generateKnuthSequence(n);
    
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

function generateKnuthSequence(n: number): number[] {
    const gaps: number[] = [];
    let gap = 1;
    
    while (gap < n) {
        gaps.unshift(gap);
        gap = gap * 3 + 1;
    }
    
    return gaps;
}

// Usage with custom gap sequence
const customGaps = [701, 301, 132, 57, 23, 10, 4, 1];
const numbersCustom = [64, 34, 25, 12, 22, 11, 90, 5, 42, 18];
console.log("With custom gaps:", shellSortWithGapSequence([...numbersCustom], customGaps));
function shellSortWithComparator<T>(
    arr: T[], 
    compare: (a: T, b: T) => number = (a, b) => a > b ? 1 : a < b ? -1 : 0
): T[] {
    const n = arr.length;
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

// Usage with custom comparator
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 20 }
];

// Sort by age in descending order
const sortedByAge = shellSortWithComparator([...people], (a, b) => b.age - a.age);
console.log("Sorted by age (desc):", sortedByAge);

// Sort by name alphabetically
const sortedByName = shellSortWithComparator([...people], (a, b) => 
    a.name.localeCompare(b.name)
);
console.log("Sorted by name:", sortedByName);
class ShellSort {
    static sort<T>(arr: T[], compare?: (a: T, b: T) => number): T[] {
        const n = arr.length;
        let gap = Math.floor(n / 2);
        const comparator = compare || ((a: T, b: T) => 
            a > b ? 1 : a < b ? -1 : 0
        );
        
        while (gap > 0) {
            for (let i = gap; i < n; i++) {
                const temp = arr[i];
                let j = i;
                
                while (j >= gap && comparator(arr[j - gap], temp) > 0) {
                    arr[j] = arr[j - gap];
                    j -= gap;
                }
                
                arr[j] = temp;
            }
            
            gap = Math.floor(gap / 2);
        }
        
        return arr;
    }
    
    static benchmark(arr: number[]): { sorted: number[]; time: number } {
        const start = performance.now();
        const sorted = this.sort([...arr]);
        const end = performance.now();
        
        return {
            sorted,
            time: end - start
        };
    }
}

// Benchmark example
const largeArray = Array.from({ length: 10000 }, () => 
    Math.floor(Math.random() * 1000)
);

const result = ShellSort.benchmark(largeArray);
console.log(`Sorting took ${result.time.toFixed(2)} milliseconds`);
console.log("First 10 elements:", result.sorted.slice(0, 10));
// Example usage
const testArrays = {
    numbers: [64, 34, 25, 12, 22, 11, 90],
    strings: ["banana", "apple", "cherry", "date"],
    mixed: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
};

console.log("=== Shell Sort Examples ===");

// Basic shell sort
console.log("Basic:", shellSort([...testArrays.numbers]));

// Generic sort
console.log("Generic numbers:", shellSortGeneric([...testArrays.numbers]));
console.log("Generic strings:", shellSortGeneric([...testArrays.strings]));

// With comparator
console.log("With comparator:", 
    shellSortWithComparator([...testArrays.mixed], (a, b) => a - b)
);

// Class-based approach
console.log("Class-based:", ShellSort.sort([...testArrays.numbers]));
