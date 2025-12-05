const str = "123";
const num = parseInt(str, 10); // 123 (number)
const str = "123.5";
const num = Math.floor(Number(str)); // 123 (integer)
// const num = Number(str); // 123.5 (not an integer)
const str = "123";
const num = +str; // 123 (number)
function convertToInteger(input: string): number {
  const value = parseInt(input, 10);
  if (isNaN(value)) {
    throw new Error("Invalid integer format");
  }
  return value;
}

const result = convertToInteger("456"); // 456 (number)
