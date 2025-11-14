class BWT {
    private readonly END_MARKER: string;

    /**
     * Creates a BWT instance.
     * @param endMarker A unique character not present in the input strings. Default is '$'.
     */
    constructor(endMarker: string = '$') {
        if (endMarker.length !== 1) {
            throw new Error("End marker must be a single character.");
        }
        this.END_MARKER = endMarker;
    }

    /**
     * Encodes a string using the Burrows-Wheeler Transform.
     * @param text The input string to encode.
     * @returns An object containing the BWT string and the primary index.
     * @throws Error if the input text contains the END_MARKER.
     */
    encode(text: string): { bwt: string; primaryIndex: number } {
        if (!text) {
            return { bwt: "", primaryIndex: -1 };
        }
        if (text.includes(this.END_MARKER)) {
            throw new Error(`Input text must not contain the end marker '${this.END_MARKER}'`);
        }

        const fullText = text + this.END_MARKER;
        const n = fullText.length;
        const rotations: string[] = [];

        // 1. Generate all cyclic rotations
        for (let i = 0; i < n; i++) {
            rotations.push(fullText.substring(i) + fullText.substring(0, i));
        }

        // 2. Sort rotations alphabetically
        rotations.sort();

        let bwt = "";
        let primaryIndex = -1;

        // 3. Extract the last character of each sorted rotation to form the BWT string
        // 4. Find the primaryIndex (where the original string is in the sorted list)
        for (let i = 0; i < n; i++) {
            bwt += rotations[i][n - 1]; // Last character of current rotation
            if (rotations[i] === fullText) {
                primaryIndex = i;
            }
        }

        return { bwt, primaryIndex };
    }

    /**
     * Decodes a BWT string back to its original form.
     * @param bwt The BWT string (last column).
     * @param primaryIndex The primary index returned by the encode function.
     * @returns The decoded original string.
     */
    decode(bwt: string, primaryIndex: number): string {
        if (!bwt || primaryIndex === -1) {
            return "";
        }

        const n = bwt.length;

        // 1. Create the first column (F) by sorting the BWT string (L)
        const firstColumnChars = bwt.split('').sort();

        // 2. Build the Last-to-First (LF) mapping
        // This map LF[i] tells us, if we are at position `i` in L,
        // which position in F corresponds to the same character occurrence.
        // E.g., if L[i] is the k-th 'a', LF[i] is the index of the k-th 'a' in F.

        // charToFirstIndexInF: Stores the starting index of each character in the sorted firstColumnChars
        const charToFirstIndexInF: { [char: string]: number } = {};
        for (let i = 0; i < n; i++) {
            const char = firstColumnChars[i];
            if (!(char in charToFirstIndexInF)) {
                charToFirstIndexInF[char] = i;
            }
        }

        // lfMap: Stores the mapping from an index in L to an index in F
        const lfMap: number[] = new Array(n);
        const bwtCharCounts: { [char: string]: number } = {}; // Counts for characters encountered in bwt (L)

        for (let i = 0; i < n; i++) {
            const char = bwt[i];
            bwtCharCounts[char] = (bwtCharCounts[char] || 0) + 1;
            const count = bwtCharCounts[char]; // This is the k-th occurrence of 'char' in bwt up to index i

            // The (count)-th occurrence of 'char' in F is at:
            // charToFirstIndexInF[char] + (count - 1)
            lfMap[i] = charToFirstIndexInF[char] + (count - 1);
        }

        // 3. Reconstruct the string using the LF-mapping
        const decodedChars: string[] = [];
        let currentLFIndex = primaryIndex; // Start at the primary index (row of original string)

        // The reconstruction proceeds by repeatedly taking the character from BWT[currentLFIndex]
        // and then using the LF-map to find the position of the character that preceded it in the original string.
        // This effectively builds the string in reverse order (S_N-1, S_N-2, ..., S_0)
        for (let i = 0; i < n; i++) {
            decodedChars.push(bwt[currentLFIndex]);
            currentLFIndex = lfMap[currentLFIndex];
        }

        // The characters are collected in reverse order, so reverse them and remove the end marker.
        const fullDecoded = decodedChars.reverse().join('');
        return fullDecoded.slice(0, fullDecoded.length - 1); // Remove the END_MARKER
    }
}

// --- Example Usage ---
const bwtTransformer = new BWT(); // Using default '$' end marker

try {
    const originalText1 = "banana";
    console.log(`Original: "${originalText1}"`);
    const encoded1 = bwtTransformer.encode(originalText1);
    console.log("Encoded:", encoded1); // Expected: { bwt: "annb$aa", primaryIndex: 4 }
    const decoded1 = bwtTransformer.decode(encoded1.bwt, encoded1.primaryIndex);
    console.log(`Decoded: "${decoded1}"`); // Expected: "banana"
    console.log("Match:", originalText1 === decoded1);
    console.log("---");

    const originalText2 = "abracadabra";
    console.log(`Original: "${originalText2}"`);
    const encoded2 = bwtTransformer.encode(originalText2);
    console.log("Encoded:", encoded2); // Expected: { bwt: "ard$rcaaabb", primaryIndex: 3 }
    const decoded2 = bwtTransformer.decode(encoded2.bwt, encoded2.primaryIndex);
    console.log(`Decoded: "${decoded2}"`); // Expected: "abracadabra"
    console.log("Match:", originalText2 === decoded2);
    console.log("---");

    const originalText3 = "Mississippi";
    console.log(`Original: "${originalText3}"`);
    const encoded3 = bwtTransformer.encode(originalText3);
    console.log("Encoded:", encoded3); // Expected: { bwt: "pssm$iipii", primaryIndex: 0 }
    const decoded3 = bwtTransformer.decode(encoded3.bwt, encoded3.primaryIndex);
    console.log(`Decoded: "${decoded3}"`); // Expected: "Mississippi"
    console.log("Match:", originalText3 === decoded3);
    console.log("---");

    const originalText4 = "a";
    console.log(`Original: "${originalText4}"`);
    const encoded4 = bwtTransformer.encode(originalText4);
    console.log("Encoded:", encoded4); // Expected: { bwt: "$a", primaryIndex: 1 }
    const decoded4 = bwtTransformer.decode(encoded4.bwt, encoded4.primaryIndex);
    console.log(`Decoded: "${decoded4}"`); // Expected: "a"
    console.log("Match:", originalText4 === decoded4);
    console.log("---");

    const originalText5 = ""; // Empty string
    console.log(`Original: "${originalText5}"`);
    const encoded5 = bwtTransformer.encode(originalText5);
    console.log("Encoded:", encoded5); // Expected: { bwt: "", primaryIndex: -1 }
    const decoded5 = bwtTransformer.decode(encoded5.bwt, encoded5.primaryIndex);
    console.log(`Decoded: "${decoded5}"`); // Expected: ""
    console.log("Match:", originalText5 === decoded5);
    console.log("---");

    // Example with custom end marker if '$' might be in text
    const customBWT = new BWT('\0'); // Using null character as end marker
    const originalText6 = "hello$world";
    console.log(`Original: "${originalText6}"`);
    const encoded6 = customBWT.encode(originalText6);
    console.log("Encoded:", encoded6);
    const decoded6 = customBWT.decode(encoded6.bwt, encoded6.primaryIndex);
    console.log(`Decoded: "${decoded6}"`);
    console.log("Match:", originalText6 === decoded6);
    console.log("---");

    // Error case
    const badText = "hello$world";
    try {
        console.log(`Trying to encode: "${badText}" with default '$' marker`);
        bwtTransformer.encode(badText);
    } catch (e: any) {
        console.error("Error caught:", e.message);
    }

} catch (e: any) {
    console.error("An unexpected error occurred:", e.message);
}
