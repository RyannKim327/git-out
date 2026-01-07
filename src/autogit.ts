const array: number[] = [1, 2, 3, 4, 5];
array.reverse();
console.log(array); // [5, 4, 3, 2, 1]
const originalArray: number[] = [1, 2, 3, 4, 5];
const reversedArray: number[] = [...originalArray].reverse();
console.log(originalArray); // [1, 2, 3, 4, 5] (unchanged)
console.log(reversedArray); // [5, 4, 3, 2, 1]
const originalArray: number[] = [1, 2, 3, 4, 5];
const reversedArray: number[] = originalArray.slice().reverse();
console.log(reversedArray); // [5, 4, 3, 2, 1]
function reverseArray<T>(arr: T[]): T[] {
    const reversed: T[] = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        reversed.push(arr[i]);
    }
    return reversed;
}

const array: number[] = [1, 2, 3, 4, 5];
const reversed = reverseArray(array);
console.log(reversed); // [5, 4, 3, 2, 1]
const array: number[] = [1, 2, 3, 4, 5];
const reversed: number[] = array.reduce((acc: number[], current) => {
    return [current, ...acc];
}, []);
console.log(reversed); // [5, 4, 3, 2, 1]
// Generic function that works with any array type
function reverseArray<T>(arr: T[]): T[] {
    return [...arr].reverse();
}

// Usage examples
const numbers: number[] = [1, 2, 3, 4, 5];
const strings: string[] = ['a', 'b', 'c', 'd'];
const mixed: (number | string)[] = [1, 'two', 3, 'four'];

console.log(reverseArray(numbers)); // [5, 4, 3, 2, 1]
console.log(reverseArray(strings)); // ['d', 'c', 'b', 'a']
console.log(reverseArray(mixed));   // ['four', 3, 'two', 1]
