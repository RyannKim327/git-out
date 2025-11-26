function isPalindromeStringReversal(str: string): boolean {
    // 1. Clean the string:
    //    - Convert to lowercase
    //    - Remove all non-alphanumeric characters (using a regex)
    const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');

    // 2. Reverse the cleaned string
    const reversedStr = cleanedStr.split('').reverse().join('');

    // 3. Compare the cleaned string with its reversed version
    return cleanedStr === reversedStr;
}

// --- Usage Examples ---
console.log("--- String Reversal Method ---");
console.log(`"madam" is a palindrome: ${isPalindromeStringReversal("madam")}`); // true
console.log(`"Madam" is a palindrome: ${isPalindromeStringReversal("Madam")}`); // true (case-insensitive)
console.log(`"A man, a plan, a canal: Panama" is a palindrome: ${isPalindromeStringReversal("A man, a plan, a canal: Panama")}`); // true (ignores spaces and punctuation)
console.log(`"Racecar" is a palindrome: ${isPalindromeStringReversal("Racecar")}`); // true
console.log(`"hello" is a palindrome: ${isPalindromeStringReversal("hello")}`); // false
console.log(`"Was it a car or a cat I saw?" is a palindrome: ${isPalindromeStringReversal("Was it a car or a cat I saw?")}`); // true
console.log(`"" (empty string) is a palindrome: ${isPalindromeStringReversal("")}`); // true (often considered a palindrome)
console.log(`"a" (single char) is a palindrome: ${isPalindromeStringReversal("a")}`); // true
function isPalindromeTwoPointers(str: string): boolean {
    // 1. Clean the string (same as above)
    const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');

    let left = 0; // Pointer starting from the beginning
    let right = cleanedStr.length - 1; // Pointer starting from the end

    // 2. Iterate while the left pointer is less than the right pointer
    while (left < right) {
        // If characters at the pointers don't match, it's not a palindrome
        if (cleanedStr[left] !== cleanedStr[right]) {
            return false;
        }
        // Move pointers inwards
        left++;
        right--;
    }

    // If the loop completes, all characters matched, so it's a palindrome
    return true;
}

// --- Usage Examples ---
console.log("\n--- Two Pointers Method ---");
console.log(`"madam" is a palindrome: ${isPalindromeTwoPointers("madam")}`); // true
console.log(`"Madam" is a palindrome: ${isPalindromeTwoPointers("Madam")}`); // true
console.log(`"A man, a plan, a canal: Panama" is a palindrome: ${isPalindromeTwoPointers("A man, a plan, a canal: Panama")}`); // true
console.log(`"Racecar" is a palindrome: ${isPalindromeTwoPointers("Racecar")}`); // true
console.log(`"hello" is a palindrome: ${isPalindromeTwoPointers("hello")}`); // false
console.log(`"Was it a car or a cat I saw?" is a palindrome: ${isPalindromeTwoPointers("Was it a car or a cat I saw?")}`); // true
console.log(`"" (empty string) is a palindrome: ${isPalindromeTwoPointers("")}`); // true
console.log(`"a" (single char) is a palindrome: ${isPalindromeTwoPointers("a")}`); // true
