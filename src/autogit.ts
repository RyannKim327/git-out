const raw: string = "42";
const value: number = parseInt(raw, 10); // 10 = radix (decimal)
const raw: string = "42";
const value: number = Number(raw);   // or: const value = +raw;
const raw: string = "42.9";
const intValue: number = Math.trunc(Number(raw)); // 42
const raw: string = "9007199254740993"; // > Number.MAX_SAFE_INTEGER
const big: bigint = BigInt(raw); // 9007199254740993n
function toInt(value: string, radix: number = 10): number {
  const parsed = parseInt(value, radix);
  if (Number.isNaN(parsed)) {
    throw new Error(`Cannot convert "${value}" to an integer`);
  }
  return parsed;
}

// Usage
const age: number = toInt("27"); // 27
function isInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value);
}

const raw = "123";
const maybeInt = Number(raw);

if (isInteger(maybeInt)) {
  // TypeScript now knows `maybeInt` is a number and an integer
  const intValue: number = maybeInt;
}
/**
 * Safely converts a string to an integer.
 * Returns `null` if conversion fails.
 */
function safeParseInt(str: string, radix: number = 10): number | null {
  // Trim whitespace first (optional but common)
  const trimmed = str.trim();

  // Fast path: reject empty strings
  if (trimmed === "") return null;

  const num = parseInt(trimmed, radix);
  return Number.isNaN(num) ? null : num;
}

// Demo
const inputs = ["42", "  7  ", "12px", "foo", "3.14", "9007199254740993"];

for (const s of inputs) {
  const result = safeParseInt(s);
  console.log(`"${s}" →`, result);
}

/* Output:
"42" → 42
"  7  " → 7
"12px" → 12
"foo" → null
"3.14" → 3
"9007199254740993" → 9007199254740993
*/
const str = "123";

// Preferred, explicit radix:
const int1: number = parseInt(str, 10);

// Strict conversion (fails on any non‑numeric chars):
const int2: number = Number(str); // or: const int2 = +str;

// If you need a bigint:
const big: bigint = BigInt(str);
