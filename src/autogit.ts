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
            
            // Shift earlier gap-sorted elements up until the correct location
            // for array[i] is found
            while (j >= gap && compare(sortedArray[j - gap], temp) > 0) {
                sortedArray[j] = sortedArray[j - gap];
                j -= gap;
            }
            
            // Put temp (the original array[i]) in its correct location
            sortedArray[j] = temp;
        }
        
        // Reduce the gap for the next iteration
        gap = Math.floor(gap / 2);
    }
    
    return sortedArray;
}
// Example 1: Sorting numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = shellSort(numbers);
console.log(sortedNumbers); // [11, 12, 22, 25, 34, 64, 90]

// Example 2: Sorting strings
const strings = ["banana", "apple", "cherry", "date"];
const sortedStrings = shellSort(strings);
console.log(sortedStrings); // ["apple", "banana", "cherry", "date"]

// Example 3: Custom comparison for objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "John", age: 30 },
    { name: "Jane", age: 25 },
    { name: "Bob", age: 35 }
];

const sortedByAge = shellSort(people, (a, b) => a.age - b.age);
console.log(sortedByAge);
// [{name: "Jane", age: 25}, {name: "John", age: 30}, {name: "Bob", age: 35}]

// Example 4: Descending order
const descendingNumbers = shellSort(numbers, (a, b) => b - a);
console.log(descendingNumbers); // [90, 64, 34, 25, 22, 12, 11]
function shellSortKnuth<T>(array: T[], compareFn?: (a: T, b: T) => number): T[] {
    const sortedArray = [...array];
    const n = sortedArray.length;
    
    const compare = compareFn || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    // Knuth's formula: h = 3*h + 1
    let gap = 1;
    while (gap < n / 3) {
        gap = 3 * gap + 1;
    }

    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            const temp = sortedArray[i];
            let j = i;
            
            while (j >= gap && compare(sortedArray[j - gap], temp) > 0) {
                sortedArray[j] = sortedArray[j - gap];
                j -= gap;
            }
            
            sortedArray[j] = temp;
        }
        
        gap = Math.floor(gap / 3);
    }
    
    return sortedArray;
}
