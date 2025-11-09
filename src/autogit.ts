const idx = arr.indexOf(valueToRemove);
if (idx !== -1) arr.splice(idx, 1);
const idx = arr.findIndex(n => n % 2 === 0);
if (idx !== -1) arr.splice(idx, 1);
const newArr = arr.filter(x => x !== valueToRemove);
const newArr = (() => {
  const idx = arr.indexOf(valueToRemove);
  return idx === -1 ? arr : [...arr.slice(0, idx), ...arr.slice(idx + 1)];
})();
// mutable
function removeInPlace<T>(arr: T[], predicate: (x: T) => boolean): T | undefined {
  const idx = arr.findIndex(predicate);
  return idx === -1 ? undefined : arr.splice(idx, 1)[0];
}

// immutable
function removeFirst<T>(arr: readonly T[], predicate: (x: T) => boolean): T[] {
  const idx = arr.findIndex(predicate);
  return idx === -1 ? [...arr] : [...arr.slice(0, idx), ...arr.slice(idx + 1)];
}
