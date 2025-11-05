function isPalindrome(str: string): boolean {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanStr === cleanStr.split('').reverse().join('');
}

// Examples
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("hello")); // false
function isPalindromeTwoPointer(str: string): boolean {
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
console.log(isPalindromeTwoPointer("racecar")); // true
console.log(isPalindromeTwoPointer("A man, a plan, a canal: Panama")); // true
function isPalindromeRecursive(str: string): boolean {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    function checkPalindrome(s: string, left: number, right: number): boolean {
        if (left >= right) return true;
        if (s[left] !== s[right]) return false;
        return checkPalindrome(s, left + 1, right - 1);
    }
    
    return checkPalindrome(cleanStr, 0, cleanStr.length - 1);
}
function isPalindromeCaseSensitive(str: string): boolean {
    const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '');
    return cleanStr === cleanStr.split('').reverse().join('');
}

// Examples
console.log(isPalindromeCaseSensitive("racecar")); // true
console.log(isPalindromeCaseSensitive("Racecar")); // false (different case)
function isPalindromeEvery(str: string): boolean {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanStr.split('').every((char, index) => {
        return char === cleanStr[cleanStr.length - 1 - index];
    });
}
type PalindromeResult = {
    isPalindrome: boolean;
    original: string;
    cleaned: string;
};

function checkPalindrome(str: string): PalindromeResult {
    if (typeof str !== 'string') {
        throw new Error('Input must be a string');
    }
    
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const result = cleanStr === cleanStr.split('').reverse().join('');
    
    return {
        isPalindrome: result,
        original: str,
        cleaned: cleanStr
    };
}

// Usage
const test1 = checkPalindrome("A man, a plan, a canal: Panama");
console.log(test1);
// Output: { isPalindrome: true, original: "A man, a plan, a canal: Panama", cleaned: "amanaplanacanalpanama" }

const test2 = checkPalindrome("hello world");
console.log(test2);
// Output: { isPalindrome: false, original: "hello world", cleaned: "helloworld" }
