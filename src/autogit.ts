/**
 * Return true if `s` is a palindrome.
 *   - Works for regular strings and Unicode strings
 *   - Uses a two‑pointer scan; no extra arrays/strings are allocated
 *   - Time:  O(n)
 *   - Extra space: O(1)
 */
function isPalindrome(s: string): boolean {
    let left  = 0;
    let right = s.length - 1;

    while (left < right) {
        // Skip non‑alphanumeric characters & ignore case if you want
        // if (!/[a-z0-9]/i.test(s.charAt(left))) { left++; continue; }
        // if (!/[a-z0-9]/i.test(s.charAt(right))) { right--; continue; }

        if (s[left] !== s[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
console.log(isPalindrome("racecar"));        // true
console.log(isPalindrome("hello"));          // false
console.log(isPalindrome("A man a plan a canal Panama".replace(/\s+/g, '').toLowerCase()));
// true, after normalizing whitespace and case
