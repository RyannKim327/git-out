/**
 * Forward Burrows–Wheeler Transform.
 * @param input – original string
 * @returns {bwt, index} – BWT string and index of the original string in the sorted rotation table.
 */
export function bwtEncode(input: string): { bwt: string; index: number } {
    // 1️⃣ Append a sentinel that is smaller than every other char
    const sentinel = '\0';
    const padded = input + sentinel;

    // 2️⃣ Make all cyclic rotations
    // Using an array of start indices so we never build full strings.
    const n = padded.length;
    const rotations = Array.from({ length: n }, (_, i) => i);

    // 3️⃣ Stable sort rotations lexicographically
    rotations.sort((a, b) => {
        for (let offset = 0; offset < n; offset++) {
            const ca = padded[(a + offset) % n];
            const cb = padded[(b + offset) % n];
            if (ca < cb) return -1;
            if (ca > cb) return 1;
            // equal – iterate next offset
        }
        return 0;       // rotations are identical – should not happen with sentinel
    });

    // 4️⃣ Build the BWT string by taking the character preceding each rotation
    const bwt = new Array<string>(n);
    let originalIndex = -1;
    for (let i = 0; i < n; i++) {
        const rotStart = rotations[i];
        const bwtChar = padded[(rotStart + n - 1) % n]; // char before rotation
        bwt[i] = bwtChar;

        // If this rotation is the original (started at 0), remember its position
        if (rotStart === 0) originalIndex = i;
    }

    return { bwt: bwt.join(''), index: originalIndex };
}
/**
 * Inverse Burrows–Wheeler Transform.
 * @param bwt – BWT string (length n)
 * @param index – index of the original string in the sorted rotations
 * @returns original string (without the sentinel)
 */
export function bwtDecode(bwt: string, index: number): string {
    const n = bwt.length;
    // 1️⃣ Build first column by sorting the BWT string
    const first = bwt.split('').sort(); // stable because JS sort is stable (ES2019+)

    // 2️⃣ Compute the “next” array – mapping from a row in first column
    //    to the corresponding row in last column.
    //    This is essentially the Longest‑Common‑Prefix order of the rotations.
    const next = new Array<number>(n);
    const buckets = new Map<string, number[]>();

    // Collect indices of each character in the BWT string
    for (let i = 0; i < n; i++) {
        const ch = bwt[i];
        if (!buckets.has(ch)) buckets.set(ch, []);
        buckets.get(ch)!.push(i);
    }

    // For each character, allocate its positions in the first column
    const bucketIterators = new Map<string, number>();
    for (const [ch, posList] of buckets.entries()) {
        bucketIterators.set(ch, 0);
    }

    for (let i = 0; i < n; i++) {
        const ch = first[i];
        const idxInBlt = buckets.get(ch)![bucketIterators.get(ch)!++];
        next[i] = idxInBlt;
    }

    // 3️⃣ Reconstruct original by following the next pointers starting from `index`
    const result: string[] = new Array<string>(n);
    let row = index;
    for (let i = n - 1; i >= 0; i--) {
        result[i] = first[row];
        row = next[row];
    }

    // The sentinel is the first char of the reconstructed string
    // Strip it and return the original
    return result.join('').slice(1); // drop sentinel
}
