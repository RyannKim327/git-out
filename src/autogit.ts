/**
 * Burrows–Wheeler transform – the forward transform.
 *
 * @param {string} input – Text to be encoded. Must contain a single unique
 *                         end‑of‑file marker, conventionally `$`.
 * @returns {string} – The last column of the sorted cyclic rotation matrix.
 *
 * The algorithm:
 *   1. Generate all cyclic rotations of the input.
 *   2. Sort the rotations lexicographically.
 *   3. Take the last character of each sorted rotation; that series
 *      is the BWT output.
 *
 * The implementation is deliberately thin: it builds an array of
 * strings, sorts it with the native `Array.prototype.sort`,
 * and then extracts the last character from each row.
 */
export function bwt(input: string): string {
    // Guard: we assume the caller used a unique EOF symbol.
    if (!input.includes('$')) {
        throw new Error("Input must contain exactly one unique EOF marker ('$').");
    }

    const n = input.length;
    const rotations: string[] = new Array(n);

    // Build all rotations in O(n²) time & O(n²) memory – fine for demo use.
    // For large data you’d use a more memory‑efficient approach.
    for (let i = 0; i < n; i++) {
        const rotation = input.slice(i) + input.slice(0, i); // cyclic shift
        rotations[i] = rotation;
    }

    // Step 2: lexicographically sort the rotations.
    rotations.sort();

    // Step 3: construct output from last characters.
    let bwt = '';
    for (const rot of rotations) {
        bwt += rot[rot.length - 1];
    }

    return bwt;
}

/**
 * Inverse Burrows–Wheeler transform – reconstructs the original
 * string from the BWT output.
 *
 * @param {string} encoded – BWT output string *without* the EOF marker.
 * @returns {string} – The original string, including the EOF marker.
 *
 * The classic "LF‑mapping" or "last–first relation" is used:
 *   1. The first column of the sorted rotation matrix is just the
 *      encoded string sorted.
 *   2. By repeatedly following the mapping from last → first, you
 *      rebuild the original text backwards.
 *
 * The algorithm below runs in O(n) time and uses O(n) additional
 * space. It is straightforward – no fancy data structures or external
 * libraries required.
 */
export function inverseBwt(encoded: string): string {
    const n = encoded.length;

    // The first column (F) is the encoded string sorted.
    const first = encoded.split('').sort();

    // Build a mapping from each character in *encoded* to the
    // positions it occupies in *first*.  Because the text can
    // contain repeated characters, we need to map the *i‑th*
    // occurrence in the first column to the *i‑th* occurrence in
    // the last column.
    const occCount: Map<string, number[]> = new Map();

    // Count occurrences in the first column.
    for (const ch of first) {
        if (!occCount.has(ch)) occCount.set(ch, []);
        occCount.get(ch)!.push(0);           // we'll replace with actual idx
    }

    // Again count occurrences in the encoded (last column) and
    // record the mapping to the first column.
    const indexMap: number[] = new Array(n);
    const seen: Map<string, number> = new Map();

    for (let i = 0; i < n; i++) {
        const ch = encoded[i];
        const count = seen.get(ch) ?? 0;
        const mappedIdx = occCount.get(ch)![count];
        indexMap[i] = mappedIdx;
        seen.set(ch, count + 1);
    }

    // Reconstruct the string by walking the mapping starting from
    // the EOF marker '$'.  We walk backwards: each step gives the
    // character that precedes the current one in the original string.
    let i = encoded.indexOf('$');
    if (i === -1) throw new Error("The BWT input must contain an EOF marker ('$').");

    let original = '';
    for (let step = 0; step < n; step++) {
        const ch = encoded[i];
        original = ch + original;          // prepend
        if (ch === '$') break;             // reached the sentinel
        i = indexMap[i];
    }

    return original;
}

/** Quick demo */
(() => {
    const text = "banana$";          // note the unique EOF marker
    console.log("Original:     ", text);

    const encoded = bwt(text);
    console.log("BWT result:   ", encoded);

    const decoded = inverseBwt(encoded);
    console.log("Decoded:      ", decoded);
})();
