function reverseString(str: string): string {
  return str.split('').reverse().join('');
}
function reverseUnicodeString(str: string): string {
  const chars: string[] = [];
  for (const ch of str) {
    chars.unshift(ch);            // add each code‑point to the front
  }
  return chars.join('');
}
function reverseStringLoop(str: string): string {
  const buf = str.split('');
  let i = 0;
  let j = buf.length - 1;
  while (i < j) {
    [buf[i], buf[j]] = [buf[j], buf[i]]; // swap
    ++i;
    --j;
  }
  return buf.join('');
}
function reverseFunctional(str: string): string {
  return [...str].reduceRight((acc, char) => acc + char, '');
}
function reverseStringFast(str: string): string {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}
const raw = 'Hello, 🌍!';
console.log(reverseString(raw));           // "!🌍 ,olleH"
console.log(reverseUnicodeString(raw));    // same, but safely handles 🌍
