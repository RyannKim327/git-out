function isPalindrome(str: string): boolean {
    // 1. Preprocessing:
    //    - Convert to lowercase: .toLowerCase()
    //    - Remove non-alphanumeric characters: .replace(/[^a-z0-9]/g, '')
    //      (Explanation of regex:
    //         - `[^...]` matches any character *not* in the brackets.
    //         - `a-z` matches any lowercase letter.
    //         - `0-9` matches any digit.
    //         - `/g` is the "global" flag, meaning replace all occurrences, not just the first.
    //      )
    const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');

    // 2. Reverse the cleaned string:
    //    - .split('') converts the string to an array of characters.
    //    - .reverse() reverses the array in place.
    //    - .join('') converts the array back to a string.
    const reversedStr = cleanedStr.split('').reverse().join('');

    // 3. Compare the cleaned string with its reversed version
    return cleanedStr === reversedStr;
}

// --- Examples ---
console.log(`"racecar" is a palindrome: ${isPalindrome("racecar")}`); // true
console.log(`"RaceCar" is a palindrome: ${isPalindrome("RaceCar")}`); // true (case-insensitive)
console.log(`"Madam" is a palindrome: ${isPalindrome("Madam")}`);     // true (case-insensitive)
console.log(`"A man, a plan, a canal: Panama" is a palindrome: ${isPalindrome("A man, a plan, a canal: Panama")}`); // true
console.log(`"hello" is a palindrome: ${isPalindrome("hello")}`);     // false
console.log(`"Was it a car or a cat I saw?" is a palindrome: ${isPalindrome("Was it a car or a cat I saw?")}`); // true
console.log(`"" (empty string) is a palindrome: ${isPalindrome("")}`); // true (empty string is often considered a palindrome)
console.log(`"a" (single char) is a palindrome: ${isPalindrome("a")}`); // true
console.log(`"12321" is a palindrome: ${isPalindrome("12321")}`); // true
console.log(`"12345" is a palindrome: ${isPalindrome("12345")}`); // false
function isPalindromeTwoPointers(str: string): boolean {
    // 1. Preprocessing (same as Method 1)
    const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');

    // 2. Initialize two pointers
    let left = 0;
    let right = cleanedStr.length - 1;

    // 3. Iterate while the left pointer is less than the right pointer
    while (left < right) {
        // If characters at the pointers do not match, it's not a palindrome
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

// --- Examples ---
console.log("\n--- Two-Pointer Examples ---");
console.log(`"racecar" is a palindrome: ${isPalindromeTwoPointers("racecar")}`); // true
console.log(`"RaceCar" is a palindrome: ${isPalindromeTwoPointers("RaceCar")}`); // true
console.log(`"A man, a plan, a canal: Panama" is a palindrome: ${isPalindromeTwoPointers("A man, a plan, a canal: Panama")}`); // true
console.log(`"hello" is a palindrome: ${isPalindromeTwoPointers("hello")}`);     // false
console.log(`"" (empty string) is a palindrome: ${isPalindromeTwoPointers("")}`); // true
console.log(`"a" (single char) is a palindrome: ${isPalindromeTwoPointers("a")}`); // true
