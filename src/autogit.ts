const numbers: number[] = [1, 2, 3, 4, 5];
numbers.reverse();
console.log(numbers); // [5, 4, 3, 2, 1]

const strings: string[] = ['a', 'b', 'c'];
strings.reverse();
console.log(strings); // ['c', 'b', 'a']
const original: number[] = [1, 2, 3, 4, 5];
const reversed = [...original].reverse();

console.log(original); // [1, 2, 3, 4, 5] (unchanged)
console.log(reversed); // [5, 4, 3, 2, 1]
const array: number[] = [1, 2, 3, 4, 5];
const reversed = Array.from(array).reverse();
console.log(reversed); // [5, 4, 3, 2, 1]
function reverseArray<T>(arr: T[]): T[] {
    const reversed: T[] = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        reversed.push(arr[i]);
    }
    return reversed;
}

const numbers = [1, 2, 3, 4, 5];
const reversed = reverseArray(numbers);
console.log(reversed); // [5, 4, 3, 2, 1]
const array: number[] = [1, 2, 3, 4, 5];
const reversed = array.reduce((acc: number[], curr) => {
    acc.unshift(curr);
    return acc;
}, []);
console.log(reversed); // [5, 4, 3, 2, 1]
const readonlyArray: readonly number[] = [1, 2, 3, 4, 5];
const reversed = [...readonlyArray].reverse();
console.log(reversed); // [5, 4, 3, 2, 1]
const originalArray: number[] = [1, 2, 3, 4, 5];
const reversedArray = [...originalArray].reverse();
