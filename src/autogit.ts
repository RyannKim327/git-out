// For any array type
const array = [1, 2, 3, 4, 5];
const reversed = array.reverse();
console.log(reversed); // [5, 4, 3, 2, 1]

// With type annotations
const numbers: number[] = [1, 2, 3, 4, 5];
const reversedNumbers = numbers.reverse();

const strings: string[] = ["a", "b", "c"];
const reversedStrings = strings.reverse();
const original = [1, 2, 3, 4, 5];

// Using slice() to create a copy first
const reversed = original.slice().reverse();

// Using spread operator
const reversed2 = [...original].reverse();

console.log(original); // [1, 2, 3, 4, 5] (unchanged)
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
const array = [1, 2, 3, 4, 5];
const reversed = array.reduce<T[]>((acc, current) => [current, ...acc], []);
console.log(reversed); // [5, 4, 3, 2, 1]
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 }
];

const reversedPeople = [...people].reverse();
console.log(reversedPeople);
// [
//     { name: "Charlie", age: 35 },
//     { name: "Bob", age: 30 },
//     { name: "Alice", age: 25 }
// ]
const original = [1, 2, 3, 4, 5];
const reversed = [...original].reverse(); // or original.slice().reverse()
