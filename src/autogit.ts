const numbers: number[] = [1, 2, 3, 4, 5];
const max = Math.max(...numbers);
console.log(max); // Output: 5
const numbers: number[] = [1, 2, 3, 4, 5];
let max = numbers[0];

for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
        max = numbers[i];
    }
}

console.log(max); // Output: 5
const numbers: number[] = [1, 2, 3, 4, 5];
const max = numbers.reduce((acc, curr) => (curr > acc ? curr : acc), numbers[0]);
console.log(max); // Output: 5
const numbers: number[] = [1, 2, 3, 4, 5];
let max = numbers[0];

numbers.forEach(num => {
    if (num > max) {
        max = num;
    }
});

console.log(max); // Output: 5
