function isPalindrome(str: string): boolean {
  // Preprocess: remove non-alphanumeric characters and convert to lowercase
  const cleaned = str.replace(/[\W_]/g, '').toLowerCase();
  
  // Check against the reversed string
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("racecar"));                        // true
console.log(isPalindrome("hello"));                          // false
console.log(isPalindrome(""));                               // true (empty string edge case)
function isPalindrome(str: string): boolean {
  const cleaned = str.replace(/[\W_]/g, '').toLowerCase();
  let left = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }
  return true;
}
