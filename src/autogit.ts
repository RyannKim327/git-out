const numbers: number[] = [1, 2, 3, 4, 5];
numbers.reverse();
console.log(numbers); // Output: [5, 4, 3, 2, 1]

// Or create a new array without modifying the original
const original: number[] = [1, 2, 3, 4, 5];
const reversed = [...original].reverse();
console.log(reversed); // Output: [5, 4, 3, 2, 1]
console.log(original); // Output: [1, 2, 3, 4, 5] (unchanged)
function reverseArray<T>(arr: T[]): T[] {
    const reversed: T[] = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        reversed.push(arr[i]);
    }
    return reversed;
}

const array = [1, 2, 3, 4, 5];
const reversed = reverseArray(array);
console.log(reversed); // Output: [5, 4, 3, 2, 1]
const numbers: number[] = [1, 2, 3, 4, 5];
const reversed = numbers.reduce<number[]>((acc, current) => [current, ...acc], []);
console.log(reversed); // Output: [5, 4, 3, 2, 1]
const original: number[] = [1, 2, 3, 4, 5];
const reversed = original.slice().reverse();
console.log(reversed); // Output: [5, 4, 3, 2, 1]
console.log(original); // Output: [1, 2, 3, 4, 5] (unchanged)
const original: number[] = [1, 2, 3, 4, 5];
const reversed = [...original].reverse();
console.log(reversed); // Output: [5, 4, 3, 2, 1]
console.log(original); // Output: [1, 2, 3, 4, 5] (unchanged)
// Generic function that preserves types
function reverseArray<T>(arr: T[]): T[] {
    return [...arr].reverse();
}

// Usage examples
const numbers: number[] = [1, 2, 3, 4, 5];
const strings: string[] = ['a', 'b', 'c', 'd'];
const mixed: (string | number)[] = [1, 'two', 3, 'four'];

console.log(reverseArray(numbers)); // [5, 4, 3, 2, 1]
console.log(reverseArray(strings)); // ['d', 'c', 'b', 'a']
console.log(reverseArray(mixed));   // ['four', 3, 'two', 1]
