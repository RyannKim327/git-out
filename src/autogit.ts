/**
 * Type definition for a comparison function, similar to Array.prototype.sort's comparator.
 * @returns
 *   - A negative value if 'a' comes before 'b'.
 *   - A positive value if 'a' comes after 'b'.
 *   - Zero if 'a' and 'b' are considered equal.
 */
type CompareFn<T> = (a: T, b: T) => number;

/**
 * A default ascending comparator for primitive types (numbers, strings, booleans).
 * It uses the standard less-than, greater-than, and equality operators.
 */
const defaultAscendingComparator = <T>(a: T, b: T): number => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0; // a === b
};

/**
 * Checks if an array is sorted in ascending order.
 *
 * @param arr The array to check.
 * @param compareFn An optional comparison function. If not provided,
 *                  a default comparator suitable for numbers, strings, etc., will be used.
 * @returns `true` if the array is sorted in ascending order, `false` otherwise.
 */
function isSortedAscending<T>(
    arr: T[],
    compareFn: CompareFn<T> = defaultAscendingComparator
): boolean {
    // An empty array or an array with a single element is considered sorted.
    if (arr.length <= 1) {
        return true;
    }

    // Iterate from the first element up to the second-to-last element.
    // We compare arr[i] with arr[i+1].
    for (let i = 0; i < arr.length - 1; i++) {
        // If the current element (arr[i]) is "greater than" the next element (arr[i+1])
        // according to the comparator, then the array is not sorted in ascending order.
        // A return value > 0 from compareFn means 'a' comes after 'b'.
        if (compareFn(arr[i], arr[i + 1]) > 0) {
            return false;
        }
    }

    // If the loop completes without finding any unsorted pair, the array is sorted.
    return true;
}

// --- Examples ---

// 1. Numbers
const numbers1 = [1, 2, 3, 4, 5];
const numbers2 = [1, 3, 2, 4, 5];
const numbers3 = [5, 4, 3, 2, 1];
const emptyArray: number[] = [];
const singleElementArray = [42];

console.log("--- Numbers ---");
console.log(`[${numbers1}] sorted? ${isSortedAscending(numbers1)}`); // true
console.log(`[${numbers2}] sorted? ${isSortedAscending(numbers2)}`); // false (3 > 2)
console.log(`[${numbers3}] sorted? ${isSortedAscending(numbers3)}`); // false (5 > 4)
console.log(`[${emptyArray}] sorted? ${isSortedAscending(emptyArray)}`); // true
console.log(`[${singleElementArray}] sorted? ${isSortedAscending(singleElementArray)}`); // true
console.log(`[1, 1, 2] sorted? ${isSortedAscending([1, 1, 2])}`); // true (handles equal elements correctly)

// 2. Strings (lexicographical order)
const strings1 = ["apple", "banana", "cherry"];
const strings2 = ["banana", "apple", "cherry"];
const strings3 = ["apple", "apple", "banana"];

console.log("\n--- Strings ---");
console.log(`[${strings1.map(s => `'${s}'`)}] sorted? ${isSortedAscending(strings1)}`); // true
console.log(`[${strings2.map(s => `'${s}'`)}] sorted? ${isSortedAscending(strings2)}`); // false ('banana' > 'apple')
console.log(`[${strings3.map(s => `'${s}'`)}] sorted? ${isSortedAscending(strings3)}`); // true

// 3. Custom Objects (using a custom comparison function)
interface Person {
    name: string;
    age: number;
}

const people1: Person[] = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 },
];

const people2: Person[] = [
    { name: "Charlie", age: 35 },
    { name: "Bob", age: 30 }, // Out of order by age
    { name: "Alice", age: 25 },
];

const people3: Person[] = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 25 }, // Same age, name order could matter
    { name: "Charlie", age: 30 },
];

// Comparator for sorting by age
const comparePeopleByAge: CompareFn<Person> = (p1, p2) => p1.age - p2.age;

// Comparator for sorting by name
const comparePeopleByName: CompareFn<Person> = (p1, p2) => {
    if (p1.name < p2.name) return -1;
    if (p1.name > p2.name) return 1;
    return 0;
};

// Comparator for sorting by age, then by name
const comparePeopleByAgeThenName: CompareFn<Person> = (p1, p2) => {
    const ageDiff = p1.age - p2.age;
    if (ageDiff !== 0) {
        return ageDiff;
    }
    // If ages are the same, compare by name
    if (p1.name < p2.name) return -1;
    if (p1.name > p2.name) return 1;
    return 0;
};

console.log("\n--- Custom Objects (by age) ---");
console.log("People 1 by age sorted?", isSortedAscending(people1, comparePeopleByAge)); // true
console.log("People 2 by age sorted?", isSortedAscending(people2, comparePeopleByAge)); // false
console.log("People 3 by age sorted?", isSortedAscending(people3, comparePeopleByAge)); // true (Alice, Bob are same age, order doesn't matter for age sort)

console.log("\n--- Custom Objects (by name) ---");
const peopleByName1: Person[] = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 },
];
const peopleByName2: Person[] = [
    { name: "Bob", age: 30 },
    { name: "Alice", age: 25 },
    { name: "Charlie", age: 35 },
];
console.log("PeopleByName 1 sorted?", isSortedAscending(peopleByName1, comparePeopleByName)); // true
console.log("PeopleByName 2 sorted?", isSortedAscending(peopleByName2, comparePeopleByName)); // false

console.log("\n--- Custom Objects (by age then name) ---");
const peopleAgeName1: Person[] = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 30 },
];
const peopleAgeName2: Person[] = [
    { name: "Bob", age: 25 },
    { name: "Alice", age: 25 }, // Bob comes before Alice alphabetically, but Alice is before Bob
    { name: "Charlie", age: 30 },
];
console.log("PeopleAgeName 1 sorted?", isSortedAscending(peopleAgeName1, comparePeopleByAgeThenName)); // true
console.log("PeopleAgeName 2 sorted?", isSortedAscending(peopleAgeName2, comparePeopleByAgeThenName)); // false
