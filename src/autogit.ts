/**
 * Returns true if `s` is a palindrome when
 *   – case is ignored
 *   – all characters that are not letters or digits are ignored
 *
 * Runs in O(n) time and O(1) extra space.
 */
export function isPalindrome(s: string): boolean {
  // Helper: fast check for ASCII alphanumerics.
  // (If you need full Unicode alphanumerics, replace with a RegExp test,
  //  but that would allocate a temporary RegExp object – still O(1) overall.)
  const isAlphaNumeric = (c: string): boolean => {
    const code = c.charCodeAt(0);
    // 0‑9
    if (code >= 48 && code <= 57) return true;
    // A‑Z
    if (code >= 65 && code <= 90) return true;
    // a‑z
    if (code >= 97 && code <= 122) return true;
    return false;
  };

  // Two‑pointer indices: left starts at the first character,
  // right starts at the last character.
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Move `left` forward until it points to an alphanumeric char
    while (left < right && !isAlphaNumeric(s[left])) left++;

    // Move `right` backward until it points to an alphanumeric char
    while (left < right && !isAlphaNumeric(s[right])) right--;

    // At this point both s[left] and s[right] are alphanumeric (or we crossed)
    if (left >= right) break; // nothing left to compare

    // Compare case‑insensitively.
    // Using `toLowerCase()` on a single character creates a temporary string,
    // but that temporary lives on the stack and does **not** count as extra
    // space proportional to the input size.
    const leftChar = s[left].toLowerCase();
    const rightChar = s[right].toLowerCase();

    if (leftChar !== rightChar) {
      return false; // mismatch → not a palindrome
    }

    // Advance both pointers for the next pair
    left++;
    right--;
  }

  // All pairs matched
  return true;
}
export function isStrictPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}
const isAlphaNumeric = (c: string): boolean => /\p{L}|\p{N}/u.test(c);
export function isPalindromeFast(s: string): boolean {
  const normalized = s.toLowerCase(); // O(n) time, O(n) temporary string (cannot be avoided)
  let left = 0;
  let right = normalized.length - 1;
  while (left < right) {
    if (normalized[left] !== normalized[right]) return false;
    left++;
    right--;
  }
  return true;
}
function test() {
  const cases: [string, boolean][] = [
    ["A man, a plan, a canal: Panama", true],
    ["racecar", true],
    ["RaceCar", true],
    ["No lemon, no melon", true],
    ["hello", false],
    ["", true],
    [" ", true],
    ["ab", false],
    ["Able was I ere I saw Elba", true],
  ];

  for (const [input, expected] of cases) {
    const result = isPalindrome(input);
    console.assert(
      result === expected,
      `FAIL: "${input}" → expected ${expected}, got ${result}`
    );
  }
  console.log("All tests passed!");
}
test();
