/** 
 * Returns true if `text` is a palindrome.
 * The check is:
 *   • case‑insensitive
 *   • ignores everything that’s not a letter or digit
 */
function isPalindrome(text: string): boolean {
  // 1. Normalise: remove non‑alphanumerics and lower‑case everything
  const cleaned = text.replace(/[^A-Za-z0-9]/g, '').toLowerCase();

  // 2. Compare the string with its reverse
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}

// Usage examples
console.log(isPalindrome('Racecar'));          // true
console.log(isPalindrome('A man, a plan...'));  // true
console.log(isPalindrome('Hello world'));      // false
function isPalindromeSimple(s: string): boolean {
  for (let i = 0, j = s.length - 1; i < j; i++, j--) {
    if (s[i] !== s[j]) return false;
  }
  return true;
}
