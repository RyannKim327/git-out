function isPalindrome(s: string): boolean {
    let left = 0;
    let right = s.length - 1;

    const isAlphanumeric = (char: string): boolean => {
        const code = char.charCodeAt(0);
        return (code >= 48 && code <= 57) || // digits 0-9
               (code >= 65 && code <= 90) || // uppercase A-Z
               (code >= 97 && code <= 122);  // lowercase a-z
    };

    while (left < right) {
        // Move left pointer to next alphanumeric character
        while (left < right && !isAlphanumeric(s[left])) left++;
        // Move right pointer to previous alphanumeric character
        while (left < right && !isAlphanumeric(s[right])) right--;

        // Compare characters case-insensitively
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}
