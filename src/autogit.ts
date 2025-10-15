function bubbleSort<T>(arr: T[]): T[] {
    const n = arr.length;
    
    // Outer loop for each pass
    for (let i = 0; i < n - 1; i++) {
        // Inner loop for comparisons
        for (let j = 0; j < n - i - 1; j++) {
            // Compare adjacent elements and swap if needed
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    
    return arr;
}
function bubbleSortWithComparator<T>(
    arr: T[], 
    comparator: (a: T, b: T) => number = (a, b) => (a > b ? 1 : a < b ? -1 : 0)
): T[] {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (comparator(arr[j], arr[j + 1]) > 0) {
                // Swap elements
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    
    return arr;
}
function optimizedBubbleSort<T>(arr: T[]): T[] {
    const n = arr.length;
    let swapped: boolean;
    
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        
        // If no swapping occurred, array is already sorted
        if (!swapped) {
            break;
        }
    }
    
    return arr;
}
// Example 1: Sorting numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", numbers);
console.log("Sorted:", bubbleSort(numbers)); // [11, 12, 22, 25, 34, 64, 90]

// Example 2: Sorting strings
const strings = ["banana", "apple", "cherry", "date"];
console.log("Sorted strings:", bubbleSort(strings)); 
// ["apple", "banana", "cherry", "date"]

// Example 3: Using custom comparator for descending order
const descendingComparator = (a: number, b: number) => (a < b ? 1 : a > b ? -1 : 0);
const numbersDesc = [1, 3, 2, 5, 4];
console.log("Descending:", bubbleSortWithComparator(numbersDesc, descendingComparator)); 
// [5, 4, 3, 2, 1]

// Example 4: Sorting objects by a property
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];

const ageComparator = (a: Person, b: Person) => a.age - b.age;
console.log("Sorted by age:", bubbleSortWithComparator(people, ageComparator));
