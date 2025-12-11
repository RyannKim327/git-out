const str = "42";
const num = parseInt(str, 10); // Always specify radix (base)
console.log(num); // 42 (number)
const str = "42";
const num = +str;
console.log(num); // 42 (number)
const str = "42";
const num = Number(str);
console.log(num); // 42 (number)
const str = "42" as unknown as number;
// Or using angle bracket syntax
const num = <number><unknown>str;
function convertToInt(str: string): number {
    const num = parseInt(str, 10);
    if (isNaN(num)) {
        throw new Error(`Cannot convert "${str}" to integer`);
    }
    return num;
}

// Usage
const result: number = convertToInt("42");
// Examples of different scenarios
console.log(parseInt("42", 10));      // 42
console.log(parseInt("42.99", 10));   // 42 (truncates decimal)
console.log(parseInt("hello", 10));   // NaN
console.log(parseInt("", 10));        // NaN

console.log(+"42");                   // 42
console.log(+"42.99");                // 42.99 (preserves decimal)
console.log(+"hello");                // NaN
const myString: string = "123";
const myNumber: number = parseInt(myString, 10);
