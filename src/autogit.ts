function isPalindrome(s: string, ignoreCase = true, ignoreNonAlpha = false): boolean {
  // Normalise if requested
  const src = ignoreCase
    ? s.toLowerCase()
    : s;

  // Optionally strip out anything that isn’t a letter or a digit
  const text = ignoreNonAlpha
    ? src.replace(/[^a-z0-9]/gi, '')
    : src;

  let left = 0;
  let right = text.length - 1;

  while (left < right) {
    if (text[left] !== text[right]) return false;
    left++;
    right--;
  }
  return true;
}
console.log(isPalindrome('Racecar'));          // true
console.log(isPalindrome('A man, a plan!'));   // false
console.log(isPalindrome('A man, a plan!', true, true)); // true
function isPalindromeReverse(s: string, ignoreCase = true, ignoreNonAlpha = false): boolean {
  const cleaned = ignoreNonAlpha
    ? s.replace(/[^a-z0-9]/gi, '')
    : s;

  const cmp = ignoreCase ? cleaned.toLowerCase() : cleaned;
  const reversed = cmp.split('').reverse().join('');
  return cmp === reversed;
}
console.log(isPalindromeReverse('Madam In Eden, I’m Adam', true, true)); // true
const isPalindromeLazy = (s: string, ignoreCase = true, ignoreNonAlpha = false): boolean =>
  (ignoreNonAlpha ? s.replace(/[^a-z0-9]/gi, '') : s)
    .toLowerCase()
    .split('')
    .every((c, i, a) => c === a[a.length - i - 1]);
const tests = [
  { str: 'Radar', expect: true },
  { str: 'Madam Anna', expect: false },
  { str: 'Madam Anna', expect: true, options: { ignoreNonAlpha: true } },
  { str: '12321', expect: true },
  { str: 'Was it a cat I saw?', expect: true, options: { ignoreNonAlpha: true, ignoreCase: true } },
];

tests.forEach(({ str, expect, options }) => {
  const result = isPalindrome(str, ...(options ? [options.ignoreCase, options.ignoreNonAlpha] : []));
  console.assert(result === expect, `❌ ${str} should be ${expect}`);
});
