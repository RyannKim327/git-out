const str = "  123   ";

const num1 = Number(str);            // 123
const num2 = +'123';                 // 123
const num3 = parseInt(str, 10);      // 123
const num4 = parseFloat('123.45');   // 123.45
const num5 = str * 1;                // 123

console.log([num1, num2, num3, num4, num5]); // [123, 123, 123, 123.45, 123]
