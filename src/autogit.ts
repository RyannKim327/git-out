function isPalindrome(str: string): boolean {
  const sanitized = str.toLowerCase();              // ignore case
  const reversed  = sanitized.split('').reverse().join('');
  return sanitized === reversed;
}
console.log(isPalindrome('RaceCar'));      // true
console.log(isPalindrome('hello'));        // false
function isPalindromePortable(str: string): boolean {
  const cleaned = str.replace(/[^a-z0-9]/gi, '').toLowerCase();
  const left = 0;
  const right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }

  return true;
}
console.log(isPalindromePortable('A man, a plan, a canal: Panama')); // true
console.log(isPalindromePortable('No lemon, no melon'));            // true
console.log(isPalindromePortable('Hello, world!'));                 // false
const isPalindromeFancy = (s: string) =>
  [...s.replace(/[^a-z0-9]/gi, '')].map(c => c.toLowerCase()).join('') ===
  [...s.replace(/[^a-z0-9]/gi, '')].map(c => c.toLowerCase()).reverse().join('');
export { isPalindrome, isPalindromePortable };
