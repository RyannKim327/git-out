const str = "42";
const num: number = parseInt(str, 10); // 10 = radix (decimal)
const str = "42";
const num: number = Number(str);   // or: const num = +str;
const str = "42.9";
const intNum: number = Math.trunc(Number(str)); // 42
// or Math.floor if you always want to round down (even for negatives)
function toInt(value: string, radix: number = 10): number | null {
  const parsed = parseInt(value, radix);
  return isNaN(parsed) ? null : parsed;
}

// Usage
const maybeInt = toInt("123"); // number | null
if (maybeInt !== null) {
  // TypeScript now knows `maybeInt` is a number
  console.log(maybeInt * 2);
}
function toIntOrThrow(value: string, radix: number = 10): number {
  const parsed = parseInt(value, radix);
  if (isNaN(parsed)) {
    throw new Error(`"${value}" is not a valid integer`);
  }
  return parsed;
}
const str = "7" as const; // type is "7"
const num = Number(str); // type is 7 (numeric literal)
function safeParseInt(value: string, radix: number = 10): number {
  const trimmed = value.trim();          // remove surrounding whitespace
  const result = parseInt(trimmed, radix);

  if (isNaN(result)) {
    throw new Error(`Unable to parse integer from "${value}"`);
  }

  return result;
}

// Demo
try {
  const a = safeParseInt("  123  "); // 123
  const b = safeParseInt("42abc");   // throws
  console.log(a, b);
} catch (e) {
  console.error(e.message);
}
const intFromString = (s: string): number => parseInt(s, 10);
// or, if you need strict conversion:
const intFromStringStrict = (s: string): number => {
  const n = Number(s);
  if (isNaN(n)) throw new Error(`Invalid number: ${s}`);
  return Math.trunc(n);
};
