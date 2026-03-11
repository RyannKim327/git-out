/**
 * Return true if `s` is a palindrome (case‑insensitive, alphanumeric only).
 * Works in O(n) time and O(1) extra space.
 */
function isPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  // helper: is the char code an ASCII alphanumeric?
  const isAlnum = (c: number) =>
    (c >= 48 && c <= 57) ||        // 0‑9
    (c >= 65 && c <= 90) ||        // A‑Z
    (c >= 97 && c <= 122);         // a‑z

  // helper: convert ASCII letter to its uppercase equivalent
  const toUpper = (c: number) => (c >= 97 && c <= 122) ? (c - 32) : c;

  while (left < right) {
    // skip non‑alphanumeric characters on the left
    while (left < right && !isAlnum(s.charCodeAt(left))) left++;
    // skip non‑alphanumeric characters on the right
    while (left < right && !isAlnum(s.charCodeAt(right))) right--;

    if (left >= right) break;

    // compare the two characters after normalizing to uppercase
    if (toUpper(s.charCodeAt(left)) !== toUpper(s.charCodeAt(right))) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

/* ---------- demo ---------- */
const tests = [
  "A man, a plan, a canal: Panama",
  "race a car",
  "No 'x' in Nixon",
  "MadamInEdenImAdam",
];

tests.forEach(t => {
  console.log(`"${t}" → ${isPalindrome(t)}`);
});
