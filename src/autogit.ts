function isPalindrome(s: string): boolean {
    // Clean the string: convert to lowercase and remove non-alphanumeric characters
    const cleanStr = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
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
console.log(isPalindrome("race a car")); // false
console.log(isPalindrome(" ")); // true
function isPalindromeArray(s: string): boolean {
    const cleanStr = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanStr === cleanStr.split('').reverse().join('');
}

// Examples
console.log(isPalindromeArray("racecar")); // true
console.log(isPalindromeArray("hello")); // false
interface PalindromeOptions {
    caseSensitive?: boolean;
    ignoreSpaces?: boolean;
    ignorePunctuation?: boolean;
}

function isValidPalindrome(
    str: string, 
    options: PalindromeOptions = {}
): boolean {
    const { 
        caseSensitive = false, 
        ignoreSpaces = true, 
        ignorePunctuation = true 
    } = options;

    let cleanStr = str;
    
    // Handle case sensitivity
    if (!caseSensitive) {
        cleanStr = cleanStr.toLowerCase();
    }
    
    // Remove spaces if needed
    if (ignoreSpaces) {
        cleanStr = cleanStr.replace(/\s/g, '');
    }
    
    // Remove punctuation if needed
    if (ignorePunctuation) {
        cleanStr = cleanStr.replace(/[^a-z0-9]/gi, '');
    }
    
    // Check if empty or single character
    if (cleanStr.length <= 1) {
        return true;
    }
    
    // Two-pointer approach
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

// Examples with different options
console.log(isValidPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isValidPalindrome("RaceCar", { caseSensitive: true })); // false
console.log(isValidPalindrome("race car", { ignoreSpaces: false })); // false
function isPalindromeRecursive(s: string): boolean {
    const cleanStr = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    function checkPalindrome(str: string, left: number, right: number): boolean {
        // Base case
        if (left >= right) {
            return true;
        }
        
        // Check if characters don't match
        if (str[left] !== str[right]) {
            return false;
        }
        
        // Recursive case
        return checkPalindrome(str, left + 1, right - 1);
    }
    
    return checkPalindrome(cleanStr, 0, cleanStr.length - 1);
}

// Examples
console.log(isPalindromeRecursive("madam")); // true
console.log(isPalindromeRecursive("programming")); // false
class PalindromeChecker {
    constructor(private str: string) {}
    
    isValid(): boolean {
        const cleanStr = this.cleanString(this.str);
        return this.isPalindrome(cleanStr);
    }
    
    private cleanString(s: string): string {
        return s.toLowerCase().replace(/[^a-z0-9]/g, '');
    }
    
    private isPalindrome(s: string): boolean {
        let left = 0;
        let right = s.length - 1;
        
        while (left < right) {
            if (s[left] !== s[right]) {
                return false;
            }
            left++;
            right--;
        }
        
        return true;
    }
}

// Usage
const checker1 = new PalindromeChecker("A man, a plan, a canal: Panama");
console.log(checker1.isValid()); // true

const checker2 = new PalindromeChecker("race a car");
console.log(checker2.isValid()); // false
// Test performance
function testPerformance() {
    const testString = "A man, a plan, a canal: Panama".repeat(1000);
    
    console.time("Two-Pointer");
    isPalindrome(testString);
    console.timeEnd("Two-Pointer");
    
    console.time("Array Reverse");
    isPalindromeArray(testString);
    console.timeEnd("Array Reverse");
}

// testPerformance();
