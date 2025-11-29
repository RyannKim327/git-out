function isSortedAscending<T extends number | string>(arr: T[]): boolean {
    if (arr.length <= 1) {
        return true; // An empty or single-element array is considered sorted
    }

    for (let i = 0; i < arr.length - 1; i++) {
        // If the current element is greater than the next one, it's not sorted
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }

    return true; // All elements were in ascending order
}

// --- Examples ---

// Numbers
console.log("Numbers:");
console.log(isSortedAscending([1, 2, 3, 4, 5]));        // true
console.log(isSortedAscending([1, 3, 2, 4, 5]));        // false (3 > 2)
console.log(isSortedAscending([5, 4, 3, 2, 1]));        // false (5 > 4)
console.log(isSortedAscending([1, 1, 2, 3]));          // true (allows duplicates)
console.log(isSortedAscending([]));                    // true (empty)
console.log(isSortedAscending([7]));                   // true (single element)

// Strings (lexicographical comparison)
console.log("\nStrings:");
console.log(isSortedAscending(["apple", "banana", "cherry"])); // true
console.log(isSortedAscending(["banana", "apple", "cherry"])); // false ("banana" > "apple")
console.log(isSortedAscending(["a", "b", "c"]));       // true
console.log(isSortedAscending(["c", "a", "b"]));       // false
/**
 * A comparator function that takes two elements and returns:
 * - A negative number if a should come before b (a < b)
 * - Zero if a and b are considered equal (a == b)
 * - A positive number if a should come after b (a > b)
 */
type Comparator<T> = (a: T, b: T) => number;

/**
 * Checks if an array is sorted in ascending order.
 *
 * @param arr The array to check.
 * @param comparator An optional function to compare two elements.
 *                   If not provided, it uses default JavaScript comparison for primitive types.
 * @returns true if the array is sorted, false otherwise.
 */
function isSortedAscendingGeneric<T>(arr: T[], comparator?: Comparator<T>): boolean {
    if (arr.length <= 1) {
        return true;
    }

    if (comparator) {
        // Use the provided comparator
        for (let i = 0; i < arr.length - 1; i++) {
            if (comparator(arr[i], arr[i + 1]) > 0) { // If arr[i] is "greater than" arr[i+1]
                return false;
            }
        }
    } else {
        // Fallback for primitive types (number, string, boolean, etc.)
        // We use 'as any' here because TypeScript doesn't know 'T' is comparable with '>'
        // without a type constraint like 'T extends number | string', which would limit flexibility.
        for (let i = 0; i < arr.length - 1; i++) {
            if ((arr[i] as any) > (arr[i + 1] as any)) {
                return false;
            }
        }
    }

    return true;
}

// --- Examples ---

// Using default comparison (same as the first function)
console.log("\nGeneric with default comparison:");
console.log(isSortedAscendingGeneric([1, 2, 3]));              // true
console.log(isSortedAscendingGeneric(["apple", "banana"]));    // true

// Custom objects: Sorting by 'age' property
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];

const peopleSortedByAge: Person[] = [
    { name: "Bob", age: 25 },
    { name: "Alice", age: 30 },
    { name: "Charlie", age: 35 }
];

const personComparatorByAge: Comparator<Person> = (p1, p2) => p1.age - p2.age;

console.log("\nCustom Objects (Person by age):");
console.log(isSortedAscendingGeneric(people, personComparatorByAge));         // false (Alice 30 is not <= Bob 25)
console.log(isSortedAscendingGeneric(peopleSortedByAge, personComparatorByAge)); // true

// Custom objects: Sorting by 'name' (case-insensitive)
const personComparatorByNameCaseInsensitive: Comparator<Person> = (p1, p2) => {
    const name1 = p1.name.toLowerCase();
    const name2 = p2.name.toLowerCase();
    if (name1 < name2) return -1;
    if (name1 > name2) return 1;
    return 0;
};

const mixedCaseNames: Person[] = [
    { name: "alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];

const mixedCaseNamesSorted: Person[] = [
    { name: "alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];
console.log(isSortedAscendingGeneric(mixedCaseNames, personComparatorByNameCaseInsensitive));      // true (a < B < C)
console.log(isSortedAscendingGeneric(mixedCaseNamesSorted, personComparatorByNameCaseInsensitive)); // true
