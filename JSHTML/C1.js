class MyArray {
  //constructin my array n shit
  constructor(length) {
    this.storage = new Array(length);
    this.pos = 0;
    this.maxLength = length;
  }
  //lägger till ett tal på första lediga plats i arrayen
  push(num) {
    if (this.pos >= this.storage.length) {
      console.log("Out of Memory");
      return;
    }
    this.storage[this.pos++] = num;
  }

  //pop more like poop lol
  pop() {
    if (this.pos === 0) {
      return -1;
    }
    const lastNumber = this.storage[this.pos - 1];
    this.storage[this.pos - 1] = undefined;
    this.pos--;
    return lastNumber;
  }

  // Check if the shit is long or aint
  length() {
    return this.pos;
  }

  min() {
    if (this.pos === 0) {
      console.log("Array is Empty");
      return { min: null, pos: -1 };
    }

    let min = this.storage[0];
    let pos = 0;

    for (let i = 1; i < this.pos; i++) {
      if (this.storage[i] < min) {
        min = this.storage[i];
        pos = i;
      }
    }

    return { min: min, pos: pos };
  }

  max() {
    if (this.pos === 0) {
      console.log("Array is Empty");
      return { max: null, pos: -1 };
    }

    let max = this.storage[0];
    let pos = 0;

    for (let i = 1; i < this.pos; i++) {
      if (this.storage[i] > max) {
        max = this.storage[i];
        pos = i;
      }
    }

    return { max: max, pos: pos };
  }

  mean() {
    if (this.pos === 0) {
      console.log("Array is Undefined:");
      return { mean: null };
    }

    let sum = 0;
    for (let i = 0; i < this.pos; i++) {
      sum += this.storage[i];
    }

    const meanValue = sum / this.pos;
    return { mean: meanValue };
  }

  clear() {
    this.storage = new Array(100);
    this.pos = 0;
    console.log("Array is Cleared!");
  }

  at(pos) {
    if (pos < 0 || pos >= this.pos) {
      console.log("Index out of bounds");
      return undefined;
    }
    return this.storage[pos];
  }

  sum() {
    if (this.pos === 0) {
      console.log("Array is Undefined!");
      return { sum: null };
    }

    let sum = 0;

    for (let i = 0; i < this.pos; i++) {
      sum += this.storage[i];
    }
    return sum;
  }

  popHead() {
    if (this.pos === 0) {
      return -1;
    }

    const firstNumber = this.storage[0];
    for (let i = 1; i < this.pos; i++) {
      this.storage[i - 1] = this.storage[i];
    }
    this.storage[this.pos - 1] = undefined;
    this.pos--;
    return firstNumber;
  }

  between(startPos, endPos) {
    if (startPos < 0 || endPos >= this.pos || startPos > endPos) {
      console.log("Invalid Positions");
      return [];
    }

    let result = [];
    for (let i = startPos; i <= endPos; i++) {
      result.push(this.storage[i]);
    }
    return result;
  }

  cut(from, to) {
    if (from < 0 || to >= this.pos || from > to) {
      console.log("Positions Outside Of Array!");
      return;
    }

    for (let i = to + 1; i <= this.pos; i++) {
      this.storage[i - (to - from + 1)] = this.storage[i];
    }

    for (let i = this.pos - (to - from + 1); i < this.pos; i++) {
      this.storage[i] = undefined;
    } 
    this.pos -= to - from + 1;
  }
 
  reverse() {
    const reversed = [];
    let length = this.pos;
    for (let i = length - 1; i >= 0; i--) {
      reversed.push(this.storage[i]);
    }
    this.storage = reversed;
  }

  merge(arr) {
    if (!Array.isArray(arr)) {
      return -1;
    }
    const totalLength = this.pos + arr.length;
    const tempArray = new MyArray(totalLength);

    for (let i = 0; i < this.pos; i++) {
      tempArray.push(this.storage[i]);
    }
    for (let i = 0; i < arr.length; i++) {
      tempArray.push(arr[i]);
    }
    return tempArray;
  }

  // Print out the shit n shit
  print() {
    let result = [];
    for (let i = 0; i < this.pos; i++) {
      result.push(this.storage[i]);
    }
    console.log(result);
  }
}

// Functions in question here cuh
const myArray = new MyArray(1000000);
const newArray = [40, 50, 60, 156];

// Push
myArray.push(10);
myArray.push(20);
myArray.push(3);
myArray.push(30);
myArray.print(); // 10, 20 , 30

//Pop
console.log("//////////////////////////////////////");
myArray.pop(); // deletes 30
myArray.print(); // 10, 20

//Length
console.log("//////////////////////////////////////");
console.log("Length:", myArray.length());

// Minimum / Position
const minResult = myArray.min();
console.log("//////////////////////////////////////");
console.log("Min:", minResult.min);
console.log("Pos:", minResult.pos);

// Maximum / Position
const maxResult = myArray.max();
console.log("//////////////////////////////////////");
console.log("Max:", maxResult.max);
console.log("Pos:", maxResult.pos);

//Medium
const meanResult = myArray.mean();
console.log("//////////////////////////////////////");
console.log("Medium:", meanResult.mean);

//Clear
console.log("//////////////////////////////////////");
myArray.clear();

// Push
myArray.push(10);
myArray.push(3);
myArray.push(15);
myArray.push(7);

// At Index
console.log("//////////////////////////////////////");
console.log("Element on postion in array:", myArray.at(2));

//Sum of all elements in a array
console.log("//////////////////////////////////////");
console.log("Sum Of Everything:", myArray.sum());

//PopHead
console.log("//////////////////////////////////////");
console.log("Before Popping:");
myArray.print();
myArray.popHead();
console.log("After Popping:");
myArray.print();

// Push
myArray.push(6);
myArray.push(14);
myArray.push(8);
myArray.push(43);

//Push
console.log("//////////////////////////////////////");
myArray.push(10);
myArray.push(3);
myArray.push(15);
myArray.push(7);
myArray.push(20);
myArray.push(5);

//Between
console.log("//////////////////////////////////////");
console.log("Array between 1 and 4 ");
const arrayBetween = myArray.between(1, 4);
console.log(arrayBetween);

//Cut Between
console.log("//////////////////////////////////////");
myArray.cut(1, 3);
myArray.print();

//Reverse Array
console.log("//////////////////////////////////////");
console.log("Before Being Reversed:");
myArray.print();
console.log("After Being Reversed:");
myArray.reverse();
myArray.print(); // 5, 20 , 10

//Merge Array
console.log("//////////////////////////////////////");
console.log("Merge Arrays:");
console.log(myArray.merge(newArray).storage);
console.clear();
