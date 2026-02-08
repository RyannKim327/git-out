const arr = [1, 2, 3, 2, 4];
const withoutTwos = arr.filter(x => x !== 2); // [1, 3, 4]
const arr = [0, 1, 2, 3];
const idx = 1;
const sliced = [...arr.slice(0, idx), ...arr.slice(idx + 1)]; // [0, 2, 3]
