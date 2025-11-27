function isPalindrome(str: string): boolean {
  // Remove non-alphanumeric characters and convert to lowercase
  const sanitized = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  // Compare the sanitized string with its reverse
  return sanitized === sanitized.split("").reverse().join("");
}

// Examples:
console.log(isPalindrome("A man, a plan, a canal, Panama")); // true
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello world")); // false
function isPalindromeStrict(str: string): boolean {
  return str === str.split("").reverse().join("");
}
