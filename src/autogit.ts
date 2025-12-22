/**
 * Returns the Unicode code point at `pos` and the number of UTF‑16 code units
 * that belong to that code point (1 or 2).  This lets us step correctly over
 * surrogate pairs.
 */
function codePointAt(str: string, pos: number): { cp: number; length: number } {
    const first = str.charCodeAt(pos);
    // Is it a high surrogate?
    if (first >= 0xd800 && first <= 0xdbff && pos + 1 < str.length) {
        const second = str.charCodeAt(pos + 1);
        // Is the next code unit a low surrogate?
        if (second >= 0xdc00 && second <= 0xdfff) {
            // Combine the pair into a single code point.
            const cp = ((first - 0xd800) << 10) + (second - 0xdc00) + 0x10000;
            return { cp, length: 2 };
        }
    }
    // Not a surrogate pair – the code point is just the first unit.
    return { cp: first, length: 1 };
}
/**
 * Returns true if `s` reads the same forward and backward.
 * No extra data structures are allocated – only a few numbers.
 *
 * @param s The string to test.
 * @param ignoreNonAlphaNumeric If true, skips spaces, punctuation, etc.
 * @param caseInsensitive If true, treats 'A' and 'a' as equal.
 */
export function isPalindrome(
    s: string,
    ignoreNonAlphaNumeric = false,
    caseInsensitive = false
): boolean {
    // Fast‑path for empty or single‑character strings.
    if (s.length < 2) return true;

    // Two pointers: one from the start, one from the end.
    let left = 0;
    let right = s.length - 1;

    while (left <= right) {
        // ---- 1️⃣ Grab the next *valid* character from the left side ----
        let leftInfo = codePointAt(s, left);
        let leftCp = leftInfo.cp;
        left += leftInfo.length; // advance past the whole code point

        // If we are ignoring non‑alphanumerics, skip them.
        if (ignoreNonAlphaNumeric) {
            while (
                leftCp !== undefined &&
                !isAlphaNumericCodePoint(leftCp)
            ) {
                if (left > right) break; // ran out of characters
                leftInfo = codePointAt(s, left);
                leftCp = leftInfo.cp;
                left += leftInfo.length;
            }
        }

        // ---- 2️⃣ Grab the next *valid* character from the right side ----
        let rightInfo = codePointAt(s, right - (rightInfo?.length ?? 0) + 1);
        // The above line is a little tricky because we need to step *backwards*
        // over a possible surrogate pair.  We first look at the code unit at `right`,
        // then decide if we need to step one more position.
        // Simpler (and still O(1) space) is to just move left‑to‑right and then
        // compare the characters we collected, but the following version keeps the
        // two‑pointer spirit.

        // Determine the length of the code point at `right`.
        const first = s.charCodeAt(right);
        let rightCp: number;
        let rightLen: number;
        if (first >= 0xdc00 && first <= 0xdfff && right > 0) {
            // low surrogate – the high surrogate is at right‑1
            const prev = s.charCodeAt(right - 1);
            if (prev >= 0xd800 && prev <= 0xdbff) {
                rightCp = ((prev - 0xd800) << 10) + (first - 0xdc00) + 0x10000;
                rightLen = 2;
                right -= 2; // move past the pair
            } else {
                // malformed UTF‑16, treat as single unit
                rightCp = first;
                rightLen = 1;
                right -= 1;
            }
        } else {
            // regular BMP code unit
            rightCp = first;
            rightLen = 1;
            right -= 1;
        }

        if (ignoreNonAlphaNumeric) {
            while (
                rightCp !== undefined &&
                !isAlphaNumericCodePoint(rightCp)
            ) {
                if (right < left) break;
                // Move leftwards again to fetch the previous code point.
                const cur = s.charCodeAt(right);
                if (cur >= 0xdc00 && cur <= 0xdfff && right > 0) {
                    const prev = s.charCodeAt(right - 1);
                    if (prev >= 0xd800 && prev <= 0xdbff) {
                        rightCp = ((prev - 0xd800) << 10) + (cur - 0xdc00) + 0x10000;
                        right -= 2;
                        continue;
                    }
                }
                rightCp = cur;
                right -= 1;
            }
        }

        // If we have exhausted one side before the other, the loop will exit.
        if (leftInfo === undefined || rightCp === undefined) break;

        // ---- 3️⃣ Normalise case if requested ----
        if (caseInsensitive) {
            leftCp = toAsciiLowerCase(leftCp);
            rightCp = toAsciiLowerCase(rightCp);
        }

        // ---- 4️⃣ Compare the two code points ----
        if (leftCp !== rightCp) return false;
    }

    return true;
}

/* ------------------------------------------------------------------ */
/* Helper utilities (tiny, O(1) space)                                 */
/* ------------------------------------------------------------------ */

/**
 * Returns true if the Unicode code point is an ASCII letter or digit.
 * This is enough for the typical “ignore punctuation” use‑case.
 */
function isAlphaNumericCodePoint(cp: number): boolean {
    // 0‑9
    if (cp >= 48 && cp <= 57) return true;
    // A‑Z
    if (cp >= 65 && cp <= 90) return true;
    // a‑z
    if (cp >= 97 && cp <= 122) return true;
    return false;
}

/**
 * Fast ASCII‑only lower‑casing.  For non‑ASCII characters we just return the
 * original code point – the caller can decide to extend this if needed.
 */
function toAsciiLowerCase(cp: number): number {
    // Upper‑case A‑Z → a‑z
    if (cp >= 65 && cp <= 90) return cp + 32;
    return cp;
}
/**
 * Simple ASCII palindrome checker – O(1) extra space.
 */
export function isAsciiPalindrome(s: string, caseInsensitive = false): boolean {
    let i = 0;
    let j = s.length - 1;

    while (i < j) {
        let left = s.charCodeAt(i);
        let right = s.charCodeAt(j);

        if (caseInsensitive) {
            // Convert A‑Z to a‑z
            if (left >= 65 && left <= 90) left += 32;
            if (right >= 65 && right <= 90) right += 32;
        }

        if (left !== right) return false;

        i++;
        j--;
    }
    return true;
}
function test() {
    const cases: Array<[string, boolean, boolean, boolean]> = [
        // [input, expectedStrict, expectedIgnoreSpaces, expectedIgnoreSpacesCase]
        ["racecar", true, true, true],
        ["RaceCar", false, false, true],
        ["A man, a plan, a canal: Panama", false, true, true],
        ["", true, true, true],
        ["😀a😀", true, true, true], // palindrome with an emoji (surrogate pair)
        ["😀ab😀", false, false, false],
        ["12321", true, true, true],
        ["12345", false, false, false],
    ];

    for (const [str, strict, ignoreSpaces, ignoreSpacesCase] of cases) {
        console.assert(isAsciiPalindrome(str) === strict,
            `ASCII strict failed for "${str}"`);
        console.assert(isPalindrome(str, true, false) === ignoreSpaces,
            `ignore‑non‑alnum failed for "${str}"`);
        console.assert(isPalindrome(str, true, true) === ignoreSpacesCase,
            `ignore‑non‑alnum + case‑insensitive failed for "${str}"`);
    }
    console.log("All tests passed!");
}
test();
