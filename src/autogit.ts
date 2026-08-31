// 1. Using the Number constructor
const val1 = Number("42");          // 42

// 2. Using unary plus
const val2 = +"42";                 // 42

// 3. Using parseInt (base 10 recommended)
const val3 = parseInt("42", 10);    // 42

// 4. Using parseFloat for decimals
const val4 = parseFloat("3.14");    // 3.14
function safeParse(str: string): number | null {
  const n = Number(str);
  return Number.isNaN(n) ? null : n;
}
const i = Math.floor(parseFloat("3.9")); // 3
