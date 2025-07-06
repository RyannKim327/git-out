const str: string = "123";
const num: number = parseInt(str, 10);

console.log(num); // Output: 123
const str: string = "123";
const num: number = +str;

console.log(num); // Output: 123
const str: string = "123";
const num: number = Number(str);

console.log(num); // Output: 123
const str: string = "123.45";
const num: number = Math.floor(Number(str));

console.log(num); // Output: 123
const str: string = "abc";
const num: number = parseInt(str, 10);

if (isNaN(num)) {
    console.log("Conversion failed; not a valid number.");
} else {
    console.log(num);
}
