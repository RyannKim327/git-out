function isPalindrome(s: string): boolean {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        // Skip non-alphanumeric characters
        while (left < right && !isAlphanumeric(s[left])) left++;
        while (left < right && !isAlphanumeric(s[right])) right--;

        // Compare lowercase characters
        if (toLowerCase(s[left]) !== toLowerCase(s[right])) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}

// Helper: check if char is alphanumeric (ASCII only)
function isAlphanumeric(c: string): boolean {
    const code = c.charCodeAt(0);
    return (
        (code >= 48 && code <= 57) || // 0-9
        (code >= 65 && code <= 90) || // A-Z
        (code >= 97 && code <= 122)   // a-z
    );
}

// Helper: lowercase conversion without using .toLowerCase()
function toLowerCase(c: string): string {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) {
        return String.fromCharCode(code + 32);
    }
    return c;
}
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
