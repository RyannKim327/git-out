function isPalindrome(s: string): boolean {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        // Move left pointer to the next alphanumeric character
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }
        // Move right pointer to the previous alphanumeric character
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }
        // Compare characters (case-insensitive)
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

function isAlphanumeric(char: string): boolean {
    return /^[a-z0-9]$/i.test(char);
}
