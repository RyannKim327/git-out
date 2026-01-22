const original = [1, 2, 3, 4, 5];

const reversed = [...original].reverse(); // creates a new array, keeps `original` intact
// or, if you don’t mind mutating the original array
original.reverse();
const copy = [...original];  // spread operator makes a new array
copy.reverse();              // now you have the reversed copy
function reverseArray<T>(arr: T[]): T[] {
  const result: T[] = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
}

const reverseManual = reverseArray(original);
function reverseInPlace<T>(arr: T[]): void {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    // swap
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
}

reverseInPlace(original); // `original` is now reversed
