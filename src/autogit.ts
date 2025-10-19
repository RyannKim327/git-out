const array1 = [1, 2, 3, 4];
const array2 = [3, 4, 5, 6];

const common = array1.filter(item => array2.includes(item));

console.log(common); // [3, 4]
const array1 = [1, 2, 3, 4];
const array2 = [3, 4, 5, 6];

const set2 = new Set(array2);
const common = array1.filter(item => set2.has(item));

console.log(common); // [3, 4]
type User = { id: number; name: string };

const users1: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];
const users2: User[] = [
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

const ids2 = new Set(users2.map(u => u.id));
const common = users1.filter(user => ids2.has(user.id));

console.log(common); // [{ id: 2, name: "Bob" }]
import _ from "lodash";

const array1 = [1, 2, 3, 4];
const array2 = [3, 4, 5, 6];

const common = _.intersection(array1, array2);

console.log(common); // [3, 4]
