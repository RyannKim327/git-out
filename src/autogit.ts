function kmpSearch(text: string, pattern: string): number[] {
    const m = pattern.length;
    const n = text.length;
    const lps = buildLPS(pattern); // Longest Prefix Suffix array
    const result: number[] = [];

    let i = 0; // index for text
    let j = 0; // index for pattern

    while (i < n) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
        }

        if (j === m) {
            result.push(i - j); // match found at i-j
            j = lps[j - 1];
        } else if (i < n && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }

    return result;
}

function buildLPS(pattern: string): number[] {
    const lps: number[] = new Array(pattern.length).fill(0);
    let len = 0; // length of the previous longest prefix suffix
    let i = 1;

    while (i < pattern.length) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }

    return lps;
}
