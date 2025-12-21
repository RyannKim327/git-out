const str = "42";
const num = parseInt(str, 10);   // 10 = radix (base) for decimal
function toInt(value: string, fallback = 0): number {
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? fallback : parsed;
}
const str = "42.9";
const num = Math.trunc(Number(str)); // 42
// or using the unary plus:
const num2 = Math.trunc(+str);       // 42
const num = Number.parseInt("123", 10);
function toInteger(value: string): number {
  const result = Number(value);
  if (!Number.isFinite(result) || !Number.isInteger(result)) {
    throw new Error(`"${value}" is not a valid integer`);
  }
  return result;
}

// Example usage:
const id = toInteger("1001"); // 1001 (type: number)
function tryParseInt(value: string): number | undefined {
  const n = Number(value);
  return Number.isInteger(n) ? n : undefined;
}
// utils.ts
export function safeParseInt(
  value: string,
  options?: { fallback?: number; radix?: number }
): number {
  const radix = options?.radix ?? 10;
  const fallback = options?.fallback ?? 0;

  const parsed = parseInt(value, radix);
  return isNaN(parsed) ? fallback : parsed;
}

// usage.ts
import { safeParseInt } from "./utils";

const rawId = "007";
const userId = safeParseInt(rawId, { fallback: -1 }); // 7

const rawScore = "12.34";
const score = Math.trunc(Number(rawScore)); // 12

// Validation example
function setAge(ageStr: string) {
  const age = safeParseInt(ageStr);
  if (age < 0) throw new Error("Age cannot be negative");
  // … now `age` is a proper integer
}
function stringToInt(
  s: string,
  fallback = 0,
  radix = 10
): number {
  const n = parseInt(s, radix);
  return isNaN(n) ? fallback : n;
}

// Example
console.log(stringToInt("42"));          // 42
console.log(stringToInt("42.9"));        // 42 (fallback not used because parseInt stops at '.')
console.log(stringToInt("not a number", -1)); // -1
