function countingSort(arr: number[], maxValue: number = 100): number[] {
    // Handle edge cases
    if (!arr || arr.length === 0) return [];
    if (arr.length === 1) return [...arr];
    
    // Find the actual maximum value in the array
    const actualMax = Math.max(...arr);
    const actualMin = Math.min(...arr);
    
    // If all values are the same, just return the array
    if (actualMax === actualMin) return [...arr];
    
    // Create counting array
    // Using actualMax ensures we don't waste space on unused values
    const countArraySize = actualMax + 1;
    const count: number[] = new Array(countArraySize).fill(0);
    
    // Store the count of each element
    for (const num of arr) {
        count[num]++;
    }
    
    // Modify the count array to store cumulative counts
    for (let i = 1; i < countArraySize; i++) {
        count[i] += count[i - 1];
    }
    
    // Build the sorted array
    const sortedArray: number[] = new Array(arr.length);
    
    // Traverse the original array from right to left
    // This ensures stable sorting
    for (let i = arr.length - 1; i >= 0; i--) {
        const value = arr[i];
        sortedArray[count[value] - 1] = value;
        count[value]--; // Decrease count for this value
    }
    
    return sortedArray;
}

// Generic version that can handle any comparable type with a range
function countingSortGeneric<T extends { value: number }>(
    arr: T[], 
    getValue: (item: T) => number,
    maxValue: number = 100
): T[] {
    if (!arr || arr.length === 0) return [];
    
    // Extract values for counting
    const values = arr.map(getValue);
    const actualMax = Math.max(...values);
    
    const countArraySize = actualMax + 1;
    const count: number[] = new Array(countArraySize).fill(0);
    
    // Count occurrences
    for (const value of values) {
        count[value]++;
    }
    
    // Cumulative count
    for (let i = 1; i < countArraySize; i++) {
        count[i] += count[i - 1];
    }
    
    // Build sorted result
    const sortedArray: T[] = new Array(arr.length);
    
    for (let i = arr.length - 1; i >= 0; i--) {
        const value = getValue(arr[i]);
        sortedArray[count[value] - 1] = arr[i];
        count[value]--;
    }
    
    return sortedArray;
}

// Example usage and tests
function main() {
    // Test case 1: Basic sorting
    const arr1 = [4, 2, 2, 8, 3, 3, 1];
    console.log("Original:", arr1);
    console.log("Sorted:", countingSort(arr1));
    // Output: [1, 2, 2, 3, 3, 4, 8]
    
    // Test case 2: Already sorted
    const arr2 = [1, 2, 3, 4, 5];
    console.log("\nOriginal:", arr2);
    console.log("Sorted:", countingSort(arr2));
    // Output: [1, 2, 3, 4, 5]
    
    // Test case 3: All same values
    const arr3 = [5, 5, 5, 5];
    console.log("\nOriginal:", arr3);
    console.log("Sorted:", countingSort(arr3));
    // Output: [5, 5, 5, 5]
    
    // Test case 4: Generic version with objects
    interface Student {
        id: number;
        name: string;
        grade: number;
    }
    
    const students: Student[] = [
        { id: 1, name: "Alice", grade: 85 },
        { id: 2, name: "Bob", grade: 92 },
        { id: 3, name: "Charlie", grade: 78 },
        { id: 4, name: "Diana", grade: 92 }
    ];
    
    console.log("\nOriginal students:", students);
    const sortedStudents = countingSortGeneric(
        students, 
        (student: Student) => student.grade
    );
    console.log("Sorted by grade:", sortedStudents);
    // Maintains stability - students with same grade keep original order
}

// Run the example
main();
Original: [4, 2, 2, 8, 3, 3, 1]
Sorted: [1, 2, 2, 3, 3, 4, 8]

Original students: [
  { id: 1, name: 'Alice', grade: 85 },
  { id: 2, name: 'Bob', grade: 92 },
  { id: 3, name: 'Charlie', grade: 78 },
  { id: 4, name: 'Diana', grade: 92 }
]
Sorted by grade: [
  { id: 3, name: 'Charlie', grade: 78 },
  { id: 1, name: 'Alice', grade: 85 },
  { id: 2, name: 'Bob', grade: 92 },
  { id: 4, name: 'Diana', grade: 92 }
]
