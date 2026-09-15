/**
 * Returns true if `s` is a palindrome.
 *
 * Works in O(n) time and O(1) additional space.
 * Handles the string exactly as it is provided (case‑sensitive, all characters counted).
 */
function isPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

// Demo
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false
function isAlphanumeric(c: string): boolean {
  const code = c.charCodeAt(0);
  return (
    // 0‑9
    (code >= 48 && code <= 57) ||
    // A‑Z
    (code >= 65 && code <= 90) ||
    // a‑z
    (code >= 97 && code <= 122)
  );
}

function isPalindromeLoose(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Skip non‑alphanumerics
    while (left < right && !isAlphanumeric(s[left])) left++;
    while (left < right && !isAlphanumeric(s[right])) right--;

    // After skipping, compare lowercase versions
    if (
      left < right &&
      s[left].toLowerCase() !== s[right].toLowerCase()
    ) {
      return false;
    }

    left++;
    right--;
  }
  return true;
}

console.log(isPalindromeLoose("A man, a plan, a canal: Panama")); // true
