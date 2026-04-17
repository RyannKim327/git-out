function kthSmallestBySort(arr: number[], k: number): number | null {
  if (k < 1 || k > arr.length) return null
  const sorted = [...arr].sort((a, b) => a - b)   // cloning keeps the input untouched
  return sorted[k - 1]
}
function partition(arr: number[], left: number, right: number, pivotIndex: number): number {
  const pivotValue = arr[pivotIndex]
  // move pivot to end
  [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]]
  let storeIndex = left

  for (let i = left; i < right; i++) {
    if (arr[i] < pivotValue) {
      [arr[storeIndex], arr[i]] = [arr[i], arr[storeIndex]]
      storeIndex++
    }
  }

  // move pivot to its final place
  [arr[right], arr[storeIndex]] = [arr[storeIndex], arr[right]]
  return storeIndex
}

function quickselect(arr: number[], k: number): number | null {
  if (k < 1 || k > arr.length) return null

  let left = 0
  let right = arr.length - 1
  const targetIdx = k - 1

  while (true) {
    const pivotIdx = Math.floor(Math.random() * (right - left + 1)) + left
    const pivotPos = partition(arr, left, right, pivotIdx)

    if (pivotPos === targetIdx) return arr[pivotPos]
    if (pivotPos > targetIdx) right = pivotPos - 1
    else left = pivotPos + 1
  }
}
const arrCopy = [...original]
const kth = quickselect(arrCopy, k)
function kthSmallestByCounting(arr: number[], k: number): number | null {
  if (k < 1 || k > arr.length) return null

  // Find min/max to size the histogram
  let min = arr[0], max = arr[0]
  for (const v of arr) {
    if (v < min) min = v
    if (v > max) max = v
  }

  const freq = new Array(max - min + 1).fill(0)
  for (const v of arr) freq[v - min]++

  let count = 0
  for (let i = 0; i < freq.length; i++) {
    count += freq[i]
    if (count >= k) return i + min
  }
  return null   // shouldn't happen
}
