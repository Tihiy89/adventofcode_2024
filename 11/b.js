import { input_a as input_a } from "./input.js";
console.time("part A");

const COUNT_STEP = 75;

let input = input_a().split(" ").map(Number);

class Node {
  val = null;
  next = null;

  constructor(_v) {
    this.val = _v;
  }
}

class Queue {
  first = null;
  constructor(input) {
    input.reduce((lastNode, i) => {
      if (lastNode != null) {
        lastNode.next = new Node(i);
        return lastNode.next;
      } else {
        this.first = new Node(i);
        return this.first;
      }
    }, null);
  }

  blink() {
    let i = 0;
    let cur = this.first;
    while (cur != null) {
      if (cur.val == 0) {
        cur.val = 1;
        cur = cur.next;
      } else if (("" + cur.val).length % 2 == 0) {
        const num = "" + cur.val;

        cur.val = Number(num.slice(0, num.length / 2));
        const newNode = new Node(Number(num.slice(num.length / 2)));
        newNode.next = cur.next;
        cur.next = newNode;

        cur = newNode.next;
        i++;
      } else {
        cur.val = cur.val * 2024;
        cur = cur.next;
      }

      i++;
    }
    return i;
  }
}

const q = new Queue(input);

let sum_b = 0;
for (let step = 0; step < COUNT_STEP; step++) {
  sum_b = q.blink();
  console.log(`step ${step}/${COUNT_STEP} sum:${sum_b}`);
  console.timeLog(`part A`);
}

console.log("A", sum_b);

console.timeEnd("part A");
