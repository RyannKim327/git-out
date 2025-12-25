function removeByIndex<T>(arr: T[], index: number): T[] {
  if (index >= 0 && index < arr.length) {
    arr.splice(index, 1);   // remove 1 element at `index`
  }
  return arr;               // mutated array (also returned for convenience)
}

// Example
const numbers = [10, 20, 30, 40];
removeByIndex(numbers, 2);   // numbers => [10, 20, 40]
function removeByValue<T>(arr: T[], value: T): T[] {
  return arr.filter(item => item !== value);
}

// Example
const fruits = ['apple', 'banana', 'cherry', 'banana'];
const withoutBanana = removeByValue(fruits, 'banana');
// withoutBanana => ['apple', 'cherry']
function removeFirst<T>(arr: T[], value: T): T[] {
  const idx = arr.indexOf(value);   // works for primitives
  // For objects you’d use `findIndex` with a custom predicate
  if (idx !== -1) {
    arr.splice(idx, 1);
  }
  return arr;
}

// Example
const colors = ['red', 'green', 'blue', 'green'];
removeFirst(colors, 'green'); // colors => ['red', 'blue', 'green']
interface Person { id: number; name: string; }

function removePersonById(arr: Person[], id: number): Person[] {
  const idx = arr.findIndex(p => p.id === id);
  if (idx !== -1) arr.splice(idx, 1);
  return arr;
}
type RemoveOptions = { mutable?: boolean };

function remove<T>(
  arr: T[],
  predicate: (item: T, index: number, array: T[]) => boolean,
  options: RemoveOptions = {}
): T[] {
  const { mutable = false } = options;

  if (mutable) {
    const idx = arr.findIndex(predicate);
    if (idx !== -1) arr.splice(idx, 1);
    return arr; // mutated
  }

  // immutable – create a new array without the first match
  const idx = arr.findIndex(predicate);
  if (idx === -1) return [...arr]; // nothing to remove

  return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
}

// Usage
const nums = [1, 2, 3, 4];
remove(nums, n => n === 3);               // => [1,2,4] (new array)
remove(nums, n => n === 2, { mutable:true }); // nums mutated to [1,3,4]
interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

function removeTodoById(todos: Todo[], id: string): Todo[] {
  return todos.filter(todo => todo.id !== id);
}

// Or mutable version:
function removeTodoByIdMutable(todos: Todo[], id: string): void {
  const idx = todos.findIndex(t => t.id === id);
  if (idx !== -1) todos.splice(idx, 1);
}
/**
 * Remove elements from an array.
 *
 * @param arr          The source array.
 * @param predicate    Function that returns true for items to remove.
 * @param options      { mutable?: boolean, removeAll?: boolean }
 * @returns            The array after removal (new array unless mutable=true).
 */
function removeFromArray<T>(
  arr: T[],
  predicate: (item: T, idx: number, arr: T[]) => boolean,
  options: { mutable?: boolean; removeAll?: boolean } = {}
): T[] {
  const { mutable = false, removeAll = true } = options;

  if (mutable) {
    if (removeAll) {
      // mutate in‑place, removing *all* matches
      for (let i = arr.length - 1; i >= 0; i--) {
        if (predicate(arr[i], i, arr)) arr.splice(i, 1);
      }
    } else {
      // remove only the first match
      const idx = arr.findIndex(predicate);
      if (idx !== -1) arr.splice(idx, 1);
    }
    return arr;
  }

  // immutable path
  if (removeAll) {
    return arr.filter((item, i) => !predicate(item, i, arr));
  }

  const idx = arr.findIndex(predicate);
  if (idx === -1) return [...arr];
  return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
}

// Example usage
const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
const newData = removeFromArray(data, x => x.id === 2); // immutable, removeAll default true
// newData => [{id:1},{id:3}]
