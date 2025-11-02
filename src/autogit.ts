const str = "123";
const num = parseInt(str, 10); // Base 10
console.log(num); // 123

// With error handling
const safeNum = parseInt(str, 10);
if (isNaN(safeNum)) {
    // Handle invalid input
}
const str = "123";
const num = +str;
console.log(num); // 123
const str = "123";
const num = Number(str);
console.log(num); // 123
const str = "123";
const num = str as unknown as number; // Not recommended for runtime conversion
function stringToInt(str: string): number | null {
    const num = parseInt(str, 10);
    return isNaN(num) ? null : num;
}

const result = stringToInt("123"); // 123
const invalid = stringToInt("abc"); // null
