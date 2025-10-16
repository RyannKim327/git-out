// Original array
const numbers: number[] = [1, 2, 3, 4, 5];
console.log(numbers); // [1, 2, 3, 4, 5]

// Reverse the array (mutates original)
numbers.reverse();
console.log(numbers); // [5, 4, 3, 2, 1]
// Original array
const fruits: string[] = ['apple', 'banana', 'cherry'];

// Create a reversed copy
const reversedFruits = [...fruits].reverse();
// or
const reversedFruits2 = fruits.slice().reverse();

console.log(fruits); // ['apple', 'banana', 'cherry'] (unchanged)
console.log(reversedFruits); // ['cherry', 'banana', 'apple']
const numbers: number[] = [1, 2, 3, 4, 5];
const reversed = numbers.reduce<number[]>((acc, current) => [current, ...acc], []);
console.log(reversed); // [5, 4, 3, 2, 1]
function reverseArray<T>(array: T[]): T[] {
    const reversed: T[] = [];
    for (let i = array.length - 1; i >= 0; i--) {
        reversed.push(array[i]);
    }
    return reversed;
}

const items: string[] = ['a', 'b', 'c', 'd'];
const reversedItems = reverseArray(items);
console.log(reversedItems); // ['d', 'c', 'b', 'a']
function reverseArray<T>(array: T[]): T[] {
    return [...array].reverse();
}

// Usage with different types
const numbers = reverseArray([1, 2, 3]); // number[]
const strings = reverseArray(['a', 'b', 'c']); // string[]
const mixed = reverseArray([1, 'hello', true]); // (string | number | boolean)[]
const original = [1, 2, 3, 4, 5];
const reversed = [...original].reverse();
