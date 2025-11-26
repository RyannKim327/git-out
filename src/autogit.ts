/**
 * Checks if an array of primitive values (numbers, strings, booleans) is sorted in ascending order.
 *
 * @param arr The array to check.
 * @returns true if the array is sorted, false otherwise.
 */
function isArraySortedAscending<T extends number | string | boolean>(arr: T[]): boolean {
    if (arr.length <= 1) {
        return true; // An empty or single-element array is considered sorted.
    }

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false; // Found an element out of order
        }
    }

    return true; // All elements are in order
}

// --- Examples ---

// Numbers
console.log("Numbers:");
console.log("[1, 2, 3]", isArraySortedAscending([1, 2, 3]));          // true
console.log("[1, 3, 2]", isArraySortedAscending([1, 3, 2]));          // false
console.log("[]", isArraySortedAscending([]));                      // true
console.log("[5]", isArraySortedAscending([5]));                    // true
console.log("[1, 1, 2]", isArraySortedAscending([1, 1, 2]));        // true (handles duplicates)
console.log("[3, 2, 1]", isArraySortedAscending([3, 2, 1]));          // false

// Strings
console.log("\nStrings:");
console.log("['apple', 'banana', 'cherry']", isArraySortedAscending(['apple', 'banana', 'cherry'])); // true
console.log("['banana', 'apple']", isArraySortedAscending(['banana', 'apple']));                     // false
console.log("['a', 'b', 'c']", isArraySortedAscending(['a', 'b', 'c']));                             // true
console.log("['a', 'A']", isArraySortedAscending(['a', 'A']));                                       // false ('a' > 'A' in default lexicographical)
/**
 * A standard comparison function type, similar to Array.prototype.sort() callback.
 * Returns:
 *   - A negative number if `a` should come before `b`.
 *   - Zero if `a` and `b` are considered equal.
 *   - A positive number if `a` should come after `b`.
 */
type Comparator<T> = (a: T, b: T) => number;

/**
 * Checks if an array is sorted in ascending order using a custom comparator function.
 *
 * @param arr The array to check.
 * @param comparator A function that compares two elements.
 *                   For ascending order, it should return > 0 if a > b.
 * @returns true if the array is sorted, false otherwise.
 */
function isArraySortedWithComparator<T>(arr: T[], comparator: Comparator<T>): boolean {
    if (arr.length <= 1) {
        return true;
    }

    for (let i = 0; i < arr.length - 1; i++) {
        // If comparator(arr[i], arr[i+1]) > 0, it means arr[i] is "greater" than arr[i+1]
        // according to the comparator, which violates ascending order.
        if (comparator(arr[i], arr[i + 1]) > 0) {
            return false;
        }
    }

    return true;
}

// --- Default Comparators ---
const numberComparator: Comparator<number> = (a, b) => a - b;
const stringComparator: Comparator<string> = (a, b) => a.localeCompare(b); // More robust for strings

// --- Examples ---

// Numbers
console.log("\nNumbers (with comparator):");
console.log("[1, 2, 3]", isArraySortedWithComparator([1, 2, 3], numberComparator)); // true
console.log("[1, 3, 2]", isArraySortedWithComparator([1, 3, 2], numberComparator)); // false

// Strings
console.log("\nStrings (with comparator):");
console.log("['apple', 'banana', 'cherry']", isArraySortedWithComparator(['apple', 'banana', 'cherry'], stringComparator)); // true
console.log("['banana', 'apple']", isArraySortedWithComparator(['banana', 'apple'], stringComparator));                     // false
console.log("['apple', 'Apple']", isArraySortedWithComparator(['apple', 'Apple'], stringComparator));                       // false ('apple' comes after 'Apple' in localeCompare)

// Objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];

const peopleSortedByName: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];
const peopleUnsortedByName: Person[] = [
    { name: "Bob", age: 25 },
    { name: "Alice", age: 30 }, // Out of order
    { name: "Charlie", age: 35 }
];
const peopleSortedByAge: Person[] = [
    { name: "Bob", age: 25 },
    { name: "Alice", age: 30 },
    { name: "Charlie", age: 35 }
];
const peopleUnsortedByAge: Person[] = [
    { name: "Charlie", age: 35 },
    { name: "Bob", age: 25 }, // Out of order
    { name: "Alice", age: 30 }
];


// Comparator for sorting people by name (ascending)
const personNameComparator: Comparator<Person> = (p1, p2) => p1.name.localeCompare(p2.name);
// Comparator for sorting people by age (ascending)
const personAgeComparator: Comparator<Person> = (p1, p2) => p1.age - p2.age;

console.log("\nObjects (by name):");
console.log("peopleSortedByName", isArraySortedWithComparator(peopleSortedByName, personNameComparator));     // true
console.log("peopleUnsortedByName", isArraySortedWithComparator(peopleUnsortedByName, personNameComparator)); // false

console.log("\nObjects (by age):");
console.log("peopleSortedByAge", isArraySortedWithComparator(peopleSortedByAge, personAgeComparator));     // true
console.log("peopleUnsortedByAge", isArraySortedWithComparator(peopleUnsortedByAge, personAgeComparator)); // false
type Comparator<T> = (a: T, b: T) => number;

/**
 * Checks if an array is sorted in ascending order using a custom comparator function
 * and the `every` array method.
 *
 * @param arr The array to check.
 * @param comparator A function that compares two elements.
 *                   For ascending order, it should return > 0 if a > b.
 * @returns true if the array is sorted, false otherwise.
 */
function isArraySortedEvery<T>(arr: T[], comparator: Comparator<T>): boolean {
    if (arr.length <= 1) {
        return true;
    }

    // We iterate up to the second-to-last element.
    // The `every` method checks if the callback returns true for ALL elements.
    return arr.slice(0, -1).every((item, index) => {
        // Compare the current item with the next item in the original array.
        // It's sorted if item is less than or equal to the next item.
        return comparator(item, arr[index + 1]) <= 0;
    });
}

// Reuse the comparators from Method 2
const numberComparator: Comparator<number> = (a, b) => a - b;
const stringComparator: Comparator<string> = (a, b) => a.localeCompare(b);
const personAgeComparator: Comparator<Person> = (p1, p2) => p1.age - p2.age;

// --- Examples ---
console.log("\nNumbers (with every):");
console.log("[1, 2, 3]", isArraySortedEvery([1, 2, 3], numberComparator)); // true
console.log("[1, 3, 2]", isArraySortedEvery([1, 3, 2], numberComparator)); // false

console.log("\nStrings (with every):");
console.log("['apple', 'banana', 'cherry']", isArraySortedEvery(['apple', 'banana', 'cherry'], stringComparator)); // true

console.log("\nObjects (by age, with every):");
const peopleSortedByAgeEvery: Person[] = [
    { name: "Bob", age: 25 },
    { name: "Alice", age: 30 },
    { name: "Charlie", age: 35 }
];
console.log("peopleSortedByAgeEvery", isArraySortedEvery(peopleSortedByAgeEvery, personAgeComparator)); // true
