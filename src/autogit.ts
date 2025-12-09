function isPalindrome(str: string): boolean {
  // Remove non-alphanumeric characters and convert to lowercase
  const cleaned = str.replace(/[\W_]/g, '').toLowerCase();
  // Reverse the cleaned string and compare
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}
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
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("racecar"));                        // true
console.log(isPalindrome("hello"));                          // false
