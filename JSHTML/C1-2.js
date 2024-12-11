class MyArray {
  //constructin my array n shit
  constructor(length) {
    this.storage = new Array(length);
    this.pos = 0;
    this.maxLength = length;

    for (let i = 0; i < length; i++) {
      this.push(Math.floor(Math.random() * 100000));
    }
  }

  push(num) {
    if (this.pos >= this.storage.length) {
      console.log("Out of Memory");
      return;
    }
    this.storage[this.pos] = num;
    this.pos++;
  }

  clear() {
    this.storage = new Array(100);
    this.pos = 0;
  }

  length() {
    return this.pos;
  }

  //Bubblesort
  sort() {
    let length = this.pos;
    let checked;
    const performanceStart = performance.now();
    do {
      checked = false;
      for (let i = 0; i < length - 1; i++) {
        if (this.storage[i] > this.storage[i + 1]) {
          let tmp = this.storage[i];
          this.storage[i] = this.storage[i + 1];
          this.storage[i + 1] = tmp;
          checked = true;
        }
      }
      length--;
    } while (checked);
    const performanceEnd = performance.now();
    console.log(`Bubble Sort completed in ${performanceEnd - performanceStart} ms`);
    return this.storage;
  }

  //Select Sort
  sort2() {
    const performanceStart = performance.now();
    //Assume Smallest
    for (let i = 0; i < this.pos; i++) {
      let minIndex = i;

      //Unsorted Minimum
      for (let j = i + 1; j < this.pos; j++) {
        if (this.storage[j] < this.storage[minIndex]) {
          minIndex = j;
        }
      }
      //Swap min with current
      if (minIndex !== i) {
        let temp = this.storage[i];
        this.storage[i] = this.storage[minIndex];
        this.storage[minIndex] = temp;
      }
    }
    const performanceEnd = performance.now();
    console.log(
      `Selection Sort completed in ${performanceEnd - performanceStart} ms`
    );
    return this.storage; //Sorted
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
const myArray = new MyArray(100000);


console.log("Testing Selection Sort...");
myArray.sort2();
