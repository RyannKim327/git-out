/**
 * Returns true if `s` is a palindrome, otherwise false.
 * Handles case‑sensitivity and ignores anything that is not a
 * letter or digit (you can drop that part if you need a stricter check).
 *
 * No string‑to‑array conversion, no stack, no helper string – just two indices.
 */
function isPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Skip characters that aren’t alphanumeric
    while (left < right && !isAlnum(s.charAt(left))) left++;
    while (left < right && !isAlnum(s.charAt(right))) right--;

    // Compare after normalising case
    if (left < right && s.charAt(left).toLowerCase() !== s.charAt(right).toLowerCase())
      return false;

    left++;
    right--;
  }
  return true;
}

function isAlnum(ch: string): boolean {
  const code = ch.charCodeAt(0);
  // 0-9
  if (code >= 48 && code <= 57) return true;
  // A-Z
  if (code >= 65 && code <= 90) return true;
  // a-z
  if (code >= 97 && code <= 122) return true;
  return false;
}

// Example:
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car"));                      // false
