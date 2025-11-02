function isPalindromeBasic(str: string): boolean {
  const reversedStr = str.split('').reverse().join('');
  return str === reversedStr;
}

// Examples:
console.log("Basic checks:");
console.log(`"madam": ${isPalindromeBasic("madam")}`);     // true
console.log(`"Madam": ${isPalindromeBasic("Madam")}`);     // false (M != m)
console.log(`"hello": ${isPalindromeBasic("hello")}`);     // false
console.log(`"" (empty string): ${isPalindromeBasic("")}`); // true (empty string is a palindrome)
console.log(`"a": ${isPalindromeBasic("a")}`);             // true
console.log(`"ab": ${isPalindromeBasic("ab")}`);           // false
function isPalindromeRobust(str: string): boolean {
  // 1. Normalize the string:
  //    - Convert to lowercase
  //    - Remove all non-alphanumeric characters (letters a-z, numbers 0-9)
  const normalizedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');

  // 2. Reverse the normalized string
  const reversedNormalizedStr = normalizedStr.split('').reverse().join('');

  // 3. Compare the normalized string with its reversed version
  return normalizedStr === reversedNormalizedStr;
}

// Examples:
console.log("\nRobust checks:");
console.log(`"madam": ${isPalindromeRobust("madam")}`);                           // true
console.log(`"Madam": ${isPalindromeRobust("Madam")}`);                           // true
console.log(`"A man, a plan, a canal: Panama": ${isPalindromeRobust("A man, a plan, a canal: Panama")}`); // true
console.log(`"No lemon, no melon": ${isPalindromeRobust("No lemon, no melon")}`); // true
console.log(`"RaceCar": ${isPalindromeRobust("RaceCar")}`);                     // true
console.log(`"hello": ${isPalindromeRobust("hello")}`);                           // false
console.log(`"12321": ${isPalindromeRobust("12321")}`);                           // true
console.log(`"123. 321": ${isPalindromeRobust("123. 321")}`);                       // true
function isPalindromeTwoPointers(str: string): boolean {
  // 1. Normalize the string (same as robust check)
  const normalizedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');

  // 2. Initialize two pointers: one at the beginning, one at the end
  let left = 0;
  let right = normalizedStr.length - 1;

  // 3. Loop while the left pointer is less than the right pointer
  while (left < right) {
    // If characters at the pointers don't match, it's not a palindrome
    if (normalizedStr[left] !== normalizedStr[right]) {
      return false;
    }
    // Move pointers inwards
    left++;
    right--;
  }

  // If the loop completes, all characters matched, so it's a palindrome
  return true;
}

// Examples (will give same results as robust checks):
console.log("\nTwo-pointer checks:");
console.log(`"madam": ${isPalindromeTwoPointers("madam")}`);                           // true
console.log(`"A man, a plan, a canal: Panama": ${isPalindromeTwoPointers("A man, a plan, a canal: Panama")}`); // true
console.log(`"hello": ${isPalindromeTwoPointers("hello")}`);                           // false
