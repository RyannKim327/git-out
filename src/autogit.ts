// 1️⃣  The classic way – split the text into an array, reverse that array, then join it back together.
function reverseString1(s: string): string {
  return s.split('').reverse().join('');
}

// 2️⃣  For full Unicode safety you can build the array from code points instead of UTF‑16 units.
function reverseString2(s: string): string {
  return Array.from(s).reverse().join('');
}

// 3️⃣  A bit more manual but shows the underlying steps; handy if you want to tweak the logic.
function reverseString3(s: string): string {
  const out: string[] = [];
  for (let i = s.length - 1; i >= 0; i--) {
    out.push(s[i]);           // or use code points with s.codePointAt(i)
  }
  return out.join('');
}

// 4️⃣  One‑liner with a helper slice call (works well for ASCII).
const reverseString4 = (s: string) => s.split('').reverse().join('');
console.log(reverseString1('hello')); // 'olleh'
console.log(reverseString2('👍🏼👋')); // '👋🏼👍'
