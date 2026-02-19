// 1️⃣  The classic parseInt – give the radix to avoid surprises
const str = "42";
const num = parseInt(str, 10);   // 42
// 2️⃣  The Number constructor – works for floats, hex, etc.
const num2 = Number(str);        // 42
// 3️⃣  Unary plus – the shorthand for Number()
const num3 = +str;               // 42
function toInt(str: string): number | undefined {
  const n = Number(str);
  return Number.isNaN(n) ? undefined : Math.floor(n);
}
