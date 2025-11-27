function isPalindrome(str: string): boolean {
    const reversed = str.split('').reverse().join('');
    return str === reversed;
}

// Usage
console.log(isPalindrome('racecar')); // true
console.log(isPalindrome('hello'));   // false
function isPalindromeCaseInsensitive(str: string): boolean {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversed = cleanStr.split('').reverse().join('');
    return cleanStr === reversed;
}

// Usage
console.log(isPalindromeCaseInsensitive('RaceCar')); // true
console.log(isPalindromeCaseInsensitive('A man, a plan, a canal: Panama')); // true
function isPalindromeTwoPointers(str: string): boolean {
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

// Usage
console.log(isPalindromeTwoPointers('racecar')); // true
console.log(isPalindromeTwoPointers('hello'));   // false
function isPalindromeRecursive(str: string): boolean {
    // Helper function with type annotations
    const helper = (s: string, start: number, end: number): boolean => {
        if (start >= end) return true;
        if (s[start] !== s[end]) return false;
        return helper(s, start + 1, end - 1);
    };
    
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return helper(cleanStr, 0, cleanStr.length - 1);
}

// Usage
console.log(isPalindromeRecursive('madam')); // true
console.log(isPalindromeRecursive('world')); // false
interface PalindromeOptions {
    caseSensitive?: boolean;
    ignoreSpaces?: boolean;
    ignoreSpecialChars?: boolean;
}

function isPalindromeAdvanced(
    str: string, 
    options: PalindromeOptions = {}
): boolean {
    const {
        caseSensitive = false,
        ignoreSpaces = true,
        ignoreSpecialChars = true
    } = options;

    let processedStr = str;
    
    if (!caseSensitive) {
        processedStr = processedStr.toLowerCase();
    }
    
    if (ignoreSpaces) {
        processedStr = processedStr.replace(/\s/g, '');
    }
    
    if (ignoreSpecialChars) {
        processedStr = processedStr.replace(/[^a-z0-9]/g, '');
    }
    
    return processedStr === processedStr.split('').reverse().join('');
}

// Usage examples
console.log(isPalindromeAdvanced('RaceCar')); // true
console.log(isPalindromeAdvanced('A man, a plan, a canal: Panama')); // true
console.log(isPalindromeAdvanced('race car', { ignoreSpaces: false })); // false
