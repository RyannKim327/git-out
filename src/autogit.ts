function findMajorityElement(arr: number[]): number {
    if (arr.length === 0) {
        throw new Error("Array is empty");
    }

    let count = 0;
    let candidate: number | undefined = undefined;

    // First pass: Find the potential majority candidate
    for (const num of arr) {
        if (count === 0) {
            candidate = num;
            count = 1;
        } else {
            count += (num === candidate) ? 1 : -1;
        }
    }

    // At this point, candidate should not be undefined (if array is non-empty)
    if (candidate === undefined) {
        throw new Error("No candidate found");
    }

    // Second pass: Verify the candidate is the majority element
    const occurrenceCount = arr.reduce((acc, num) => num === candidate ? acc + 1 : acc, 0);
    if (occurrenceCount > Math.floor(arr.length / 2)) {
        return candidate;
    } else {
        throw new Error("No majority element found");
    }
}
