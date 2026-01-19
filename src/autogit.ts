const nums = [1, 2, 2, 3, 4, 4, 5];
const unique = [...new Set(nums)];   // [1, 2, 3,4,5]
const vals = ['a', 'b', 'a', 'c', 'b'];
const uniq = vals.filter((value, index, arr) => arr.indexOf(value) === index);
// ['a','b','c']
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob'   },
  { id: 1, name: 'Alice'},
  { id: 3, name: 'Carol'},
];

const uniq = Array.from(
  users.reduce((map, user) => map.set(user.id, user), new Map<number, User>())
).map(entry => entry[1]);

// [{id:1,name:'Alice'}, {id:2,name:'Bob'}, {id:3,name:'Carol'}]
const objs = [{x:1},{x:2},{x:1},{x:3}];
const uniq = Array.from(
  new Set(objs.map(o => JSON.stringify(o)))
).map(str => JSON.parse(str));
import { uniqBy } from 'lodash';

const uniqUsers = uniqBy(users, 'id');
