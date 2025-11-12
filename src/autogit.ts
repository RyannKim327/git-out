function isPalindrome(str: string): boolean {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversedStr = cleanStr.split('').reverse().join('');
    return cleanStr === reversedStr;
}

// Usage
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
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
function isPalindromeCaseSensitive(str: string): boolean {
    const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '');
    return cleanStr === cleanStr.split('').reverse().join('');
}

// Usage
console.log(isPalindromeCaseSensitive("Racecar")); // false (case-sensitive)
console.log(isPalindromeCaseSensitive("racecar")); // true
function isPalindromeRecursive(str: string): boolean {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    if (cleanStr.length <= 1) return true;
    if (cleanStr[0] !== cleanStr[cleanStr.length - 1]) return false;
    
    return isPalindromeRecursive(cleanStr.substring(1, cleanStr.length - 1));
}
function isPalindrome(str: string): boolean {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanStr.split('').every((char, index) => 
        char === cleanStr[cleanStr.length - 1 - index]
    );
}
class PalindromeChecker {
    static isPalindrome(str: string): boolean {
        const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
        const reversedStr = cleanStr.split('').reverse().join('');
        return cleanStr === reversedStr;
    }

    // Alternative two-pointer method
    static isPalindromeEfficient(str: string): boolean {
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
}

// Test cases
const testCases = [
    "racecar",
    "hello",
    "A man, a plan, a canal: Panama",
    "Madam",
    "12321",
    "not a palindrome"
];

testCases.forEach(test => {
    console.log(`"${test}" is palindrome: ${PalindromeChecker.isPalindrome(test)}`);
});
"racecar" is palindrome: true
"hello" is palindrome: false
"A man, a plan, a canal: Panama" is palindrome: true
"Madam" is palindrome: true
"12321" is palindrome: true
"not a palindrome" is palindrome: false
