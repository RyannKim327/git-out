const arr = [1, 2, 3, 4, 5];
arr.reverse(); // arr is now [5, 4, 3, 2, 1]
const original = [1, 2, 3, 4, 5];
const reversed = [...original].reverse(); // original stays intact
