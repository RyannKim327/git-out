function findCommonElements<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter(item => arr2.includes(item));
}

// Example usage:
const array1 = [1, 2, 3, 4];
const array2 = [3, 4, 5, 6];
const common = findCommonElements(array1, array2); // Result: [3, 4]
function findCommonElements<T>(arr1: T[], arr2: T[]): T[] {
  const set = new Set(arr2);
  return arr1.filter(item => set.has(item));
}

// Example usage:
const array1 = ["apple", "banana", "banana", "orange"];
const array2 = ["banana", "kiwi", "apple"];
const common = findCommonElements(array1, array2); // Result: ["apple", "banana", "banana"]
import _ from 'lodash';

function findCommonDeepObjects<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter(item1 => 
    arr2.some(item2 => _.isEqual(item1, item2))
  );
}

// Example usage:
const objects1 = [{ id: 1 }, { id: 2 }];
const objects2 = [{ id: 1 }, { id: 3 }];
const commonObjs = findCommonDeepObjects(objects1, objects2); // Result: [{ id: 1 }]
