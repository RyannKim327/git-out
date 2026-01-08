const str = "123";

// 1. Number() – safest for pure integers
const n1: number = Number(str);          // 123
// const bad = Number("abc");          // NaN

// 2. parseInt – allows a radix and ignores trailing garbage
const n2: number = parseInt(str, 10);   // 123
// const partial = parseInt("123px", 10); // 123

// 3. parseFloat – if you need decimals
const n3: number = parseFloat("123.45"); // 123.45

// 4. Unary plus (shorthand, same as Number)
const n4: number = +str;                 // 123
