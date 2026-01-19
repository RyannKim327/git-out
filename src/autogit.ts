const a = [1, 2, 3, 4];
const b = [3, 4, 5, 6];

const intersection = a.filter(x => b.includes(x));
console.log(intersection); // [3, 4]
const a = [1, 2, 3, 4];
const b = [3, 4, 5, 6];

const setB = new Set(b);
const intersection = a.filter(x => setB.has(x));
console.log(intersection); // [3, 4]
const a = [1, 2, 3, 4];
const b = [3, 4, 5, 6];

const [small, large] = a.length < b.length ? [a, b] : [b, a];
const setSmall = new Set(small);

const intersection = large.filter(x => setSmall.has(x));
console.log(intersection); // [3, 4]
const a = [1, 2, 2, 3, 4];
const b = [2, 3, 3, 5];

const intersection = Array.from(
  new Set(a.filter(x => new Set(b).has(x)))
);
console.log(intersection); // [2, 3]
import _ from 'lodash';

const intersection = _.intersection([1, 2, 3], [2, 3, 4]);
console.log(intersection); // [2, 3]
