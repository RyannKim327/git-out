function reverseWords(str: string): string {
  // 1️⃣  Trim leading/trailing spaces
  // 2️⃣  Split on any amount of whitespace
  // 3️⃣  Reverse the array
  // 4️⃣  Join back with a single space
  return str.trim().split(/\s+/).reverse().join(' ');
}
console.log(reverseWords("  the quick   brown fox  "));
// → "fox brown quick the"
const r = (s: string) => s.trim().split(/\s+/).reverse().join(' ');
