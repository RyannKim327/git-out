/***** 1️⃣  The classic Math.max with the spread operator *****/

const numbers = [4, 12, 7, 19, 3];

// Spreads the array into individual arguments for Math.max
const max1 = Math.max(...numbers); // 19
/***** 2️⃣  Using reduce (great if you want a custom comparison *****/

const max2 = numbers.reduce((currentMax, val) => (val > currentMax ? val : currentMax), Number.NEGATIVE_INFINITY);
// Also 19
/***** 3️⃣  If you’re dealing with objects and need a property *****/

type Item = { id: number; value: number };
const items: Item[] = [
  { id: 1, value: 4 },
  { id: 2, value: 12 },
  { id: 3, value: 7 },
];

// Max based on `value`
const maxVal = items.reduce((max, item) => (item.value > max ? item.value : max), Number.NEGATIVE_INFINITY);
// maxVal is 12
// If you want the whole object:
const maxObj = items.reduce((max, item) => (item.value > max.value ? item : max), items[0]);
// maxObj is { id: 2, value: 12 }
