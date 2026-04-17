// 1️⃣  Define a compare function signature
type Comparator<T> = (a: T, b: T) => number;

// 2️⃣  Merge helper – combines two sorted halves
function merge<T>(left: T[], right: T[], cmp: Comparator<T>): T[] {
    const result: T[] = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        // If left[i] <= right[j] according to cmp, push left[i]
        if (cmp(left[i], right[j]) <= 0) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }

    // Append any leftovers
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// 3️⃣  The recursive merge‑sort function
export function mergeSort<T>(arr: T[], cmp?: Comparator<T>): T[] {
    // Default comparator for primitive types
    const compare: Comparator<T> = cmp ?? ((a, b) => (a as any) < (b as any) ? -1 : (a as any) > (b as any) ? 1 : 0);

    // Base case: arrays of length 0 or 1 are already sorted
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left  = mergeSort(arr.slice(0, mid), compare);
    const right = mergeSort(arr.slice(mid), compare);

    return merge(left, right, compare);
}
// Numbers
const nums = [5, 2, 9, 1, 5, 6];
const sortedNums = mergeSort(nums);
// sortedNums === [1, 2, 5, 5, 6, 9]

// Strings
const words = ["banana", "apple", "cherry"];
const sortedWords = mergeSort(words);
// sortedWords === ["apple", "banana", "cherry"]

// Custom objects (by age)
type Person = { name: string; age: number };
const people: Person[] = [
    { name: "John", age: 30 },
    { name: "Alice", age: 25 },
    { name: "Bob",   age: 35 },
];
const sortedByAge = mergeSort(people, (a, b) => a.age - b.age);
// sortedByAge => Alice, John, Bob
