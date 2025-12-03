function isPalindrome(str: string): boolean {
  const normalized = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return normalized === normalized.split('').reverse().join('');
}
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("TypeScript")); // false
function isSimplePalindrome(str: string): boolean {
  return str === str.split('').reverse().join('');
}
