function isPalindromeStrict(s: string): boolean {
  let i = 0;
  let j = s.length - 1;
  while (i < j) {
    if (s[i] !== s[j]) return false;
    i++;
    j--;
  }
  return true;
}
type PalOptions = {
  caseSensitive?: boolean;          // default: false
  ignoreNonAlphanumeric?: boolean;   // default: false
};

function isPalindrome(
  s: string,
  options: PalOptions = {}
): boolean {
  const { caseSensitive = false, ignoreNonAlphanumeric = false } = options;

  // Build a list of characters to consider
  let chars: string[] = Array.from(s);

  if (ignoreNonAlphanumeric) {
    // ASCII alphanumeric; adjust if you want Unicode letters/digits
    chars = chars.filter(ch => /[A-Za-z0-9]/.test(ch));
  }

  if (!caseSensitive) {
    chars = chars.map(ch => ch.toLowerCase());
  }

  // Two-pointer check
  let left = 0;
  let right = chars.length - 1;
  while (left < right) {
    if (chars[left] !== chars[right]) return false;
    left++;
    right--;
  }
  return true;
}
isPalindrome("Racecar"); // false (case-sensitive)
isPalindrome("Racecar", { caseSensitive: false }); // true

isPalindrome("A man, a plan, a canal: Panama", { ignoreNonAlphanumeric: true, caseSensitive: false }); // true
function isPalindromeSimple(s: string): boolean {
  return s === [...s].reverse().join('');
}
