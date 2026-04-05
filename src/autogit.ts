/**
 * Merge two sorted arrays into one sorted array.
 *
 * @param left  the first sorted array
 * @param right the second sorted array
 * @param cmp   optional comparison function (a, b) => number
 *              negative → a < b, 0 → a === b, positive → a > b
 * @returns a new sorted array containing all elements from `left` and `right`
 */
function merge<T>(
  left: T[],
  right: T[],
  cmp: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] {
  const result: T[] = []
  let i = 0
  let j = 0

  while (i < left.length && j < right.length) {
    if (cmp(left[i], right[j]) <= 0) {
      result.push(left[i++])
    } else {
      result.push(right[j++])
    }
  }

  // Append any leftovers.
  return result.concat(left.slice(i)).concat(right.slice(j))
}

/**
 * Recursive Merge Sort implementation.
 *
 * @param array array to sort
 * @param cmp   optional comparison function
 * @returns a new sorted array, leaving the original unchanged
 */
export function mergeSort<T>(
  array: T[],
  cmp: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] {
  if (array.length <= 1) return array.slice()

  const mid = Math.floor(array.length / 2)
  const left = mergeSort(array.slice(0, mid), cmp)
  const right = mergeSort(array.slice(mid), cmp)

  return merge(left, right, cmp)
}
const nums = [8, 3, 1, 7, 0, 10, 2]
const sorted = mergeSort(nums)
console.log(sorted) // [0, 1, 2, 3, 7, 8, 10]
interface Person {
  name: string
  age: number
}

const people: Person[] = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 24 },
  { name: 'Cara', age: 27 },
]

const byAge = mergeSort(people, (a, b) => a.age - b.age)
console.log(byAge)
