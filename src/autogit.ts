function isPalindrome(str: string): boolean {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = cleanStr.length - 1;
    
    while (left < right) {
        if (cleanStr[left] !== cleanStr[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

// Examples
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello")); // false
function isPalindromeEasy(str: string): boolean {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversedStr = cleanStr.split('').reverse().join('');
    return cleanStr === reversedStr;
}

// Examples
console.log(isPalindromeEasy("racecar")); // true
console.log(isPalindromeEasy("A man, a plan, a canal: Panama")); // true
function isPalindromeRobust(input: string): boolean {
    // Type guard for empty or null input
    if (!input || typeof input !== 'string') {
        return false;
    }
    
    const cleanStr = input.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Handle edge cases
    if (cleanStr.length <= 1) {
        return true;
    }
    
    return cleanStr === cleanStr.split('').reverse().join('');
}

// Examples
console.log(isPalindromeRobust("racecar")); // true
console.log(isPalindromeRobust("A")); // true
console.log(isPalindromeRobust("")); // true (empty string is a palindrome)
console.log(isPalindromeRobust("hello")); // false
function isPalindromeRecursive(str: string): boolean {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    function checkPalindrome(s: string): boolean {
        if (s.length <= 1) {
            return true;
        }
        if (s[0] !== s[s.length - 1]) {
            return false;
        }
        return checkPalindrome(s.substring(1, s.length - 1));
    }
    
    return checkPalindrome(cleanStr);
}
function isPalindromeCaseSensitive(str: string): boolean {
    const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '');
    return cleanStr === cleanStr.split('').reverse().join('');
}

// Examples
console.log(isPalindromeCaseSensitive("Racecar")); // false (case sensitive)
console.log(isPalindromeCaseSensitive("racecar")); // true
// You can also create a type for better type safety
type StringPredicate = (str: string) => boolean;

const palindromeCheck: StringPredicate = (str: string): boolean => {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanStr === cleanStr.split('').reverse().join('');
};
