const str = "42";

// 1) Fastest, works for base-10 only
const n1: number = Number(str);          // 42

// 2) Lets you specify the radix
const n2: number = parseInt(str, 10);    // 42

// 3) If you need an actual TypeScript `number` type, both already give it.
const bad = Number("abc");  // NaN
if (Number.isNaN(bad)) {
  // handle invalid input
}
