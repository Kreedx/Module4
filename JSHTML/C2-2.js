class Node {
  constructor(data, next = null, prev = null) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}

class DoubleLinkedList {
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
    newNode.prev = tail;
    return this.head;
  }
  showAll() {
    let current = this.head;
    let result = [];
    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }
    console.log("Double Linked List:", "[", result.join(" <-> "), "]\n");
  }
  ///////////////////////////////

  insertHead(newNode) {
    newNode.next = this.head;
    this.head = newNode;
  }

  //Insert
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
    newNode.prev = nodeAtPos;
    newNode.next = temp;

    if (temp) {
      temp.prev = newNode;
    }
  }

  //DeleteTail
  deleteTail() {
    if (this.head === null) {
      return "ERROR", "list empty";
    }
    // If one node
    if (this.head.next === null) {
      this.head = null;
      return;
    }

    //Go to last node
    let last = this.head;
    while (last.next != null) {
      last = last.next;
    }

    //Remoove the Last Node
    last.prev.next = null;
    last.prev = null;
  }

  //DeleteHead
  deleteHead() {
    if (this.head === null) {
      return;
    }
    let temp = this.head;

    if (this.head.next === null) {
      this.head = null;
      return;
    }

    this.head = this.head.next;
    this.head.prev = null;
    temp = null;
  }

  //DeleteAT(pos)

  deleteAt(pos) {
    if (this.head === null) {
      return;
    }
    //Move to next node
    if (pos === 0) {
      this.deleteHead();
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
  //length

  //Sort
}

let list = new DoubleLinkedList();

console.log("Base Double Linked List:");
list.generate(10);
list.showAll();
console.log("After Insertion:");
list.insert(202020, 0);
list.showAll();
console.log("After Deleting Tail:");
list.deleteTail();
list.showAll();
console.log("After Deleting Head:");
list.deleteHead();
list.showAll();
list.deleteAt(0);
list.showAll();
