const str: string = "123";
const num: number = parseInt(str, 10); // Result: 123 (number)
const str: string = "42";
const num: number = Number(str); // Result: 42 (number)
const str: string = "999";
const num: number = +str; // Result: 999 (number)
function convertToInt(input: string): number | null {
  const num = parseInt(input, 10);
  return isNaN(num) ? null : num; // Return null if conversion fails
}

// Usage:
const result = convertToInt("456");
if (result !== null) {
  console.log("Success:", result); // Output: Success: 456 (number)
}
