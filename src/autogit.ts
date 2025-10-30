function findCommonElements<T>(arr1: T[], arr2: T[]): T[] {
    return arr1.filter(item => arr2.includes(item));
}

// Example usage
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
const common = findCommonElements(array1, array2);
// Output: [3, 4, 5]
function findCommonElementsSet<T>(arr1: T[], arr2: T[]): T[] {
    const set2 = new Set(arr2);
    return arr1.filter(item => set2.has(item));
}

// Example usage
const commonSet = findCommonElementsSet(array1, array2);
function findCommonObjects<T>(
    arr1: T[], 
    arr2: T[], 
    comparator: (a: T, b: T) => boolean = (a, b) => a === b
): T[] {
    return arr1.filter(item1 => 
        arr2.some(item2 => comparator(item1, item2))
    );
}

// Example with custom comparator
const objects1 = [{ id: 1 }, { id: 2 }];
const objects2 = [{ id: 2 }, { id: 3 }];

const commonObjects = findCommonObjects(
    objects1, 
    objects2, 
    (a, b) => a.id === b.id
);
// Output: [{ id: 2 }]
function intersection<T>(arr1: T[], arr2: T[]): T[] {
    return arr1.filter(value => arr2.includes(value));
}

// With type inference
const numbersIntersection = intersection([1, 2, 3], [2, 3, 4]);
const stringsIntersection = intersection(['a', 'b'], ['b', 'c']);
function safeIntersection<T>(arr1: T[], arr2: T[]): T[] {
    if (!arr1 || !arr2) return [];
    return arr1.filter(item => arr2.includes(item));
}

// Example with null arrays
const result = safeIntersection(null as number[], [1, 2]); // Returns []
function optimizedIntersection<T>(arr1: T[], arr2: T[]): T[] {
    const set = new Set<T>();
    const result: T[] = [];
    
    for (const item of arr2) {
        set.add(item);
    }
    
    for (const item of arr1) {
        if (set.has(item)) {
            result.push(item);
            set.delete(item); // Prevent duplicates if needed
        }
    }
    
    return result;
}
