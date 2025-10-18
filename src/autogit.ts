const originalArray: number[] = [1, 2, 3, 4, 5];
const reversedArray = originalArray.reverse();

console.log(reversedArray); // [5, 4, 3, 2, 1]
const originalArray: number[] = [1, 2, 3, 4, 5];
const reversedArray = [...originalArray].reverse();

console.log(originalArray); // [1, 2, 3, 4, 5] (unchanged)
console.log(reversedArray); // [5, 4, 3, 2, 1]
function reverseArray<T>(array: T[]): T[] {
    const reversed: T[] = [];
    for (let i = array.length - 1; i >= 0; i--) {
        reversed.push(array[i]);
    }
    return reversed;
}

const numbers = [1, 2, 3, 4, 5];
const reversed = reverseArray(numbers);
console.log(reversed); // [5, 4, 3, 2, 1]
const originalArray: number[] = [1, 2, 3, 4, 5];
const reversedArray = originalArray.reduce((acc: number[], current) => {
    acc.unshift(current);
    return acc;
}, []);

console.log(reversedArray); // [5, 4, 3, 2, 1]
const originalArray: number[] = [1, 2, 3, 4, 5];
const reversedArray = [...originalArray].reverse();
// Generic function that preserves original array
function safeReverse<T>(array: T[]): T[] {
    return [...array].reverse();
}

const numbers: number[] = [1, 2, 3, 4, 5];
const strings: string[] = ['a', 'b', 'c'];

const reversedNumbers = safeReverse(numbers);
const reversedStrings = safeReverse(strings);

console.log(reversedNumbers); // [5, 4, 3, 2, 1]
console.log(reversedStrings); // ['c', 'b', 'a']
