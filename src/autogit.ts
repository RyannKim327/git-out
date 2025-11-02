// Example array
let numbers: number[] = [1, 2, 3, 4, 5];

// Reverse the array in place
numbers.reverse();

console.log(numbers); // Output: [5, 4, 3, 2, 1]
let numbers: number[] = [1, 2, 3, 4, 5];

// Create a new reversed array
let reversedNumbers: number[] = [...numbers].reverse();

console.log(numbers);        // Original: [1, 2, 3, 4, 5] (unchanged)
console.log(reversedNumbers); // New: [5, 4, 3, 2, 1]
// String array
let fruits: string[] = ['apple', 'banana', 'cherry'];
fruits.reverse();
console.log(fruits); // Output: ['cherry', 'banana', 'apple']

// Object array
interface Person {
    name: string;
    age: number;
}

let people: Person[] = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 35 }
];

people.reverse();
console.log(people); // Reversed order, objects remain intact
let numbers: number[] = [1, 2, 3, 4, 5];
let reversedNumbers: number[] = numbers.toReversed();

console.log(numbers);        // Original: [1, 2, 3, 4, 5]
console.log(reversedNumbers); // New: [5, 4, 3, 2, 1]
