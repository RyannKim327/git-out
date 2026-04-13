const str = "123";
const num = Number(str);   // 123 as a number
const num = +str;          // 123
const num = parseInt(str, 10);   // 123
const big = BigInt(str);   // e.g., "9007199254740991" → 9007199254740991n
function toInteger(value: string): number | null {
  const n = Number(value);
  if (Number.isNaN(n)) return null; // or throw
  return n;
}
