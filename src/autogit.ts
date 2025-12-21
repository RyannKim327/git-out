function toInt(value: string, radix: number = 10): number {
  const result = parseInt(value, radix);
  if (isNaN(result)) {
    throw new Error(`"${value}" is not a valid integer`);
  }
  return result;
}

// Usage
const age: number = toInt("42");          // 42
const hex: number = toInt("ff", 16);      // 255
function strictToInt(value: string): number {
  // The unary plus is just a shorter syntax for Number(value)
  const result = +value; // or Number(value)

  // Ensure the result is an integer (no decimal part)
  if (!Number.isInteger(result)) {
    throw new Error(`"${value}" is not a valid integer`);
  }
  return result;
}

// Usage
const count = strictToInt("100");   // 100
// strictToInt("100.5"); // throws
// strictToInt("abc");   // throws
const n = Number.parseInt("123", 10); // 123
function safeToInt(value: string, fallback: number = 0, radix: number = 10): number {
  const parsed = parseInt(value, radix);
  return Number.isNaN(parsed) ? fallback : parsed;
}

// Example
const maybeId = safeToInt("abc", -1); // -1 (fallback)
function isIntegerString(val: unknown): val is string {
  return typeof val === "string" && /^\s*-?\d+\s*$/.test(val);
}

function toIntIfString(val: unknown): number | undefined {
  if (isIntegerString(val)) {
    return parseInt(val, 10);
  }
  return undefined; // or throw / fallback
}
// utils/number.ts
export class NumberUtil {
  /** Convert a string to an integer, throwing on failure. */
  static toInt(value: string, radix: number = 10): number {
    const n = parseInt(value, radix);
    if (Number.isNaN(n)) {
      throw new Error(`Invalid integer: "${value}"`);
    }
    return n;
  }

  /** Convert a string to an integer, returning a fallback on failure. */
  static safeToInt(value: string, fallback: number = 0, radix: number = 10): number {
    const n = parseInt(value, radix);
    return Number.isNaN(n) ? fallback : n;
  }

  /** Strict conversion that also checks for integerness. */
  static strictToInt(value: string): number {
    const n = Number(value);
    if (!Number.isInteger(n)) {
      throw new Error(`"${value}" is not an integer`);
    }
    return n;
  }
}
import { NumberUtil } from "./utils/number";

const id = NumberUtil.toInt("123");               // 123
const maybe = NumberUtil.safeToInt("xyz", -1);    // -1
const strict = NumberUtil.strictToInt("42");      // 42
// Most common, explicit, and safe:
const myInt: number = NumberUtil.toInt(myString);   // throws if invalid

// Or, if you want a fallback:
const myIntOrZero = NumberUtil.safeToInt(myString, 0);
