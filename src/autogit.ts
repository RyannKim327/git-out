// Helper that normalises the string – handy if you want to ignore
// spaces, punctuation, and case.
function normalise(text: string): string {
  return text
    .toLowerCase()         // ignore case
    .replace(/[^a-z0-9]/g, '');  // keep only alphanumerics
}

/**
 * Returns true if `input` is a palindrome.
 *
 * @param input – the string you want to test
 * @param {boolean} allowEmpty = false  – whether an empty string is considered a palindrome
 */
function isPalindrome(
  input: string,
  allowEmpty = false,
): boolean {
  // Fast‑path for empty string
  if (input.length === 0) return allowEmpty;

  const s = normalise(input);

  // Empty after normalisation may be true or false – decide here
  if (s.length === 0) return false;

  // Compare characters from both ends
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }

  return true;
}

// Demo
console.log(isPalindrome('RaceCar'));           // true
console.log(isPalindrome('A man, a plan!'));    // true
console.log(isPalindrome('hello world'));       // false
