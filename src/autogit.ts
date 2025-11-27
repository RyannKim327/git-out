/**
 * Represents the result of a Burrows-Wheeler Transform encoding.
 */
interface BWTResult {
    bwt: string;          // The transformed string (last column of sorted rotations).
    originalIndex: number; // The 0-based index of the original string in the sorted rotations.
}

/**
 * Performs the Burrows-Wheeler Transform (BWT) encoding.
 *
 * @param text The input string to transform.
 * @returns An object containing the BWT string and the original index.
 * @throws Error if the input string is empty.
 */
export function encodeBWT(text: string): BWTResult {
    if (!text || text.length === 0) {
        throw new Error("Input string cannot be empty for BWT encoding.");
    }

    const n = text.length;
    const rotations: string[] = [];

    // 1. Generate all cyclic shifts (rotations)
    for (let i = 0; i < n; i++) {
        rotations.push(text.substring(i) + text.substring(0, i));
    }

    // 2. Sort these shifts lexicographically
    rotations.sort();

    // 3. Extract the last character of each sorted shift to form the BWT string
    const bwt = rotations.map(s => s[n - 1]).join('');

    // 4. Find the originalIndex
    // This is the index of the original string in the sorted rotations.
    const originalIndex = rotations.indexOf(text);

    if (originalIndex === -1) {
        // This should theoretically not happen if the original string is valid
        // and its rotations were correctly generated and sorted.
        throw new Error("Original string not found in sorted rotations. This indicates an internal error.");
    }

    return { bwt, originalIndex };
}

/**
 * Performs the Inverse Burrows-Wheeler Transform (Inverse BWT) decoding.
 *
 * @param bwt The BWT string (last column).
 * @param originalIndex The 0-based index of the original string in the sorted rotations.
 * @returns The original decoded string.
 * @throws Error if the BWT string is empty or originalIndex is out of bounds.
 */
export function decodeBWT(bwt: string, originalIndex: number): string {
    if (!bwt || bwt.length === 0) {
        throw new Error("BWT string cannot be empty for decoding.");
    }
    if (originalIndex < 0 || originalIndex >= bwt.length) {
        throw new Error(`Invalid originalIndex: ${originalIndex}. Must be between 0 and ${bwt.length - 1}.`);
    }

    const n = bwt.length;

    // 1. Create the First Column (F) by sorting the BWT string
    const F_arr = bwt.split('').sort(); // F_arr contains characters of the first column
    const L_arr = bwt.split('');       // L_arr contains characters of the last column

    // 2. Construct the LF-mapping array 'P'
    // P[i] = j means F_arr[j] is the same character instance as L_arr[i].
    // This allows us to map from L_arr (current character) to F_arr (previous character).

    // Helper map to store all indices for each character in F_arr
    const charRanksInF = new Map<string, number[]>();
    for (let i = 0; i < n; i++) {
        const char = F_arr[i];
        if (!charRanksInF.has(char)) {
            charRanksInF.set(char, []);
        }
        charRanksInF.get(char)!.push(i); // Store all indices for this character
    }

    // Helper map to track current rank while iterating L_arr
    const charRanksInL_currentCount = new Map<string, number>();
    const P: number[] = new Array(n); // The LF-mapping array

    for (let i = 0; i < n; i++) {
        const char = L_arr[i];
        const currentRank = charRanksInL_currentCount.get(char) || 0;
        charRanksInL_currentCount.set(char, currentRank + 1);

        // P[i] stores the index in F_arr that corresponds to the 'currentRank'-th occurrence of 'char'
        P[i] = charRanksInF.get(char)![currentRank];
    }

    // 3. Reconstruct the Original String
    const result_chars: string[] = new Array(n);
    let current_F_idx = originalIndex; // Start with the index in F_arr that was the original string's row.

    // We build the string by working backwards from the last character.
    // The originalIndex tells us where the *last* character of the original string is located
    // in the sorted first column (F_arr).
    for (let i = n - 1; i >= 0; i--) {
        result_chars[i] = F_arr[current_F_idx];
        // Move to the previous character's position in F_arr using the P-mapping
        current_F_idx = P[current_F_idx];
    }

    return result_chars.join('');
}

// --- Example Usage ---
function runExample(inputString: string) {
    console.log(`Original: "${inputString}"`);

    try {
        const encoded = encodeBWT(inputString);
        console.log(`Encoded BWT: "${encoded.bwt}", Original Index: ${encoded.originalIndex}`);

        const decoded = decodeBWT(encoded.bwt, encoded.originalIndex);
        console.log(`Decoded: "${decoded}"`);
        console.log(`Matches Original: ${decoded === inputString}\n`);
    } catch (error: any) {
        console.error(`Error processing "${inputString}": ${error.message}\n`);
    }
}

// Test cases
runExample("banana");
runExample("abracadabra");
runExample("MISSISSIPPI");
runExample("$$$TEST$$$"); // With special characters
runExample("AAAAAA");    // With many duplicates
runExample("qwertyuiopasdfghjklzxcvbnm"); // Longer string
runExample(""); // Empty string (should error)
runExample("a"); // Single character
runExample("apple");
