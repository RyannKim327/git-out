// Example array
const nums: number[] = [42, 1, 17, 3, 99];

// Sort in ascending order
const asc = [...nums].sort((a, b) => a - b);
console.log('Ascending:', asc); // [1, 3, 17, 42, 99]

// Sort in descending order
const desc = [...nums].sort((a, b) => b - a);
console.log('Descending:', desc); // [99, 42, 17, 3, 1]
const custom = [...nums].sort((a, b) => {
  const aEven = a % 2 === 0;
  const bEven = b % 2 === 0;
  if (aEven && !bEven) return -1;     // a comes first
  if (!aEven && bEven) return 1;      // b comes first
  return a - b;                       // both same parity: numeric order
});
console.log(custom); // [ 42, 2, 1, 3, 17, 99 ]
import _ from 'lodash';

const order = _.orderBy(nums, [x => x], ['asc']); // asc by numeric value
