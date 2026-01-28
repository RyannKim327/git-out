export function reverseString(s: string): string {
  return s.split('').reverse().join('');
}
export function reverseStringManual(s: string): string {
  let result = '';
  for (let i = s.length - 1; i >= 0; i--) {
    result += s[i];
  }
  return result;
}
export function reverseStringRecursive(s: string): string {
  if (s.length <= 1) return s;
  return reverseStringRecursive(s.slice(1)) + s[0];
}
export function reverseStringLoop(s: string): string {
  const chars = [...s];          // same as s.split('')
  for (let i = 0, j = chars.length - 1; i < j; i++, j--) {
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join('');
}
console.log(reverseString('hello'));          // 'olleh'
console.log(reverseStringManual('world'));    // 'dlrow'
console.log(reverseStringRecursive('TypeScript')); // 'tpircSepyT'
