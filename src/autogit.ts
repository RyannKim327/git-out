/**
 * Checks whether the given string is a palindrome, ignoring case and
 * non‑alphanumeric characters.  It uses only constant extra space.
 *
 * @param s  The string to check.
 * @returns  true if `s` is a palindrome, false otherwise.
 */
function isPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Skip any *non*‑alphanumeric character on the left
    while (left < right && !isAlphaNum(s.charCodeAt(left))) {
      left++;
    }
    // Skip any *non*‑alphanumeric character on the right
    while (left < right && !isAlphaNum(s.charCodeAt(right))) {
      right--;
    }

    // If indices crossed after skipping, we're done
    if (left >= right) break;

    // Compare the characters case‑insensitively
    const leftChar = s.charCodeAt(left);
    const rightChar = s.charCodeAt(right);

    if (normalize(leftChar) !== normalize(rightChar)) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

/**
 * Helper to test whether a character code is alphanumeric.
 */
function isAlphaNum(code: number): boolean {
  // 0-9
  if (code >= 48 && code <= 57) return true;
  // A-Z
  if (code >= 65 && code <= 90) return true;
  // a-z
  if (code >= 97 && code <= 122) return true;
  return false;
}

/**
 * Normalises a character code to be lowercase ASCII when possible.
 * For Unicode other than ASCII it simply returns the original code.
 */
function normalize(code: number): number {
  // Convert uppercase A-Z to lowercase a-z
  if (code >= 65 && code <= 90) {
    return code + 32;
  }
  return code;
}
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car"));                      // false
console.log(isPalindrome("   abcba   "));                     // true
