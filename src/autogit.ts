function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

// usage
const nums = [3, 5, 3, 7, 5, 9];
const uniqueNums = unique(nums);   // [3, 5, 7, 9]
function uniqueInPlace<T>(arr: T[]): void {
  const seen = new Set<T>();
  for (let i = arr.length - 1; i >= 0; i--) {
    if (seen.has(arr[i])) arr.splice(i, 1);
    else seen.add(arr[i]);
  }
}
interface Item { id: number; name: string }

function uniqueById(items: Item[]): Item[] {
  const seen = new Set<number>();
  return items.filter(item =>
    seen.has(item.id) ? false : (seen.add(item.id), true)
  );
}
