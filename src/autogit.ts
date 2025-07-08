function isPalindrome(str: string): boolean {
    // Normalize the string: convert to lowercase and remove non-alphanumeric characters
    const normalizedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Reverse the normalized string
    const reversedStr = normalizedStr.split('').reverse().join('');
    
    // Compare the normalized string with its reverse
    return normalizedStr === reversedStr;
}

// Example usage
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
console.log(isPalindrome("No 'x' in Nixon")); // true
function isPalindromeTwoPointer(str: string): boolean {
    const normalizedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = normalizedStr.length - 1;

    while (left < right) {
        if (normalizedStr[left] !== normalizedStr[right]) {
            return false; // Not a palindrome
        }
        left++;
        right--;
    }
    
    return true; // Is a palindrome
}

// Example usage
console.log(isPalindromeTwoPointer("A man, a plan, a canal: Panama")); // true
console.log(isPalindromeTwoPointer("race a car")); // false
console.log(isPalindromeTwoPointer("No 'x' in Nixon")); // true
