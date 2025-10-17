function isPalindrome(s: string): boolean {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // Move left pointer to the next alphanumeric character
        while (left < right && !isAlphanumeric(s.charAt(left))) {
            left++;
        }
        // Move right pointer to the previous alphanumeric character
        while (left < right && !isAlphanumeric(s.charAt(right))) {
            right--;
        }
        
        // Compare characters case-insensitively
        if (left < right) {
            if (s.charAt(left).toLowerCase() !== s.charAt(right).toLowerCase()) {
                return false;
            }
            left++;
            right--;
        }
    }
    
    return true;
}

// Helper function to check if a character is alphanumeric
function isAlphanumeric(char: string): boolean {
    return /[a-zA-Z0-9]/.test(char);
}
