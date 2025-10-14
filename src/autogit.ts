function isPalindrome_ReverseCompare(s: string): boolean {
    // Step 1 & 2: Convert to lowercase and remove non-alphanumeric characters
    const cleanedString = s.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Step 3: Reverse the cleaned string
    const reversedString = cleanedString.split('').reverse().join('');

    // Step 4: Compare
    return cleanedString === reversedString;
}

// --- Examples ---
console.log("--- Reverse and Compare Approach ---");
console.log(`"madam": ${isPalindrome_ReverseCompare("madam")}`); // true
console.log(`"Racecar": ${isPalindrome_ReverseCompare("Racecar")}`); // true
console.log(`"A man, a plan, a canal: Panama": ${isPalindrome_ReverseCompare("A man, a plan, a canal: Panama")}`); // true
console.log(`"hello": ${isPalindrome_ReverseCompare("hello")}`); // false
console.log(`"level": ${isPalindrome_ReverseCompare("level")}`); // true
console.log(`"Was it a car or a cat I saw?": ${isPalindrome_ReverseCompare("Was it a car or a cat I saw?")}`); // true
console.log(`"": ${isPalindrome_ReverseCompare("")}`); // true (empty string is a palindrome)
console.log(`"a": ${isPalindrome_ReverseCompare("a")}`); // true (single character is a palindrome)
console.log(`"No 'x' in Nixon": ${isPalindrome_ReverseCompare("No 'x' in Nixon")}`); // true
function isPalindrome_TwoPointer(s: string): boolean {
    // Step 1: Convert to lowercase and remove non-alphanumeric characters
    const cleanedString = s.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Step 2: Initialize two pointers
    let left = 0;
    let right = cleanedString.length - 1;

    // Step 3: Loop while left pointer is less than right pointer
    while (left < right) {
        // Step 3a & 3b: Compare characters
        if (cleanedString[left] !== cleanedString[right]) {
            return false; // Not a palindrome
        }
        // Step 3c: Move pointers
        left++;
        right--;
    }

    // Step 4: If the loop completes, it's a palindrome
    return true;
}

// --- Examples ---
console.log("\n--- Two-Pointer Approach ---");
console.log(`"madam": ${isPalindrome_TwoPointer("madam")}`); // true
console.log(`"Racecar": ${isPalindrome_TwoPointer("Racecar")}`); // true
console.log(`"A man, a plan, a canal: Panama": ${isPalindrome_TwoPointer("A man, a plan, a canal: Panama")}`); // true
console.log(`"hello": ${isPalindrome_TwoPointer("hello")}`); // false
console.log(`"level": ${isPalindrome_TwoPointer("level")}`); // true
console.log(`"Was it a car or a cat I saw?": ${isPalindrome_TwoPointer("Was it a car or a cat I saw?")}`); // true
console.log(`"": ${isPalindrome_TwoPointer("")}`); // true
console.log(`"a": ${isPalindrome_TwoPointer("a")}`); // true
console.log(`"No 'x' in Nixon": ${isPalindrome_TwoPointer("No 'x' in Nixon")}`); // true
