/**
 * Represents the result of a Burrows-Wheeler Transform encoding.
 */
interface BWTResult {
    /** The transformed string (last column of the sorted rotations). */
    encoded: string;
    /** The index of the original string in the sorted rotations. */
    primaryIndex: number;
}

/**
 * Performs the Burrows-Wheeler Transform (BWT) on a given string.
 *
 * @param text The input string to transform.
 *             It's recommended to append a unique sentinel character (e.g., '$')
 *             if the string might contain duplicates or empty strings, though
 *             this implementation does not strictly require it if primaryIndex is handled correctly.
 * @returns An object containing the encoded string and the primary index.
 */
export function bwtEncode(text: string): BWTResult {
    if (!text) {
        return { encoded: "", primaryIndex: 0 };
    }

    const n = text.length;
    const rotations: string[] = [];

    // 1. Generate all cyclic shifts (rotations)
    for (let i = 0; i < n; i++) {
        // Example: "BANANA" -> "BANANA", "ANANAB", "NANABA", "ANABAB", "NABANA", "ABANAN"
        rotations.push(text.substring(i) + text.substring(0, i));
    }

    // 2. Sort the rotations alphabetically
    rotations.sort();

    let primaryIndex = -1;
    const lastCharacters: string[] = [];

    // 3. Extract the last character of each sorted rotation
    // 4. Find the primary index (the index of the original string in the sorted rotations)
    for (let i = 0; i < n; i++) {
        const rotation = rotations[i];
        lastCharacters.push(rotation[n - 1]); // Last character
        if (rotation === text) {
            primaryIndex = i; // Store the index of the original string
        }
    }

    if (primaryIndex === -1) {
        // This should ideally not happen if the original string is among its own rotations
        throw new Error("Original string not found in sorted rotations. This indicates an algorithm error or a very unusual input.");
    }

    return {
        encoded: lastCharacters.join(''),
        primaryIndex: primaryIndex
    };
}

/**
 * Performs the inverse Burrows-Wheeler Transform (iBWT) to decode a string.
 *
 * @param bwtResult An object containing the encoded string and the primary index.
 * @returns The original decoded string.
 */
export function bwtDecode(bwtResult: BWTResult): string {
    const { encoded: L, primaryIndex } = bwtResult;

    if (!L) {
        return "";
    }

    const n = L.length;

    // 1. Create the first column (F) by sorting the last column (L)
    const F = L.split('').sort().join('');

    // 2. Build the LF-mapping (jump table)
    // This table maps an index in L to its corresponding index in F.
    // It uses the property: the k-th occurrence of a character 'c' in L
    // corresponds to the k-th occurrence of 'c' in F.

    // Map to store the first occurrence index of each character in F
    const firstOccurrences = new Map<string, number>();
    for (let i = 0; i < n; i++) {
        const char = F[i];
        if (!firstOccurrences.has(char)) {
            firstOccurrences.set(char, i);
        }
    }

    // Map to store current counts of characters as we iterate through L
    const charCounts = new Map<string, number>();
    for (const char of L) {
        charCounts.set(char, 0); // Initialize counts
    }

    // The LF-mapping (link array): link[i] = j means L[i] is followed by F[j]
    const link: number[] = new Array(n);
    for (let i = 0; i < n; i++) {
        const char = L[i];
        const count = charCounts.get(char)!; // Get current count for this char in L
        link[i] = firstOccurrences.get(char)! + count; // Calculate target index in F
        charCounts.set(char, count + 1); // Increment count for next occurrence
    }

    // 3. Reconstruct the original string using the LF-mapping
    const decodedChars: string[] = new Array(n);
    let currentIndex = primaryIndex; // Start at the primary index

    for (let i = n - 1; i >= 0; i--) {
        // The character at L[currentIndex] is the i-th character of the original string (from right to left)
        decodedChars[i] = L[currentIndex];
        // Jump to the previous character's position in L
        currentIndex = link[currentIndex];
    }

    return decodedChars.join('');
}

// --- Example Usage ---
function runBWTExample(input: string) {
    console.log(`\nOriginal: "${input}"`);

    const encodedResult = bwtEncode(input);
    console.log(`Encoded: "${encodedResult.encoded}" (Primary Index: ${encodedResult.primaryIndex})`);

    const decodedText = bwtDecode(encodedResult);
    console.log(`Decoded: "${decodedText}"`);

    console.log(`Matches original? ${input === decodedText}`);
}

// Example 1: Simple string
runBWTExample("BANANA$"); // Sentinel '$' is often used to ensure uniqueness and simplify decoding

// Example 2: Another common example
runBWTExample("ABRACADABRA$");

// Example 3: String without sentinel (still works if primaryIndex is correctly found)
runBWTExample("GATTACA");

// Example 4: Repeating characters
runBWTExample("MMMMISSISSIPPI");

// Example 5: Empty string
runBWTExample("");

// Example 6: Single character string
runBWTExample("A");
