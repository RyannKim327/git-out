function interpolationSearch(
    sortedArray: number[],
    target: number
): number {
    let low = 0;
    let high = sortedArray.length - 1;

    while (low <= high && target >= sortedArray[low] && target <= sortedArray[high]) {
        // Prevent division by zero
        if (sortedArray[high] === sortedArray[low]) {
            if (sortedArray[low] === target) {
                return low;
            }
            return -1;
        }

        // Calculate the probe position using interpolation formula
        const position = low + Math.floor(
            ((target - sortedArray[low]) * (high - low)) / 
            (sortedArray[high] - sortedArray[low])
        );

        // Check if position is within bounds
        if (position < low || position > high) {
            return -1;
        }

        if (sortedArray[position] === target) {
            return position;
        }

        if (sortedArray[position] < target) {
            low = position + 1;
        } else {
            high = position - 1;
        }
    }

    return -1;
}
function interpolationSearchGeneric<T>(
    sortedArray: T[],
    target: T,
    getValue: (item: T) => number = (item) => item as number
): number {
    let low = 0;
    let high = sortedArray.length - 1;

    const targetValue = getValue(target);
    const lowValue = getValue(sortedArray[low]);
    const highValue = getValue(sortedArray[high]);

    while (low <= high && targetValue >= lowValue && targetValue <= highValue) {
        if (highValue === lowValue) {
            if (getValue(sortedArray[low]) === targetValue) {
                return low;
            }
            return -1;
        }

        const position = low + Math.floor(
            ((targetValue - lowValue) * (high - low)) / 
            (highValue - lowValue)
        );

        if (position < low || position > high) {
            return -1;
        }

        const positionValue = getValue(sortedArray[position]);
        
        if (positionValue === targetValue) {
            return position;
        }

        if (positionValue < targetValue) {
            low = position + 1;
        } else {
            high = position - 1;
        }
    }

    return -1;
}
class InterpolationSearch {
    /**
     * Performs interpolation search on a sorted array
     * @param sortedArray The sorted array to search
     * @param target The value to search for
     * @returns The index of the target, or -1 if not found
     */
    static search(sortedArray: number[], target: number): number {
        // Input validation
        if (!Array.isArray(sortedArray) || sortedArray.length === 0) {
            return -1;
        }

        let low = 0;
        let high = sortedArray.length - 1;

        while (low <= high && 
               target >= sortedArray[low] && 
               target <= sortedArray[high]) {
            
            // Handle arrays with uniform values
            if (sortedArray[low] === sortedArray[high]) {
                return sortedArray[low] === target ? low : -1;
            }

            // Calculate probe position using interpolation formula
            const position = low + Math.floor(
                ((target - sortedArray[low]) * (high - low)) / 
                (sortedArray[high] - sortedArray[low])
            );

            // Safety check for position bounds
            if (position < low || position > high) {
                break;
            }

            const currentValue = sortedArray[position];

            if (currentValue === target) {
                return position;
            } else if (currentValue < target) {
                low = position + 1;
            } else {
                high = position - 1;
            }
        }

        return -1;
    }

    /**
     * Performs interpolation search with additional statistics
     */
    static searchWithStats(
        sortedArray: number[], 
        target: number
    ): { index: number; iterations: number; comparisons: number } {
        let iterations = 0;
        let comparisons = 0;
        let low = 0;
        let high = sortedArray.length - 1;

        while (low <= high && 
               target >= sortedArray[low] && 
               target <= sortedArray[high]) {
            
            iterations++;
            
            if (sortedArray[low] === sortedArray[high]) {
                comparisons++;
                return { 
                    index: sortedArray[low] === target ? low : -1, 
                    iterations, 
                    comparisons 
                };
            }

            const position = low + Math.floor(
                ((target - sortedArray[low]) * (high - low)) / 
                (sortedArray[high] - sortedArray[low])
            );

            comparisons++;
            if (position < low || position > high) {
                break;
            }

            comparisons++;
            if (sortedArray[position] === target) {
                return { index: position, iterations, comparisons };
            }

            comparisons++;
            if (sortedArray[position] < target) {
                low = position + 1;
            } else {
                high = position - 1;
            }
        }

        return { index: -1, iterations, comparisons };
    }
}

// Example usage
const numbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const target = 13;

// Basic search
const result1 = InterpolationSearch.search(numbers, target);
console.log(`Found ${target} at index: ${result1}`);

// Search with statistics
const result2 = InterpolationSearch.searchWithStats(numbers, target);
console.log(`Found at index: ${result2.index}, Iterations: ${result2.iterations}, Comparisons: ${result2.comparisons}`);

// Searching for non-existent value
const missingResult = InterpolationSearch.search(numbers, 8);
console.log(`Search for 8: ${missingResult}`);

// Using generic version with custom objects
interface Person {
    id: number;
    name: string;
}

const people: Person[] = [
    { id: 1, name: "Alice" },
    { id: 3, name: "Bob" },
    { id: 5, name: "Charlie" },
    { id: 7, name: "Diana" },
];

const personIndex = interpolationSearchGeneric(
    people, 
    { id: 5, name: "Charlie" } as Person, 
    (person: Person) => person.id
);
console.log(`Found person at index: ${personIndex}`);
