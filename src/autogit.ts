const str = "42";
const num: number = Number(str);   // 42
const hex = "ff";
const num = parseInt(hex, 16);     // 255
const input = "abc";
const n = Number(input);   // NaN
if (Number.isNaN(n)) {
  // handle bad input
}
const age = Number(userInput) || 0;   // 0 if conversion fails
