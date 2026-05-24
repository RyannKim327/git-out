function isPalindrome(s: string): boolean {
  // Two‑pointer scan from both ends
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Compare the characters at the two pointers
    if (s.charAt(left) !== s.charAt(right)) {
      return false;          // mismatch found – not a palindrome
    }
    left++;
    right--;
  }

  return true;                 // all mirrored pairs matched
}
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false
console.log(isPalindrome(""));        // true (empty string is a palindrome)
