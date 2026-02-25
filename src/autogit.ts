/**
 * Checks if a string is a palindrome.
 *
 * @param txt          The input string to test.
 * @param options      Optional flags.
 * @returns            true if the cleaned string reads the same forwards and backwards.
 */
export function isPalindrome(
  txt: string,
  options?: {
    /** When true (default), the check is case‑insensitive. */
    ignoreCase?: boolean;
    /** When true (default), only alphanumeric characters are considered. */
    stripNonAlnum?: boolean;
    /** When true, normalises Unicode to NFKD form before the checks. */
    normalize?: boolean;
  } = {}
): boolean {
  const {
    ignoreCase = true,
    stripNonAlnum = true,
    normalize = true,
  } = options;

  let processed = txt;

  if (normalize) {
    // This collapse accents, e.g. "café" ➜ "cafe".
    processed = processed.normalize('NFKD');
  }

  if (stripNonAlnum) {
    processed = processed.replace(/[^0-9a-z]+/gi, '');
  }

  if (ignoreCase) {
    processed = processed.toLowerCase();
  }

  const reversed = processed.split('').reverse().join('');
  return processed === reversed;
}
console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome('Madam In Eden, I’m Adam'));          // true
console.log(isPalindrome('Hello, world!'));                    // false
