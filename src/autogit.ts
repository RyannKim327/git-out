// This modifies the original array
const numbers: number[] = [1, 2, 3, 4, 5];
numbers.reverse();
console.log(numbers); // [5, 4, 3, 2, 1]

// With string array
const fruits: string[] = ['apple', 'banana', 'cherry'];
fruits.reverse();
console.log(fruits); // ['cherry', 'banana', 'apple']
// Method 1: Using spread operator
const original: number[] = [1, 2, 3, 4, 5];
const reversed = [...original].reverse();
console.log(original); // [1, 2, 3, 4, 5] (unchanged)
console.log(reversed); // [5, 4, 3, 2, 1]

// Method 2: Using slice()
const reversed2 = original.slice().reverse();

// Method 3: Using Array.from()
const reversed3 = Array.from(original).reverse();
function reverseArray<T>(arr: T[]): T[] {
    const result: T[] = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        result.push(arr[i]);
    }
    return result;
}

// Usage
const numbers = [1, 2, 3, 4, 5];
const reversed = reverseArray(numbers);
console.log(reversed); // [5, 4, 3, 2, 1]
const reverseWithReduce = <T>(arr: T[]): T[] => {
    return arr.reduce<T[]>((acc, current) => [current, ...acc], []);
};

// Usage
const items = ['a', 'b', 'c'];
const reversedItems = reverseWithReduce(items);
console.log(reversedItems); // ['c', 'b', 'a']
function safeReverse<T>(array: T[]): T[] {
    return [...array].reverse();
}

// Usage with different types
const numbers = [1, 2, 3];
const strings = ['hello', 'world'];
const mixed = [1, 'two', true];

const reversedNumbers = safeReverse(numbers); // Type: number[]
const reversedStrings = safeReverse(strings); // Type: string[]
const reversedMixed = safeReverse(mixed); // Type: (string | number | boolean)[]
const original = [1, 2, 3, 4, 5];
const reversed = [...original].reverse();
