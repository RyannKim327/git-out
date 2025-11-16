function isPalindrome(s: string): boolean {
    // Step 1: Clean the string
    // Convert to lowercase and remove all non-alphanumeric characters
    const cleanedString = s.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Step 2: Reverse the cleaned string
    const reversedString = cleanedString.split('').reverse().join('');

    // Step 3: Compare the cleaned string with its reversed version
    return cleanedString === reversedString;
}

// --- Test Cases ---

console.log("Method 1 Examples:");
console.log(`"racecar" is a palindrome: ${isPalindrome("racecar")}`); // true
console.log(`"Racecar" is a palindrome: ${isPalindrome("Racecar")}`); // true (case-insensitive)
console.log(`"A man, a plan, a canal: Panama" is a palindrome: ${isPalindrome("A man, a plan, a canal: Panama")}`); // true (ignores spaces and punctuation)
console.log(`"hello" is a palindrome: ${isPalindrome("hello")}`); // false
console.log(`"Was it a car or a cat I saw?" is a palindrome: ${isPalindrome("Was it a car or a cat I saw?")}`); // true
console.log(`"" (empty string) is a palindrome: ${isPalindrome("")}`); // true (empty string is generally considered a palindrome)
console.log(`" " (space string) is a palindrome: ${isPalindrome(" ")}`); // true (cleans to "")
console.log(`"12321" is a palindrome: ${isPalindrome("12321")}`); // true
console.log(`"1A2" is a palindrome: ${isPalindrome("1A2")}`); // false
console.log(`"No lemon, no melon" is a palindrome: ${isPalindrome("No lemon, no melon")}`); // true
function isPalindromeTwoPointers(s: string): boolean {
    // Step 1: Clean the string (same as Method 1)
    const cleanedString = s.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Step 2: Initialize two pointers
    let left = 0;
    let right = cleanedString.length - 1;

    // Step 3: Iterate while the left pointer is less than the right pointer
    while (left < right) {
        // If characters at the pointers don't match, it's not a palindrome
        if (cleanedString[left] !== cleanedString[right]) {
            return false;
        }
        // Move pointers inward
        left++;
        right--;
    }

    // If the loop completes, it means all compared characters matched
    return true;
}

// --- Test Cases ---

console.log("\nMethod 2 (Two Pointers) Examples:");
console.log(`"racecar" is a palindrome: ${isPalindromeTwoPointers("racecar")}`); // true
console.log(`"Racecar" is a palindrome: ${isPalindromeTwoPointers("Racecar")}`); // true
console.log(`"A man, a plan, a canal: Panama" is a palindrome: ${isPalindromeTwoPointers("A man, a plan, a canal: Panama")}`); // true
console.log(`"hello" is a palindrome: ${isPalindromeTwoPointers("hello")}`); // false
console.log(`"Was it a car or a cat I saw?" is a palindrome: ${isPalindromeTwoPointers("Was it a car or a cat I saw?")}`); // true
console.log(`"" (empty string) is a palindrome: ${isPalindromeTwoPointers("")}`); // true
console.log(`" " (space string) is a palindrome: ${isPalindromeTwoPointers(" ")}`); // true
console.log(`"12321" is a palindrome: ${isPalindromeTwoPointers("12321")}`); // true
console.log(`"1A2" is a palindrome: ${isPalindromeTwoPointers("1A2")}`); // false
console.log(`"No lemon, no melon" is a palindrome: ${isPalindromeTwoPointers("No lemon, no melon")}`); // true
