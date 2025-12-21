function isPalindrome(str: string): boolean {
  const normalised = str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');      // keep only letters & digits
  return normalised === [...normalised].reverse().join('');
}

/* ---- usage ---- */
console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome('racecar'));                         // true
console.log(isPalindrome('hello'));                          // false
const isPalindromeRaw = (s: string) => s === [...s].reverse().join('');
