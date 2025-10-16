function isPalindrome(str: string): boolean {
    let left = 0;
    let right = str.length - 1;

    while (left < right) {
        if (str[left] !== str[right]) {
            return false;
        }
        left++;
        right--;
    }

    return true;
}

// Example
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false
function isPalindromeClean(str: string): boolean {
    let left = 0;
    let right = str.length - 1;

    while (left < right) {
        while (left < right && !/[a-zA-Z0-9]/.test(str[left])) left++;
        while (left < right && !/[a-zA-Z0-9]/.test(str[right])) right--;

        if (str[left].toLowerCase() !== str[right].toLowerCase()) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}

console.log(isPalindromeClean("A man, a plan, a canal: Panama")); // true
