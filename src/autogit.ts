function reverseString(s: string): string {
  return s.split('').reverse().join('');
}

// Example
console.log(reverseString('hello')); // 'olleh'
reverseString('👋🏽'); // '🏽👋'  → wrong
function reverseStringUnicode(s: string): string {
  const codePoints: number[] = [];
  for (const char of s) {
    codePoints.push(char.codePointAt(0)!);
  }
  return String.fromCodePoint(...codePoints.reverse());
}

// Example
console.log(reverseStringUnicode('👋🏽')); // '🏽👋'
const cp = Array.from(s).reverse().join('');
function reverseRecursively(s: string): string {
  if (s.length <= 1) return s;
  return reverseRecursively(s.slice(1)) + s[0];
}
function reverseLoop(s: string): string {
  let result = '';
  for (let i = s.length - 1; i >= 0; i--) {
    result += s[i];
  }
  return result;
}
function reverseBuffer(s: string): string {
  const buf: string[] = new Array(s.length);
  for (let i = 0; i < s.length; i++) {
    buf[i] = s[s.length - 1 - i];
  }
  return buf.join('');
}
function reverseStringSafe(s: string): string {
  return Array.from(s).reverse().join('');
}
