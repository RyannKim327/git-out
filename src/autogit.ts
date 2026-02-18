// 1️⃣ Mutating the original array
const numbers = [1, 2, 3, 4, 5];
numbers.reverse();          // numbers === [5, 4, 3, 2, 1]

// 2️⃣ Producing a new array (original stays untouched)
const letters = ['a', 'b', 'c'];
const reversed = [...letters].reverse(); // reversed === ['c', 'b', 'a']
function reverseArray<T>(arr: T[]): T[] {
    return [...arr].reverse();   // or: return arr.slice().reverse();
}
