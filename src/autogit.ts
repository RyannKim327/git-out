function isPalindrome(str: string): boolean {
    // Remove non-alphanumeric characters and convert to lowercase
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

// Test cases
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
console.log(isPalindrome(" ")); // true
function isPalindromeSimple(str: string): boolean {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanStr === cleanStr.split('').reverse().join('');
}
function isPalindromeRecursive(str: string): boolean {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    function checkPalindrome(s: string): boolean {
        if (s.length <= 1) return true;
        if (s[0] !== s[s.length - 1]) return false;
        return checkPalindrome(s.substring(1, s.length - 1));
    }
    
    return checkPalindrome(cleanStr);
}
function isPalindromeCaseSensitive(str: string): boolean {
    // Keep original case, only remove non-alphanumeric
    const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '');
    
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
class PalindromeChecker {
    static isPalindrome(str: string): boolean {
        if (typeof str !== 'string') {
            throw new Error('Input must be a string');
        }
        
        const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
        
        // Handle empty string or single character
        if (cleanStr.length <= 1) return true;
        
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
    
    // More lenient version that ignores spaces and punctuation by default
    static isPalindromeLenient(str: string): boolean {
        const cleanStr = str.toLowerCase().replace(/[\W_]/g, '');
        return cleanStr === cleanStr.split('').reverse().join('');
    }
}

// Usage examples
console.log(PalindromeChecker.isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(PalindromeChecker.isPalindrome("racecar")); // true
console.log(PalindromeChecker.isPalindrome("hello")); // false
// Test the implementation
const testCases: { input: string; expected: boolean }[] = [
    { input: "A man, a plan, a canal: Panama", expected: true },
    { input: "race a car", expected: false },
    { input: "racecar", expected: true },
    { input: "hello", expected: false },
    { input: "a", expected: true },
    { input: "", expected: true },
    { input: " ", expected: true },
    { input: "Was it a car or a cat I saw?", expected: true },
    { input: "No 'x' in Nixon", expected: true }
];

testCases.forEach(({ input, expected }) => {
    const result = PalindromeChecker.isPalindrome(input);
    console.log(`"${input}" -> ${result} (${result === expected ? '✓' : '✗'})`);
});
