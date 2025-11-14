const str = "42";
const num = parseInt(str, 10);
console.log(num); // 42

// With type annotation
const numTyped: number = parseInt(str, 10);
const str = "42";
const num = +str;
console.log(num); // 42

// With type annotation
const numTyped: number = +str;
const str = "42";
const num = Number(str);
console.log(num); // 42

// With type annotation
const numTyped: number = Number(str);
const str = "42.7";
const num = Math.floor(Number(str));
console.log(num); // 42
// Examples with different inputs
console.log(parseInt("123abc", 10));    // 123
console.log(parseInt("abc123", 10));    // NaN
console.log(+"123abc");                 // NaN
console.log(Number("123.45"));          // 123.45

// Type-safe approach with validation
function safeStringToInt(str: string): number | null {
    const num = parseInt(str, 10);
    return isNaN(num) ? null : num;
}

const result = safeStringToInt("42");   // 42
const invalid = safeStringToInt("abc"); // null
