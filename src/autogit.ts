/**
 * Checks whether a string is a palindrome (case‑insensitive,
 * ignoring anything that isn’t a letter or a digit).
 *
 * Time   : O(n)
 * Space  : O(1)   – only a couple of integer variables
 */
function isPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  const isAlnum = (ch: string): boolean => {
    const code = ch.charCodeAt(0);
    // '0'‑'9'
    if (code >= 48 && code <= 57) return true;
    // 'A'‑'Z'
    if (code >= 65 && code <= 90) return true;
    // 'a'‑'z'
    if (code >= 97 && code <= 122) return true;
    return false;
  };

  while (left < right) {
    // Skip non‑alphanumeric characters from the left
    while (left < right && !isAlnum(s[left])) left++;
    // Skip non‑alphanumeric characters from the right
    while (left < right && !isAlnum(s[right])) right--;

    if (left >= right) break;          // Nothing left to compare

    const lc = s[left].toLowerCase();
    const rc = s[right].toLowerCase();

    if (lc !== rc) return false;

    left++;
    right--;
  }

  return true;
}
while (left < right) {
  if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
  left++;
  right--;
}
return true;
