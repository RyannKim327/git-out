const str = "42";

// 1. Fastest / most idiomatic
const n1: number = Number(str);   // 42

// 2. When you explicitly want an integer from a string that might contain decimals
const n2: number = parseInt(str, 10); // 42

// 3. If you need to be sure the string is a valid integer
const n3: number = parseInt(str, 10);
if (isNaN(n3)) {
  throw new Error("Not an integer");
}
