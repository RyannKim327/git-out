function isPalindrome(s: string): boolean {
  // 1. Normalise: lower‑case, trim, and strip non‑alphanumerics
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');

  // 2. Compare with its reverse
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}
console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome('Racecar'));                          // true
console.log(isPalindrome('Hello'));                            // false
function isPalindromeTwoPointer(s: string): boolean {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }
  return true;
}
