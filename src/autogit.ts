function isPalindrome(str: string): boolean {
  // Normalise: lowercase + remove all non‑alphanumerics (e.g. spaces, punctuation)
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Compare the cleaned string to its reverse
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}
console.log(isPalindrome('Racecar'));          // true
console.log(isPalindrome('No lemon, no melon!')); // true
console.log(isPalindrome('Hello, world'));     // false
function isPalindromeTwoPointer(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');

  let left = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}
function isPalindromeSafe(input: unknown): boolean {
  if (typeof input !== 'string') return false;
  return isPalindrome(input);
}
