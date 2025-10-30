function isPalindrome(str: string): boolean {
    const reversed = str.split('').reverse().join('');
    return str === reversed;
}

// Example usage:
console.log(isPalindrome("madam")); // true
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello")); // false
function isPalindrome(str: string): boolean {
    // Clean the string: lowercase and remove non-alphanumeric characters
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    // Reverse the cleaned string
    const reversed = cleanStr.split('').reverse().join('');
    return cleanStr === reversed;
}

// Example usage:
console.log(isPalindrome("RaceCar")); // true (case-insensitive)
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true (ignores non-alphanumeric)
console.log(isPalindrome("12321!")); // true (ignores punctuation)
function isPalindrome(str: string): boolean {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = cleanStr.length - 1;
    // Compare characters from both ends moving towards the center
    while (left < right) {
        if (cleanStr[left] !== cleanStr[right]) return false;
        left++;
        right--;
    }
    return true;
}

// Example usage same as Approach 2
console.log(isPalindrome(""));           // true (edge case)
console.log(isPalindrome("a"));          // true (edge case)
console.log(isPalindrome("Noon"));       // true
console.log(isPalindrome("Was it a car or a cat I saw?")); // true
console.log(isPalindrome("TypeScript")); // false
