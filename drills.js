'use strict';
const MEMORY = require('./memory');

let Memory = new MEMORY();

class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = Memory.allocate(this.length);
  }
  push(val) {
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }
    Memory.set(this.ptr + this.length, val);
    this.length++;
  }
  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = Memory.allocate(size);
    if (this.ptr === null) {
      throw new Error('Out of memory');
    }
    Memory.copy(this.ptr, oldPtr, this.length);
    Memory.free(oldPtr);
    this._capacity = size;
  }
  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    return Memory.get(this.ptr + index);
  }
  pop() {
    if (this.length === 0) {
      throw new Error('Index error');
    }
    const value = Memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }
  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }

    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    Memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    Memory.set(this.ptr + index, value);
    this.length++;
  }
  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    Memory.copy(
      this.ptr + index,
      this.ptr + index + 1,
      this.length - index - 1
    );
    this.length--;
  }
}

function main() {
  Array.SIZE_RATIO = 3;

  //create an instance of the array class
  let arr = new Array();

  //add an item to the array
  arr.push(3);
  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  // arr.pop();
  // arr.pop();
  // arr.pop();

  console.log(arr);
}
// main();

// Input: tauhida parveen
// Output: tauhida%20parveen

let URLify = str => {
  return str
    .split('')
    .map(val => (val === ' ' ? '%20' : val))
    .join('');
};

console.log(URLify('tauhida parveen'));
console.log(URLify('www.thinkful.com /tauh ida parv een'));

// Input: [1,2,3,4,5,6,7,8]
// Output: [5,6,7,8]

let lessThanFive = arr => {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= 5) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
};

console.log(lessThanFive([1, 2, 3, 4, 5, 6, 7, 8]));

// Input: [4, 6, -3, 5, -2, 1];
// Output: 12;

let maxSum = arr => {
  let sum = 0;
  let bigSum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (sum > bigSum) {
      bigSum = sum;
    }
  }
  return bigSum;
};

console.log(maxSum([4, 6, -3, 5, -2, 1]));

// Input:[1, 3, 6, 8, 11] and [2, 3, 5, 8, 9, 10]
// Output:[1, 2, 3, 3, 5, 6, 8, 8, 9, 10, 11]

let mergeArray = (arr1, arr2) => {
  return [...arr1, ...arr2].sort((a, b) => a - b);
};

console.log(mergeArray([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]));

// Input: 'Battle of the Vowels: Hawaii vs. Grozny', 'aeiou';
// Output: 'Bttl f th Vwls: Hw vs. Grzny';
// Vowels: 'aeiou'

let removeChars = (str, remove) => {
  let removeStr = '';
  for (let i = 0; i < remove.length; i++) {
    removeStr += remove[i] + '|';
  }

  return str.replace(new RegExp(removeStr, 'g'), '');
};

console.log(removeChars('Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'));

// Input: [1, 3, 9, 4];
// Output: [108, 36, 12, 27];

let products = arr => {
  function multiply(array) {
    let sum = 1;
    for (let i = 0; i < array.length; i++) {
      sum = sum * array[i];
    }
    return sum;
  }

  let newArr = [];

  for (let i = 0; i < arr.length; i++) {
    let product = [...arr];
    product.splice(i, 1);
    newArr.push(multiply(product));
  }
  return newArr;
};

console.log(products([1, 3, 9, 4]));

// Input: [
//   [1, 0, 1, 1, 0],
//   [0, 1, 1, 1, 0],
//   [1, 1, 1, 1, 1],
//   [1, 0, 1, 1, 1],
//   [1, 1, 1, 1, 1]
// ];
// Output: [
//   [0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0],
//   [0, 0, 1, 1, 0],
//   [0, 0, 0, 0, 0],
//   [0, 0, 1, 1, 0]
// ];

// let newArr = [];
// for (let i = 0; i < arr.length; i++) {
//   for (let j = 0; j < arr[i].length; j++) {
//     if (arr[i][j] === 0) {
//       console.log(i, j);
//       newArr.push(arr.map(subArr =>
//           subArr.map((val, y) => (y === j ? 0 : val))
//         ));
//     }
//   }
// }
// return newArr;

let arrayOrganizer = arr => {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === 0) {
        console.log(i, j);
        newArr.push(
          ...arr.map(subArr => subArr.map((val, y) => (y === j ? 0 : val)))
        );
      }
    }
  }
  return newArr;
};

// arr[i].includes(0) ? newArr.push(arr[i].map(() => 0)) : newArr.push(arr[i]);

console.log(
  arrayOrganizer([
    [1, 0, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1]
  ])
);
