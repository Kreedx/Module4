class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  //Generate Linked List
  randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  generate(num) {
    for (let i = 0; i < num; i++) {
      this.append(this.randInt(1, 1000000));
    }
  }
  append(data) {
    let newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      return this.head;
    }

    let tail = this.head;
    while (tail.next != null) {
      tail = tail.next;
    }
    tail.next = newNode;
    return this.head;
  }
  showAll() {
    let current = this.head;
    let result = [];
    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }
    console.log("Linked List:", "[", result.join(" -> "), "]\n");
  }
  ///////////////////////////////

  insertHead(newNode) {
    newNode.next = this.head;
    this.head = newNode;
  }

  insert(data, pos) {
    let newNode = new Node(data);
    pos -= 2;
    if (pos < 0) {
      this.insertHead(newNode);
      return;
    }
    let nodeAtPos = this.head;
    let index = 0;
    while (index <= pos) {
      index++;
      nodeAtPos = nodeAtPos.next;
    }
    let temp = nodeAtPos.next;
    nodeAtPos.next = newNode;
    newNode.next = temp;
  }

  deleteTail() {
    if (this.head === null) {
      return "ERROR", "list empty";
    }
    let last = this.head;
    while (last.next.next) {
      last = last.next;
    }
    last.next = null;
    return this.head;
  }

  deleteHead() {
    if (this.head === null) {
      return "ERROR", "list empty";
    }
    let temp = this.head;
    this.head = this.head.next;
    temp = null;
    return this.head;
  }

  deleteAt(pos) {
    if (this.head === null) {
      console.log("ERROR");
      return;
    }
    //Move to next node
    if (pos === 0) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    let previous = null;
    let i = 0;

    while (current !== null && i < pos) {
      previous = current;
      current = current.next;
      i++;
    }
    previous.next = current.next;
  }

  length() {
    if (this.head === null) {
      console.log("List Is Empty");
      return;
    }
    let temp = this.head;
    let length = 0;
    while (temp != null) {
      length++;
      temp = temp.next;
    }
    console.log("Length of Linked List is: ", length);
    return length;
  }

  sort() {
    if (!this.head) {
      return;
    }
    let swapped;
    do {
      swapped = false;
      let current = this.head;
      while (current && current.next) {
        if (current.data > current.next.data) {
          [current.data, current.next.data] = [current.next.data, current.data];
          swapped = true;
        }
        current = current.next;
      }
    } while (swapped);
  }
}

let list = new LinkedList();

console.log("Base Linked List:");
list.generate(10);
list.insert(202020, 0);
list.showAll();
list.length();
list.sort();
list.showAll();


// console.log("Insert Method:");
// list.insert(69696969, 3);
// list.showAll();

// console.log("After Deleting Tail:");
// list.deleteTail();
// list.showAll();

// console.log("After Deleting Head:");
// list.deleteHead();
// list.showAll();

// console.log("After Deleting At:");
// list.deleteAt(0);
// list.showAll();

// Length of Linked List
// list.length();
