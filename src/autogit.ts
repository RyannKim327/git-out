const str = "42";
const n: number = Number(str);   // 42
// or
const n2: number = +str;        // 42 (unary plus)
const hex = "ff";
const n = parseInt(hex, 16);     // 255
const str = "123abc";
const n = Number(str);           // NaN
const safe = Number.isNaN(n) ? 0 : n; // 0
const str = "3.14";
const int = Number.parseInt(str, 10); // 3
// or
const int2 = Math.trunc(Number(str)); // 3
