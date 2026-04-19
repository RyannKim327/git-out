/**
 * Return true if `text` is a palindrome.
 *
 * The function walks from both ends towards the middle, comparing matching
 * characters.  It never creates an auxiliary string or array, so the
 * extra space cost is O(1).
 *
 * Options:
 *   - ignoreCase:   treat 'A' and 'a' as the same (default true)
 *   - ignoreNonAlpha: strip out anything that isn’t a letter or digit (default true)
 */
function isPalindrome(
  text: string,
  ignoreCase = true,
  ignoreNonAlpha = true
): boolean {
  let left = 0;
  let right = text.length - 1;

  while (left < right) {
    // Skip unwanted characters on the left
    while (
      left < right &&
      (ignoreNonAlpha ? !isAlphaNumeric(text[left]) : false)
    ) {
      left++;
    }

    // Skip unwanted characters on the right
    while (
      left < right &&
      (ignoreNonAlpha ? !isAlphaNumeric(text[right]) : false)
    ) {
      right--;
    }

    // Compare the two characters
    const leftCh  = ignoreCase ? text[left].toLowerCase() : text[left];
    const rightCh = ignoreCase ? text[right].toLowerCase() : text[right];

    if (leftCh !== rightCh) return false;

    left++;
    right--;
  }

  return true;
}

function isAlphaNumeric(ch: string): boolean {
  const code = ch.charCodeAt(0);
  // '0'-'9' => 48-57, 'A'-'Z' => 65-90, 'a'-'z' => 97-122
  return (
    (code >= 48 && code <= 57) ||
    (code >= 65 && code <= 90) ||
    (code >= 97 && code <= 122)
  );
}
console.log(isPalindrome("Was it a rat I saw?")); // true
console.log(isPalindrome("No 'x' in Nixon"));     // true
console.log(isPalindrome("Hello"));                // false
