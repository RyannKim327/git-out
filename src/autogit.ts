function isPalindromeBasic(str: string): boolean {
    const reversed = str.split('').reverse().join('');
    return str === reversed;
}

// Example usage:
console.log(isPalindromeBasic('madam'));  // true
console.log(isPalindromeBasic('Madam'));  // false (due to capital 'M')
console.log(isPalindromeBasic('racecar!'));  // false (includes '!')
function isPalindromeEnhanced(str: string): boolean {
    // Normalize: lowercase and remove non-alphanumeric characters
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversed = cleaned.split('').reverse().join('');
    return cleaned === reversed;
}

// Example usage:
console.log(isPalindromeEnhanced('A man, a plan, a canal: Panama')); // true
console.log(isPalindromeEnhanced('Madam'));  // true
console.log(isPalindromeEnhanced('racecar!'));  // true (ignores '!')
function isPalindromeEfficient(str: string): boolean {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = cleaned.length - 1;

    while (left < right) {
        if (cleaned[left] !== cleaned[right]) return false;
        left++;
        right--;
    }
    return true;
}

// Example usage:
console.log(isPalindromeEfficient('Was it a car or a cat I saw?'));  // true
console.log(isPalindromeEfficient('hello'));  // false
