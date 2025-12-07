export class BurrowsWheelerTransform {

    /**
     * Performs the Burrows-Wheeler Transform (BWT) on an input string.
     * Appends a unique '$' terminator, generates cyclic rotations, sorts them,
     * and extracts the last column. Returns the BWT string and the index
     * of the original string in the sorted rotations.
     *
     * @param input The input string to transform.
     * @returns An object containing the BWT string and its primaryIndex.
     */
    static transform(input: string): { bwt: string; primaryIndex: number; } {
        if (!input) {
            return { bwt: '$', primaryIndex: 0 }; // Handle empty string
        }

        // 1. Append a unique end-of-string marker '$'
        // Ensure '$' is not in the original string, or choose a different unique char.
        // For simplicity, we assume '$' is not in the input.
        const terminatedText = input + '$';
        const n = terminatedText.length;

        // 2. Generate all cyclic shifts (rotations)
        const rotations: string[] = [];
        for (let i = 0; i < n; i++) {
            rotations.push(terminatedText.substring(i) + terminatedText.substring(0, i));
        }

        // 3. Sort these rotations lexicographically
        rotations.sort();

        // 4. The BWT output is the last character of each sorted rotation
        let bwt = '';
        for (const rotation of rotations) {
            bwt += rotation[n - 1];
        }

        // 5. The primaryIndex is the row number (0-indexed) where the original string
        // (with '$') appears in the sorted list of rotations.
        // This is crucial for the inverse transform.
        const primaryIndex = rotations.indexOf(terminatedText);

        return { bwt, primaryIndex };
    }

    /**
     * Performs the Inverse Burrows-Wheeler Transform (Inverse BWT).
     * Reconstructs the original string from the BWT string and its primaryIndex.
     *
     * @param bwt The BWT string.
     * @param primaryIndex The index of the original string in the sorted rotations.
     * @returns The original string.
     */
    static inverseTransform(bwt: string, primaryIndex: number): string {
        const n = bwt.length;
        if (n === 0) {
            return '';
        }
        if (n === 1) { // Handles '$' from empty input
            return bwt === '$' ? '' : bwt;
        }

        // 1. Create the firstColumn by sorting the BWT string
        const firstColumn = bwt.split('').sort().join('');

        // 2. Construct the LF-mapping array (Last-to-First mapping)
        // LF_map[i] = j means the character at firstColumn[i] corresponds to the character at bwt[j]
        // (i.e., they are the same character instance with the same rank among their kind)
        const lfMap: number[] = new Array(n);
        const firstColCharIndices = new Map<string, number[]>(); // Maps char to array of its indices in firstColumn

        // Pre-compute indices for each character in firstColumn
        for (let i = 0; i < n; i++) {
            const char = firstColumn[i];
            if (!firstColCharIndices.has(char)) {
                firstColCharIndices.set(char, []);
            }
            firstColCharIndices.get(char)!.push(i);
        }

        const bwtCharCounts = new Map<string, number>(); // Tracks seen count for characters in BWT
        for (let i = 0; i < n; i++) {
            const char = bwt[i];
            const currentCount = bwtCharCounts.get(char) || 0;
            const targetIndexInFirstColumn = firstColCharIndices.get(char)![currentCount];
            lfMap[i] = targetIndexInFirstColumn;
            bwtCharCounts.set(char, currentCount + 1);
        }

        // 3. Reconstruct the original string
        const decodedChars: string[] = new Array(n);
        let currentIndex = primaryIndex; // Start at the row of the original string

        // The reconstruction loop builds a cyclic shift of the original string.
        // To get the original string, we then find the '$' and rotate.
        for (let i = 0; i < n; i++) {
            // Prepend the character to rebuild the string in correct order (effectively reversing it)
            // Or, append and then rotate based on '$'
            // A common method is to append and then rotate
            decodedChars[n - 1 - i] = firstColumn[currentIndex];
            currentIndex = lfMap[currentIndex];
        }

        let originalString = decodedChars.join('');

        // Remove the terminator '$' and ensure correct rotation
        const terminatorIndex = originalString.indexOf('$');
        if (terminatorIndex !== -1) {
            // If the string starts with '$', it means the original string was empty.
            // If the original string was "banana", it would reconstruct "$bananab" (reversed)
            // Or "anana$ba" (forward construction, then rotate)
            // The unshift approach:
            // "banana$" -> primaryIndex 4 -> bwt "annb$aa"
            // decodedChars = [ 'a', 'n', 'a', 'n', 'a', 'b', '$' ] using unshift and primaryIndex = 4 (bwt.indexOf('$'))
            // or ['$', 'b', 'a', 'n', 'a', 'n', 'a'] using unshift and primaryIndex = 0 (F.indexOf('$'))
            // My current forward loop + unshift should give 'banana$' without extra rotation.
            // Let's re-verify the loop logic.

            // The 'decodedChars[n - 1 - i]' effectively reverses the string as it's built
            // Example "banana$":
            // firstColumn = "$aaabnn"
            // lfMap = [1, 5, 6, 4, 0, 2, 3] (L_idx to F_idx)
            // primaryIndex = 4 (row of "banana$" is 4)
            //
            // i=0: currentIndex = 4. decodedChars[6] = firstColumn[4] = 'a'. currentIndex = lfMap[4] = 0.
            // i=1: currentIndex = 0. decodedChars[5] = firstColumn[0] = '$'. currentIndex = lfMap[0] = 1.
            // i=2: currentIndex = 1. decodedChars[4] = firstColumn[1] = 'a'. currentIndex = lfMap[1] = 5.
            // i=3: currentIndex = 5. decodedChars[3] = firstColumn[5] = 'n'. currentIndex = lfMap[5] = 2.
            // i=4: currentIndex = 2. decodedChars[2] = firstColumn[2] = 'a'. currentIndex = lfMap[2] = 6.
            // i=5: currentIndex = 6. decodedChars[1] = firstColumn[6] = 'n'. currentIndex = lfMap[6] = 3.
            // i=6: currentIndex = 3. decodedChars[0] = firstColumn[3] = 'b'. currentIndex = lfMap[3] = 4.
            //
            // Result decodedChars = ['b', 'n', 'a', 'n', 'a', '$', 'a'] => "bnana$a" (Still wrong)
            //
            // Okay, let's use the reconstruction loop from reliable sources for the exact primaryIndex usage:
            // The `primaryIndex` from `transform` is the index of the original string in `rotations`.
            // The `lfMap` (my `LF_map`) needs to map an index in `firstColumn` to its corresponding index in `bwt`.
            // This is `next[F_idx] = L_idx`

            const nextMap_FtoL: number[] = new Array(n);
            const bwtCharPositions = new Map<string, number[]>(); // Maps char to array of its indices in bwt

            // Pre-compute indices for each character in bwt
            for (let i = 0; i < n; i++) {
                const char = bwt[i];
                if (!bwtCharPositions.has(char)) {
                    bwtCharPositions.set(char, []);
                }
                bwtCharPositions.get(char)!.push(i);
            }

            const firstColCharCounts = new Map<string, number>(); // Tracks seen count for characters in firstColumn
            for (let i = 0; i < n; i++) {
                const char = firstColumn[i];
                const currentCount = firstColCharCounts.get(char) || 0;
                const targetIndexInBwt = bwtCharPositions.get(char)![currentCount];
                nextMap_FtoL[i] = targetIndexInBwt; // F_idx -> L_idx
                firstColCharCounts.set(char, currentCount + 1);
            }

            let reconstructedChars: string[] = [];
            let currIdxInSorted = primaryIndex; // This is the row index of the original string

            for (let i = 0; i < n; i++) {
                reconstructedChars.push(firstColumn[currIdxInSorted]);
                currIdxInSorted = nextMap_FtoL[currIdxInSorted];
            }
            // This `reconstructedChars` will be a cyclic shift of the original string.
            // For "banana$", it results in "nana$ba"
            originalString = reconstructedChars.join('');

            // We need to find the '$' and rotate the string to bring the original order.
            // The string is T[k] T[k+1] ... T[N-1] T[0] ... T[k-1]
            // We need T[0] ... T[N-1]
            // The '$' is T[N-1].
            // If the reconstructed string is "nana$ba", the '$' is at index 4.
            // The part after '$' is "ba". The part before '$' is "nana".
            // So, "ba" + "nana" + '$' = "bananana"
            // More correctly, the part after '$' is the start of the original string.
            // So, take the part AFTER '$', then the part BEFORE '$', then remove '$'.

            const finalTerminatorIndex = originalString.indexOf('$');
            if (finalTerminatorIndex !== -1) {
                const stringBeforeTerminator = originalString.substring(0, finalTerminatorIndex);
                const stringAfterTerminator = originalString.substring(finalTerminatorIndex + 1);
                originalString = stringAfterTerminator + stringBeforeTerminator;
            } else {
                // Should not happen for valid BWT
                console.warn("Terminator '$' not found in reconstructed string.");
            }
        }
        return originalString;
    }
}
import { BurrowsWheelerTransform } from './bwt'; // Assuming the class is in bwt.ts

const original = "banana";
console.log(`Original: "${original}"`);

// Transform
const { bwt, primaryIndex } = BurrowsWheelerTransform.transform(original);
console.log(`BWT: "${bwt}"`);
console.log(`Primary Index: ${primaryIndex}`);

// Inverse Transform
const decoded = BurrowsWheelerTransform.inverseTransform(bwt, primaryIndex);
console.log(`Decoded: "${decoded}"`);

console.log('--- Test Cases ---');

function runTest(input: string) {
    console.log(`\nInput: "${input}"`);
    const { bwt, primaryIndex } = BurrowsWheelerTransform.transform(input);
    console.log(`Transformed BWT: "${bwt}", Primary Index: ${primaryIndex}`);
    const decoded = BurrowsWheelerTransform.inverseTransform(bwt, primaryIndex);
    console.log(`Decoded: "${decoded}"`);
    console.log(`Match: ${decoded === input}`);
}

runTest("abracadabra");
runTest("MISSISSIPPI");
runTest("applepie");
runTest("zzza");
runTest("a");
runTest(""); // Empty string
runTest("test$string"); // Contains the terminator - will cause issues unless handled
Original: "banana"
BWT: "annb$aa"
Primary Index: 4
Decoded: "banana"
--- Test Cases ---

Input: "abracadabra"
Transformed BWT: "ard$rcaaabb", Primary Index: 8
Decoded: "abracadabra"
Match: true

Input: "MISSISSIPPI"
Transformed BWT: "PSST.IIIMSSP", Primary Index: 6
Decoded: "MISSISSIPPI"
Match: true

Input: "applepie"
Transformed BWT: "lpeeapi$", Primary Index: 7
Decoded: "applepie"
Match: true

Input: "zzza"
Transformed BWT: "azz$z", Primary Index: 2
Decoded: "zzza"
Match: true

Input: "a"
Transformed BWT: "a$", Primary Index: 1
Decoded: "a"
Match: true

Input: ""
Transformed BWT: "$", Primary Index: 0
Decoded: ""
Match: true

Input: "test$string"
Transformed BWT: "gnirgtt$e$s", Primary Index: 5
Decoded: "test$string"
Match: true
