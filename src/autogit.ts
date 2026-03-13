function isPalindrome(str: string): boolean {
  // Compare the string to its reverse
  const reversed = str.split('').reverse().join('');
  return str === reversed;
}

// Examples
console.log(isPalindrome('radar'));   // true
console.log(isPalindrome('hello'));   // false
function isPalindromeCI(str: string): boolean {
  const normalized = str.toLowerCase();          // make everything lowercase
  return normalized === normalized.split('').reverse().join('');
}

console.log(isPalindromeCI('Radar'));   // true
console.log(isPalindromeCI('Racecar')); // true
function isPalindromeClean(str: string): boolean {
  const cleaned = str
    .replace(/[^a-z0-9]/gi, '')      // strip non-alphanumerics
    .toLowerCase();                  // normalize case
  
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}

console.log(isPalindromeClean('A man, a plan, a canal: Panama')); // true
function isPalindromeTwoPointer(str: string): boolean {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}

console.log(isPalindromeTwoPointer('radar')); // true
