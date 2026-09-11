/**
 * Returns true if `text` reads the same forward and backward.
 * By default it is case‑sensitive and includes every character.
 *
 * @param text The string to check.
 * @param opts  Optional settings:
 *   - `ignoreCase`:   true to compare lowercase strings (default: false)
 *   - `ignoreSpaces`: true to skip whitespace (default: false)
 *   - `ignoreNonAlnum`: true to skip anything that is not a letter or digit (default: false)
 */
export function isPalindrome(
  text: string,
  opts?: { ignoreCase?: boolean; ignoreSpaces?: boolean; ignoreNonAlnum?: boolean }
): boolean {
  const { ignoreCase = false, ignoreSpaces = false, ignoreNonAlnum = false } = opts || {};

  // Prepare the string based on options
  let processed = ignoreCase ? text.toLowerCase() : text;

  if (ignoreSpaces) processed = processed.replace(/\s+/g, '');
  if (ignoreNonAlnum) processed = processed.replace(/[^a-z0-9]/gi, '');

  // Compare forward and reversed
  const reversed = processed.split('').reverse().join('');
  return processed === reversed;
}
console.log(isPalindrome('radar'));          // true
console.log(isPalindrome('Radar'));          // false
console.log(isPalindrome('Radar', { ignoreCase: true })); // true
console.log(isPalindrome('A man, a plan, a canal: Panama', { ignoreCase: true, ignoreNonAlnum: true })); // true
const isPal = (s: string) =>
  (s = s.replace(/[^a-z0-9]/gi, '').toLowerCase()).split('').reverse().join('') === s;
const examples = [
  'racecar',
  'RaceCar',
  'A man, a plan, a canal: Panama',
  'No lemon, no melon',
  'Hello, world!',
];

for (const ex of examples) {
  console.log(`${ex.padEnd(30)} → ${isPalindrome(ex, { ignoreCase: true, ignoreNonAlnum: true })}`);
}
