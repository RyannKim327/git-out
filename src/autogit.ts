const str = "42";
const num = parseInt(str, 10);  // 42
parseInt("42 apples", 10);  // 42
parseInt("  42", 10);       // 42
parseInt("apple 42", 10);   // NaN
const s = "42";
const n1 = Number(s);   // 42
const n2 = +s;          // 42
Number("3.14");   // 3.14
Number.parseFloat("3.14");  // 3.14
function toInt(value: string): number | null {
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) return null;
  return parsed;
}

const x = toInt("foo"); // null
const y = toInt("12");  // 12
const hex = "0xFF";
const oct = "0o77";

Number(hex);   // 255
Number(oct);   // 63

parseInt(hex, 16);  // 255
