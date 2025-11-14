// For regular arrays
const numbers: number[] = [1, 2, 3, 4, 5];
numbers.reverse();
console.log(numbers); // [5, 4, 3, 2, 1]

// For string arrays
const fruits: string[] = ['apple', 'banana', 'cherry'];
fruits.reverse();
console.log(fruits); // ['cherry', 'banana', 'apple']

// For mixed types (using generics or union types)
const mixed: (string | number)[] = ['hello', 42, 'world', 99];
mixed.reverse();
console.log(mixed); // [99, 'world', 42, 'hello']
const numbers: number[] = [1, 2, 3, 4, 5];

// Method 1: Spread operator + reverse()
const reversed1 = [...numbers].reverse();

// Method 2: slice() + reverse()
const reversed2 = numbers.slice().reverse();

// Method 3: Array.from() + reverse()
const reversed3 = Array.from(numbers).reverse();

console.log(numbers);    // [1, 2, 3, 4, 5] (unchanged)
console.log(reversed1);  // [5, 4, 3, 2, 1]
console.log(reversed2);  // [5, 4, 3, 2, 1]
console.log(reversed3);  // [5, 4, 3, 2, 1]
function reverseArray<T>(arr: T[]): T[] {
    const reversed: T[] = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        reversed.push(arr[i]);
    }
    return reversed;
}

// Usage
const numbers = [1, 2, 3, 4, 5];
const strings = ['a', 'b', 'c'];
const reversedNumbers = reverseArray(numbers);
const reversedStrings = reverseArray(strings);

console.log(reversedNumbers); // [5, 4, 3, 2, 1]
console.log(reversedStrings); // ['c', 'b', 'a']
function reverseArray<T>(arr: T[]): T[] {
    return arr.reduce<T[]>((acc, current) => [current, ...acc], []);
}

const numbers = [1, 2, 3, 4, 5];
const reversed = reverseArray(numbers);
console.log(reversed); // [5, 4, 3, 2, 1]
// If you have a readonly array
const readonlyArray: readonly number[] = [1, 2, 3, 4, 5];

// You'll need to create a new array
const reversed = [...readonlyArray].reverse();
console.log(reversed); // [5, 4, 3, 2, 1]
