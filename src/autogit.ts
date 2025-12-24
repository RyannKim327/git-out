function isPalindrome(str: string): boolean {
    const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanedStr === cleanedStr.split('').reverse().join('');
}

// Examples
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("hello")); // false
function isPalindrome(str: string): boolean {
    const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = cleanedStr.length - 1;
    
    while (left < right) {
        if (cleanedStr[left] !== cleanedStr[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
function isPalindrome(str: string): boolean {
    const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    function checkPalindrome(s: string, start: number, end: number): boolean {
        if (start >= end) return true;
        if (s[start] !== s[end]) return false;
        return checkPalindrome(s, start + 1, end - 1);
    }
    
    return checkPalindrome(cleanedStr, 0, cleanedStr.length - 1);
}
interface PalindromeOptions {
    caseSensitive?: boolean;
    ignoreSpaces?: boolean;
    ignorePunctuation?: boolean;
}

function isPalindrome(
    str: string, 
    options: PalindromeOptions = {}
): boolean {
    const { 
        caseSensitive = false, 
        ignoreSpaces = true, 
        ignorePunctuation = true 
    } = options;
    
    let cleanedStr = str;
    
    if (!caseSensitive) {
        cleanedStr = cleanedStr.toLowerCase();
    }
    
    if (ignoreSpaces) {
        cleanedStr = cleanedStr.replace(/\s/g, '');
    }
    
    if (ignorePunctuation) {
        cleanedStr = cleanedStr.replace(/[^a-z0-9]/gi, '');
    }
    
    return cleanedStr === cleanedStr.split('').reverse().join('');
}

// Usage examples
console.log(isPalindrome("Racecar")); // true
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("racecar", { caseSensitive: true })); // false
console.log(isPalindrome("ra cec ar", { ignoreSpaces: false })); // false
