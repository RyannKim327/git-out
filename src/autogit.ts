const arr: number[] = [1, 2, 3, 4];
arr.reverse(); // Original array is modified
console.log(arr); // Output: [4, 3, 2, 1]
const originalArr: string[] = ["a", "b", "c"];
const reversedArr: string[] = [...originalArr].reverse(); // Spread operator copies the array

console.log(originalArr); // Output: ["a", "b", "c"] (untouched)
console.log(reversedArr); // Output: ["c", "b", "a"]
interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
];
const reversedPeople = [...people].reverse();
