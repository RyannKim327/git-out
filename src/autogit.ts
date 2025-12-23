/**
 * Build the LPS (Longest Proper Prefix which is also a Suffix) array for a pattern.
 *
 * For each position i (0‑based) in the pattern, lps[i] stores the length of the
 * longest proper prefix of pattern[0..i] that is also a suffix of this substring.
 *
 * @param pattern - The pattern we want to search for.
 * @returns An array of numbers with length pattern.length.
 */
function buildLPS(pattern: string): number[] {
    const m = pattern.length;
    const lps = new Array<number>(m).fill(0);

    // length of the previous longest prefix suffix
    let len = 0;
    // i starts from 1 because lps[0] is always 0
    let i = 1;

    while (i < m) {
        if (pattern[i] === pattern[len]) {
            // we can extend the current prefix
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                // fall back to the previous longest prefix suffix
                len = lps[len - 1];
                // note: we do NOT increment i here
            } else {
                // no proper prefix suffix exists for this i
                lps[i] = 0;
                i++;
            }
        }
    }

    return lps;
}

/**
 * KMP search – returns all start indices where `pattern` occurs in `text`.
 *
 * @param text    - The text to be searched.
 * @param pattern - The pattern we are looking for.
 * @returns An array of zero‑based indices where the pattern starts in the text.
 *          Returns an empty array if the pattern is not found.
 */
function kmpSearch(text: string, pattern: string): number[] {
    const n = text.length;
    const m = pattern.length;

    if (m === 0) {
        // By convention, an empty pattern matches at every position.
        // You can change this behaviour if you prefer.
        return [...Array(n + 1).keys()];
    }

    const lps = buildLPS(pattern);
    const result: number[] = [];

    let i = 0; // index for text
    let j = 0; // index for pattern

    while (i < n) {
        if (text[i] === pattern[j]) {
            i++;
            j++;

            if (j === m) {
                // full pattern matched – record the start index
                result.push(i - j);
                // continue searching for overlapping matches
                j = lps[j - 1];
            }
        } else {
            if (j !== 0) {
                // mismatch after j matches → jump using LPS
                j = lps[j - 1];
            } else {
                // no characters matched, move to next text character
                i++;
            }
        }
    }

    return result;
}

/* --------------------------------------------------------------
   Example usage
   -------------------------------------------------------------- */
function demo() {
    const text = "ababcabcabababd";
    const pattern = "ababd";

    const matches = kmpSearch(text, pattern);
    console.log(`Pattern "${pattern}" found at positions:`, matches);
    // → Pattern "ababd" found at positions: [10]
}

demo();
function assertEqual(actual: any, expected: any, msg = "") {
    const ok = JSON.stringify(actual) === JSON.stringify(expected);
    console.assert(ok, `FAIL${msg ? ": " + msg : ""}\n  Expected: ${JSON.stringify(expected)}\n  Got:      ${JSON.stringify(actual)}`);
}

// Basic cases
assertEqual(kmpSearch("abcde", "cd"), [2]);
assertEqual(kmpSearch("aaaaa", "aa"), [0,1,2,3]);
assertEqual(kmpSearch("abababab", "abab"), [0,2,4]);
assertEqual(kmpSearch("abc", "d"), []);
assertEqual(kmpSearch("", "a"), []);
assertEqual(kmpSearch("a", ""), [0,1]); // by our convention

// Overlap & edge
assertEqual(kmpSearch("aaaa", "aaaaa"), []); // pattern longer
assertEqual(kmpSearch("abcabcabc", "abcabc"), [0,3]);

console.log("All tests passed!");
