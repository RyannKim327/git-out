// For mutable reversal (modifies original array)
const numbers: number[] = [1, 2, 3, 4, 5];
numbers.reverse();
console.log(numbers); // [5, 4, 3, 2, 1]

// For immutable reversal (creates new array)
const original: number[] = [1, 2, 3, 4, 5];
const reversed = [...original].reverse();
console.log(original); // [1, 2, 3, 4, 5] (unchanged)
console.log(reversed); // [5, 4, 3, 2, 1]
const fruits: string[] = ["apple", "banana", "cherry"];
const reversedFruits = fruits.slice().reverse();
console.log(reversedFruits); // ["cherry", "banana", "apple"]
function reverseArray<T>(arr: T[]): T[] {
    const reversed: T[] = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        reversed.push(arr[i]);
    }
    return reversed;
}

const numbers: number[] = [1, 2, 3, 4, 5];
const reversed = reverseArray(numbers);
console.log(reversed); // [5, 4, 3, 2, 1]
const numbers: number[] = [1, 2, 3, 4, 5];
const reversed = numbers.reduce<number[]>((acc, current) => {
    return [current, ...acc];
}, []);
console.log(reversed); // [5, 4, 3, 2, 1]
// Generic function for reversing arrays
function reverseArray<T>(arr: T[], inPlace: boolean = false): T[] {
    if (inPlace) {
        return arr.reverse();
    } else {
        return [...arr].reverse();
    }
}

// Usage examples
const numbers: number[] = [1, 2, 3, 4, 5];
const strings: string[] = ["a", "b", "c"];
const mixed: (string | number)[] = [1, "two", 3, "four"];

console.log(reverseArray(numbers)); // [5, 4, 3, 2, 1]
console.log(reverseArray(strings)); // ["c", "b", "a"]
console.log(reverseArray(mixed)); // ["four", 3, "two", 1]

// Original arrays remain unchanged
console.log(numbers); // [1, 2, 3, 4, 5]
