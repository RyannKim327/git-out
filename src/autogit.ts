// For any array type
const numbers: number[] = [1, 2, 3, 4, 5];
numbers.reverse();
console.log(numbers); // [5, 4, 3, 2, 1]

// For strings
const fruits: string[] = ['apple', 'banana', 'cherry'];
fruits.reverse();
console.log(fruits); // ['cherry', 'banana', 'apple']

// For mixed types using generics
const mixed: Array<string | number> = ['a', 1, 'b', 2];
mixed.reverse();
console.log(mixed); // [2, 'b', 1, 'a']
// Using spread operator
const original: number[] = [1, 2, 3, 4, 5];
const reversed = [...original].reverse();
console.log(original); // [1, 2, 3, 4, 5] (unchanged)
console.log(reversed); // [5, 4, 3, 2, 1]

// Using slice()
const reversed2 = original.slice().reverse();

// Using Array.from()
const reversed3 = Array.from(original).reverse();
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
const readonlyArray: readonly number[] = [1, 2, 3, 4, 5];
// This would cause a TypeScript error:
// readonlyArray.reverse(); // ❌ Error!

// Instead, create a copy:
const reversed = [...readonlyArray].reverse();
console.log(reversed); // [5, 4, 3, 2, 1]
// For mutable arrays where mutation is acceptable
array.reverse();

// For immutable approach (recommended)
const reversedArray = [...array].reverse();
