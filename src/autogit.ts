const array: number[] = [1, 2, 3, 4, 5];
array.reverse();
console.log(array); // [5, 4, 3, 2, 1]
const original: string[] = ['a', 'b', 'c', 'd'];
const reversed = [...original].reverse();
console.log(reversed); // ['d', 'c', 'b', 'a']
console.log(original); // ['a', 'b', 'c', 'd'] (unchanged)
function reverseArray<T>(arr: T[]): T[] {
    const reversed: T[] = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        reversed.push(arr[i]);
    }
    return reversed;
}

const numbers = [1, 2, 3, 4];
const reversedNumbers = reverseArray(numbers);
const array: number[] = [1, 2, 3, 4];
const reversed = array.reduce((acc, current) => [current, ...acc], [] as number[]);
console.log(reversed); // [4, 3, 2, 1]
function reverseArray<T>(arr: T[]): T[] {
    return [...arr].reverse();
}

// Usage examples:
const numbers = reverseArray([1, 2, 3, 4]); // number[]
const strings = reverseArray(['a', 'b', 'c']); // string[]
const mixed = reverseArray([1, 'two', true]); // (number | string | boolean)[]
const readonlyArray: readonly number[] = [1, 2, 3];
const reversed = [...readonlyArray].reverse();
