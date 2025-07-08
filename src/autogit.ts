function isPalindrome(s: string): boolean {
    // Convert the string to lower case and strip out non-alphanumeric characters.
    // This helps to treat 'A' and 'a' as the same and ignore spaces, punctuation, etc.
    s = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        if (s[left] !== s[right]) {
            return false; // Characters do not match, not a palindrome.
        }
        left++;
        right--;
    }
    
    return true; // All characters matched, it's a palindrome.
}

// Usage
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
console.log(isPalindrome("")); // true
